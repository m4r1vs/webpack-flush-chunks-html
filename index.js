const path = require('path')
const fs = require('fs')

function FlushChunksWebpackPlugin(options = {}) {
	this.options = options
}

FlushChunksWebpackPlugin.prototype.apply = function (compiler) {

	let fileList = []

	const checkChunk = chunk => {
		chunk.files.forEach(file => {
			if (file.split('.').pop() === 'css') {
				fileList.push(`"${chunk.name}": "/${file}"`)
			}
		})
	}

	compiler.plugin('compilation', compilation => {
		compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, next) => {
			compilation.chunks.forEach(checkChunk)
			const output = `<script>
				window.__CSS_CHUNKS__ = {
					${fileList}
				}
				</script>`.replace(/\r?\n|\r/g, '').replace(/\t/g, '').replace(/ /g, '')
			htmlPluginData.html = htmlPluginData.html.replace('</body>', output + '</body>')
			next(null, htmlPluginData)
		})
	})
}

module.exports = FlushChunksWebpackPlugin
