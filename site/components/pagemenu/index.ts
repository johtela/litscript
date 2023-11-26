import { html, css } from '../../../src/templates/html'
import { TemplateContext } from '../../../src/templates/template';

export default (ctx: TemplateContext) => {
    ctx.require(__dirname, "./pagemenu")
    ctx.require(__dirname, "./pagemenu.css")
    return html`
        <div class="pagemenu">
            <h3>${ctx.frontMatter.pageMenuHeader}</h3>
                <ul class="pagetree">
                </ul>
        </div>`
}