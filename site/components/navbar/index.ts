import { html, css, HtmlTemplate } from '../../../src/templates/html'
import { TemplateContext } from '../../../src/templates/template'
import hamburger from '../../components/hamburger'

export interface NavBarItem {
    link?: string
    caption: string
    icon: HtmlTemplate | string
    title?: boolean
}

function getClasses(ni: NavBarItem): string {
    let res = []
    if (ni.title)
        res.push('title')
    if (ni.link)
        res.push('enabled')
    return res.length == 0 ? '' : `class="${res.join(' ')}"`
}

function getHref(ni: NavBarItem): string {
    return ni.link ? `href="${ni.link}"` : ''
}

const navItem = (ni: NavBarItem) => html`
    <a ${getClasses(ni)} ${getHref(ni)}>
        ${ni.icon ? 
            (ni.icon instanceof HtmlTemplate ?
                ni.icon :
                `<img src="${ni.icon}" />`
            ) : ""}
        <span>${ni.caption}</span>
    </a>`

const styles = css`
#navbar {
    --title-font-size: var(--nav-font-size) + 3px;
    /* Place the navbar at the top or bottom of the page, and make it stick */
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    align-items: flex-start;
    overflow: hidden;
    z-index: 101;
    background-color: var(--nav-bg-color);
    transition: top var(--nav-transition);
}
.navmenu {
    display: flex;
    flex-grow: 100;
    justify-content: var(--nav-button-justify);
    align-items: stretch; 
}
.navmenu a {
    /* Style the links inside the navigation bar */
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    text-transform: var(--nav-text-transform);
    padding: var(--nav-vert-padding) var(--nav-horz-padding);
    font-size: var(--nav-font-size);
}
.navmenu a svg,
.navmenu a img {
    /* Change icon color and size. */
    height: var(--title-font-size);
    fill: currentColor;
}
.navmenu a span {
    /* Add space between link text and icon */
    margin-left: 4px;
}
.navmenu a.title {
    /* Set the title bigger. */
    font-size: var(--title-font-size);
    font-weight: 600;
}
.navmenu a.title svg, 
.navmenu a.title img {
    /* Change icon color and size. */
    height: calc(var(--title-font-size) + 6px);
}        
.navmenu a.hamburger {
    display: none;
    margin-right: var(--nav-vert-margin);
}
@media only screen and (max-width: 991px) {
    .navmenu a:not(:first-child) {
        display: none;
    }
    .navmenu a.hamburger {
        display: inline-block;
    }
    .expanded .navmenu a {
        display: flex;
        font-size: var(--title-font-size);
    }
    .expanded .navmenu {
        flex-direction: column;
    }
}`

export default (ctx: TemplateContext, ...items: NavBarItem[]) => {
    ctx.require(__dirname, './navbar.js')
    return html`
        <div id="navbar">
            <div class="navmenu">
                ${items.map(navItem)}
            </div>
            ${hamburger(ctx)}
        </div>`
}