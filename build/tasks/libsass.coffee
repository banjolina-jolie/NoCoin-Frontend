module.exports = ->
    @loadNpmTasks "grunt-libsass"

    @config "libsass"
        options:
            loadPath: ['compiled_styles.css']
        files:
            expand: true,
            cwd: 'app/styles',
            src: ['**/*.scss'],
            dest: 'temp_styles',
            ext: '.css'
