# metalsmith-assets-2

  Include static assets in your Metalsmith build

## Installation

    $ npm install metalsmith-assets-2

## CLI Usage

Install via npm and then add the `metalsmith-assets-2` key to your `metalsmith.json` plugins with a source and destination directory, like so:

```json
{
  "plugins": {
    "metalsmith-assets-2": {
      "source": "./assets",
      "destination": "./assets"
    }
  }
}
```

* `source` defaults to `'./public'`
* `destination` defaults to `'.'`

## JavaScript Usage

  Pass `options` to the assets plugin and pass it to Metalsmith with the `use` method:

```js
var assets = require('metalsmith-assets-2');

metalsmith.use(assets({
  source: './assets', // relative to the working directory
  destination: './assets' // relative to the build directory
}));
```

## License

  MIT
