---
{ "template": "landingpage", "useMath": true }
---
<div class="main-title">
<img src="images/bulb.svg" />
<div class="main-title-text">

# LiTScript

* Literate 
* Interactive 
* TypeScript 

</div>
<a href="introduction.html">Learn more »</a>
</div>

<div class="info-area">
<div class="info-boxes">

<div class="info-box">
<a href="https://en.wikipedia.org/wiki/Donald_Knuth">
    <img src="images/knuth-tshirt-show.jpg" style="width: 160px;" />
</a>

## What Is It?

_LiTScript_ is a documentation generation tool that draws inspiration
from [literate programming][]. It extracts documentation from [TypeScript][] 
projects and produces feature-rich web sites. Its goal is to make creating
and maintaining project documentation as effortless as possible.

</div>
<div class="info-box">

## How Does It Work?

This web site is generated from the source of the _LiTScript_ project. Check
its source in [GitHub][] to see how the documentation is incorporated into
the code. The animation below illustrates how the tool works.

<<v:filediagram>>

</div>
<div class="info-box">

## Features

### Document Any Source File

_LiTScript_ can extract documentation from any kind of source file: _TS_, _JS_, 
_CSS_, _LeSS_, _SCSS_, etc. Just write your documentation in [markdown][] inside 
_JSDoc_ comments `/**` ... `*/` and it will be processed by _LiTScript_.

``` ts
/**
 * ## Options
 * 
 * The available settings are defined in the `Options` interface. 
 * Options specified in JSON and command line are case-insensitive. 
 * Keys are converted to lowercase before comparing them.
 */
export interface Options {
    /**
     * ### Base Directory
     * 
     * This setting specifies the project root folder. LiTScript 
     * expects to find the [configuration files](#configuration-files) 
     * there.
     */
    baseDir: string
    ...
```

If you prefer to keep your documentation separate from code, you can store it 
in regular markdown files. You can insert snippets of code inside your markdown 
using [regions][]. 

### See Symbol and Type Information

![TypeScript Logo](images/typescriptlang-icon.svg)
Unlike simpler documentation tools _LiTScript_ does not just parse documentation 
from comments. It uses the [TypeScript Compiler API][] to provide syntax 
highlighting, type information, and symbol links in outputted code blocks. 
Hover your mouse over the code snippet below to see these in action. 
<<r:Main program>>

### Add Dynamic Code

Your documentation need not to be just static. _LiTScript_ makes it easy
to run your TypeScript code in the browser. You can insert dynamic parts called
[visualizers][] anywhere in the documentation. They are run automatically when 
the page loads, and they can add new elements to the DOM. The animation you see 
above is implemented as a visualizer.


### Deploy with Ease

![LeSS Logo](images/webpack.svg =120x120)
Deploying multiple TypeScript modules and style sheets to a web site can be a 
complicated task. _LiTScript_ uses [Webpack][] internally to compile all the 
required _JS_ and _CSS_ files into few optimized bundles without any 
additional configuration. This makes generated web sites fast and easy to 
deploy.

### Run Automatically

[![VSCode Logo](images/Visual_Studio_Code_1.18_icon.svg =128x128)][VSCode]
To make your feedback loop really short, start _LiTScript_ in [watch mode][]. 
It runs in the background and regenerates the documentation as soon as any 
source file changes. Combining watch mode with a local web server with 
[automatic reloading][] makes the whole development process more rewarding and 
enjoyable.   

### Customize Visual Appearance

[![LeSS Logo](images/LESS_Logo.svg =120x54)][LeSS]
You can customize many aspects of the documentation look & feel with the theming 
support. Colors, fonts, margins, spacings, layout and more can be changed easily
with simple settings. As a bonus, there are four different syntax highlighting
schemes to choose from.

### Do Math

One annoying limitation of both markdown and HTML is that mathematical equations 
are not supported out-of-the-box. _LiTScript_ enables math support by utilizing 
the [${\KaTeX}$][KaTeX] library. With that you can write equations such as this:

$$x = { -b \pm \sqrt{b^2 - 4ac} \over 2a }$$

### Organize and Visualize Your Code

_LiTScript_ helps understanding the project structure by maintaining 
[table of contents][] and [dependency graph][]. These are JSON files which
contain your documentation structure and module dependency information. They
are displayed in the documentation making navigating the code easier, and 
helping to see the "big picture".

### And Much More...

There are numerous other features that you can discover by browsing the 
documentation. 

</div>
<div class="info-box">

## Getting Started

### Installing

You can install _LiTScript_ from [NPM][].
```powershell
> npm install --save-dev litscript
```
This will install command line tool called `lits`. 

### Configuring

You can scaffold an existing project to use _LiTScript_ by `cd`ing to the 
project directory and then running command:
```powershell
> lits init
```
_LiTScript_ will ask a series of questions about your project and documentation
settings and create a `litsconfig.json` file based on them. If it finds a 
`.vscode` directory under your project folder, it can add references to JSON
schemas used by _LiTScript_ into your `settings.json` file.

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

### Running

You can run _LiTScript_ either manually by executing command
```powershell
> lits
```
or automatically each time a source file changes using
```powershell
> lits --watch
```
If you opted to add scripts in `package.json`   then you can also run _LiTScript_
with `npm`, or from VS Code menu.

![NMP script](images/npm-scripts.png =200x140)
```powershell
> npm run lits
```
or
```powershell
> npm run lits-watch
```

### Publishing

![GitHub Pages](images/github-pages.png =200x182)
Another good practice is to output the documentation to the `docs` folder under
your project folder. If your project lives in GitHub, you can publish your
documentation simply by choosing _master branch/docs folder_ as the source for 
your [GitHub Pages][] site. You can find this option under project settings in 
GitHub.

</div>
<div class="info-box">

## Contributing

Feedback and contributions are welcome. Register an [issue][] in GitHub, if
you found a bug or have a feature request.
</div>
</div>

<div class="info-menu">
</div>
</div>

[literate programming]: https://en.wikipedia.org/wiki/Literate_programming
[TypeScript]: http://www.typescriptlang.org
[markdown]: https://commonmark.org/
[wiki]: https://guides.github.com/features/wikis/
[GitHub]: https://github.com/johtela/litscript
[TypeScript Compiler API]: https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
[regions]: src/region.html
[visualizers]: src/visualizer.html
[Webpack]: https://webpack.js.org/
[VSCode]: https://code.visualstudio.com/
[watch mode]: src/config.html#watch-mode
[automatic reloading]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
[LeSS]: http://lesscss.org/
[KaTeX]: https://katex.org/
[table of contents]: src/config.html#toc-file
[dependency graph]: src/dependency-graph.html
[NPM]: https://npmjs.com
[GitHub Pages]: https://pages.github.com/
[issue]: https://github.com/johtela/litscript/issues