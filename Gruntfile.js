module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      test: {
        files: ['tests/**/*.js', 'index.sjs', '!**/*.built.js'],
        tasks: ['sweetjs:tests', 'mochaTest:test']
      }
    },
    mochaTest: {
      test: {
        src: ['tests/**/*.built.js']
      }
    },
    sweetjs: {
      options: {
        modules: ['./index.sjs']
      },
      tests: {
        src: ['tests/**/*.js', '!tests/**/*.built.js']
      }
    }
  });
  grunt.registerTask("test", [
    "sweetjs:tests",
    "mochaTest"
  ]);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-sweet.js');
}
