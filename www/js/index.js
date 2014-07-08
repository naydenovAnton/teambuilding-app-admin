var url = 'http://rcss.eu/work/hbuilding/admin/teamlist.php';

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        this.showLoginForm();
    },
    showLoginForm: function() {
        $('.login-form').fadeIn(400, function() {
            $('.login-form').find('a').click(function() {
                if ($('#password').val() == 'admin' && $('#username').val() == 'admin') {
                    //$.mobile.loading('show');


                    console.log('admin yes');


//                    var url = 'http://scavenger.h-vision.com/app/backend/api.php?r=getJson&id=91';
//                    var selectList = '<option value="-1" selected>Select teambuilding</option>';
//                    $.ajax({
//                        url: url,
//                        dataType: 'jsonp',
//                        jsonp: 'jsoncallback',
//                        timeout: 5000,
//                        success: function(data) {
//
//                            console.log(data);
//                            return false;
//
//                            $.each(data, function(i, item) {
//                                selectList += '<option value="' + item.id + '">' + item.name + '/' + item.company + '</option>';
//                            });
//                            if (selectList !== '') {
//                                $('.login-form').fadeOut();
//                                $('.login').animate({
//                                    top: '15%'
//                                }, 1000, function() {
//                                    $.mobile.loading('hide');
//                                    $('.log-out').fadeIn();
//                                    $('#teambuilding-selector').append(selectList).after(function() {
//                                        $('.selector-wrap').fadeIn();
//                                        //var localData = JSON.parse(window.localStorage.getItem('configTeambuilding'));
//                                        //loadCurrentInfo(localData);
//                                        $('#store-json').click(function() {
//                                            //loadConfig();
//                                            return false;
//                                        });
//                                    });
//                                });
//                            }
//                        },
//                        error: function() {
//                            alert.text('There was an error loading the data.');
//                            $.mobile.loading('hide');
//                        }
//                    });
                } else {
                    alert('Your username or password is incorrect. Please try again!');
                    $('#username').val('');
                    $('#password').val('');
                }

                return false;
            });
        });
    }
};

function loadConfig() {
    if ($('#teambuilding-selector').val() != -1) {
        var url = 'http://rcss.eu/work/hbuilding/admin/teamconfig.php';
        $.mobile.loading('show');
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: {
                selected: $('#teambuilding-selector').val()
            },
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: function(data, status) {
                var dataToStore = data;
                window.localStorage.setItem('configTeambuilding', dataToStore);
                var localData = JSON.parse(window.localStorage.getItem('configTeambuilding'));
                loadCurrentInfo(localData);
                $.mobile.loading('hide');
                startDownloads(localData);
            },
            error: function() {
                alert('There was an error loading the data.');
                $.mobile.loading('show');
            }
        });
    } else {
        alert("Please select a teambuilding!");
    }

}

//function startDownloads(localData) {
//    $.mobile.loading('show');
//    ClearDirectory(localData);
//}
//
//function ClearDirectory(localData) {
//    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
//    function fail(evt) {
//        alert("FILE SYSTEM FAILURE" + evt.target.error.code);
//        $.mobile.loading('hide');
//    }
//
//    function onFileSystemSuccess(fileSystem) {
//        fileSystem.root.getDirectory(
//                "teambuilding",
//                {create: true, exclusive: false},
//        function(entry) {
//            entry.removeRecursively(function() {
//                var localData = JSON.parse(window.localStorage.getItem('configTeambuilding'));
//                if (parseInt(localData.welcome.type, 10) === 1) {
//                    downloadFile(localData.welcome.image, 'welcome/image/welcome.png');
//                } else if (parseInt(localData.welcome.type) === 2) {
//                    downloadFile(localData.welcome.video, 'welcome/video/welcome.mp4');
//                } else {
//                    alert('Unsuported upload!');
//                    $.mobile.loading('hide');
//                }
//            }, fail);
//        }, fail);
//    }
//}
//
//function loadCurrentInfo(localData) {
//    $.mobile.loading('show');
//    $('#current-teambuilding').html(localData.general.name);
//    $('#current-place').html(localData.general.place);
//    $('#current-wrap').fadeIn();
//    $.mobile.loading('hide');
//}
//
//function downloadFile(url, filename) {
//    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
//        var imagePath = fs.root.fullPath + "/teambuilding/" + filename;
//        var fileTransfer = new FileTransfer();
//        fileTransfer.download(url, imagePath, function(entry) {
//            $.mobile.loading('hide');
//            downloadImages();
//        }, function(error) {
//            console.log(error);
//        });
//    });
//}
//
//function downloadImagesForTeambuilding(url, filename) {
//    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
//        var imagePath = fs.root.fullPath + "/teambuilding/" + filename;
//        var fileTransfer = new FileTransfer();
//        fileTransfer.download(url, imagePath, function(entry) {
//            $.mobile.loading('hide');
//        }, function(error) {
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

function exitFromApp()
{
    navigator.app.exitApp();
}