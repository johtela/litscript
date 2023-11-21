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

[npm]: https://npmjs.com
[GitHub Pages]: https://pages.github.com/