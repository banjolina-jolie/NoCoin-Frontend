module.exports = ->
  @loadNpmTasks "grunt-contrib-cssmin"

  # Minify the distribution CSS.
  @config "cssmin",
    release:
      files:
        "compiled_styles.css": ["temp_styles/*.css"]
