import * as fs from 'fs'

export class HtmlTemplate implements Iterable<string> {
    private strings: TemplateStringsArray
    private values: any[]

    constructor(strings: TemplateStringsArray, values: unknown[]) {
        let isEmpty = v => v == null || v == undefined
        this.strings = strings
        if (strings.some(isEmpty) || values.some(isEmpty))
            throw new Error("Cannot have null/undefined template parameters.")
        this.values = values
    }

    *[Symbol.iterator](): Iterator<string> {
        for (let i = 0; i < this.strings.length; ++i) {
            yield this.strings[i]
            if (i < this.values.length) {
                let val = this.values[i]
                if (val instanceof Array)
                    for (let item of val) {
                        if (item instanceof HtmlTemplate)
                            for (let sub of item)
                                yield sub
                        else
                            yield item
                    }
                else if (val instanceof HtmlTemplate)
                    for (let item of val)
                        yield item
                else
                    yield val
            }
        }
    }
}

export const html = (strings: TemplateStringsArray, ...values: any[]) =>
    new HtmlTemplate(strings, values)

export const css = html

export function saveHtmlTemplate(template: HtmlTemplate, fileName: string) {
    let fd = fs.openSync(fileName, 'w')
    try {
        for (let s of template) {
            if (s == undefined)
                break
            fs.writeSync(fd, s, null, 'utf8')
        }
    }
    finally {
        fs.closeSync(fd)
    }
}