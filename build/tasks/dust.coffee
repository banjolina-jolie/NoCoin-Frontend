module.exports = ->
    @loadNpmTasks "grunt-dustjs"

    @config "dustjs"
        compile:
            files:
                'dusts.js': ['app/dusts/{,*/}*.dust']
