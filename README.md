# generator-leaflet-plugin-with-rollup [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> generator leaflet plugin with rollup

## Installation

First, install [Yeoman](http://yeoman.io) and generator-leaflet-plugin-with-rollup using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-leaflet-plugin-with-rollup
```
## Usage  

```bash
yo leaflet-plugin-with-rollup
```

That'll generate a project with all the common tools setup. This includes:  

provided by [generator-node](https://github.com/yeoman/generator-node)
- Filled `package.json` file
- [jest](https://facebook.github.io/jest/) unit test and code coverage (optionally tracked on [Coveralls](https://coveralls.io/))
- [ESLint](http://eslint.org/) linting and code style checking
- [Travis CI](https://travis-ci.com/) continuous integration (optional)
- [License](https://spdx.org/licenses/)

provided by this project  

- [Parcel](https://parceljs.org/) develop and distribute examples
- [Rollup](https://rollupjs.org) distribute your plugin as umd,cjs,ejs module  
   with babel,node-sass,postcss,postcss-sprites supported
- [gh-pages](https://github.com/tschaub/gh-pages) release your plugin examples pages to ghpages

### Running tests

Once the project is scaffolded, inside the project folder run:

```
$ npm test
```

You can also directly use jest to run test on single files:

```
$ npm -g install jest-cli
$ jest --watch
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## Acknowledgments

generator-leaflet-plugin-with-rollup was inspired by [generator-node](https://github.com/yeoman/generator-node)

## License

MIT © [bung](http://www.bungos.me)


[npm-image]: https://badge.fury.io/js/generator-leaflet-plugin-with-rollup.svg
[npm-url]: https://npmjs.org/package/generator-leaflet-plugin-with-rollup
[travis-image]: https://travis-ci.com/bung87/generator-leaflet-plugin-with-rollup.svg?branch=master
[travis-url]: https://travis-ci.com/bung87/generator-leaflet-plugin-with-rollup
[daviddm-image]: https://david-dm.org/bung87/generator-leaflet-plugin-with-rollup.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/bung87/generator-leaflet-plugin-with-rollup
