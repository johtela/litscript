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

# LiTScript
<img src="images/bulb.svg" />

* Literate 
* Interactive 
* TypeScript

_Document your frontend projects while you are developing them._

<a class="strip" href="introduction.html">Learn more »</a>
</section>
<section>

## Different Kind of Web Builder

<a href="https://en.wikipedia.org/wiki/Donald_Knuth">
    <img src="images/knuth-tshirt-show.jpg"/>
</a>

_LiTScript_ is a web toolkit inspired by [literate programming][]. It can
be used as documentation tool, or as a full-fledged build tool/bundler for 
your web applications. 

The fundamental idea of literate programming is that your code and documentation
live together. _LiTScript_ compiles your code and, at the same time, extracts 
documentation from it. Typically the output is a static web site, but you can 
also produce plain markdown files.

This web site is generated from the [source][] of the _LiTScript_ project. It 
showcases what you can do with it.

</section>
<section>

## What's New in Version 2

Version 2 brings some major changes to _LiTScript_:

 *  Templates no longer live in external libraries. You can now create your 
    templates directy inside your project.

 *  External dependencies have been reduced to bare minimum. Most notably, 
    styles are defined in vanilla CSS now instead of [Less][]. CSS is powerful 
    enough nowadays to eliminate the need of preprocessor. 

 *  The bundler has been changed from [Webpack][] to [esbuild][]. This further
    reduces the number of dependencies and improves performance.

 *  Visualizer functionality is removed. Flip forward few pages to see how 
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

</section>
<section>

## See Symbol and Type Information

![TypeScript Logo](images/typescriptlang-icon.svg)
Unlike simpler documentation tools _LiTScript_ does not just parse documentation 
from comments. It uses the [TypeScript Compiler API][] to provide syntax 
highlighting, type information, and symbol links. Move your mouse over the code 
snippet on the next page to see these in action. 

You can use TypeScript [regions][] to insert code snippets in regular markdown 
files. The code fragment on the next page is defined inside region, which allows 
us to embed it here.

</section>
<section>

## Example Output

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
There are multitude of build tools for JS and CSS realm nowadays. Previously
_LiTScript_ used [Webpack][] to bundle TypeScript modules and style sheets into 
single JS and CSS files. In version 2 _LiTScript_ switched to [esbuild][] which
is a more compact and performant bundler library.

_esbuild_ contains out-of-the-box all the functionality that previously required 
additional Webpack plug-ins. With the switch, we reduced the number of NPM 
dependencies drastically. Another upshot is that bundling completes much faster 
than before.

</section>
<section>

## Editing & Running

[![VSCode Logo](images/Visual_Studio_Code_1.18_icon.svg)][VSCode]
When you want to immediately see the effect of your edits, run  _LiTScript_ in 
[watch mode][]. In this mode, _LiTScript_ runs in the background and rebuilds
your web site as soon as any source file changes. 

There is no need to use [Live Server][] plug-in for [VSCode][] anymore. Version 
2 includes the [serve mode][] which starts a development web server and live 
reloads changed pages automatically.

But if you are using VSCode as your editor, you can still install 
[syntax highlighting][] for _LiTScript_ comments.

</section>
<section>

## Customize Default Templates

[![CSS3 Logo](images/css3-logo.svg)][CSS]
You can customize many aspects of the default templates with 
[theming support][]. Colors, fonts, margins, spacings, and more can be changed 
easily with [CSS variables][]. As a bonus, there are four different syntax 
highlighting schemes and a dozen different color themes that users can choose 
from. You can also add your own themes easily.

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

## Contributing
<img src="images/bulb.svg" />

Feedback and contributions are welcome. Register an [issue][] in GitHub, if
you found a bug or have a feature request.

<a class="strip" href="getting-started.html">Get started »</a>
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
[serve mode]: src/config.html#serve-mode
[Live Server]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
[theming support]: /site/styles/theme.html
[LeSS]: http://lesscss.org/
[CSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[CSS variables]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[KaTeX]: https://katex.org/
[table of contents]: src/config.html#toc-file
[dependency graph]: src/dependency-graph.html
[issue]: https://github.com/johtela/litscript/issues
[syntax highlighting]: https://marketplace.visualstudio.com/items?itemName=johtela.vscode-litscript-highlighting