module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            vendor: {
                src: [],
                dest: 'dist/assets/js/vendor.js',
                options: {
                    require: ['jquery']
                }
            },

            watchClient: {
                src: ['src/**/*.js'],
                dest: 'dist/assets/js/app.js',
                options: {
                    external: ['jQuery', 'momentWrapper'],
                    watch: true
                }
            }
        },

        concat: {
            'dist/assets/js/concat.js': ['dist/assets/js/vendor.js', 'dist/assets/js/app.js']
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true, cwd: 'node_modules/font-awesome/', src: ['fonts/*'], dest: 'dist/assets/', filter: 'isFile'
                    },
                    {
                        expand: true, cwd: 'node_modules/slick-carousel/slick', src: ['fonts/*'], dest: 'dist/assets/', filter: 'isFile'
                    }
                ]
            }
        },

        less: {
            development: {
                options: {
                    paths: ['src/less/**']
                },
                files: {
                    'dist/assets/css/main.css' : 'src/less/main.less'
                }
            },
            production: {
                options: {
                    paths: ['assets/css'],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
                        new (require('less-plugin-clean-css'))({advanced: true})
                    ]
                },
                files: {
                    'dist/assets/css/main.min.css': 'src/less/main.less'
                }
            }
        },

        watch: {
            concat: {
                files: ['dist/assets/js/app.js'],
                tasks: ['concat']
            },

            less: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['src/less/*.less'],
                tasks: ['less']
            },

            options: {
                dateFormat: function (time) {
                    grunt.log.writeln('Finished watching in ' + time + ' ms at' + (new Date()).toString());
                }
            }
        }

    });

    //grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task(s).
    grunt.registerTask('default', ['browserify', 'watch']);
    grunt.registerTask('init', ['copy', 'watch']);

    grunt.registerTask('exit', 'Just exits.', function() {
        process.exit(0);
    });
};
