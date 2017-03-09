# pkgbuild

A dead-simple build-task runner inspired by [this](https://medium.com/@pakastin/you-might-not-need-a-build-tool-ac3c1a8cfaac#.99jr2lvrk) blog entry on Medium.

## Installation

```sh
npm install --save-dev pkgbuild
# or
yarn add --dev pkgbuild
```

## Use

Define scripts in your package.json, with the script-names prefixed with either `pkg://...` or `pkg*://`:

```json
...
"scripts": {
	"pkg://main": "babel -d lib/ src/",
	"pkg*://main": "babel -w -d lib/ src/"
}
...
```

Depending on whether you pass the `-w/--watch` option into pkgbuild, pkgbuild will run either

1. the tasks prefixed with `pkg://...` (if the `-w/--watch` option was omitted), or
2. `pkg*://...` (if the `-w/--watch` option was included)

Now you can run the following command in your shell:

```sh
$ ./node_modules/.bin/pkgbuild
# or
$ yarn run pkgbuild
```

That's it!

## License

Copyright 2017 Jonathan Apodaca <jrapodaca@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
