import { html, css } from "../../../src/templates/html";
import { TemplateContext } from "../../../src/templates/template";

export default (ctx: TemplateContext) => {
    ctx.require(__dirname, "./tooltip")
    ctx.require(__dirname, "./tooltip.css")
    return html``
}