'use strict'

import { app, protocol, BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import { promisify } from 'util'
import * as fs from 'fs'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
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

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

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
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 810,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', async () => {
  if (lastOpenedProject) {
    await cleanTestData(lastOpenedProject)
  }
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

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

// Exit cleanly on request from parent process in development mode.
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
