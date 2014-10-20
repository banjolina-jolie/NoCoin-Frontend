module.exports = ->
    @loadNpmTasks "grunt-contrib-watch"

    @config "watch"
        options:
            livereload: true
        files: ["**/*.js", "**/*.dust"]
        tasks: ["dustjs:compile", "server"]