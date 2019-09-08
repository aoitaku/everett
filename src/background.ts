'use strict'

import { app, protocol, BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import { promisify } from 'util'
import * as fs from 'fs'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow: BrowserWindow | null = null
let playerWindow: BrowserWindow | null = null
let lastOpenedProject: string | null = null

const dataNames = [
  'Actors',
  'Animations',
  'Armors',
  'Classes',
  'CommonEvents',
  'Enemies',
  'Items',
  'MapInfos',
  'Skills',
  'States',
  'System',
  'Tilesets',
  'Troops',
  'Weapons',
]

protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: { secure: true, standard: true },
}])

function copyFile (src: string, dest: string, done: (err: Error, result: void) => void) {
  fs.createReadStream(src).on('error', done)
    .pipe(fs.createWriteStream(dest).on('error', done).on('close', done))
}

function prepareTestData (dir: string) {
  return Promise.all(dataNames.map((data) => {
    return promisify(copyFile)(`${dir}/data/${data}.json`, `${dir}/data/Test_${data}.json`)
  })).catch((err) => {
    console.error(err)
  })
}

function cleanTestData (dir: string) {
  return Promise.all([...dataNames, 'Event'].map((data) => {
    return promisify(fs.unlink)(`${dir}/data/Test_${data}.json`)
  })).catch((err) => {
    console.error(err)
  })
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 810,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    mainWindow.loadURL('app://./index.html')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('window-all-closed', async () => {
  if (lastOpenedProject) {
    await cleanTestData(lastOpenedProject)
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
  }
  createWindow()
})

ipcMain.on('cleanTestData', async (event: IpcMainEvent) => {
  if (lastOpenedProject) {
    await cleanTestData(lastOpenedProject)
  }
})

ipcMain.on('runTestPlay', async (event: IpcMainEvent, arg: string) => {
  if (playerWindow) {
    return
  }
  await prepareTestData(arg)
  lastOpenedProject = arg
  playerWindow = new BrowserWindow({
    width: 960,
    height: 540,
    useContentSize: true,
  })
  playerWindow.loadURL(`file://${lastOpenedProject}/index.html?etest`)
  playerWindow.on('closed', () => {
    playerWindow = null
  })
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
