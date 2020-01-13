import * as fs from 'fs'
import * as path from 'path'
import * as mm from 'minimatch'

export function ensureDirExist(dir: string) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir)
}

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

export function clearDir(dir: string) {
    recurseDir(dir, fs.unlinkSync, fs.rmdirSync)
}

export function findFiles(dir: string, pattern: string): string[] {
    let res = []
    recurseDir(dir, fp => {
        if (mm(fp, pattern))
            res.push(fp)
    })
    return res
}