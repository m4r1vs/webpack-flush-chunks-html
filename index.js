/**
 * Init function
 * @param {Object} options pass options to the plugin
 */
function FlushChunksWebpackPlugin(options = {}) {
    this.options = {
        extensions: options.extensions || ['css'],
        excludedChunks: options.excludedChunks || ['main'],
        variable: options.variable || '__CSS_CHUNKS__',
        inject: options.inject || 'body',
        log: options.log || false,
        warn: options.warn || true
    }
}

function formatFile(file){
    return file.replace(/[^:]\/{2,}/g,'/')
}

FlushChunksWebpackPlugin.prototype.apply = function (compiler) {

    let fileList = []

    /**
     * Log to console if options.log === true
     * @param {*} log what to log
     */
    const logger = log => {
        if (this.options.log) console.log('[FLUSH-WEBPACK-HTML] log: ', log)
    }

    /**
     * Warn to the console if options.warn === true
     * @param {*} warning what to warn about
     */
    const logWarning = warning => {
        if (this.options.warn) console.warn(`[FLUSH-WEBPACK-HTML] warning: `, warning)
    }

    compiler.plugin('compilation', compilation => {

        const publicPath = compilation.outputOptions.publicPath
        /**
         * Check if chunk should be included and get all files matching options.extensions
         * @param {Object} chunk chunk to be checked
         */
        const checkChunk = chunk => {
            if (!this.options.excludedChunks.includes(chunk.name)) {
                chunk.files.forEach(file => {
                    if (this.options.extensions.includes(file.split('.').pop())) {
                        fileList.push(`"${chunk.name}": "${formatFile(`${publicPath}/${file}`)}"`)
                        logger(`added file "${file}" from "${chunk.name}" to file list`)
                    } else logger(`skipped file "${file}" from "${chunk.name}" because "${file.split('.').pop()}" is not part of options.extensions`)
                })
            } else logger(`skipped chunk "${chunk.name}" because it matches options.excludedChunks`)
        }


        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, next) => {

            // loop through all chunks
            compilation.chunks.forEach(checkChunk)

            // JS to be injected
            const output = `<script>
				window.${this.options.variable} = {
					${fileList}
				}
				</script>`
                .replace(/\r?\n|\r/g, '')
                .replace(/\t/g, '')
                .replace(/ /g, '')

            // check if options.inject is good:
            if (this.options.inject !== ('body' || 'head')) logWarning(`options.inject is "${this.options.inject}" which is neither "body" nor "head", hope you know what you are doing. (Switch options.warn to false to hide this message)`)

            // inject JS
            htmlPluginData.html = htmlPluginData.html.replace(`</${this.options.inject}>`, output + `</${this.options.inject}>`)
            next(null, htmlPluginData)
        })
    })
}

module.exports = FlushChunksWebpackPlugin
