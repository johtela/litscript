# Introduction and Motivation

> A novice asked the Master: "Here is a programmer that never designs, 
> documents or tests his programs. Yet all who know him consider him one of the 
> best programmers in the world. Why is this?"
>
> The Master replied: "That programmer has mastered the Tao. He has gone beyond 
> the need for design; he does not become angry when the system crashes, but 
> accepts the universe without concern. He has gone beyond the need for 
> documentation; he no longer cares if anyone else sees his code. He has gone 
> beyond the need for testing; each of his programs are perfect within 
> themselves, serene and elegant, their purpose self-evident. Truly, he has 
> entered the mystery of Tao."
> 
> [The Tao of Programming, 2.4](https://www.mit.edu/~xela/tao.html)

Modern web provides a rich medium for authoring and publishing technical 
documentation, but paradoxically writing documentation is among the least 
favourite activities for most developers. Not for acclaimed computer scientist 
[Donald Knuth][knuth], though. He has wrote numerous books and and articles and 
made many contributions to computer-aided documentation, mostly motivated by 
personal discontent with available tools and techniques.

[![](images/ArtOfComputerProgramming.jpg =133x187)][TAOCP]
When Knuth was finishing the second volume of his famous book series 
[The Art of Computer Programming][TAOCP], he was appalled by the quality of 
the draft prints he received from the publisher. For the first volume, 
typesetting was still done manually by professional layout designers. By
early 1970s the task was entrusted to a computer, which at that point was not
very good at it. Knuth went on to design [Metafont][] and [TeX][], which quickly 
surpassed other typesetting programs of the era, and became the _de facto_ 
standard for scientific publications.

While Knuth was writing Metafont and TeX, he found that keeping all the needed 
information in his head was getting harder as his programs grew more complex. 
Especially, after he had taken a break from progamming. So, he devised a method 
to make the job easier by writing programs in a piecewise manner and documenting 
each piece meticulously (using TeX, of course). He arranged these code snippets 
as if they were presented in a book. This way he could refresh his memory by 
reading the "book" from the beginning, and return to the point where he left 
off. He coined the term [literate programming][lp] to describe this methodology, 
and published another [book][] about the subject.

![](images/gandalf.gif =310x174)
All this might sound somewhat radical nowadays, but I bet all developers can 
relate to the problem. If you leave some code behind for a couple of weeks and 
then return to it, you likely spend long time figuring out what it was supposed 
to do. Even if you don't think documentation would help you with this issue, 
there are other reasons for writing it.

## Make a Virtue out of Necessity

Imagine that GitHub would contain just code without any documentation 
whatsoever. How useful would it be then? There is so much code available 
nowadays that nobody has time to browse through it when they have a problem 
to solve. Precise, up-to-date documentation is more important than ever. Yet,
the only documentation provided by most open source projects is a brief README. 
That's all.

As Knuth argues, there are real benefits _for you_ too for documenting your own 
code. Even though literate programming has not gained nearly as much 
[popularity][] as TeX, its main principle still makes a lot of sense: combining 
documentation with code. First, this makes maintaining documentation up-to-date 
less laborious. Second, seeing the documentation at all times reminds you about 
the goals and constraints of your programs making it easier to change them.

## Necessity Is the Mother of Invention

Like for Knuth, my motivation for writing LiTScript arose from personal need. 
I needed a tool to _easily_ create professional-looking web sites for my 
TypeScript projects. I wanted to provide documentation that would show my code
in the best possible light.

At the same time, I wanted to make writing and maintaining the documentation as 
convenient as possible. This is why I opted to store pieces of documentation
inside JSDoc comments. The benefit is that code can still be compiled normally 
without any preprocessing steps.

Understanding that not everybody wants to work like me, I also made it possible
to write documentation inside regular markdown files and insert pieces of code 
in them using [regions][]. I aimed at providing best of both worlds, and 
allowing for different documenting practices.

Then I just went to town and implemented a ton of features that I thought were
cool and/or useful. I tried to make the workflow pleasant as well. My own 
workflow relies on [VSCode][] with [Live Server][] plugin.

I already wrote a similar tool for C# called [LiterateCS][]. While working with
that, I found that documenting my code forced me to look at it critically, and 
pointed me at ways to reorganize it and make it clearer. This is a benefit of 
literate programming which is not obvious until you start practicing it.

## How LiTScript Compares to Other Literate Tools?

There are other tools in the JS realm that enable programming in literate style.
I'll highlight the differences to some of these tools below.

Nowadays, the most popular implementation of literate programming is a tool 
that extracts code blocks from markdown files and "tangles" them to compilable 
output. For JavaScipt, [literate programming][lpjs] is a representative of such 
tool. These tools are most faithful to the original LP implementation developed 
by Knuth.

The tradeoff they make, however, is that they render existing development tools
and IDEs useless. You miss out on all the nice features modern editors provide. 
You go basically back to editing plain text files. Also debugging becomes more 
difficult as you loose the connection to original source files. In LiTScript,
on the other hand, documentation is written in comments interleaving them with
code. So, we can use existing compilers, tools, and editors as normally.

Another perk that LiTScript provides is the possibility add dynamic content to
generated documentation. In that sense, it resembles "notebook" apps like
[Jupyter][] which allow writing code and documentation in an interactive way.
The difference is that LiTScript generates static HTML pages which can be
deployed anywhere. They work even when opened from a local disk, whereas 
notebooks require a host environment to be run. LiTScript is a command line 
tool, mainly aimed at generating project documentation, not a development 
environment designed for prototyping.

I would claim what LiTScript offers is quite unique. It was created to scratch 
my specific itch, but I hope others find it useful too.

[knuth]: https://en.wikipedia.org/wiki/Donald_Knuth
[TAOCP]: https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming
[Metafont]: https://en.wikipedia.org/wiki/Metafont
[TeX]: https://en.wikipedia.org/wiki/TeX
[lp]: https://en.wikipedia.org/wiki/Literate_programming
[book]: https://www-cs-faculty.stanford.edu/~knuth/lp.html
[popularity]: https://medium.com/@torazaburo/whither-literate-programming-2-what-went-wrong-e4a3d89af644
[regions]: src/region.html
[VSCode]: https://code.visualstudio.com/
[Live Server]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
[LiterateCS]: https://johtela.github.io/LiterateCS/
[lpjs]: https://github.com/jostylr/literate-programming
[Jupyter]: https://jupyter.org/