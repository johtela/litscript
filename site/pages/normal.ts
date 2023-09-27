import { html } from '../../src/templates/html'
import { TemplateContext } from '../../src/templates/template'
import { pageTitle, relLink } from '../../src/templates/toc'
import { navbar } from './navbar/navbar-temp'
import { navItems } from './nav-items'
import layout from './layout/layout-temp'

export default (ctx: TemplateContext) => html`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${ctx.frontMatter.projectName}${pageTitle(ctx.toc, ctx.relFilePath)}</title>
    <link rel="icon" type="image/icon" href="${relLink(ctx.relFilePath, 
        "images/favicon.png")}" />
    <link rel="stylesheet" href="${relLink(ctx.relFilePath, "css/main.css")}" />
    ${ctx.styles}
    ${ctx.frontMatter.useMath ? 
        `<link rel="stylesheet" href="${ctx.frontMatter.katexCdn}">` :
        ''}
</head>
<body>
    ${navbar([...navItems(fm, toc, relFileName)])}
    ${layout(fm, toc, contents, relFileName)}
    <script src="${relLink(relFileName, "js/main.js")}"></script>
    ${scripts}
</body>
</html>`