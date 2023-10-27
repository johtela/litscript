/**
 * # HTML Template
 * 
 * Templates output return fragments of HTML as strings. To avoid unnecessary
 * concatenation of strings, we define a template string builder `html`. It
 * allows constructing HTML fragments from template strings and values which
 * are stored in HtmlTemplate objects. This also enables using syntax 
 * highlighting plugins such as [Inline HTML][] that color the templates and
 * make them much more readable.
 * 
 * [Inline HTML]: https://marketplace.visualstudio.com/items?itemName=pushqrdx.inline-html
 */
import * as fs from 'fs'
/**
 * HtmlTemplate class returns its contents as iterable and stores its strings
 * and values in two arrays.
 */
export class HtmlTemplate implements Iterable<string> {
    private strings: TemplateStringsArray
    private values: any[]
    /**
     * ## Constructor
     * 
     * The constructor checks that no `null` or `undefined` values are given.
     * This catches some bugs with templates. 
     */
    constructor(strings: TemplateStringsArray, values: unknown[]) {
        let isEmpty = (v: unknown) => v == null || v == undefined
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

export function htmlTemplateToString(template: HtmlTemplate): string {
    let res: string[] = []
    for (let s of template)
        res.push(s)
    return res.join()
}