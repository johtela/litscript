/**
 * # Table of Contents
 * 
 * The data structure for table of contents or _TOC_ is defined here. Also
 * functions for loading and saving it.
 */
//#region -c toc.ts imports
import * as fs from 'fs'
import * as path from 'path'
//#endregion
/**
 * ## Data Structure
 * 
 * The structure of the TOC is recursive, but simple. A TOC consists of entries
 * which contain information about single page. An entry might contain 
 * sub-entries which share the TOC structure.
 * 
 * An entry contains the following information:
 * - `page` contains the title of the page.
 * - `file` is the relative path to the HTML page without the leading `/` 
 *   character.
 * - `desc` is an optional, longer description for the page.
 * - `subs` contains the sub-entries.
 */
export type Toc = TocEntry[]
export interface TocEntry {
    page: string
    file: string
    desc: string
    subs?: Toc
}
/**
 * ## Loading TOC
 * 
 * The function that loads TOC from file is defined below. It checks if the
 * given file exists. If not, it returns an empty TOC. Otherwise it parses the
 * content to the data structure. Any errors in the data will cause exceptions.
 */
export function loadToc(tocFile: string): Toc {
    if (!fs.existsSync(tocFile))
        return [];
    try {
        return JSON.parse(fs.readFileSync(tocFile, 'utf-8'))
    }
    catch (e) {
        throw e instanceof SyntaxError ?
            Error("Could not parse TOC. Error: \n" +
                e.message) : e
    }
}
/**
 * ## Saving TOC
 * 
 * Saving TOC just serializes the data structure to string and saves it to the
 * file specified.
 */
export function saveToc(toc: Toc, tocFile: string) {
    fs.writeFileSync(tocFile, JSON.stringify(toc, null, 4))
}
/**
 * ## Iterating the Entries
 * 
 * Since TOC structure is recursive, it needs to be flattened, if you need to
 * iterate throuhg all the entries. The following generator does that.
 */
export function* iterateTocEntries(entries: Toc): Iterable<TocEntry> {
    for (let i = 0; i < entries.length; ++i) {
        let entry = entries[i]
        if (entry.file)
            yield entries[i]
        if (entry.subs) {
            for (let subEntry of iterateTocEntries(entry.subs))
                yield subEntry
        }
    }
}
/**
 * ## Finding an Entry
 * 
 * To find a specific page in the TOC, we iterate through the flattened entries
 * until we find the given file.
 */
export function findTocEntryForFile(entries: Toc, file: string): TocEntry {
    for (let entry of iterateTocEntries(entries))
        if (entry.file == file)
            return entry
    return null
}
/**
 * ## Find Previous and Next Entry
 * 
 * Navigation buttons need the reference to the previous and next page of the
 * given entry. This function also traverses through the flattened list, but 
 * keeps the previous entry in a variable, in case the next one is the one we
 * are searching for.
 */
export function findPreviousAndNextTocEntries(entries: Toc, file: string):
    [TocEntry, TocEntry] {
    let prev: TocEntry = null
    let found = false
    for (let entry of iterateTocEntries(entries))
        if (found)
            return [prev, entry]
        else if (entry.file == file)
            found = true
        else
            prev = entry
    return [prev, null]
}
/**
 * ## Adding New Entry
 * 
 * Adding a new entry is done simply by pushing it at the end of the top-level
 * TOC. The user can manually relocate it later.
 */
export function addTocEntry(toc: Toc, page: string, file: string) {
    if (!findTocEntryForFile(toc, file))
        toc.push({ page, file, desc: "" })
}
/**
 * ## Page Title
 *  
 * The title of a HTML page is retrieved also from TOC.
 */
export function pageTitle(toc: Toc, relFileName: string): string {
    let entry = findTocEntryForFile(toc, relFileName)
    return entry ? " - " + entry.page : ""
}

export function relLink(from: string, to: string): string {
    return to.match(/^https?:\/\//) ? to :
        path.relative(path.dirname(from), to).replace(/\\/g, "/")
}