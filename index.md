---
{ 
    "pageTemplate": "landing", 
    "useMath": true,
    "modules": [
        "./src/extras/file-anim"
    ]
}
---
<section>
<img src="images/bulb.svg" />

# LiTScript

* Literate 
* Interactive 
* TypeScript

_Document your frontend projects while you are developing them._

<a href="introduction.html">Learn more »</a>
</section>

<section>

## Different Kind of Web Builder

<a href="https://en.wikipedia.org/wiki/Donald_Knuth">
    <img src="images/knuth-tshirt-show.jpg"/>
</a>

_LiTScript_ is a web toolkit inspired by [literate programming][]. It can create 
both static and dynamic sites, although it mainly functions as static site 
generator and build tool.

In addition to building your web site or frontend library _LiTScript_ produces 
also developer documentation. The fundamental idea of literate programming is
that you you document your code as you're writing it. _LiTScript_ then generates 
live technical documentation for your project.

This web site is generated from the [source][] of the _LiTScript_ project. It 
showcases what you can build with it.

</section>
<section>

## What's New in Version 2

Version 2 brings some major changes to _LiTScript_:

 *  Templates no longer live in external libraries. You can put your own 
    templates directy inside your project under the `site` directory. It's still 
    possible customize the default templates, but creating your own page layouts
    is now easier.

 *  External dependencies have been reduced to bare minimum. Most notably, 
    styles are defined in vanilla CSS now instead of [Less][]. There is little 
    need for CSS preprocessor nowadays as web standards include most of the 
    needed features.

 *  The bundler has been changed from [Webpack][] to [esbuild][]. This further
    reduces the number of dependencies and greatly improves bundling speed. 
    Also TypeScript compilation performance is improved.

 *  Visualizer functionality is removed. Flip few pages forward to see how 
    dynamic content can be added to _LiTScript_.

</section>
<section>

## How Does It Work?

The animation below illustrates the basic operation of _LiTScript_.

<file-anim />

</section>
<section>

## Get Content from Any Source File

_LiTScript_ can extract documentation from any kind of source file: _TS_, _JS_, 
_CSS_, _LeSS_, _SCSS_, etc. Just write your documentation in [markdown][] inside 
[JSDoc][] comments `/** ... */` and it will be processed by _LiTScript_.

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
```
You can also write your content as regular markdown files and insert snippets of 
code in them using [regions][]. 

</section>
<section>

## See Symbol and Type Information

![TypeScript Logo](images/typescriptlang-icon.svg)
Unlike simpler documentation tools _LiTScript_ does not just parse documentation 
from comments. It uses the [TypeScript Compiler API][] to provide syntax 
highlighting, type information, and symbol links. Move your mouse over the code 
snippet below to see these in action. 

<<r:Main program>>

</section>
<section>

## Add Dynamic Content

Since _LiTScript_ produces plain HTML you can use whatever frontend framework 
you like to add dynamic content. The simplest option is to create standard 
[web components][] that can be inserted anywhere in markdown.

The animation few pages back is implemented as a web component that you can 
embed in markdown like this:
```markdown
## How Does It Work?

The animation below illustrates the basic operation 
of _LiTScript_.

<file-anim />
```

_LiTScript_ provides a simple base class for [custom elements][] that you can
use as starting point for your own web components. It handles attaching shadow
DOM and loading component's styles.

</section>
<section>

## Bundle Your Code

![LeSS Logo](images/esbuild.svg)
There are multitude of build tools available with various front multiple TypeScript modules and style sheets to a web site can be a 
complicated task. _LiTScript_ uses [Webpack][] internally to compile all the 
required _JS_ and _CSS_ files into few optimized bundles without any 
additional configuration. This makes generated web sites fast and easy to 
deploy.

</section>
<section>

## Edit & Run

[![VSCode Logo](images/Visual_Studio_Code_1.18_icon.svg =128x128)][VSCode]
To make your feedback loop really short, start _LiTScript_ in [watch mode][]. 
It runs in the background and regenerates the documentation as soon as any 
source file changes. Combining watch mode with a local web server with 
[automatic reloading][] makes the whole development process more rewarding and 
enjoyable.   

If you are using [VSCode][] as your editor, you can install 
[syntax highlighting][] of _LiTScript_ comments.

</section>
<section>

## Customize Visual Appearance

[![LeSS Logo](images/LESS_Logo.svg =120x54)][LeSS]
You can customize many aspects of the documentation look & feel with the 
[theming support][]. Colors, fonts, margins, spacings, layout and more can be 
changed easily with simple settings. As a bonus, there are four different 
syntax highlighting schemes to choose from.

</section>
<section>

## Do Math

One annoying limitation of both markdown and HTML is that mathematical equations 
are not supported out-of-the-box. _LiTScript_ enables math support by utilizing 
the [${\KaTeX}$][KaTeX] library. With that you can write equations such as this:

$$x = { -b \pm \sqrt{b^2 - 4ac} \over 2a }$$

</section>
<section>

## Organize and Visualize Your Code

_LiTScript_ helps understanding the project structure by maintaining 
[table of contents][] and [dependency graph][]. These are JSON files which
contain your documentation structure and module dependency information. They
are displayed in the documentation making navigating the code easier, and 
helping to see the "big picture".

</section>
<section>

# 💡 Getting Started

</section>
<section>


## Installing

You can install _LiTScript_ from [npm][] as a global tool.
```powershell
> npm install --global litscript
```
This will add a new command line tool called `lits`. 

</section>
<section>

## Configuring

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

</section>
<section>

## Running

You can run _LiTScript_ either manually by executing command
```powershell
> lits
```
or automatically each time a source file changes using
```powershell
> lits --watch
```
If you opted to add scripts in `package.json` then you can also run _LiTScript_
with `npm`, or from VS Code menu.

```powershell
> npm run lits
```
or
```powershell
> npm run lits-watch
```

</section>
<section>

## Publishing

![GitHub Pages](images/github-pages.png)
Another good practice is to output the documentation to the `docs` folder under
your project folder. If your project lives in GitHub, you can publish your
documentation simply by choosing _master branch/docs folder_ as the source for 
your [GitHub Pages][] site. You can find this option under project settings in 
GitHub.

</section>
<section>

## Contributing

Feedback and contributions are welcome. Register an [issue][] in GitHub, if
you found a bug or have a feature request.

</section>

[literate programming]: https://en.wikipedia.org/wiki/Literate_programming
[TypeScript]: http://www.typescriptlang.org
[markdown]: https://commonmark.org/
[wiki]: https://guides.github.com/features/wikis/
[source]: https://github.com/johtela/litscript
[JSDoc]: https://en.wikipedia.org/wiki/JSDoc
[TypeScript Compiler API]: https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
[regions]: src/region.html
[web components]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[custom elements]: src/custom-elem.html
[Webpack]: https://webpack.js.org/
[esbuild]: https://esbuild.github.io/
[VSCode]: https://code.visualstudio.com/
[watch mode]: src/config.html#watch-mode
[automatic reloading]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
[theming support]: /lits-template/components/common/theme.html
[LeSS]: http://lesscss.org/
[KaTeX]: https://katex.org/
[table of contents]: src/config.html#toc-file
[dependency graph]: src/dependency-graph.html
[npm]: https://npmjs.com
[GitHub Pages]: https://pages.github.com/
[issue]: https://github.com/johtela/litscript/issues
[syntax highlighting]: https://marketplace.visualstudio.com/items?itemName=johtela.vscode-litscript-highlighting