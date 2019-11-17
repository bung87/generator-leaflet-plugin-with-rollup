# <%= name %>

> <%= description %>

background details relevant to understanding what this module does

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install <%= name %>
```

or [yarn](https://www.yarnpkg.com/) installed, run

```
$ yarn add <%= name %>
```

If you don't use a package manager, simply download a file from the dist/ folder and include it in your application.

## Usage

```js
const <%= mainClass %> = require('<%= name %>').default

```

## Options  

| Option                   | Type     | Default        | Description                                                                        |
| ------------------------ | -------- | -------------- | ---------------------------------------------------------------------------------- |
|                |    |       |      |

## API

there's no one style for expressing a node api, but here are some common
patterns with explanations:

### var r = repo(name, opts={})

Produces a new REPO with name `name`. Valid `opts` keys include

- `db` (required) - uses the levelup instance `db`
- `count` (optional) - does the thing `count` times

> Shows how to create an instance of an object. `opts` is indicated to be the
> empty object by default, and its required and optional parameters are
> detailed.

### r.work(hard, cb(err, res))

Puts `r` to work. If `hard` is `true`, it'll even work pretty hard at it. `cb`
will be called with the result of the work.

> A method on the object. More importantly the indicator that it accepts a
> callback function (`cb` or `callback` are both popular names). The callback's
> parameters are named in `work`'s signature.

### r.pipe(stream), stream.pipe(r)

`r` implements a readable stream or writeable stream, respectively.

> `r` inherits `Readable` or `Writeable`, or both.

### r.on('foo', cb(bar))

`r` can raise an event named `'foo'` with the argument `bar`.

> `r` is an EventEmitter, and is known to emit an event with the given name. The
> callback that is ultimately called has the expected parameter `bar`.


## Acknowledgments

<%= name %> was inspired by..

## See Also

- ...

## License

<%= license %>

