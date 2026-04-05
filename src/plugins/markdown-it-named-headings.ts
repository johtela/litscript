/**
 * AI generated rplacement for markdown-it-named-headings packages.
 */
import MarkdownIt from 'markdown-it';

export default function namedHeadings(md: MarkdownIt): void {
    const originalHeadingOpen = md.renderer.rules.heading_open

    md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
        const token = tokens[idx]
        const nextToken = tokens[idx + 1]

        if (nextToken && nextToken.type === 'inline') {
            const content = nextToken.content
            // Sanitize: lowercase, remove non-word chars except spaces and 
            // dashes, replace spaces with dashes
            const id = content
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
            token.attrSet('id', id)
        }
        return originalHeadingOpen
            ? originalHeadingOpen(tokens, idx, options, env, self)
            : self.renderToken(tokens, idx, options)
    }
}