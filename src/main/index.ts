import { app, BrowserWindow, ipcMain, IpcMessageEvent } from 'electron'
import { promisify } from 'util'
import * as fs from 'fs'

console.log(process.versions)

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: false })

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow: Electron.BrowserWindow | null = null
let playerWindow: Electron.BrowserWindow | null = null
let lastOpenedProject: string | null = null

const winURL: string = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
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
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 810,
    useContentSize: true,
    width: 1440
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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

ipcMain.on('cleanTestData', async (event: IpcMessageEvent) => {
  if (lastOpenedProject) {
    await cleanTestData(lastOpenedProject)
  }
})

ipcMain.on('runTestPlay', async (event: IpcMessageEvent, arg: string) => {
  if (playerWindow) {
    return
  }
  await prepareTestData(arg)
  lastOpenedProject = arg
  playerWindow = new BrowserWindow({
    height: 540,
    useContentSize: true,
    width: 960
  })
  playerWindow.loadURL(`file://${lastOpenedProject}/index.html?etest`)
  playerWindow.on('closed', () => {
    playerWindow = null
  })
})
