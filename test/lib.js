'use strict';


var
    assert = require('chai').assert,
    sinon  = require('sinon');

/*******/
/* Lib */
/*******/

describe('Lib', function() {

    // Acetone options
    describe('AcetoneOptions', function() {
        var
            AcetoneOptions = require('../lib/AcetoneOptions'),
            options;

        describe('default values', function() {
            before(function() {
                options = new AcetoneOptions();
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
                options = new AcetoneOptions({
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
                options = new AcetoneOptions();
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
                options = new AcetoneOptions({
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

    // Acetone file system
    describe('AcetoneFileSystem', function() {
        var
            AcetoneFileSystem = require('../lib/AcetoneFileSystem'),
            AcetoneOptions    = require('../lib/AcetoneOptions'),
            fs                = require('fs'),
            glob                = require('glob'),
            fileSystem;

        describe('#getPath()', function() {
            before(function() {
                fileSystem = new AcetoneFileSystem(
                    fs,
                    glob,
                    new AcetoneOptions()
                );
            });
            it('should return current path', function() {
                assert.equal(fileSystem.getPath(), '.');
                assert.equal(fileSystem.getPath('foo'), 'foo');
                assert.equal(fileSystem.getPath('foo', 'foo/bar'), 'foo/foo/bar');
            });
        });

        describe('#getPath()', function() {
            before(function() {
                fileSystem = new AcetoneFileSystem(
                    fs,
                    glob,
                    new AcetoneOptions({path: 'foo/bar'})
                );
            });
            it('should return custom path', function() {
                assert.equal(fileSystem.getPath(), 'foo/bar');
                assert.equal(fileSystem.getPath('foo'), 'foo/bar/foo');
                assert.equal(fileSystem.getPath('foo', 'foo/bar'), 'foo/bar/foo/foo/bar');
            });
        });

        describe('#hasPath()', function() {
            var
                fsMock = sinon.mock(fs);

            before(function() {
                fileSystem = new AcetoneFileSystem(
                    fs,
                    glob,
                    new AcetoneOptions()
                );

                fsMock.expects('existsSync').withArgs('.').once().returns(true);
                fsMock.expects('existsSync').withArgs('foo').once().returns(false);
                fsMock.expects('existsSync').withArgs('foo/foo/bar').once().returns(true);
            });
            it('should return path existance', function() {
                assert.isTrue(fileSystem.hasPath());
                assert.isFalse(fileSystem.hasPath('foo'));
                assert.isTrue(fileSystem.hasPath('foo', 'foo/bar'));
                fsMock.verify();
            });
        });

        describe('#getDestPath()', function() {
            before(function() {
                fileSystem = new AcetoneFileSystem(
                    fs,
                    glob,
                    new AcetoneOptions()
                );
            });
            it('should return current destination path', function() {
                assert.equal(fileSystem.getDestPath(), 'public');
                assert.equal(fileSystem.getDestPath('foo'), 'public/foo');
                assert.equal(fileSystem.getDestPath('foo', 'foo/bar'), 'public/foo/foo/bar');
            });
        });

        describe('#getDestPath()', function() {
            before(function() {
                fileSystem = new AcetoneFileSystem(
                    fs,
                    glob,
                    new AcetoneOptions({destDir: 'foo/bar'})
                );
            });
            it('should return custom destination path', function() {
                assert.equal(fileSystem.getDestPath(), 'foo/bar');
                assert.equal(fileSystem.getDestPath('foo'), 'foo/bar/foo');
                assert.equal(fileSystem.getDestPath('foo', 'foo/bar'), 'foo/bar/foo/foo/bar');
            });
        });

        describe('#getDestPath()', function() {
            before(function() {
                fileSystem = new AcetoneFileSystem(
                    fs,
                    glob,
                    new AcetoneOptions({path: 'foo', destDir: 'bar'})
                );
            });
            it('should return both custom destination path', function() {
                assert.equal(fileSystem.getDestPath(), 'foo/bar');
                assert.equal(fileSystem.getDestPath('foo'), 'foo/bar/foo');
                assert.equal(fileSystem.getDestPath('foo', 'foo/bar'), 'foo/bar/foo/foo/bar');
            });
        });

        describe('#glob()', function() {
            var
                globMock = sinon.mock(glob);

            before(function() {
                fileSystem = new AcetoneFileSystem(
                    fs,
                    glob,
                    new AcetoneOptions({path: 'foo', destDir: 'bar'})
                );

                globMock.expects('sync').withArgs('.').once().returns([]);
                globMock.expects('sync').withArgs('foo').once().returns(['foo']);
                globMock.expects('sync').withArgs('foo/foo/bar').once().returns(['foo', 'bar']);
            });
            it('should return glob', function() {
                assert.deepEqual(fileSystem.glob(), []);
                assert.deepEqual(fileSystem.glob('foo'), ['foo']);
                assert.deepEqual(fileSystem.glob('foo', 'foo/bar'), ['foo', 'bar']);
                globMock.verify();
            });
        });

        describe('#rimrafPath()', function() {
            var
                fsMock = sinon.mock(fs);

            function fsStatMock(isFile) {
                this._isFile = isFile;
                this.isFile = function() {
                    return this._isFile;
                };
            }

            before(function() {
                fileSystem = new AcetoneFileSystem(
                    fs,
                    glob,
                    new AcetoneOptions()
                );

                fsMock.expects('readdirSync').withArgs('foo').once().returns(['_test', 'test']);
                fsMock.expects('statSync').withArgs('foo/_test').once().returns(new fsStatMock(true));
                fsMock.expects('unlinkSync').withArgs('foo/_test').once();
                fsMock.expects('statSync').withArgs('foo/test').once().returns(new fsStatMock(false));
                fsMock.expects('readdirSync').withArgs('foo/test').once().returns(['_test']);
                fsMock.expects('statSync').withArgs('foo/test/_test').once().returns(new fsStatMock(true));
                fsMock.expects('unlinkSync').withArgs('foo/test/_test').once();
                fsMock.expects('rmdirSync').withArgs('foo/test').once();
            });
            it('should rimraf path', function(done) {
                assert.isUndefined(fileSystem.rimrafPath('foo', done));
                fsMock.verify();
            });
        });
    });

    // Bundle
    describe('Bundle', function() {
        var
            AcetoneFileSystem = require('../lib/AcetoneFileSystem'),
            fileSystem = new AcetoneFileSystem(),
            fileSystemMock = sinon.mock(fileSystem),
            Bundle = require('../lib/Bundle/Bundle'),
            bundle = new Bundle(fileSystem, 'foo', 'bar', 'foobar'),
            bundleUndescribed = new Bundle(fileSystem, 'foo', 'bar');

        describe('#getId()', function() {
            it('should return id', function() {
                assert.equal(bundle.getId(), 'foo');
            });
        });
        describe('#getPath()', function() {
            fileSystemMock.expects('getPath').withArgs('bar').once().returns('bar');
            it('should return path', function() {
                assert.equal(bundle.getPath(), 'bar');
                fileSystemMock.verify();
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
            AcetoneFileSystem = require('../lib/AcetoneFileSystem'),
            fileSystem = new AcetoneFileSystem(),
            fileSystemMock = sinon.mock(fileSystem),
            Library = require('../lib/Library/Library'),
            library = new Library(fileSystem, 'foo', 'bar'),
            libraryUndescribed = new Library(fileSystem, 'foo');

        describe('#getPath()', function() {
            fileSystemMock.expects('getPath').withArgs('foo').once().returns('foo');
            it('should return path', function() {
                assert.equal(library.getPath(), 'foo');
                fileSystemMock.verify();
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
