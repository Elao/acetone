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
            options = new Options({foo: 'bar'});

        describe('#get()', function() {
            it('should return value', function() {
                assert.equal(options.get('foo'), 'bar');
                assert.isUndefined(options.get('bar'));
            });
        });

        describe('#is()', function() {
            it('should return boolean', function() {
                assert.isTrue(options.is('foo'));
                assert.isFalse(options.is('bar'));
            });
        });

        describe('#setDefault()', function() {
            before(function() {
                options
                    .setDefault('foo', 'baz')
                    .setDefault('bar', 'foo');
            });
            it('should return default value', function() {
                assert.equal(options.get('foo'), 'bar');
                assert.equal(options.get('bar'), 'foo');
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
