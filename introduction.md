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
Donald Knuth, though. He has wrote numerous books and and articles and made many 
contributions to computer-aided documentation, mostly motivated by personal 
discontent of available tools and techniques.

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
off.

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

Like for Knuth, my motivation for writing LiTScript arose from a personal need. 
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

## Is LiTScript for You?

I am pretty happy about how LiTScript turned out, so I hope it could be useful 
for other developers in need of a documentation solution. Before you decide if 
the tool has value to you, please browse through the documentation to see all 
the things you can do with it.

Have fun!

[TAOCP]: https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming
[Metafont]: https://en.wikipedia.org/wiki/Metafont
[TeX]: https://en.wikipedia.org/wiki/TeX
[popularity]: https://medium.com/@torazaburo/whither-literate-programming-2-what-went-wrong-e4a3d89af644
[regions]: src/region.html
[VSCode]: https://code.visualstudio.com/
[Live Server]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
[LiterateCS]: https://johtela.github.io/LiterateCS/
