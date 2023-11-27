# Getting Started

## Installing

You can install LiTScript from [npm][] as a global tool.
```powershell
> npm install --global litscript
```
This will add a new command line tool called `lits`. 

## Configuring

You can scaffold an existing project to use LiTScript by `cd`ing to the project 
directory and then running command:
```powershell
> lits init
```
LiTScript will ask a series of questions about your project and documentation
settings and create a `litsconfig.json` file based on them. If it finds a 
`.vscode` directory under your project folder, it can add references to JSON
schemas used by LiTScript into your `settings.json` file.

Additionally, you might want to set configuration properties in 
`litsconfig.json` that automatically update table of contents and exclude 
files/folders in the project directory. Below are example settings.
```json
{
    "updateToc": true,
    "exclude": [
        ".git",
        "node_modules",
        "src/tests/**"
    ]
}
```

## Running

You can run _LiTScript_ either manually by executing command
```powershell
> lits
```
or automatically each time a source file changes using
```powershell
> lits --watch
```
or
```powershell
> lits --serve
```
which starts the development server in watch mode.

If you opted to add scripts in `package.json` then you can also run _LiTScript_
with `npm`, or from VS Code menu.
```powershell
> npm run lits
```
or
```powershell
> npm run lits-watch
```

## Publishing

![GitHub Pages](images/github-pages.png)
Another good practice is to output the documentation to the `docs` folder under
your project folder. If your project lives in GitHub, you can publish your
documentation simply by choosing _master branch/docs folder_ as the source for 
your [GitHub Pages][] site. You can find this option under project settings in 
GitHub.

## Migrating from 1.3

LiTScript 2.0 is a major release and contains multiple breaking changes to
version 1.3:

 *  We lean more on standard web technologies and removed [Less][] support. CSS
    is powerful enough to achieve everything that was previously done with Less.
    Customization of default template is now done with [CSS variables][]. Refer 
    to [theming][] instructions, for more information.

 *  Visualizers are also removed. They were a non-standard solution for 
    embedding dynamic content to generated web pages. You can get the same 
    functionality more easily by using [web components][]. See 
    [custom elements][] page for how to convert your visualizers to web 
    components.

 *  Page templates no longer reside in separate projects. The default templates 
    are now included in the LiTScript project. Also user defined templates can 
    now be added directly to projects using LiTScript. See [templates][] 
    documentation for more information.

 *  Default templates and themes have been updated. The look and feel is
    improved, and user can now change color themes through the UI.

 *  The console output has been compacted. Status messages are collapsed to
    reduce visual clutter, and error messages are now shorter and clearer.

[npm]: https://npmjs.com
[GitHub Pages]: https://pages.github.com/
[LeSS]: http://lesscss.org/
[CSS variables]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[theming]: /site/styles/theme.html
[web components]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[custom elements]: src/custom-elem.html
[templates]: src/templates/template.html