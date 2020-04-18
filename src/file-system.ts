import { promisify } from 'util'
import * as fs from 'fs'

export const writeFile = promisify(fs.writeFile).bind(fs)
export const readFile = promisify(fs.readFile).bind(fs)
export const readdir = promisify(fs.readdir).bind(fs)
