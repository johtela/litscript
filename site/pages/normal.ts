import { html, css } from '../../src/templates/html'
import { TemplateContext, relLink } from '../../src/templates/template'
import { FrontMatter } from '../../src/templates/front-matter'
import { pageTitle } from '../../src/templates/toc'
import navbar from '../components/navbar'
import tooltip from '../components/tooltip'
import tocmenu from '../components/tocmenu'
import contentarea from '../components/contentarea'
import pagemenu from '../components/pagemenu'
import icons from '../components/icons'

function* navItems(fm: FrontMatter, relFileName: string) {
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

const styles = css`
.layout {
    --side-width: 20%;
    --cnt-width: 80ch;
    display: flex;
    flex-direction: column;
}
.sidepane {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--toc-bg-color);
    flex-basis: var(--side-width);
}
@media only screen and (max-width: 1199px) {
    .layout {
        --side-width: 25%;
    }
}
@media only screen and (max-width: 991px) {
    .layout {
        --side-width: 30%;
    }
}
@media only screen and (max-width: 767px) {
    .layout {
        --side-width: 45%;
    }
}
@media only screen and (max-width: 480px) {
    .layout {
        --side-width: 70%;
    }
}
.contentarea {
    background-color: var(--cnt-bg-color);
    flex-basis: var(--cnt-width);
}`

export default (ctx: TemplateContext) => {
    ctx.require(ctx.siteDir, "styles/theme.css")
    ctx.require(ctx.siteDir, "styles/syntax.css")
    ctx.style(styles)
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
            "images/favicon.png")}" />
        ${ctx.styles}
        ${ctx.frontMatter.useMath ? 
            `<link rel="stylesheet" href="${ctx.frontMatter.katexCdn}">` : ''}
    </head>
    <body>
        ${navbar(ctx, ...navItems(ctx.frontMatter, ctx.relFilePath))}
        ${tooltip(ctx)}
        <div class="layout">
            <div class="sidepane narrow-scrollbars">
                ${tocmenu(ctx)}
            </div>
            ${contentarea(ctx)}
            <div class="sidepane narrow-scrollbars">
                ${pagemenu(ctx)}
            </div>
        </div>
        ${ctx.scripts}
    </body>
    </html>`
}