var objCov;
var objAva;
var saveSuccess = 0;

$(document).ready(function () {
    $(document.getElementsByClassName('profile-avatar')).click(function () {
        $(document.getElementsByClassName('changeava')).click();
    });
    var background = $('.profile-banner').css('background-image');
    $('.profile-avatar').attr('src', dataA.Avatar[0].Thumb);
    $('[id=imgCoverPreview] img').attr('src', data.Cover[0].Thumb);
    $('[id=imgAvatarPreview] img').attr('src', dataA.Avatar[0].Thumb);
    Dropzone.autoDiscover = false;
    Dropzone.options.myAwesomeDropzone = false;
    $("[id=frmChangeCover]").dropzone({
        url: urlResolved + "/api/UserProfile/DoUpload",
        method: 'POST',
        paraName: 'file',
        maxFilesize: 5,
        maxFiles: 1,
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        removedfile: function (file) {
            var _ref;
            var filename = $.trim($('[id=txtfileCoverHidden]').val());
            if (!filename) {
                $.ajax({
                    url: urlResolved + "/api/UserProfile/UnUpload?filename=" + filename,
                    type: 'GET',
                    success: function (data) {
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        var err = eval("(" + XMLHttpRequest.responseText + ")");
                    }
                });
                return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
            }
            else return false;
        },
        init: function () {
            //this.emit('addedfile', currentCoverImg);
            //this.emit("thumbnail", currentCoverImg, background.split('"')[1]);
            this.on("addedfile", function (file) {
                var preview = $('[id=frmChangeCover] .dz-preview').length;
                if (preview > 1) {
                    $('[id=frmChangeCover] .dz-preview:first').remove();
                }
            });
            this.on('thumbnail', function (file, dataUrl) {
                $('.dz-error-mark').hide();
                if (file.width >= 800 && file.height >= 250) {
                    $('[id=imgCoverPreview] img').attr('src', '/Libraries/images/users/' + $.trim($('#txtfileCoverHidden').val()));
                    objCov = new Object();
                    objCov.Size = file.size;
                    objCov.Height = file.height;
                    objCov.Width = file.width;
                    objCov.Name = file.name;
                    objCov.OrginalName = $.trim($('#txtfileCoverHidden').val());
                }
                else {
                    autohidenotify3s('error', 'bottom right', '', 'Please choose another image that has a bigger size', '<span class="glyphicon glyphicon-chevron-down"></span>');
                    $('[id=imgCoverPreview] img').attr('src', $.trim($('[id=txtfileCoverHidden]').val()));
                    this.removeFile(file);
                    return false;
                }
            });
            this.on("complete", function (data) {
                var fname = $.trim($('[id=txtfileCoverHidden]').val());
                if (fname.length == 0)
                    fname = "cover-default.jpg";
                $.ajax({
                    url: urlResolved + "/api/UserProfile/UnUpload?filename=" + fname,
                    type: 'GET',
                    success: function (data) {

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        var err = eval("(" + XMLHttpRequest.responseText + ")");
                    }
                });
                var res = JSON.parse(data.xhr.responseText);
                $('[id=txtfileCoverHidden]').val(res);
            });
        },

    });
    $("[id=frmChangeAvatar]").dropzone({
        url: urlResolved + "/api/UserProfile/DoUpload",
        method: 'POST',
        paraName: 'file',
        maxFilesize: 5,
        maxFiles: 1,
        acceptedFiles: "image/*",
        thumbnailHeight: 250,
        thumbnailWidth: 250,
        addRemoveLinks: true,
        removedfile: function (file) {
            var _ref;
            var filename = $.trim($('[id=txtavafilehidden]').val());
            $.ajax({
                url: urlResolved + "/api/UserProfile/UnUpload?filename=" + filename,
                type: 'GET',
                success: function (data) {
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var err = eval("(" + XMLHttpRequest.responseText + ")");
                }
            });
            return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
        },
        init: function () {
            //this.emit('addedfile', currentAvatarImg);
            //this.emit("thumbnail", currentAvatarImg, dataA.Avatar[0].Thumb);
            this.on("addedfile", function (file) {
                var preview = $('[id=frmChangeAvatar] .dz-preview').length;
                if (preview > 1) {
                    $('[id=frmChangeAvatar] .dz-preview:first').remove();
                }
            });
            this.on('thumbnail', function (file, dataUrl) {
                $('.dz-error-mark').hide();
                if (file.width >= 250 && file.height >= 250) {
                    $('[id=imgAvatarPreview] img').attr('src', '/Libraries/images/users/' + $.trim($('[id=txtavafilehidden]').val()));
                    objAva = new Object();
                    objAva.Size = file.size;
                    objAva.Height = file.height;
                    objAva.Width = file.width;
                    objAva.Name = file.name;
                    objAva.OrginalName = $.trim($('#txtavafilehidden').val());
                }
                else {
                    autohidenotify3s('error', 'bottom right', '', 'Please choose another image that has a bigger size', '<span class="glyphicon glyphicon-chevron-down"></span>');
                    this.removeFile(file);
                    $('[id=imgAvatarPreview] img').attr('src', background);
                    return false;
                }
            });
            this.on("complete", function (data) {
                
                var fname = $.trim($('[id=txtavafilehidden]').val());
                if (fname.length == 0)
                    fname = "default-user.png";
                $.ajax({
                    url: urlResolved + "/api/UserProfile/UnUpload?filename=" + fname,
                    type: 'GET',
                    success: function (data) {
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        var err = eval("(" + XMLHttpRequest.responseText + ")");
                    }
                });
                var res = JSON.parse(data.xhr.responseText);
                $('[id=txtavafilehidden]').val(res);
            });
        },

    });
    
});
function btnSaveCover_Click() {
    objCov.Thumb = '/Libraries/images/users/' + $.trim($('#txtfileCoverHidden').val());
    var preview = $('[id=frmChangeCover] .dz-preview').length;

    if (preview < 1) {
        autohidenotify3s('error', 'bottom right', '', 'Please choose a image before save', '<span class="glyphicon glyphicon-chevron-down"></span>');
        return false;
    }
    if (objCov != null) {
        $.ajax({
            type: 'POST',
            url: '../api/UserProfile/SaveCover',
            data: JSON.stringify(objCov),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data == 1) {
                    var backgroundImg = 'url(' + objCov.Thumb + ')';
                    $('.profile-banner').css({ 'background-image': backgroundImg });
                    autohidenotify3s('success', 'bottom right', '', 'Saved', '<span class="glyphicon glyphicon-chevron-down"></span>');
                    saveSuccess = data;

                }
                else {
                    autohidenotify3s('error', 'bottom right', '', 'Save failed', '<span class="glyphicon glyphicon-chevron-down"></span>');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var err = eval("(" + XMLHttpRequest.responseText + ")");
                autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');

            }
        });
    }

    //var preview = $('[id=frmChangeCover] .dz-preview').length;

    //if (preview < 1) {
    //    autohidenotify3s('error', 'bottom right', '', 'Please choose a image before save', '<span class="glyphicon glyphicon-chevron-down"></span>');
    //    return false;
    //}
    //if (coverGlo != null) {
    //    $.ajax({
    //        type: 'POST',
    //        url: '../api/User/Update_CoverImg',
    //        data: JSON.stringify(coverGlo),
    //        contentType: 'application/json; charset=utf-8',
    //        dataType: 'json',
    //        async:false,
    //        success: function (data) {
    //            if (data == 1) {
    //                var backgroundImg = 'url(' + coverGlo.Thumb + ')';
    //                $('.profile-banner').css({ 'background-image': backgroundImg });
    //                autohidenotify3s('success', 'bottom right', '', 'Saved', '<span class="glyphicon glyphicon-chevron-down"></span>');
    //                saveSuccess = data;

    //            }
    //            else {
    //                autohidenotify3s('error', 'bottom right', '', 'Save failed', '<span class="glyphicon glyphicon-chevron-down"></span>');
    //            }
    //        },
    //        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //            var err = eval("(" + XMLHttpRequest.responseText + ")");
    //            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');

    //        }
    //    });
    //}

}
function btnCloseCover_Click() {
    $(document.getElementsByClassName('close')).click();
}
function btnSavenCloseCover_Click() {
    btnSaveCover_Click();
    if (saveSuccess == "1") {
        $(document.getElementById('btnCloseCover')).click();
        saveSuccess = 0;
    }
    else
        return false;
}
function btnSaveAvatar_Click() {
    //var preview = $('[id=frmChangeAvatar] .dz-preview').length;
    //if (preview < 1) {
    //    autohidenotify3s('error', 'bottom right', '', 'Please choose a image before save', '<span class="glyphicon glyphicon-chevron-down"></span>');
    //    return false;
    //}
    //if (AvatarGlo != null) {
    //    $.ajax({
    //        type: 'POST',
    //        url: '../api/User/Update_AvatarImg',
    //        data: JSON.stringify(AvatarGlo),
    //        contentType: 'application/json; charset=utf-8',
    //        dataType: 'json',
    //        async: false,
    //        success: function (data) {
    //            if (data == 1) {
    //                $('.img-circle').attr('src', AvatarGlo.Thumb);
    //                $('[id=avatarImg]').attr('src', AvatarGlo.Thumb);
    //                avatarImg
    //                autohidenotify3s('success', 'bottom right', '', 'Saved', '<span class="glyphicon glyphicon-chevron-down"></span>');
    //                saveSuccess = data;

    //            }
    //            else {
    //                autohidenotify3s('error', 'bottom right', '', 'Save failed', '<span class="glyphicon glyphicon-chevron-down"></span>');
    //            }
    //        },
    //        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //            var err = eval("(" + XMLHttpRequest.responseText + ")");
    //            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');

    //        }
    //    });
    //}
    objAva.Thumb = '/Libraries/images/users/' + $.trim($('#txtavafilehidden').val());
    var preview = $('[id=frmChangeAvatar] .dz-preview').length;

    if (preview < 1) {
        autohidenotify3s('error', 'bottom right', '', 'Please choose a image before save', '<span class="glyphicon glyphicon-chevron-down"></span>');
        return false;
    }
    if (objAva != null) {
        $.ajax({
            type: 'POST',
            url: '../api/UserProfile/SaveAvatar',
            data: JSON.stringify(objAva),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data == 1) {
                    $('.img-circle').attr('src', objAva.Thumb);
                    $('[id=avatarImg]').attr('src', objAva.Thumb);
                    autohidenotify3s('success', 'bottom right', '', 'Saved', '<span class="glyphicon glyphicon-chevron-down"></span>');
                    saveSuccess = data;

                }
                else {
                    autohidenotify3s('error', 'bottom right', '', 'Save have been failed', '<span class="glyphicon glyphicon-chevron-down"></span>');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var err = eval("(" + XMLHttpRequest.responseText + ")");
                autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');

            }
        });
    }

}
function btnCloseAvatar_Click() {
    $(document.getElementsByClassName('close')).click();
}
function btnSavenCloseAvatar_Click() {
    btnSaveAvatar_Click();
    if (saveSuccess == "1") {
        $(document.getElementById('btnCloseAvatar')).click();
        saveSuccess = 0;
    }
    else
        return false;
}