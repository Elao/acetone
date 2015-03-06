'use strict';


var
    assert = require('chai').assert,
    cwd = 'test/fixtures';

/***********/
/* Layouts */
/***********/

describe('Layouts', function() {

    // Bower
    describe('bower', function() {
        var
            acetone = require('..')({
                cwd: cwd,
                silent: true
            });

        acetone
            .addLayout('bower');

        it('should find paths', function() {
            assert.deepEqual(
                acetone.libraries.getPaths(), [
                    'test/fixtures/bower_components'
                ]
            );
        });
    });

    // Npm
    describe('npm', function() {
        var
            acetone = require('..')({
                cwd: cwd,
                silent: true
            });

        acetone
            .addLayout('npm');

        it('should find paths', function() {
            assert.deepEqual(
                acetone.libraries.getPaths(), [
                    'test/fixtures/node_modules'
                ]
            );
        });
    });

    // Assets
    describe('assets', function() {
        var
            acetone = require('..')({
                cwd: cwd,
                silent: true
            });

        acetone
            .addLayout('assets');

        it('should find paths', function() {
            assert.deepEqual(
                acetone.bundles.getPaths(), [
                    'test/fixtures/assets'
                ]
            );
        });

        describe('alternate path', function() {
            var
                acetone = require('..')({
                    cwd: cwd,
                    silent: true
                });

            acetone
                .addLayout('assets')
                .addLayout('assets', {
                    path: 'assets_alt'
                });

            it('should find paths', function() {
                assert.deepEqual(
                    acetone.bundles.getPaths(), [
                        'test/fixtures/assets',
                        'test/fixtures/assets_alt'
                    ]
                );
            });
        });
    });

    // Symfony
    describe('symfony', function() {
        var
            acetone = require('..')({
                cwd: cwd,
                silent: true
            });

        acetone
            .addLayout('symfony');

        it('should find paths', function() {
            assert.deepEqual(
                acetone.bundles.getPaths(), [
                    'test/fixtures/app/Resources/assets',
                    'test/fixtures/app/bar/Resources/assets',
                    'test/fixtures/app/foo/Resources/assets',
                    'test/fixtures/src/Bundle/BarBundle/Resources/assets',
                    'test/fixtures/src/FooBundle/Resources/assets'
                ]
            );
        });

        describe('alternate dir', function() {
            var
                acetone = require('..')({
                    cwd: cwd,
                    silent: true
                });

            acetone
                .addLayout('symfony', {
                    dir: 'assets_alt'
                });

            it('should find paths', function() {
                assert.deepEqual(
                    acetone.bundles.getPaths(), [
                        'test/fixtures/app/Resources/assets_alt',
                        'test/fixtures/app/bar/Resources/assets_alt',
                        'test/fixtures/app/foo/Resources/assets_alt',
                        'test/fixtures/src/Bundle/BarBundle/Resources/assets_alt',
                        'test/fixtures/src/FooBundle/Resources/assets_alt'
                    ]
                );
            });
        });
    });

    // Components
    describe('components', function() {
        var
            acetone = require('..')({
                cwd: cwd,
                silent: true
            });

        acetone
            .addLayout('assets')
            .addLayout('symfony')
            .addLayout('components');

        it('should find paths', function() {
            assert.deepEqual(
                acetone.libraries.getPaths(), [
                    'test/fixtures/assets/components',
                    'test/fixtures/app/Resources/assets/components',
                    'test/fixtures/app/bar/Resources/assets/components',
                    'test/fixtures/src/FooBundle/Resources/assets/components'
                ]
            );
        });

        describe('alternate dir', function() {
            var
                acetone = require('..')({
                    cwd: cwd,
                    silent: true
                });

            acetone
                .addLayout('assets')
                .addLayout('symfony')
                .addLayout('components', {
                    dir: 'components_alt'
                });

            it('should find paths', function() {
                assert.deepEqual(
                    acetone.libraries.getPaths(), [
                        'test/fixtures/assets/components_alt',
                        'test/fixtures/app/Resources/assets/components_alt',
                        'test/fixtures/app/bar/Resources/assets/components_alt',
                        'test/fixtures/src/FooBundle/Resources/assets/components_alt'
                    ]
                );
            });
        });
    });

});
