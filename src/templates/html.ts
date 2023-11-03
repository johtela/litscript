/**
 * # HTML Template Literals
 * 
 * Templates literals are used to construct HTML fragments in string format.
 * To avoid constantly concatenating these strings, we store them in an array.
 * We utilize the [template literals][] feature and define a template string 
 * builder with `html` prefix. It constructs HTML fragments from values 
 * interleaved within string literals. The values are usually also HtmlTemplate 
 * objects forming a tree of templates.
 * 
 * This tree can be efficiently iterated and saved to disk, avoiding need to
 * concatenate the HTML strings at any point. The `html` keyword is also 
 * recognized by syntax highlighting plugins such as [Inline HTML][] which 
 * makes templates more readable by coloring them.
 * 
 * [template literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 * [Inline HTML]: https://marketplace.visualstudio.com/items?itemName=pushqrdx.inline-html
 */
//#region -c html imports
import * as fs from 'fs'
//#endregion
/**
 * ## HtmlTemplate Class
 * 
 * HtmlTemplate class returns its contents as iterable and stores its strings
 * and values in two arrays.
 */
export class HtmlTemplate implements Iterable<string> {
    private strings: TemplateStringsArray
    private values: any[]
    /**
     * ### Constructor
     * 
     * The constructor checks that no `null` or `undefined` strings or values 
     * are given. This catches common bug in templates when using uninitialized 
     * or wrong value.
     */
    constructor(strings: TemplateStringsArray, values: unknown[]) {
        let isEmpty = (v: unknown) => v == null || v == undefined
        if (strings.some(isEmpty) || values.some(isEmpty))
            throw new Error("Cannot have null/undefined template parameters.")
        this.strings = strings
        this.values = values
    }
    /**
     * ### Iterator
     * 
     * We can flatten a HTML template to a stream of strings by iterating it.
     * The iterator recursively yields strings and values in the object. It 
     * handles values that are arrays or HtmlTemplate objects. Other types it
     * just returns raw.
     */
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
/**
 * ## Creating HTML Template
 * 
 * We define two ways to construct HTML template literals: with `html` or `css`
 * keyword. Both functions just return a new HtmlTemplate object with specified
 * arguments.
 */
export const html = (strings: TemplateStringsArray, ...values: any[]) =>
    new HtmlTemplate(strings, values)

export const css = html
/**
 * ## Saving HTML Template
 * 
 * Saving template is efficient as we just iterate through the flattened sub-
 * templates and write them to file one by one.
 */
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
/**
 * ## Converting Template to String
 * 
 * Another way to use the template is to convert its result to a string. This
 * *will* concatenate all the strings together, but it does it as efficiently
 * as possible.
 */
export function htmlTemplateToString(template: HtmlTemplate): string {
    let res: string[] = []
    for (let s of template)
        res.push(s)
    return res.join()
}