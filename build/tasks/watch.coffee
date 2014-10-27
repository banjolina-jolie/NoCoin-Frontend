module.exports = ->
    @loadNpmTasks "grunt-contrib-watch"

    @config "watch"
        files: ["app/**/*.js", "app/dusts/**/*.dust", "app/styles/**/*.scss"]
        tasks: ["libsass", "cssmin", "clean", "dustjs:compile"]
        # tasks: ["default']
        options:
            livereload: true
