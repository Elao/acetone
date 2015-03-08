'use strict';


var
    assert = require('chai').assert,
    fileSystemMock = {
        getPath: function(path) {
            return path;
        }
    };

/*******/
/* Lib */
/*******/

describe('Lib', function() {

    // Options
    describe('Options', function() {
        var
            Options = require('../lib/AcetoneOptions'),
            options;

        describe('default values', function() {
            before(function() {
                options = new Options();
            });
            it('should return default values', function() {
                assert.equal(options.getPath(), '');
                assert.equal(options.getDestDir(), 'public');
                assert.isFalse(options.isDebug());
                assert.isFalse(options.isSilent());
                assert.isNull(options.getPools());
            });
        });

        describe('custom values', function() {
            before(function() {
                options = new Options({
                    path:    'foo',
                    destDir: 'bar',
                    debug:   true,
                    silent:  true,
                    pools:   ['foo']
                });
            });
            it('should return default values', function() {
                assert.equal(options.getPath(), 'foo');
                assert.equal(options.getDestDir(), 'bar');
                assert.isTrue(options.isDebug());
                assert.isTrue(options.isSilent());
                assert.deepEqual(options.getPools(), ['foo']);
            });
        });

        describe('custom default values', function() {
            before(function() {
                options = new Options();
                options
                    .setDefault('path',    'foo')
                    .setDefault('destDir', 'bar')
                    .setDefault('debug',   true)
                    .setDefault('silent',  true)
                    .setDefault('pools',   ['foo']);
            });
            it('should return default values', function() {
                assert.equal(options.getPath(), 'foo');
                assert.equal(options.getDestDir(), 'bar');
                assert.isTrue(options.isDebug());
                assert.isTrue(options.isSilent());
                assert.deepEqual(options.getPools(), ['foo']);
            });
        });

        describe('custom and default values', function() {
            before(function() {
                options = new Options({
                    path:    'foo',
                    destDir: 'bar',
                    debug:   true,
                    silent:  true,
                    pools:   ['foo']
                });
                options
                    .setDefault('path',    'bar')
                    .setDefault('destDir', 'foo')
                    .setDefault('debug',   false)
                    .setDefault('silent',  false)
                    .setDefault('pools',   ['bar']);
            });
            it('should return default values', function() {
                assert.equal(options.getPath(), 'foo');
                assert.equal(options.getDestDir(), 'bar');
                assert.isTrue(options.isDebug());
                assert.isTrue(options.isSilent());
                assert.deepEqual(options.getPools(), ['foo']);
            });
        });
    });

    // Bundle
    describe('Bundle', function() {
        var
            Bundle = require('../lib/Bundle/Bundle'),
            bundle = new Bundle(fileSystemMock, 'foo', 'bar', 'foobar'),
            bundleUndescribed = new Bundle(fileSystemMock, 'foo', 'bar');

        describe('#getId()', function() {
            it('should return id', function() {
                assert.equal(bundle.getId(), 'foo');
            });
        });
        describe('#getPath()', function() {
            it('should return path', function() {
                assert.equal(bundle.getPath(), 'bar');
            });
        });
        describe('#getDescription()', function() {
            it('should return description', function() {
                assert.equal(bundle.getDescription(), 'foobar');
            });
        });
        describe('#hasDescription()', function() {
            it('should return true', function() {
                assert.isTrue(bundle.hasDescription());
            });
        });
        describe('#hasDescription()', function() {
            it('should return false', function() {
                assert.isFalse(bundleUndescribed.hasDescription());
            });
        });
    });

    // Library
    describe('Library', function() {
        var
            Library = require('../lib/Library/Library'),
            library = new Library(fileSystemMock, 'foo', 'bar'),
            libraryUndescribed = new Library(fileSystemMock, 'foo');

        describe('#getPath()', function() {
            it('should return path', function() {
                assert.equal(library.getPath(), 'foo');
            });
        });
        describe('#getDescription()', function() {
            it('should return description', function() {
                assert.equal(library.getDescription(), 'bar');
            });
        });
        describe('#hasDescription()', function() {
            it('should return true', function() {
                assert.isTrue(library.hasDescription());
            });
        });
        describe('#hasDescription()', function() {
            it('should return false', function() {
                assert.isFalse(libraryUndescribed.hasDescription());
            });
        });
    });

});
