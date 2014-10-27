module.exports = function() {
  this.loadTasks("build/tasks");
  this.registerTask("gnar", ["clean", "processhtml", "copy", "dustjs:compile", "cssmin", "styles"]);
  return this.registerTask("default", ["libsass", "cssmin", "clean", "dustjs:compile", "connect", "watch"]);
};