var url = 'http://rcss.eu/work/hbuilding/admin/teamlist.php';

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function (id) {
        this.showLoginForm();
    },
    showLoginForm: function () {
        $('.login-form').fadeIn(400, function () {
            $('.login-form').find('a').click(function () {
                    if ($('#password').val() == 'admin' && $('#username').val() == 'admin') {

                        $.mobile.loading('show');
                        var selectList = '<option value="-1" selected>Select teambuilding</option>';

                        $.ajax({
                            url: 'http://scavenger.h-vision.com/app/backend/mobile.php?action=list',
                            dataType: 'jsonp',
                            jsonp: 'loadList',
                            timeout: 5000,
                            success: function (data, status) {
                                $.each(data, function (i, item) {
                                    selectList += '<option value="' + item.id + '">' + item.title + '</option>';
                                });

                                if (selectList !== '') {
                                    $('.login-form').fadeOut();
                                    $('.login').animate({
                                        top: '15%'
                                    }, 1000, function () {
                                        $.mobile.loading('hide');
                                        $('.log-out').fadeIn();
                                        $('#teambuilding-selector').append(selectList).after(function () {
                                            $('.selector-wrap').fadeIn();
                                            $('#store-json').click(function () {
                                                loadConfig();
                                                return false;
                                            });
                                        });
                                    });
                                }
                            },
                            error: function (e) {
                                console.log(e);
                            }
                        });
                    }
                    else {
                        alert('Your username or password is incorrect. Please try again!');
                        $('#username').val('');
                        $('#password').val('');
                    }

                    return false;
                }
            )
            ;
        })
        ;
    }
};

function loadConfig() {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);

    function fail(evt) {
        alert("FILE SYSTEM FAILURE" + evt.target.error.code);
        $.mobile.loading('hide');
    }

    function onFileSystemSuccess(fileSystem) {
        createPath(fileSystem, "scavenger/data", loadDataFromServer);
    }
}

function loadDataFromServer() {
    if ($('#teambuilding-selector').val() != -1) {
        var url = 'http://scavenger.h-vision.com/app/backend/mobile.php?action=single&id=' + $('#teambuilding-selector').val();
        $.mobile.loading('show');
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonp: 'loadList',
            timeout: 5000,
            success: function (data, status) {
                $.each(data, function (i, item) {
                    var saveString = JSON.stringify(item);
                    var writer = new FileWriter("/sdcard/scavenger/data/config.txt");

                    writer.onwriteend = function (evt) {
                        prepareImageUpload();
                    };
                    writer.write(saveString, false);

                });
            },
            error: function (e) {
                console.log(e);
            }
        });
    } else {
        alert("Please select a teambuilding!");
    }
}

function createPath(fs, path, callback) {
    var dirs = path.split("/").reverse();
    var root = fs.root;

    var createDir = function (dir) {
        if (dir.trim() != "") {
            root.getDirectory(dir, {
                create: true,
                exclusive: false
            }, success, function (dir) {
                error("failed to create dir " + dir);
            });
        } else {
            callback();
        }
    };

    var success = function (entry) {
        root = entry;
        if (dirs.length > 0) {
            createDir(dirs.pop());
        } else {
            callback();
        }
    };

    createDir(dirs.pop());
}

function uploadImages(fs) {
    alert('e veche ot tuk');
}

function createImageDir(fs) {
    createPath(fs, "scavenger/images", uploadImages);
}

function prepareImageUpload() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
    function fail(evt) {
        alert("FILE SYSTEM FAILURE" + evt.target.error.code);
        $.mobile.loading('hide');
    }

    function onFileSystemSuccess(fileSystem) {

        fileSystem.root.getDirectory(
            "scavenger/images",
            {create: true, exclusive: false},
            function (entry) {
                entry.removeRecursively(function () {
                    createImageDir(fileSystem);
                }, fail);
            }, fail);
    }
}

function downloadFile(url, filename) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        var imagePath = fs.root.fullPath + "/teambuilding/" + filename;
        var fileTransfer = new FileTransfer();
        fileTransfer.download(url, imagePath, function (entry) {
            $.mobile.loading('hide');
            downloadImages();
        }, function (error) {
            console.log(error);
        });
    });
}
//

//function downloadImagesForTeambuilding(url, filename) {
//    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
//        var imagePath = fs.root.fullPath + "/scavenger/images/" + filename;
//        var fileTransfer = new FileTransfer();
//        fileTransfer.download(url, imagePath, function (entry) {
//            $.mobile.loading('hide');
//        }, function (error) {
//            console.log(error);
//        });
//    });
//}
//
//function downloadImages() {
//    var localData = JSON.parse(window.localStorage.getItem('configTeambuilding'));
//    var images = localData.images;
//    images = images.split(',');
//    $.each(images, function( index, value ) {
//        var filename = 'quests/' + index  + '.png';
//        $.mobile.loading('show');
//        downloadImagesForTeambuilding(value, filename);
//    });
//}

function exitFromApp() {
    navigator.app.exitApp();
}