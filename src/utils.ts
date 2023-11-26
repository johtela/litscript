/**
 * # Path & Directory Utilities
 * 
 * This module contains general functions for working with files and file paths.
 */
//#region -c utils imports
import * as fs from 'fs'
import * as path from 'path'
import * as mm from 'minimatch'
//#endregion
/**
 * ## Path Helpers
 * 
 * This function ensures that the given path is in the Posix format, with
 * forward instead of backslashes.
 */
export function toPosixPath(filePath: string): string {
    return filePath.split(path.sep).join(path.posix.sep)
}
/**
 * This one checks if two paths are the same. The path formats can be mixed,
 * i.e. other in Windows other in Posix format.
 */
export function samePath(filePath: string, other: string): boolean {
    return !path.relative(other, filePath)
}
/**
 * This one checks if the given file path is under the given directory.
 */
export function isInsideDir(filePath: string, dir: string): boolean {
    let relative = path.relative(dir, filePath)
    return relative && !relative.startsWith('..') && !path.isAbsolute(relative)
}
/**
 * ## Directory Helpers
 * 
 * The function below ensures that the specified directory exists. It creates
 * the full, if any of the directories is not ther.
 */
export function ensureDirExist(filePath: string) {
    let fp = path.parse(filePath)
    if (!fs.existsSync(fp.dir))
        fs.mkdirSync(fp.dir, { recursive: true })
}
/**
 * This is a helper function that recursively traverses a directory tree and
 * calls either `fileAction` or `dirAction` function depending if the entry
 * is a file or directory.
 */
export function recurseDir(dir: string, fileAction: (filePath: string) => void,
    dirAction?: (dirPath: string) => void) {
    for (const file of fs.readdirSync(dir)) {
        let fp = path.join(dir, file)
        let stat = fs.statSync(fp)
        if (stat.isFile())
            fileAction(fp)
        else if (stat.isDirectory()) {
            recurseDir(fp, fileAction, dirAction)
            if (dirAction)
                dirAction(fp)
        }
    }
}
/**
 * This one deletes the contents of a directory.
 */
export function clearDir(dir: string) {
    recurseDir(dir, fs.unlinkSync, fs.rmdirSync)
}
/**
 * This function uses `recurseDir` to find all files under a directory that 
 * match the given GLOB pattern. It searches recursively inside subdirectories
 * too.
 */
export function findFiles(dir: string, pattern: string): string[] {
    let res = []
    recurseDir(dir, fp => {
        if (mm.minimatch(fp, pattern))
            res.push(fp)
    })
    return res
}