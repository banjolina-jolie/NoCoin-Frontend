module.exports = ->

  # Load task configurations.
  @loadTasks "build/tasks"

  # When running the default Grunt command, just lint the code.
  @registerTask "gnar", [
    "clean"
    "processhtml"
    "copy"
    "dustjs:compile"
    "cssmin"
    "styles"
  ]

  @registerTask "default", [
    "dustjs:compile"
    "server"
    # "connect"
    # "watch"
  ]