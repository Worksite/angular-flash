module.exports = function (grunt) {
    'use strict';

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/unit/*.js']
            },
            grunt: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['Gruntfile.js']
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                singleRun: true
            },
            phantom: {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            debug: {
                singleRun: false
            }
        },
        concat: {
            options: {
                banner: ['/**! ',
                         ' * @license <%= pkg.name %> v<%= pkg.version %>',
                         ' * Copyright (c) 2013 <%= pkg.author.name %>. <%= pkg.homepage %>',
                         ' * License: MIT',
                         ' */\n'].join('\n')
            },
            boots: {
                src: [
                    'src/services/flash-service.js',
                    'src/directives/flash-alert-directive.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: ['/**! ',
                         ' * @license <%= pkg.name %> v<%= pkg.version %>',
                         ' * Copyright (c) 2013 <%= pkg.author.name %>. <%= pkg.homepage %>',
                         ' * License: MIT',
                         ' */\n'].join('\n')
            },
            main: {
                files: {
                    'dist/<%= pkg.name %>.min.js': [
                        '<%= concat.boots.dest %>'
                    ]
                }
            }
        },
        regarde: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['uglify']
            }
        },
        bumpup: ['package.json', 'component.json']
    });

    grunt.registerTask('bump', function (type) {
        type = type ? type : 'patch';
        grunt.task.run('bumpup:' + type);
    });

    grunt.registerTask('test-phantom', ['karma:phantom']);
    grunt.registerTask('test', ['karma:phantom']);
    grunt.registerTask('test-start', ['karma:debug:start']);
    grunt.registerTask('test-run', ['karma:debug:run']);
    grunt.registerTask('build', ['jshint', 'test', 'concat', 'uglify']);
    grunt.registerTask('default', ['build']);

};
