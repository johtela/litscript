import { html } from 'templates/html'
import hamburger from '../hamburger/hamburger-temp'

export interface NavBarItem {
    link?: string
    caption: string
    icon: string
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
        ${ni.icon ? (
            ni.icon.startsWith('<') ?
                ni.icon :
                `<img src="${ni.icon}" />`
            ) : ""}
        <span>${ni.caption}</span>
    </a>`

export const navbar = (items: NavBarItem[]) => html`
    <div id="navbar">
        <div class="navmenu">
            ${items.map(navItem)}
        </div>
        ${hamburger}
    </div>`