import { html } from '../../../src/templates/html'
import { TemplateContext } from '../../../src/templates/template'

export default (ctx: TemplateContext) => {
    ctx.require(__dirname, "./hamburger")
    ctx.require(__dirname, "./hamburger.css")
    return html`
    <a class="hamburger">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </a>`
} 