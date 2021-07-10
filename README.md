# Array1.js
This repo contains a single, groundbreaking, language-altering change: an array (and string) with one-based indexing.

## You're crazy, everyone uses zero-based indexes; why would you do this?
Okay, okay, just hang on; there are method()s to my madness (sorry not sorry). I've always had these little mental struggles when it comes to counting and numbering things (with a zero-based mindset, that is). For example, a few days prior to writing this, I was trying to explain zero-based indexing to a friend, and realized very quickly there was a problem. I was talking about how "storing Sheep objects" in an array would work, which became confusing since you normally do not count sheep starting from zero. I then drew a(n imaginary) graph, and explained how when you count, you start from zero, which led me to say "maybe it's just implied that you always start with zero sheep".

If you think about this... _Really think about what you're meaning..._ You'll notice something is off. I tried doing some research, and found [this article](https://hisham.hm/2021/01/18/again-on-0-based-vs-1-based-indexing/), which taught me an extremely valuable concept: zero-based indexing, historically, assumes that "indexes" and "offets" are equal and interchangable ideas. Which they shouldn't be.

### Explain...
Before I explain, I'd just like to warn all the non-CS-nerds that this section is a bit technical (albeit a brief overview). If you value the life of your brain cells, you might want to consider skipping to the next section. For the rest of you, here's the reasoning:

### --NERDS ONLY--

"Indexes" and "offsets" were traditionally treated as the same thing. In reality, they are not "the same thing". Originally, languages like C implemented arrays as "offets from a pointer", which makes sense due to their low-level nature. If I wanted the `n`th item of an array, I would perform an operation like `arrayPtr + n * dataTypeLengthInBytes`. However, mathematicians (and therefore programmers) like to get lazy in how they write things. Because of this, a commonly-used piece of [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) was implemented: the `arrayPtr[n]` syntax. This is the origin of the indexing problem.

As the [previously cited article](https://hisham.hm/2021/01/18/again-on-0-based-vs-1-based-indexing/) explains, many languages adopted this tradition. Offsets always start at zero, and arrays are technically just origins for offsets. But I ask this question: Why do high-level programming languages (like Python, JavaScript, etc.) still use this tradition when they don't provide any other interfaces for the idea of "pointers"? (Yes, `Object` references are implemented using pointers, but there is still a lack of access to the original pointer itself.) JavaScript especially has some answering to do, since the whole language is built on the idea of "objects" and "prototypes". `Object`s are groups of key-value pairs, or in other words, _index-element_ pairs. The `[]` operator, even in low-level languages like C, is (or should be) the "indexing" operator, not the "offsetting" operator. Without diving into the Chromium V8 engine or implementation details, there is not even a shadow of the idea of "adding to offsets" in plain JavaScript syntax... aside from `array[0]`.

All of this is the motivation for making this library, and with it a minor statement on how programming languages should strive to have meaningful syntax. Having such leads to simpler and easier-to-understand code, which I assume everyone here wants.

## Why care so much? Can't you just use `for...of` loops or offset the index?
Yes, one could use iterators for arrays and yes, you could just offset for zero-based indexing. The problem with `for...of` loops is that iterators can be expensive sometimes (check out [this post](https://stackoverflow.com/questions/5349425/whats-the-fastest-way-to-loop-through-an-array-in-javascript)). While they do convey meaning very well, sometimes using a regular `for` loop for the performance boost is worth it (ie `for (let i = ...)` is faster than `for...of` for arrays). And why not just offset for the zero-based tendencies of JS? Because writing a useful library as an excuse to complain is fun. (And also because `array[i-1]` is messy and unnecessarily verbose code. Ew.)

## Okay, you convinced me... What does Array1.js do?
Hah hah! Oh wait... You're serious?

### Well, you never explained the library
It provides an `Array1` class that creates arrays with one-based indexes. Aside from it's sibling `String1` which does the same thing for strings, that's pretty much it.

### It doesn't do anything more than that?
Not really. Unless you want to troll your friends. If you do, call `Array1.replaceBuiltins()` to replace the builtin `Array`/`String` functionality with what this library offers. (Use at your own risk; this tends to break libraries that assume `Array`s indexes start at zero.)

### So, I can use it just like an array?
Pretty much. Some methods have changed slightly (mostly `slice()`), but you access items just like an array, using `[]`. If you're _really_ curious about more details, you can keep reading in the [Implementation Details](#implementation-details) section.

### What changes were made?
The biggest change you will find among the library is the notion of "index ranges" being treated as inclusive on both ends. This applies to methods like `slice()` and `substring()`. For example, `[1, 2, 3, 4, 5].slice(2, 4)` will return `[2, 3, 4]`. And if you think that's weird, just remember the only reason it feels any different was because of what was already said above. ;)

This does not affect methods that use lengths/offsets to determine ranges, like `splice()` or `substr()`. (Yes, you read it right; `substring()` is changed, and `substr()` is not; read about [the confusion here](https://stackoverflow.com/questions/3745515/what-is-the-difference-between-substr-and-substring).)

## Implementation Details (for completionists)
// TODO

