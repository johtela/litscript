/**
 * # Normal Page
 * 
 * The default template is designed for normal documentation page. It consists
 * of navbar, table of contents pane, the content area, page menu, and footer.
 */
//#region -c normal imports
import { html } from '../../../src/templates/html'
import { TemplateContext, relLink } from '../../../src/templates/template'
import { FrontMatter } from '../../../src/templates/front-matter'
import { pageTitle } from '../../../src/templates/toc'
import { default as navbar, NavBarItem, NavBarMenu } from '../../components/navbar'
import tooltip from '../../components/tooltip'
import tocmenu from '../../components/tocmenu'
import contentarea from '../../components/contentarea'
import pagemenu from '../../components/pagemenu'
import footer from '../../components/footer'
import icons from '../../components/icons'
//#endregion
/**
 * ## Navbar Contents
 * 
 * The function below generates contents of the navbar. It yields a list of
 * `NavItem` objects that provide links to download page, source repository,
 * and license information. If corresponding links are missing in the front 
 * matter, buttons are skipped.
 */
function* navItems(fm: FrontMatter, relFileName: string): Iterable<NavBarItem> {
    /**
     * The link to the home page with the project name and logo.
     */
    yield { 
        link: relLink(relFileName, 'index.html'), 
        caption: fm.projectName, 
        icon: fm.logo ? 
            (fm.logo.startsWith('<') ? fm.logo : relLink(relFileName, fm.logo)) : 
            "", 
        title: true 
    }
    /**
     * Link to the download page.
     */
    if (fm.download)
        yield { 
            link: relLink(relFileName, fm.download), 
            caption: 'Download', 
            icon: fm.download.includes("npmjs.com") ? 
                icons.npm : icons.download
        }
    /**
     * Link to GitHub repository.
     */
    if (fm.repository)
        yield { 
            link: relLink(relFileName, fm.repository), 
            caption: 'GitHub', 
            icon: icons.github
        }
    /**
     * Link to the license.
     */
    if (fm.license)
        yield { 
            link: relLink(relFileName, fm.license), 
            caption: 'License', 
            icon: icons.license
        }
    /**
     * Menu for changing the syntax highlighting scheme.
     */
    yield {
        caption: "Syntax Highlight",
        icon: icons.caret_down,
        subMenu: syntaxNavItems(fm)
    },
    yield {
        caption: "Theme",
        icon: icons.caret_down,
        subMenu: themeNavItems(fm)
    }
}
/**
 * Populate the navitems for syntax highlight submenu. Items' click handlers
 * call the `syntaxHighlight` function in the `body` object. This function is
 * defined in the accompanying JS file.
 */
function syntaxNavItems(fm: FrontMatter): NavBarMenu {
    let items: NavBarItem[] = []
    for (let key in fm.syntaxHighlightThemes) {
        items.push({ 
            caption: fm.syntaxHighlightThemes[key],
            id: key,
            icon: icons.palette,
            active: key == fm.syntaxHighlight,
            onclick: `document.body.syntaxHighlight('${key}')`
        })
    }
    return { items, toggle: true }
}
/**
 * The other menu allows changing used theme.
 */
function themeNavItems(fm: FrontMatter): NavBarMenu {
    let items: NavBarItem[] = []
    for (let key in fm.themes) {
        items.push({ 
            caption: fm.themes[key],
            id: key,
            icon: icons.paint,
            active: key == fm.theme,
            onclick: `document.body.theme('${key}')`
        })
    }
    return { items, toggle: true }
}
/**
 * ## Page Template
 * 
 * The HTML template for the page is below. It imports required style and JS
 * files and returns the HTML for the given context.
 */
export default (ctx: TemplateContext) => {
    ctx.require(ctx.baseDir, "site/styles/theme.css")
    ctx.require(ctx.baseDir, "site/styles/syntax.css")
    ctx.require(__dirname, "./normal")
    ctx.require(__dirname, "./normal.css")
    return html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>
            ${ctx.frontMatter.projectName}${pageTitle(ctx.toc, ctx.relFilePath)}
        </title>
        <link rel="icon" type="image/icon" href="${relLink(ctx.relFilePath, 
            "images/favicon.svg")}" />
        ${ctx.styles}
        ${ctx.frontMatter.useMath ? 
            `<link rel="stylesheet" href="${ctx.frontMatter.katexCdn}">` : ''}
    </head>
    <body data-syntax-highlight="${ctx.frontMatter.syntaxHighlight}"
        data-theme="${ctx.frontMatter.theme}">
        ${navbar(ctx, ...navItems(ctx.frontMatter, ctx.relFilePath))}
        ${tooltip(ctx)}
        <div class="layout">
            <div class="sidepane narrow-scrollbars">
                ${tocmenu(ctx)}
                <div class="toc-button">${icons.chevrons_right}</div>
            </div>
            ${contentarea(ctx)}
            <div class="sidepane narrow-scrollbars">
                ${pagemenu(ctx)}
            </div>
        </div>
        ${footer(ctx)}
        ${ctx.scripts}
    </body>
    </html>`
}