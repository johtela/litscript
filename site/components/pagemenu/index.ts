import { html, css } from '../../../src/templates/html'
import { TemplateContext } from '../../../src/templates/template';

const styles = css`
.pagemenu {
    margin: 10px;
    color: var(--pm-text-color);
    font-size: var(--pm-font-size);
}
.pagemenu h3 {
    font-size: var(--pm-header-font-size);
    margin: var(--pm-header-font-size) 0 10px 0;
}
.pagemenu ul {
    list-style-type: none;
    overflow: hidden;
}
.pagemenu ul ul {
    padding-left: calc(var(--pm-font-size) / 2);
}
.pagemenu li {
    margin: calc(var(--pm-font-size) * 0.2) 0;
}
.pagemenu a {
    display: inline-block;
    text-decoration: none;
    color: var(--pm-text-color);
    width: 90%;
    padding-left: 10px;
}
.pagemenu a.highlight {
    border-left: solid 3px var(--color-primary-dark);
    padding-left: 7px;
    font-weight: bold;
}
.pagemenu a:active {
    color: var(--pm-link-hover-color);
}`

export default (ctx: TemplateContext) => {
    ctx.style(styles)
    ctx.require(__dirname, "./pagemenu")
    return html`
        <div class="pagemenu">
            <h3>${ctx.frontMatter.pageMenuHeader}</h3>
                <ul class="pagetree">
                </ul>
        </div>`
}