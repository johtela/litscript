/**
 * AI generated plugin to replace markdown-it-front-matter.
 */
import type MarkdownIt from 'markdown-it'

export type FrontMatterCallback = (frontMatter: string) => void

export default function markdownItFrontMatter(md: MarkdownIt,
    onFrontMatter: FrontMatterCallback): void {
    md.core.ruler.before('normalize', 'front_matter', (state) => {
        const src = state.src
        if (!src.startsWith('---') && !src.startsWith('+++')) {
            return
        }
        const lines = src.split(/\r?\n/)
        const opener = lines[0].trim()
        let endIndex = -1
        for (let i = 1; i < lines.length; i += 1) {
            const line = lines[i].trim()
            if (line === opener || line === '...') {
                endIndex = i
                break
            }
        }
        if (endIndex < 0) {
            return
        }
        const frontMatter = lines.slice(1, endIndex).join('\n')
        onFrontMatter(frontMatter)

        const remainder = lines.slice(endIndex + 1).join('\n')
        state.src = remainder.length ? `${remainder}\n` : ''
    })
}