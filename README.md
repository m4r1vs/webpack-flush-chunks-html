<h1 align="center">
  Webpack Flush Chunks HTML 🚽
</h1>
<div align="center">
	<a href="https://www.npmjs.com/package/webpack-flush-chunks-html">
		<img src="https://img.shields.io/npm/v/webpack-flush-chunks-html.svg?style=for-the-badge" alt="version" />
	</a>
	<a href="https://www.npmjs.com/package/webpack-flush-chunks-html">
		<img src="https://img.shields.io/npm/dm/webpack-flush-chunks-html.svg?style=for-the-badge" alt="version" />
	</a>
	<a href="https://oss.ninja/mit/m4r1vs">
		<img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" />
	</a><br />
  <strong>This plugin for webpack gets all bundled CSS chunks and injects them globally into <code>window.__CSS_CHUNKS__</code> for <a href="https://www.npmjs.com/package/babel-plugin-dual-import"><code>babel-plugin-dual-import</code></a> to be read:</strong>
</div>
<div align="center">
  <sub>&lt;coded/&gt; with ❤︎ and ☕ by <a href="https://niveri.me">Marius Niveri</a><br />
</div>
<br />
<br />

## Getting started 🚀
```sh
# install via npm:
npm i webpack-flush-chunks-html --save-dev
# or use yarn:
yarn add webpack-flush-chunks-html -D
```
```javascript
const WebpackFlushChunksPlugin = require('webpack-flush-chunks-html')

plugins: [
	new WebpackFlushChunksPlugin({
		/* options (see below) */
	})
]
```

## Options 🔧
You can pass following options to the plugin:

- `extensions`: The file extensions to be included (default: `['css']`).
- `excludedChunks`: chunks to be excluded (default: `['main'])`.
- `variable`: In case you want to append the files to a different variable (default: `__CSS_CHUNKS__`).
- `inject`: `'head' | 'body'` Where to inject the `<script></script>` in the html (default: `body`).
- `log`: `true | false` if `true` errors and information will be logged (default: `false`).