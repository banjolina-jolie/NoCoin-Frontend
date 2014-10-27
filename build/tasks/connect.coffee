config = require('../connect_config')

module.exports = ->
    @loadNpmTasks "grunt-contrib-connect"

    @config "connect"
        server:
            options:
                port: 8000
                hostname: '0.0.0.0'
                livereload: true
                # middleware: (connect)->
                #     return [
                #         require('connect-livereload')()
                #         config.pushStateHook('http://localhost:8000')
                #     ];
