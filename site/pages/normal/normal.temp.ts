import { html } from 'templates/html'
import { TemplateContext } from 'templates/template'
import { FrontMatter } from 'templates/front-matter'
import { pageTitle, relLink } from 'templates/toc'
import { NavBarItem, navbar } from 'components/navbar/navbar.temp'
import icons from 'components/icons'
import layout from './layout/layout-temp'


function* navItems(fm: FrontMatter, relFileName: string): Iterable<NavBarItem> {
    yield { 
        link: relLink(relFileName, 'index.html'), 
        caption: fm.projectName, 
        icon: fm.logo ? 
            (fm.logo.startsWith('<') ? fm.logo : relLink(relFileName, fm.logo)) : 
            "", 
        title: true 
    }
    if (fm.download)
        yield { 
            link: relLink(relFileName, fm.download), 
            caption: 'Download', 
            icon: fm.download.includes("npmjs.com") ? 
                icons.npm : icons.download
        }
    yield { 
        link: relLink(relFileName, fm.repository), 
        caption: 'GitHub', 
        icon: icons.github
    }
    if (fm.license)
        yield { 
            link: relLink(relFileName, fm.license), 
            caption: 'License', 
            icon: icons.license
        }
}

export default (ctx: TemplateContext) => {
    ctx.require(__dirname, "./normal.js")
    html`
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
            "images/favicon.png")}" />
        <link rel="stylesheet" href="${relLink(ctx.relFilePath, "css/main.css")}" />
        ${ctx.styles}
        ${ctx.frontMatter.useMath ? 
            `<link rel="stylesheet" href="${ctx.frontMatter.katexCdn}">` : ''}
    </head>
    <body>
        ${navbar(ctx, ...navItems(ctx.frontMatter, ctx.relFilePath))}
        <div class="layout">
            <div class="sidepane narrow-scrollbars">
                ${tocmenu(ctx)}
            </div>
            <div class="contentarea closepopups">
                ${contentarea(ctx)}
            </div>
            <div class="sidepane narrow-scrollbars">
                ${pagemenu(ctx)}
            </div>
        </div>
        <script src="${relLink(ctx.relFilePath, "js/main.js")}"></script>
        ${ctx.scripts}
    </body>
    </html>`
}