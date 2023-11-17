import * as $ from "../components/common"
import { activateItem } from "../components/navbar/navbar"

const syntaxKey = "syntaxHighlight"
const themeKey = "theme"

function setSyntax(name: string) {
    document.body.setAttribute("data-syntax-highlight", name)
    let menuItem = $.elementWithId(name)   
    if (menuItem)
        activateItem(menuItem, syntaxKey)
}

function setTheme(name: string) {
    document.body.setAttribute("data-theme", name)
    let menuItem = $.elementWithId(name)   
    if (menuItem)
        activateItem(menuItem, themeKey)
}

export function initializeTheme() {
    document.body["syntaxHighlight"] = setSyntax
    let sh = window.localStorage.getItem(syntaxKey)
    if (sh)
        setSyntax(sh)
    document.body["theme"] = setTheme
    let th = window.localStorage.getItem(themeKey)
    if (th)
        setTheme(th)
}