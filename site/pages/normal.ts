import { html } from 'templates/html'
import { TemplateContext } from 'templates/template'
import { FrontMatter } from 'templates/front-matter'
import { Toc, findPreviousAndNextTocEntries, pageTitle, relLink } 
    from 'templates/toc'
import { NavBarItem, navbar } from 'components/navbar/navbar.temp'
import { fa } from './common/inline-svg'
import layout from './layout/layout-temp'


function* navItems(fm: FrontMatter, toc: Toc, relFileName: string): 
    Iterable<NavBarItem> {
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
                fa('brands/npm') :
                fa('solid/cloud-download-alt')
        }
    yield { 
        link: relLink(relFileName, fm.repository), 
        caption: 'GitHub', 
        icon: fa('brands/github') 
    }
    if (fm.license)
        yield { 
            link: relLink(relFileName, fm.license), 
            caption: 'License', 
            icon: fa('solid/file-contract') 
        }
    let [prev, next] = findPreviousAndNextTocEntries(toc, relFileName)
    yield prev ?
        { 
            link: relLink(relFileName, prev.file), 
            caption: 'Previous: ' + prev.page,
            icon: fa('solid/angle-double-left') 
        } :
        { 
            caption: 'Previous:', 
            icon: fa('solid/angle-double-left') 
        }
    yield next ?
         { 
            link: relLink(relFileName, next.file), 
            caption: 'Next: ' + next.page,
            icon: fa('solid/angle-double-right') 
        } :
        { 
            caption: 'Next:', 
            icon: fa('solid/angle-double-right') 
        }
}

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
    ${navbar([...navItems(ctx.frontMatter, ctx.toc, ctx.relFilePath)])}
    ${layout(ctx)}
    <script src="${relLink(ctx.relFilePath, "js/main.js")}"></script>
    ${ctx.scripts}
</body>
</html>`