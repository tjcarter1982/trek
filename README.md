# trek

Next generation full-stack JavaScript open source solution, based on [Koa][].

  [![NPM version][npm-img]][npm-url]
  [![Build status][travis-img]][travis-url]
  [![Test coverage][coveralls-img]][coveralls-url]
  [![License][license-img]][license-url]
  [![Dependency status][david-img]][david-url]

```js
import Trek from 'trek';

var app = new Trek;

app.get('/', function* (next) {
  this.body = 'Hello World';
});

app.listen(3000);
```

## Installation

```bash
$ npm i trek
```

OR use **[trek-cli][]** to generate a trek app.

```bash
$ npm i trek-cli -g
$ trek new trekapp
$ cd trekapp
$ npm i && npm start
```

## Features

  * Use [Babel][] for writing next generation JavaScript, **ES6+**
  * Work with [io.js][] and [Node.js v0.12][]
  * MVC
  * Load configurations & environment variables(.env) automagically

## Quick Start

## License

  [MIT](LICENSE)

[trek]: http://trekjs.com/
[trek-cli]: https://github.com/trekjs/trek-cli
[Koa]: http://koajs.com/
[Babel]: https://babeljs.io/
[io.js]: https://iojs.org/
[Node.js v0.12]: https://nodejs.org/

[npm-img]: https://img.shields.io/npm/v/trek.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trek
[travis-img]: https://img.shields.io/travis/trekjs/trek.svg?style=flat-square
[travis-url]: https://travis-ci.org/trekjs/trek
[coveralls-img]: https://img.shields.io/coveralls/trekjs/trek.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/trekjs/trek?branch=master
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[david-img]: https://img.shields.io/david/trekjs/trek.svg?style=flat-square
[david-url]: https://david-dm.org/trekjs/trek