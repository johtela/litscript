import { html, css } from '../../../src/templates/html'
import { TemplateContext } from '../../../src/templates/template'

export default (ctx: TemplateContext) => {
    ctx.require(__dirname, "./contentarea.css")
    return html`
        <div class="contentarea closepopups ${ctx.frontMatter.syntaxHighlight}">
            ${ctx.contents}
        </div>`
}