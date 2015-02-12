module.exports = function() {
  this.loadTasks("build/tasks");
  return this.registerTask("default", ["libsass", "cssmin", "clean", "dustjs:compile", "connect", "watch"]);
};
