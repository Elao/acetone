'use strict';


var
    assert = require('chai').assert,
    fs = require('fs'),
    cwd = 'test/fixtures';

/***********/
/* Plugins */
/***********/

describe('Plugins', function() {

    // Clean
    describe('clean', function() {
        var
            dir = cwd + '/web/assets',
            acetone = require('..')({
                cwd:    cwd,
                silent: true
            });

        before(function() {
            // Create assets test dest structure
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFileSync(dir + '/_test', 'test');
            if (!fs.existsSync(dir + '/test')) {
                fs.mkdirSync(dir + '/test');
            }
            fs.writeFileSync(dir + '/test/_test', 'test');
        });

        acetone
            .addPlugin('clean');

        it('should run without errors', function(done) {
            acetone.plugins.clean.gulpTask(done);
        });

        it('should have cleaned dest path', function() {
            assert.deepEqual(
                fs.readdirSync(dir).sort(),
                []
            );
        });
    });

    // Copy
    describe('copy', function() {
        var
            gulp    = require('gulp'),
            acetone = require('..')({
                cwd:    cwd,
                silent: true
            });

        acetone
            .addLayout('npm')
            .addLayout('bower')
            .addLayout('assets')
            .addLayout('symfony')
            .addLayout('components');

        acetone
            .addPlugin('clean')
            .addPlugin('fonts', 'copy', {dir: 'fonts'});

        acetone
            .addPoolPattern('bower', {
                'fonts': {src: 'bower/fonts/**'}
            })
            .addPoolPattern('tao', {
                'fonts': {src: 'tao/fonts/**', dest: 'tao'}
            });

        after(function(done) {
            acetone.plugins.clean.gulpTask(done);
        });

        it('should run without errors', function(done) {
            acetone.plugins.fonts.gulpTask()
                .on('finish', done);
        });

        it('should have handled assets', function() {
            assert.deepEqual(
                fs.readdirSync(acetone.getPoolHandler('fonts').getDestPath()).sort(), [
                    'a.ttf',
                    'bower.ttf',
                    'foo',
                    'tao',
                    'z.ttf'
                ]
            );
            assert.deepEqual(
                fs.readdirSync(acetone.getPoolHandler('fonts').getDestPath('foo')).sort(), [
                    'a.ttf',
                    'z.ttf'
                ]
            );
            assert.deepEqual(
                fs.readdirSync(acetone.getPoolHandler('fonts').getDestPath('tao')).sort(), [
                    'tao.ttf'
                ]
            );
        });

        describe('no assets', function() {
            var
                acetone = require('..')({
                    cwd:    cwd,
                    silent: true
                });

            acetone
                .addPlugin('fonts', 'copy', {dir: 'fonts'});

            it('should return null', function() {
                assert.isNull(
                    acetone.plugins.fonts.gulpTask()
                );
            });
        });
    });

    // Images
    describe('images', function() {
        var
            gulp    = require('gulp'),
            acetone = require('..')({
                cwd:    cwd,
                silent: true
            });

        // Fix timeout
        this.timeout(5000);

        acetone
            .addLayout('npm')
            .addLayout('bower')
            .addLayout('assets')
            .addLayout('symfony')
            .addLayout('components');

        acetone
            .addPlugin('clean')
            .addPlugin('images');

        acetone
            .addPoolPattern('bower', {
                'images': {src: 'bower/images/**'}
            })
            .addPoolPattern('zia', {
                'images': {src: 'zia/images/**', dest: 'zia'}
            });

        after(function(done) {
            acetone.plugins.clean.gulpTask(done);
        });

        it('should run without errors', function(done) {
            acetone.plugins.images.gulpTask()
                .on('finish', done);
        });

        it('should have handled assets', function() {
            assert.deepEqual(
                fs.readdirSync(acetone.getPoolHandler('images').getDestPath()).sort(), [
                    'a.gif',
                    'bower.gif',
                    'foo',
                    'z.gif',
                    'zia'
                ]
            );
            assert.deepEqual(
                fs.readdirSync(acetone.getPoolHandler('images').getDestPath('foo')).sort(), [
                    'a.gif',
                    'z.gif',
                ]
            );
            assert.deepEqual(
                fs.readdirSync(acetone.getPoolHandler('images').getDestPath('zia')).sort(), [
                    'zia.gif',
                ]
            );
        });

        describe('no assets', function() {
            var
                acetone = require('..')({
                    cwd:    cwd,
                    silent: true
                });

            acetone
                .addPlugin('images');

            it('should return null', function() {
                assert.isNull(
                    acetone.plugins.images.gulpTask()
                );
            });
        });
    });

    // Sass
    describe('sass', function() {
        var
            gulp    = require('gulp'),
            acetone = require('..')({
                cwd:    cwd,
                silent: true
            });

        // Fix timeout
        this.timeout(5000);

        acetone
            .addLayout('npm')
            .addLayout('bower')
            .addLayout('assets')
            .addLayout('symfony')
            .addLayout('components');

        acetone
            .addPlugin('clean')
            .addPlugin('sass');

        after(function(done) {
            acetone.plugins.clean.gulpTask(done);
        });

        it('should run without errors', function(done) {
            acetone.plugins.sass.gulpTask()
                .on('finish', done);
        });

        it('should have handled assets', function() {
            assert.deepEqual(
                fs.readdirSync(acetone.getPoolHandler('sass').getDestPath()).sort(), [
                    'app.css',
                    'fooApp.css'
                ]
            );
            assert.equal(
                fs.readFileSync(acetone.getPoolHandler('sass').getDestPath('app.css'), {encoding: 'utf8'}),
                '.app{color:red;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.bower{color:green}.npm{color:#000}.tao{color:purple}.zia{color:#fff}'
            );
            assert.equal(
                fs.readFileSync(acetone.getPoolHandler('sass').getDestPath('fooApp.css'), {encoding: 'utf8'}),
                '.fooApp{color:brown}'
            );
        });

        describe('debug', function() {
            var
                acetone = require('..')({
                    cwd:    cwd,
                    silent: true,
                    debug:  true
                });

            acetone
                .addLayout('npm')
                .addLayout('bower')
                .addLayout('assets')
                .addLayout('symfony')
                .addLayout('components');

            acetone
                .addPlugin('sass');

            it('should run without errors', function(done) {
                acetone.plugins.sass.gulpTask()
                    .on('finish', done);
            });

            it('should have handled assets', function() {
                assert.deepEqual(
                    fs.readdirSync(acetone.getPoolHandler('sass').getDestPath()).sort(), [
                        'app.css',
                        'fooApp.css'
                    ]
                );
                assert.equal(
                    fs.readFileSync(acetone.getPoolHandler('sass').getDestPath('app.css'), {encoding: 'utf8'}),
                    '.app {' + "\n" +
                    '  color: red;' + "\n" +
                    '  display: -webkit-box;' + "\n" +
                    '  display: -webkit-flex;' + "\n" +
                    '  display: -ms-flexbox;' + "\n" +
                    '  display: flex; }' + "\n\n" +
                    '.bower {' + "\n" +
                    '  color: green; }' + "\n\n" +
                    '.npm {' + "\n" +
                    '  color: black; }' + "\n\n" +
                    '.tao {' + "\n" +
                    '  color: purple; }' + "\n\n" +
                    '.zia {' + "\n" +
                    '  color: white; }' + "\n\n\n" +
                    '/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5zY3NzIiwiX3ZhcmlhYmxlcy5zY3NzIiwiLi4vLi4vLi4vLi4vYm93ZXJfY29tcG9uZW50cy9ib3dlci9tYWluLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbnBtL19tYWluLnNjc3MiLCIuLi9jb21wb25lbnRzL3Rhby9tYWluLnNjc3MiLCIuLi8uLi8uLi9iYXIvUmVzb3VyY2VzL2Fzc2V0cy9jb21wb25lbnRzL3ppYS9fbWFpbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VDRlksWURHUjtFQUNBLHNCQUFTO0VBQVQsdUJBQVM7RUFBVCxzQkFBUztFQUFULGVBQVMsRUFBQTs7QUVGYjtFQUZjLGNBR1YsRUFBQTs7QUNESjtFQUNJLGNBQUEsRUFBQTs7QUNESjtFQUZZLGVBR1IsRUFBQTs7QUNESjtFQUZZLGNBR1IsRUFBQSIsImZpbGUiOiJhcHAuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAndmFyaWFibGVzJztcblxuLmFwcCB7XG4gICAgY29sb3I6ICRhcHAtY29sb3I7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuQGltcG9ydCAnYm93ZXIvbWFpbic7XG5AaW1wb3J0ICducG0vbWFpbic7XG5AaW1wb3J0ICd0YW8vbWFpbic7XG5AaW1wb3J0ICd6aWEvbWFpbic7XG4iLCIkYXBwLWNvbG9yOiByZWQ7XG4iLCIkYm93ZXItY29sb3I6IGdyZWVuO1xuXG4uYm93ZXIge1xuICAgIGNvbG9yOiAkYm93ZXItY29sb3I7XG59XG4iLCIkbnBtLWNvbG9yOiBibGFjaztcblxuLm5wbSB7XG4gICAgY29sb3I6ICRucG0tY29sb3I7XG59XG4iLCIkdGFvLWNvbG9yOiBwdXJwbGU7XG5cbi50YW8ge1xuICAgIGNvbG9yOiAkdGFvLWNvbG9yO1xufVxuIiwiJHppYS1jb2xvcjogd2hpdGU7XG5cbi56aWEge1xuICAgIGNvbG9yOiAkemlhLWNvbG9yO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9 */'
                );
                assert.equal(
                    fs.readFileSync(acetone.getPoolHandler('sass').getDestPath('fooApp.css'), {encoding: 'utf8'}),
                    '.fooApp {' + "\n" +
                    '  color: brown; }' + "\n\n\n" +
                    '/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb0FwcC5zY3NzIiwiX3ZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VDRmUsY0RHWCxFQUFBIiwiZmlsZSI6ImZvb0FwcC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICd2YXJpYWJsZXMnO1xuXG4uZm9vQXBwIHtcbiAgICBjb2xvcjogJGZvb0FwcC1jb2xvcjtcbn1cbiIsIiRmb29BcHAtY29sb3I6IGJyb3duO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9 */'
                );
            });

        });

        describe('no assets', function() {
            var
                acetone = require('..')({
                    cwd:    cwd,
                    silent: true
                });

            acetone
                .addPlugin('sass');

            it('should return null', function() {
                assert.isNull(
                    acetone.plugins.sass.gulpTask()
                );
            });
        });
    });

});
