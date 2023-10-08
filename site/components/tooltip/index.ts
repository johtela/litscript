import { html, css } from "../../../src/templates/html";
import { TemplateContext } from "../../../src/templates/template";

const styles = css`
#tooltip {
    --font: var(--sans-font);
    --arrow-size: 4px;
    --arrow-border-size: calc(var(--arrow-size) + 1px);
    
    position: absolute;
    padding: 4px;
    z-index: 9999;
    font-family: var(--font);
    font-size: 14px;
    background-color: var(--tooltip-bg-color);
    border-radius: 4px;
    color: var(--tooltip-color);
    border: 1px solid var(--tooltip-border-color);
    opacity: 0%;
    transform: translate(0, -110%);
    transition: opacity 0.5s;
}
#tooltip:after, 
#tooltip:before {
    top: 100%;
    left: min(1em, 50%);
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}
#tooltip:after {
    border-top-color: var(--tooltip-bg-color);
    border-width: var(--arrow-size);
    margin-left: calc(0 - var(--arrow-size));
}
#tooltip:before {
    border-top-color: var(--tooltip-border-color);
    border-width: var(--arrow-border-size);
    margin-left: calc(0 - var(--arrow-border-size));
}`

export default (ctx: TemplateContext) => {
    ctx.style(styles)
    ctx.require(__dirname, "./tooltip")
    return html``
}