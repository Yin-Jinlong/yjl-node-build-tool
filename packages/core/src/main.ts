import {spawnSync} from 'child_process'
import fs from 'fs'
import * as process from 'process'

function resolveBuildFile(name: string = 'build'): string {
    const exts = ['ts', 'mjs', 'js']
    for (const ext of exts) {
        const file = `${name}.${ext}`
        if (fs.existsSync(file)) {
            return file
        }
    }
    throw new Error(`${name} not found`)
}

export function main(...args: string[]) {
    let file: string
    if (args.length < 3) {
        file = resolveBuildFile()
    } else {
        file = resolveBuildFile('build.' + args[2])
    }

    let p = spawnSync(`tsx ${file} ` + args.slice(2).join(' '), {
        shell: true,
        stdio: 'inherit'
    })
    process.exit(p.status ?? 0)
}
