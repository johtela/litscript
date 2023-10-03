import { html } from 'templates/html'
import { TemplateContext } from 'templates/template'

export default (ctx: TemplateContext) => {
    ctx.require(__dirname, "./hamburger.js")
    return html`
    <a class="hamburger">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </a>`
} 