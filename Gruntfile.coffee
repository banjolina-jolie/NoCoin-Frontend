module.exports = ->

  # Load task configurations.
  @loadTasks "build/tasks"

  # Run JSHint and a quick test.
  @registerTask "test", [
    "jshint"
    "karma:run"
  ]

  # When running the default Grunt command, just lint the code.
  @registerTask "gnar", [
    "clean"
    "jshint"
    # "karma:run"
    "processhtml"
    "copy"
    "requirejs"
    "dustjs:compile"
    "styles"
    "cssmin"
  ]

  @registerTask "default", [
    "dustjs:compile"
    # "connect"
    # "watch"
    "server"
  ]