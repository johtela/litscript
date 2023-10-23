import { html, css, HtmlTemplate } from '../../../src/templates/html'
import { TemplateContext } from '../../../src/templates/template'
import hamburger from '../../components/hamburger'

export interface NavBarItem {
    caption: string
    icon: HtmlTemplate | string
    link?: string
    onclick?: string
    title?: boolean
    subMenu?: NavBarMenu
    active?: boolean
}

export interface NavBarMenu {
    items: NavBarItem[]
    toggle: boolean
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

function getOnClick(ni: NavBarItem): string {
    return ni.onclick ? `onclick="${ni.onclick}"` : ''
}

const navItem = (item: NavBarItem) => html`
    <div class="navitem ${item.active ? 'active' : ''}">
        <a ${getClasses(item)} ${getHref(item)} ${getOnClick(item)}>
            ${item.icon ? 
                (item.icon instanceof HtmlTemplate ?
                    item.icon :
                    `<img src="${item.icon}" />`
                ) : ""}
            <span>${item.caption}</span>
        </a>
        ${item.subMenu ? navMenu(item.subMenu) : ""}
    </div>`

const navMenu = (menu: NavBarMenu) => html`
    <div class="navmenu ${menu.toggle ? 'toggle' : ''}">
        ${menu.items.map(navItem)}
    </div>`

export default (ctx: TemplateContext, ...items: NavBarItem[]) => {
    ctx.require(__dirname, './navbar')
    ctx.require(__dirname, './navbar.css')
    return html`
        <div id="navbar">
            ${navMenu({ items, toggle: false })}
            ${hamburger(ctx)}
        </div>`
}