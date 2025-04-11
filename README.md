
# [![](docs/images/favicon.png)LiTScript](https://johtela.github.io/litscript)

* Literate 
* Interactive 
* TypeScript

## What Is It?

LiTScript is a tool for generating documentation from [TypeScript][] projects. 
Inspired by [literate programming][], it creates interactive websites to 
document your code.

## Documentation

See the project's web site for more information. All the info you need is
there.

**<https://johtela.github.io/litscript>**

## Version 1.2

Version 1.2 refreshes the dependencies to latest (stable) releases of all
NPM packages. It should get rid of all the security warnigs, and be fully 
compatible with version 1.1. If you encounter any issues, please report them.

## Migrating to Version 2.0

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

[literate programming]: https://en.wikipedia.org/wiki/Literate_programming
[TypeScript]: http://www.typescriptlang.org
[markdown]: https://commonmark.org/
[wiki]: https://guides.github.com/features/wikis/
[LeSS]: http://lesscss.org/
[CSS variables]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[theming]: https://johtela.github.io/litscript/site/styles/theme.html
[web components]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[custom elements]: https://johtela.github.io/litscript/src/custom-elem.html
[templates]: https://johtela.github.io/litscript/src/templates/template.html