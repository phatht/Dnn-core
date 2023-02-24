var flagpayor = 1;
var flagprovider = 1;

var msgSaved = 'Saved Successfully.';
var msgSavedF = 'Saved Successfully.';

$(document).ready(function () {
    //GetData();
    btnSearchAdvange_Click(1);
    $('#myWizard').easyWizard({
        buttonsClass: 'btn btn-default',
        submitButtonClass: 'btn btn-primary'
    });
    $("#btnCreate").attr("type", "button");
    $("#btnCreate").click(function () {
        btnsubmituser();
    });
    $('input[type="check"]').iCheck({
        checkboxClass: 'icheckbox_square-aero',
        increaseArea: '20%'
    });

    $('.lbltooltip').popover({
        trigger: "focus",
        html: true,
        content: function () {
            return $('#popoverExampleTwoHiddenContent').html();
        },
    });
    Checkemail("txtEmail");
    Checkemail("txtEmailEdit");

    $("#demo5 a[href='#UserRole']").click(function () {
        var id = $("#hdUserIDEdit").val();
        //get user role select
        $.ajax({
            dataType: 'JSON',
            url: '../api/User/GetUserRole?userID=' + id + '',
            async: false,
            success: function (data) {
                BindTableUserRole('tbUserRoleEdit', data);
                $("#tbUserRoleEdit_paginate").remove();
                $("#tbUserRoleEdit_filter").remove();
                $("#tbUserRoleEdit [type=checkbox]").attr("class", "ckuserroleEdit");
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });

    });
    $("#demo5 a[href='#ProviderInformation']").click(function () {
        flagpayor = 1;
        flagprovider = 1;
        var id = $("#hdUserIDEdit").val();
        //get user role select
        getUserProvider(id);
        ProviderViewClick();

    });
    $("#demo5 a[href='#PayorInformation']").click(function () {
        flagpayor = 1;
        flagprovider = 1;
        var id = $("#hdUserIDEdit").val();
        //get user role select
        //getUserPayor(id);
        $('.selectpicker').selectpicker();
        $('input[type="check"]').iCheck({
            checkboxClass: 'icheckbox_square-aero',
            increaseArea: '20%'
        });
        InitPayorInformation();
        
       // PayorViewClick();
    });
    //$("#demo5 a[href='#PasswordReset']").click(function () {
    //    var id = $("#hdUserIDEdit").val();
    //    //get user role select
    //    getUserPayor(id);
    //    PayorViewClick();
    //});
    $('#txtUserName').blur(function () {

        if ($.trim($('#txtUserName').val()) == '') {
            $("#txtUserName").parent().addClass("has-error");
            $(".easyWizardButtons .next").addClass("disabled");
        }
        else
            if (CheckUserName('txtUserName') == true) {
                $("#txtPassword").focus();
            }
    });
    $('#txtPassword').blur(function () {
        var password = $("#txtPassword").val();
        if (!validate(password) || $.trim(password) == "") {
            autohidenotify3s('warning', 'bottom right', '', 'Password format is incorrect ', '<span class="glyphicon glyphicon-chevron-down"></span>');
            $("#txtPassword").parent().addClass("has-error");
            $('#txtPassword').focus();
            $("#txtPassword").select();
            $(".easyWizardButtons .prev,.easyWizardButtons .next").addClass("disabled");
        } else {
            $("#txtPassword").parent().removeClass("has-error");
            $('#txtRePassword').focus();
            $(".easyWizardButtons .prev,.easyWizardButtons .next").removeClass("disabled");
        }
    });
    $('#txtRePassword').blur(function () {
        var password = $("#txtPassword").val();
        var repass = $("#txtRePassword").val();
        if (password != repass && $("#txtRePassword").val() != "") {
            autohidenotify3s('warning', 'bottom right', '', 'Password does not match ', '<span class="glyphicon glyphicon-chevron-down"></span>');
            $("#txtRePassword").parent().addClass("has-error");
            $('#txtRePassword').focus();
            $("#txtRePassword").select();
            $(".easyWizardButtons .prev,.easyWizardButtons .next").addClass("disabled");
        } else {
            $("#txtRePassword").parent().removeClass("has-error");
            $(".easyWizardButtons .prev,.easyWizardButtons .next").removeClass("disabled");
        }
    });

    bindDataDropdowlistState("#txtState");
    bindDataDropdowlistState("#txtStateEdit");

    $('.divusertype').slimScroll({
        height: '335px',
        width: '99%',
        size: "5px",
        color: '#000',
        alwaysVisible: false,
        railVisible: true,
        railColor: '#A1A1A1',
        borderRadius: '0px',
        railBorderRadius: '0px'
    });

    $('.divProvider').slimScroll({
        height: '100%',
        width: '99%',
        size: "10px",
        color: '#000',
        alwaysVisible: true,
        railVisible: true,
        railColor: '#A1A1A1',
        borderRadius: '0px',
        railBorderRadius: '0px'
    });
    $('.divPayor').slimScroll({
        height: '100%',
        width: '99%',
        size: "10px",
        color: '#000',
        alwaysVisible: true,
        railVisible: true,
        railColor: '#A1A1A1',
        borderRadius: '0px',
        railBorderRadius: '0px'
    });
    $('[id=txtParentuserEdit]').blur(function () {
        $('.txtParentuserEdit .txttypehead-listEdit').each(function () {
            this.style.setProperty('display', 'none', 'important');
        });
    });
    $('[id=txtParentuser]').blur(function () {
        $('.txtParentuser .txttypehead-listEdit').each(function () {
            this.style.setProperty('display', 'none', 'important');
        });
    });

    Pace.stop();
});

function selectdataaccess(ischeck) {
    if (ischeck == 5) {
        var UserID = $("#hdUserIDEdit").val();
        getDataAccess(UserID);
        $('.UserDataaccessEdit').each(function () {
            var listuseac = $('#hdUserAcessList').val();
            var useraccess = listuseac.split(',');
            for (var i = 0; i < useraccess.length; i++) {
                if (useraccess[i] == $(this).val())
                    $(this).iCheck('check');
            }
        });
    } else {
        $('#divChartEdit').html('');
        $('#divChartEdit').append(' <table id="treegridEdit" class="treegrid"></table>');

    }
}

function selectdataaccesscreate(ischeck) {
    if (ischeck == 5) {

        getDataAccess(0);
    } else {
        $('#divChart').html('');
        $('#divChart').append(' <table id="treegrid" class="treegrid"></table>');
    }
}

function getuserparent(id, checkparent) {
    $.ajax({
        dataType: 'JSON',
        url: '../api/User/GetuserParent?userID=' + id,
        async: false,
        success: function (datas) {
            //var datas = $.parseJSON(data);
            if (id == 0) {
                GetAutoParentUser('txtParentuser', datas, 'hdParentUserID');
            }
            else {
                GetAutoParentUser('txtParentuserEdit', datas, 'hdParentUserIDEdit');
            }

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');

        }
    });
}

/*
    Get list menu when page init
*/

function GetData() {
    ///get data user
    $(".SearchUser input[type=text]").val("");
    btnSearchAdvange_Click(1);
}

function getUserProvider(id) {
    ///get data provider
    $.ajax({
        dataType: 'JSON',
        url: '../api/User/User_Provider_Select_ByUserID?userID=' + id + '&PageNo=' + 1 + '&PageSize=' + ProviderPageSize,
        async: false,
        success: function (data) {
            var total = 0;
            if (data.length>0) {
                total = data[0].Total;
            }
            BindTableProvider('tbProvider', data, total, 1, ProviderPageSize);
            BindTableProvider('tbProviderEdit', data, total, 1, ProviderPageSize);
            $("#tbProviderEdit input[type='checkbox']").attr("class", "ckprovideruserEdit");
            $("#chooseproviderEdit").attr("onclick", "InsertUserProviderStaging('ckprovideruserEdit')");
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}

//function getUserProviderStaging(id, isedit) {
//    ///get data provider
//    var RecordID = $("[name=hdRecordID]").val();
//    $.ajax({
//        dataType: 'JSON',
//        url: '../api/User/User_Provider_Select_Staging?UserID=' + id + '&RecordID=' + RecordID + '&isEdit=' + isedit + '',
//        async: false,
//        success: function (data) {
//            if (data.length > 0) {
//                $("[name=hdRecordID]").val(data[0]["RecordID"])

//            }
//            BindTableProviderStaging('tbProviderStaging', data);
//        }, error: function (XMLHttpRequest, textStatus, errorThrown) {

//        }
//    });
//}

function btnCreate_Click() {
    $('#txtUserName').focus();
    $('#txtUserName').select();
    $(".buttonAddNew").show();
    $(".buttonEdit").hide();
    $("[id=hdUserIDEdit]").val(0);
    GetPortal(0);
    GetUserType(0);
    //getUserProvider(0)
    //getUserProviderStaging(0, 0);
   // getUserPayor(0);
    getuserparent(0, 0);
    //getDataAccess(0);
    //$("#btnchoosepayor").attr("onclick", "InsertUserPayorStaging('ckPayoruser')");
    ResetStep();
    $('.rdPortal').iCheck('check');
    $('.rdUserType').iCheck('check');

}

var isViewDisable = false;//using disable payor checkbox when view payor
function btnVieworEdit_Click(id, isEditable) {
    if (isEditable == false) {
        $(".buttonAddNew").hide();
        $(".buttonEdit").show();
        $(".footer-modal-custom .btn").show();
    }
    else {
        $(".disableEdit").show();
        isViewDisable = true;
        $(".footer-modal-custom .btn").hide(); 
        $(".btn-default").show();
    }
    $("#demo5 a[href='#UserAccount']").click();

    $("#txtUserNameEdit").prop('readonly', true);
    $.ajax({
        url: '../api/User/GetUsers_Select_ByID?userID=' + id + '',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (OutPut) {
            //var OutPut = $.parseJSON(data);
            $("#txtUserFirstNameEdit").val(OutPut[0]["FirstName"]);
            $("#hdUserIDEdit").val(id);
            $("#txtUserLastNameEdit").val(OutPut[0]["LastName"]);
            $('[id=spUserName]').text(OutPut[0]["UserName"]);
            $('[id=spFirstName]').text(OutPut[0]["FirstName"]);
            $('[id=spLastName]').text(OutPut[0]["LastName"]);
            $("#txtSocialSecurityNoEdit").val(OutPut[0]["SSN"]);
            $("#txtUserNameEdit").val(OutPut[0]["UserName"]);
           // $("#txtPasswordEdit").val(OutPut[0]["Password"]);
           // $("#txtRePasswordEdit").val(OutPut[0]["Password"]);
            $("#hdParentUserIDEdit").val(OutPut[0]["ParentUserID"]);
            $("#txtParentuserEdit").val(OutPut[0]["ParentUserName"]);
            $("#slquestionEdit").selectpicker('val', OutPut[0]["SecurityQuestion"]);
            $("#txtAnswerEdit").val(OutPut[0]["SecurityAnswer"]);
            
            if (OutPut[0]["IsActive"] == "False") {
                $('#chkArchiveEdit').iCheck('check');
            }

            $("#txtStreetEdit").val(OutPut[0]["Address1"]);
            $("#txtStateEdit").val(OutPut[0]["State"]);
            $("#txtCityEdit").val(OutPut[0]["City"]);
            $("#txtZipEdit").val(OutPut[0]["Zip"]);
            $("#txtEmailEdit").val(OutPut[0]["Email"]);
            $("#txtCellEdit").val(OutPut[0]["CellPhone"]);
            $("#txtPhoneEdit").val(OutPut[0]["HomePhone"]);
            $("#txtNotesEdit").val(OutPut[0]["UserNotes"]);
            if (OutPut[0]["CanViewPrivateNotes"] == "True") {
                $('#ckPrivateNoteEdit').iCheck('check');
            }
            if (OutPut[0]["ReceiveSystemAlert"] == "True") {
                $('#ckReceiveSystemAlertEdit').iCheck('check');
            }
            $(".opAccessEdit").each(function () {
                if (OutPut[0]["DataAccessID"] == $(this).val()) {
                    $(this).iCheck('check');
                    if (OutPut[0]["DataAccessID"] == 5)
                        selectdataaccess(5);
                }

            });
            if (OutPut[0]["Gender"] == 0) {
                $("#opFemaleEdit").iCheck('check');
            }
            else {
                $("#opMaleEdit").iCheck('check');
            }
            getuserparent(id, OutPut[0]["ParentUserID"]);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
    GetPortal(id);
    GetUserType(id);
    //getUserProvider(id);
    //getUserProviderStaging(id, 1);
    //getUserPayor(id);
    //getDataAccess(id);


    ///get payor,provider staging
}

function btnDelete_Click(a) {
    $('[id=popConfirm]').removeClass('md-show');
    $.ajax({
        type: 'POST',
        url: '../api/User/UserDelete?id=' + a + '',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == 1) {
                autohidenotify3s('success', 'bottom right', '', 'Deleted', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', 'Could not delete', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            btnSearchAdvange_Click(1);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function btnClose_Click() {
    var idTemp = $('[id=hdTempID]').val();
    $('[id=lblrole' + idTemp + ']').css("border-bottom", "0px solid");
    $(document.getElementById('btnPreviewListProvider')).hide();
    $(document.getElementById('btnPreviewListPayor')).hide();
    $('[id=tbDetailRole]').css({ "display": "none" });
    RestForm();
    flagpayor = 1;
    flagprovider = 1;
    $(".disableEdit").hide();
    isViewDisable = false;
}
///string ID, string ProductName, string QuantityPerUnit, string UnitPrice

function CheckUserName(textid) {
    var userName = $("#" + textid + "").val();
    var check = true;
    $.ajax({
        url: '../api/User/CheckUserName?userName=' + userName + '',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {
            if (data == 3) {
                autohidenotify3s('warning', 'bottom right', '', 'UserName already exists', '<span class="glyphicon glyphicon-chevron-down"></span>');
                $("#" + textid + "").parent().addClass("has-error");
                ResetStep();
                $(".easyWizardButtons .next").addClass("disabled");
                check = false;
            } else if (data == 2) {
                autohidenotify3s('warning', 'bottom right', '', 'UserName already exists. It was archived', '<span class="glyphicon glyphicon-chevron-down"></span>');
                $("#" + textid + "").parent().addClass("has-error");
                ResetStep();
                $(".easyWizardButtons .next").addClass("disabled");
                check = false;
            }
            else {
                $("#" + textid + "").parent().removeClass("has-error");
                $(".easyWizardButtons .next").removeClass("disabled");
                check = true;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
            check = false;
        }
    });

    return check;
}

function GetPortal(id) {
    $.ajax({
        type: 'GET',
        url: '../api/User/User_Portal_Select_ByUserID?userID=' + id + '',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {
            var app = "";
            var appedit = "";
            for (var i = 0; i < data.length; i++) {
                var check = "";
                if (data[i]["IsSelect"] == 1)
                    check = "checked='checked'";
                app += "<div class='radio iradio'><label><input type='radio' class='rdPortal' name='rdPortal' id='opPortal" + data[i]["PortalID"] + "' value='" + data[i]["PortalID"] + "' " + check + ">&nbsp;&nbsp;" + data[i]["PortalName"] + "</label></div>";
                appedit += "<div class='radio iradio'><label><input type='radio' class='rdPortalEdit' name='rdPortalEdit' id='opPortalEdit" + data[i]["PortalID"] + "' value='" + data[i]["PortalID"] + "' " + check + ">&nbsp;&nbsp;" + data[i]["PortalName"] + "</label></div>";
            }
            $("#divPortal").html('');
            $("#divPortal").append(app);
            $("#divPortalEdit").html('');
            $("#divPortalEdit").append(appedit);
            $('input[type=radio]').iCheck({
                radioClass: 'iradio_square-aero',
                increaseArea: '20%' // optional
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("Error" + textStatus);
        }
    });

}

function GetUserType(id) {
    $.ajax({
        url: '../api/User/User_UserTypes_Select_ByUserID?userID=' + id + '',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {
            var app = "";
            var appEdit = "";
            for (var i = 0; i < data.length; i++) {
                var check = "";
                if (data[i]["IsSelect"] == 1)
                    check = "checked='checked'";
                app += "<div class='radio iradio'><label><input type='radio' class='rdUserType' name='rdUserType' id='opUser" + data[i]["UserTypeID"] + "' value='" + data[i]["UserTypeID"] + "' " + check + ">&nbsp;&nbsp;" + data[i]["UserTypeName"] + "</label></div>";
                appEdit += "<div class='radio iradio'><label><input type='radio' class='rdUserTypeEdit' name='rdUserTypeEdit' id='opUserEdit" + data[i]["UserTypeID"] + "' value='" + data[i]["UserTypeID"] + "' " + check + ">&nbsp;&nbsp;" + data[i]["UserTypeName"] + "</label></div>";

            }
            $("#divusertype").html('');
            $("#divusertype").append(app);
            $("#divusertypeEdit").html('');
            $("#divusertypeEdit").append(appEdit);
            $('input[type=radio]').iCheck({
                radioClass: 'iradio_square-aero',
                increaseArea: '20%' // optional
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("Error" + textStatus);
        }
    });

}

function btnsubmituser() {

    if (checkRequire('requiretext') != 0) {
        $(document.getElementById('btnPreviewListProvider')).hide();
        $(document.getElementById('btnPreviewListPayor')).hide();
        ResetStep();
        return false;
    }

    if (!CheckUserName("txtUserName")) {
        $('#txtUserName').focus();
        $('#txtUserName').select();
        //  alert("test");
        return false;
    }
    var FirstName = $("#txtUserFirstName").val();
    var LastName = $("#txtUserLastName").val();
    var SocialSecurityNo = $("#txtSocialSecurityNo").val();
    var UserName = $("#txtUserName").val();
    var Password = $("#txtPassword").val();
    var Parent = $("#txtParent").val();
    var Question = $("#slQuestion").val();
    var Answer = $("#txtAnswer").val();
    var Street = $("#txtStreet").val();
    var State = $("#txtState").val();
    var City = $("#txtCity").val();
    var Zip = $("#txtZip").val();
    var Email = $("#txtEmail").val();
    var Cell = $("#txtCell").val();
    var Phone = $("#txtPhone").val();
    var Notes = $("#txtNotes").val();
    var Record = $("[name=hdRecordID]").val();
    var PrivateNotes = false;
    if ($('#ckPrivateNote').is(':checked')) {
        PrivateNotes = true;
    }
    var ReceiveSystem = false;
    if ($('#ckReceiveSystemAlert').is(':checked')) {
        ReceiveSystem = true;
    }
    var Gender = 0;
    $('.rdGender').each(function () {
        if ($(this).is(':checked')) {
            Gender = $(this).val();

        }
    });

    var UserType = "";
    $('.rdUserType').each(function () {
        if ($(this).is(':checked')) {
            UserType = $(this).val();

        }
    });

    var UserPortal = "";
    $('.rdPortal').each(function () {
        if ($(this).is(':checked')) {
            UserPortal = $(this).val();

        }
    });

    var AccessData = "";
    $('.opAccessData').each(function () {
        if ($(this).is(':checked')) {
            AccessData = $(this).val();

        }
    });

    //var ParentUser = [];
    var UserRole = [];
    var DataAcessList = [];
    var UserProviderList = [];

    var ParentUser = $.trim($("#hdParentUserID").val()) == "" ? 0 : $.trim($("#hdParentUserID").val());
    //if ( != "" && $("#hdParentUserID").val()!=null)
    //var splitparent = ($("#hdParentUserID").val()).split(',');
    //for (var i = 0; i < splitparent.length; i++) {
    //    var ObjParentUser = new Object();
    //    ObjParentUser.ParentUserID = splitparent[i];
    //    ParentUser.push(ObjParentUser);
    //}
    var chekingRole = 0;
    $('.ckuserrole').each(function () {
        if ($(this).is(':checked')) {
            chekingRole = 1;
            var UserRoleValue = $(this).val();
            var ObjUserRole = new Object();
            ObjUserRole.RoleID = UserRoleValue;
            UserRole.push(ObjUserRole);

        }
    });

    $('.UserDataaccess').each(function () {
        if ($(this).is(':checked')) {
            var UserDataValue = $(this).val();
            var ObjUserData = new Object();
            ObjUserData.AccessUserID = UserDataValue;
            DataAcessList.push(ObjUserData);

        }
    });

    //var chekingprovider = 0;
    //$('.ckprovideruser').each(function () {
    //    if ($(this).is(':checked')) {
    //        chekingprovider = 1;
    //        var UserProviderValue = $(this).val();
    //        var ObjUserProvider = new Object();
    //        ObjUserProvider.ProviderID = UserProviderValue;
    //        UserProviderList.push(ObjUserProvider);
    //    }
    //});
    if (chekingRole == 0) {
        $(document.getElementById('btnPreviewListProvider')).hide();
        $(document.getElementById('btnPreviewListPayor')).hide();
        autohidenotify3s('warning', 'bottom right', '', 'Please Choose Roles!', '<span class="glyphicon glyphicon-chevron-down"></span>');
        $(".prev").click();
        $(".prev").click();
        $(".prev").click();
        $(".prev").click();
        return false;
    }

    //if (chekingprovider == 0 || Record == "") {
    //    autohidenotify3s('warning', 'bottom right', '', 'Please Choose Provider!', '<span class="glyphicon glyphicon-chevron-down"></span>');
    //    $(".prev").click();
    //    return false;
    //}

    var UserInformations = new Object();
    UserInformations.FirstName = FirstName;
    UserInformations.LastName = LastName;
    UserInformations.SocialSecurityNo = SocialSecurityNo;
    UserInformations.UserName = UserName;
    UserInformations.Password = Password;
    UserInformations.Question = Question;
    UserInformations.Answer = Answer;
    UserInformations.Street = Street;
    UserInformations.State = State;
    UserInformations.City = City;
    UserInformations.Zip = Zip;
    UserInformations.Email = Email;
    UserInformations.Cell = Cell;
    UserInformations.Phone = Phone;
    UserInformations.Notes = Notes;
    UserInformations.Gender = Gender;
    UserInformations.AccessData = AccessData;
    UserInformations.UserType = UserType;
    UserInformations.UserPortal = UserPortal;
    UserInformations.ParentUser = ParentUser;
    UserInformations.UserRole = UserRole;
    UserInformations.DataAcessList = DataAcessList;
    UserInformations.UserProviderList = UserProviderList;
    UserInformations.Record = Record;
    UserInformations.PrivateNotes = PrivateNotes;
    UserInformations.ReceiveSystem = ReceiveSystem;

    $.ajax({
        type: 'POST',
        url: '../api/User/UserInsert',
        data: JSON.stringify(UserInformations),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {

            if (data == 1) {
                autohidenotify3s('success', 'bottom right', '', 'Saved.', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', 'Save failed.', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            //$('[id=txtAddRoleName],[id=txtAddDescription]').val('');
            //$('button.close').click();
            btnClose_Click();
            btnSearchAdvange_Click(1);
            ResetStep();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');

        }
    });
    return false;
}

/////save user

function btnForcePassChange_Click(close) {
    var repass = $("#txtRePasswordEdit").val();
    var Password = $("#txtPasswordEdit").val();
    if (Password != "" && Password != repass) {
        autohidenotify3s('warning', 'bottom right', '', 'Password does not match ', '<span class="glyphicon glyphicon-chevron-down"></span>');
        return false;
    }
    if (!validate(Password)) {
        autohidenotify3s('warning', 'bottom right', '', 'Password format is incorrect ', '<span class="glyphicon glyphicon-chevron-down"></span>');
        $('#popoverExampleTwoHiddenContent').removeClass('hidden');
        $("#txtPasswordEdit").parent().addClass("has-error");
        $('#txtPasswordEdit').focus();
        $("#txtPasswordEdit").select();
        return false;
    }
    var UserID = $("#hdUserIDEdit").val();
    var UserInformations = new Object();
    UserInformations.UserID = UserID;
    UserInformations.Password = Password;
    $.ajax({
        type: 'POST',
        url: '../api/User/AdminForceChange',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(UserInformations),
        success: function (data) {
            if (data == 1) {
                autohidenotify3s('success', 'bottom right', '', 'Password changed.', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', 'Password change failed', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            if (close == true) {
                $('.close').click();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function btnSaveUserEdit_Click(isclose) {
    if (checkRequire('requiretextEdit') != 0) {
        //ResetStep();
        return false;
    }
    var DataAccessID = 0;
    $('.opAccessEdit').each(function () {
        if ($(this).is(':checked')) {
            DataAccessID = $(this).val();

        }
    });

    var UserTypeID = 0;
    $('.rdUserTypeEdit').each(function () {
        if ($(this).is(':checked')) {
            UserTypeID = $(this).val();

        }
    });
    var Gender = 0;
    $('.rdGenderEdit').each(function () {
        if ($(this).is(':checked')) {
            Gender = $(this).val();

        }
    });
    var FirstName = $("#txtUserFirstNameEdit").val();
    var LastName = $("#txtUserLastNameEdit").val();
    var SSN = $("#txtSocialSecurityNoEdit").val();
    var Parent = $("#txtParentEdit").val();
    var Address1 = $("#txtStreetEdit").val();
    var Address2 = $("#txtStreetEdit").val();
    var State = $("#txtStateEdit").val();
    var City = $("#txtCityEdit").val();
    var Zip = $("#txtZipEdit").val();
    var Email = $("#txtEmailEdit").val();
    var Password = $("#txtPassword").val();

    var PrivateNotes = false;
    if ($('#ckPrivateNoteEdit').is(':checked')) {
        PrivateNotes = true;
    }
    var ReceiveSystem = false;
    if ($('#ckReceiveSystemAlertEdit').is(':checked')) {
        ReceiveSystem = true;
    }
    Email = $.trim(Email);
    if (!isValidEmail(Email) && $.trim(Email) != "") {
        autohidenotify3s('warning', 'bottom right', '', 'Email format is incorrect ', '<span class="glyphicon glyphicon-chevron-down"></span>');
        $("#txtEmailEdit").parent().addClass("has-error");
        //$(".easyWizardButtons .next").css({ "display": "none" });
        return false;
    } else {
        $("#txtEmailEdit").parent().removeClass("has-error");
        //$(".easyWizardButtons .next").css({ "display": "" });

    }
    var Cell = $("#txtCellEdit").val();
    var Phone = $("#txtPhoneEdit").val();
    var UserNotes = $("#txtNotesEdit").val();
    var UserID = $("#hdUserIDEdit").val();
    //list parent
    var ParentUser = $.trim($("#hdParentUserIDEdit").val()) == "" ? 0 : $.trim($("#hdParentUserIDEdit").val());
    //if ($("#hdParentUserIDEdit").val() != "" && $("#hdParentUserIDEdit").val() != null) {
    //    var splitparent = ($("#hdParentUserIDEdit").val()).split(',');
    //    for (var i = 0; i < splitparent.length; i++) {
    //        var ObjParentUser = new Object();
    //        ObjParentUser.ParentUserID = splitparent[i];
    //        ParentUser.push(ObjParentUser);
    //    }
    //}

    var IsActive = true;
    if ($('#chkArchiveEdit').is(':checked')) {
        IsActive = false;
    }
    var UserInformations = new Object();
    UserInformations.FirstName = FirstName;
    UserInformations.LastName = LastName;
    UserInformations.SSN = SSN;
    UserInformations.Address1 = Address1;
    UserInformations.Address2 = Address2;
    UserInformations.State = State;
    UserInformations.City = City;
    UserInformations.Zip = Zip;
    UserInformations.Email = Email;
    UserInformations.Cell = Cell;
    UserInformations.State = State;
    UserInformations.Phone = Phone;
    UserInformations.UserNotes = UserNotes;
    UserInformations.UserID = UserID;
    UserInformations.Gender = Gender;
    UserInformations.UserTypeID = UserTypeID;
    UserInformations.DataAccessID = DataAccessID;
    UserInformations.ParentUser = ParentUser;
    UserInformations.PrivateNotes = PrivateNotes;
    UserInformations.ReceiveSystem = ReceiveSystem;
    UserInformations.Password = Password;
    UserInformations.IsActive = IsActive;
    $.ajax({
        type: 'POST',
        url: '../api/User/UserUpdate',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(UserInformations),
        async: false,
        success: function (data) {

            if (data == 1) {
                autohidenotify3s('success', 'bottom right', '', msgSaved, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', msgSavedF, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }

            btnSearchAdvange_Click(1);
            if (isclose == true) {
                $('.close').click();
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });

}

function UpdateUserRole() {
    var UserRole = [];
    $('.ckuserroleEdit').each(function () {
        if ($(this).is(':checked')) {
            var UserRoleValue = $(this).val();
            var ObjUserRole = new Object();
            ObjUserRole.RoleID = UserRoleValue;
            UserRole.push(ObjUserRole);

        }
    });
    var UserID = $("#hdUserIDEdit").val();
    var UserInformations = new Object();
    UserInformations.UserRole = UserRole;
    UserInformations.UserID = UserID;

    $.ajax({
        type: 'POST',
        url: '../api/User/UserRoleUpdate',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(UserInformations),
        success: function (data) {
            if (data == 1) {
                autohidenotify3s('success', 'bottom right', '', msgSaved, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', msgSavedF, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            btnSearchAdvange_Click(1);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function UpdateUserPortal() {
    var UserPortal = "";
    $('.rdPortalEdit').each(function () {
        if ($(this).is(':checked')) {
            UserPortal = $(this).val();

        }
    });
    var UserID = $("#hdUserIDEdit").val();
    var UserInformations = new Object();
    UserInformations.UserPortal = UserPortal;
    UserInformations.UserID = UserID;

    $.ajax({
        type: 'POST',
        url: '../api/User/UserPortalUpdate',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(UserInformations),
        success: function (data) {

            if (data == 1) {
                autohidenotify3s('success', 'bottom right', '', msgSaved, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', msgSavedF, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }

            btnSearchAdvange_Click(1);


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function PayorViewClick() {
    BindTablePayorStaging('tbPayorstaging', UserPayorData);
}

function ProviderViewClick() {
    //var UserID = $("#hdUserIDEdit").val();
    //getUserProviderStaging(UserID, flagprovider)
}

function UpdateUserProVider(isclose) {
    var RecordID = $("[name=hdRecordID]").val();
    var UserID = $("#hdUserIDEdit").val();
    var checking = 0;
    $('.ckprovideruserEdit').each(function () {
        if ($(this).is(':checked')) {
            checking = 1;
        }
    });

    if (checking == 0 || RecordID == "") {
        autohidenotify3s('warning', 'bottom right', '', 'Please Choose Provider!', '<span class="glyphicon glyphicon-chevron-down"></span>');
        return false;
    }

    var UserProvider = new Object();
    UserProvider.RecordID = RecordID;
    UserProvider.UserID = UserID;


    $.ajax({
        type: 'POST',
        url: '../api/User/UserProviderUpdate',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(UserProvider),
        success: function (data) {
            $("#demo5 a[href='#ProviderInformation']").click();
            if (data == 1) {
                autohidenotify3s('success', 'bottom right', '', msgSaved, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', msgSavedF, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            if (isclose == true) {
                $('.close').click();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });

}

function convertUserPayorUpdate(DataTable) {
    var result = "<root>";
    for(var item in DataTable) {
        result += "<column>";
        result += "<PayorID>" + DataTable[item].PayorID + "</PayorID>";
        result += "<isSelect>" + DataTable[item].isSelect + "</isSelect>";
        result += "</column>";
    }
    result += "</root>";
    if ($.trim(result) == "<root></root>")
        result = "";

    return result;
}

function UpdateUserPayor(isclose) {
    var UserID = $("#hdUserIDEdit").val();
    var checking = 0;
    $('.ckPayoruserEdit').each(function () {
        if ($(this).is(':checked')) {
            checking = 1;
        }
    });
    
    var checkAll = $('[id=ckPayorUserAll]').is(':checked');

    if ((UserPayorData == null || UserPayorData.length == 0) && !checkAll) {
        autohidenotify3s('error', 'bottom right', '', 'No Updates were made!', '<span class="glyphicon glyphicon-chevron-down"></span>');
        return false;
    }

    if (!checkAll) {
        UserPayorData = [];
        $('.ckPayoruser').each(function () {
            if ($(this).is(':checked')) {
                var value = $(this).val();
                var tmp = value.split(";;;");
                var PayorID = tmp[0];
                var checked = $(this).is(":checked");
                var Name = tmp[1];

                UserPayorData.push({ "PayorID": PayorID, "isSelect": checked, "Name": Name, "OriValue": !checked });

            }
        });
    }
    
    //if ((UserPayorData == null || UserPayorData.length == 0) && checkAll != true) {
    //    autohidenotify3s('error', 'bottom right', '', 'No Updates were made!', '<span class="glyphicon glyphicon-chevron-down"></span>');
    //    return false;
    //}

    var UserPayor = new Object();
    UserPayor.UserID = UserID;
    UserPayor.PayorChanges = convertUserPayorUpdate(UserPayorData);
    UserPayor.CheckAll = checkAll;
    $.ajax({
        type: 'POST',
        url: '../api/User/UserPayorUpdate',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(UserPayor),
        success: function (data) {
            if (data == 1) {
                UserPayorData = [];
                autohidenotify3s('success', 'bottom right', '', msgSaved, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', msgSavedF, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            if (isclose == true) {
                $('.close').click();
            }
            else { $("#demo5 a[href='#PayorInformation']").click(); }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });

}

function getDataAccess(id) {
    $.ajax({
        url: '../api/User/User_DataAcessList_Select_ByUserID?userID=' + id + '',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (datas) {
            //var datas = $.parseJSON(data);
            if (datas.length > 0) {
                var userdataacess = "";
                for (var j = 0; j < datas.length ; j++) {
                    if (datas[j]["IsSelect"] == "1") {
                        //alert(datas[j]["id"]);
                        userdataacess += datas[j]["id"];
                        if (j < datas.length - 1)
                            userdataacess += ",";
                    }
                }
                $('#hdUserAcessList').val(userdataacess);

                getColumnIndexByName = function (grid, columnName) {
                    var cm = grid.jqGrid('getGridParam', 'colModel'), i, l;
                    for (i = 0, l = cm.length; i < l; i += 1) {
                        if (cm[i].Name === columnName) {
                            return i; // return the index
                        }
                    }
                    return -1;
                },
                    grid = $(".treegrid");
                grid.jqGrid({
                    datatype: "jsonstring",
                    datastr: datas,
                    colNames: ["", "User"],
                    colModel: [

                        { name: 'id', index: 'id', align: "left", formatter: 'checkbox', formatoptions: { disabled: false } },
                         { name: 'Name', index: 'Name', align: "left" },

                    ],
                    height: '400px',
                    width: '400px',
                    gridview: true,
                    scrollrows: true,
                    rowNum: 10000,
                    //sortname: 'Name',
                    treeGrid: true,
                    treeGridModel: 'adjacency',
                    treedatatype: "local",
                    ExpandColumn: 'id',
                    caption: "",
                    jsonReader: {
                        repeatitems: false,
                        root: function (obj) { return obj; },
                        page: function (obj) { return 1; },
                        total: function (obj) { return 1; },
                        records: function (obj) { return obj.length; }
                    },
                    loadComplete: function () {
                        $('input[type="checkbox"]').iCheck({
                            checkboxClass: 'icheckbox_square-aero',
                            increaseArea: '10%' // optional
                        });

                        $(".treegrid .jqgfirstrow").remove();
                        $(".treegrid thead").remove();
                        $(".treegrid tbody tr").css({ "height": "29px" });
                        $("#divChart div,#divChart table").not("table div").css({ "width": "100%" });
                        $("#divChartEdit div,#divChartEdit table").not("table div").css({ "width": "100%" });
                        $(".ui-jqgrid-hbox").css({ "padding-right": "0px !important" });
                        $('.treegrid input[type=checkbox]').iCheck('uncheck');
                        $('#divChartEdit table input[type=checkbox]').addClass('UserDataaccessEdit');
                        $('#divChart table input[type=checkbox]').addClass('UserDataaccess');

                        //var iCol = getColumnIndexByName($(this), 'id'), rows = this.rows, i, c = rows.length;
                        //for (i = 0; i < c; i += 1) {
                        //    $(rows[i].cells[iCol]).click(function (e) {
                        //        var id = $(e.target).closest('tr')[0].id, isChecked = $(e.target).is(':checked');
                        //    //    alert("checked:" + isChecked);
                        //    //    //you can also get the values of the row data
                        //    //    alert('clicked on the checkbox in the row with id=' + id + '\nNow the checkbox is ' + (isChecked ? 'checked' : 'not checked'));
                        //    });
                        //}
                        //alert($('#hdUserAcessList').val());
                    }
                }); //.jqGrid('filterToolbar', {stringResult: true, searchOnEnter: true, defaultSearch: 'cn'});;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });

}

function isReview(selector) {
    console.log(selector);
    $(document.getElementsByClassName(selector)).iCheck('ifChanged', function () {
        var counter = 0;
        $(document.getElementsByClassName(selector)).each(function (index) {
            var isChecked = $(this).is(':checked');
            isChecked == true ? counter++ : counter = counter;
        });
        if (counter > 0) {
            $(('.btn-preview.' + selector + 'btn')).show();
        }
        else {
            $(('.btn-preview.' + selector + 'btn')).hide();
        }

    });
}

///check validate
function validate(password) {
    var minMaxLength = /^[\s\S]{8,32}$/,
        upper = /[A-Z]/,
        lower = /[a-z]/,
        number = /[0-9]/,
        special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

    if (minMaxLength.test(password) &&
        upper.test(password) &&
        lower.test(password) &&
        number.test(password) &&
        special.test(password)
    ) {
        return true;
    }

    return false;
}

function isValidationNumber(EleId) {
    $('.' + EleId + '').keypress(function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode == 59 || charCode == 46) {
            return true;
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
    });
}

function RestForm() {
    $("#New input[type=text],#Edit input[type=text],#Edit input[type=password],#New input[type=password],#Edit input[type=search],#New input[type=search],#Edit textarea,#New textarea").val('');
    $("#New input[type=hidden],#Edit input[type=hidden]").val('');
    $("#slParentuser").val('');
    $("[name=hdRecordID]").val("");
    $(".easyWizardButtons .prev,.easyWizardButtons .next").removeClass("disabled");
    $("#txtEmail").parent().removeClass("has-error");
    $("#txtEmailEdit").parent().removeClass("has-error");
    $("#txtUserName").parent().removeClass("has-error");
    $('.requiretext').parent().removeClass("has-error");
    $('#divChartEdit').html('');
    $('#divChartEdit').append(' <table id="treegridEdit" class="treegrid"></table>');
    $('#divChart').html('');
    $('#divChart').append(' <table id="treegrid" class="treegrid"></table>');
    $('.ckprovideruser,.ckPayoruser,.ckPayorUserAll,#ckPrivateNote,#ckReceiveSystemAlert,#ckPrivateNoteEdit,#ckReceiveSystemAlertEdit,#chkArchiveEdit').iCheck('uncheck');
    $('.opAccessData[value=2]').iCheck('check');

    $('[id=ckPayorUserAll]').removeClass("disabled");
    $('[id=ckPayorUserAll]').iCheck('uncheck');
}

function Checkemail(textid) {
    $("#" + textid + "").blur(function () {
        var v = $("#" + textid + "").val();

        if (!isValidEmail(v) && $.trim(v) != "") {
            autohidenotify3s('warning', 'bottom right', '', 'Email format is incorrect ', '<span class="glyphicon glyphicon-chevron-down"></span>');
            $("#" + textid + "").parent().addClass("has-error");
            $(".easyWizardButtons .prev,.easyWizardButtons .next").addClass("disabled");
        } else {
            $("#" + textid + "").parent().removeClass("has-error");
            $(".easyWizardButtons .prev,.easyWizardButtons .next").removeClass("disabled");
        }
    });
}

function ResetStep() {
    ///reset wizardsteps
    $(".easyWizardSteps li").removeClass("current");
    $(".easyWizardSteps li").eq(0).addClass("current");
    $(".easyWizardWrapper section").removeClass("active");
    $(".easyWizardWrapper [data-step=1]").addClass("active");
    $(".easyWizardWrapper [data-step=1]").parent().css({ "margin-left": "0" });
    $(".easyWizardWrapper [data-step=1]").css({ "height": "" });
    $(".easyWizardButtons .prev,.easyWizardButtons .submit").css({ "display": "none" });
    $(".easyWizardButtons .next").css({ "display": "" });
}

//function DeleteProviderStaging(providerID) {
//    flagprovider = 0;
//    var record = $("[name=hdRecordID]").val();
//    $.ajax({
//        url: '../api/User/UserProviderDeleteStaging?recordID=' + record + '&providerID=' + providerID + '',
//        dataType: 'json',
//        contentType: 'application/json; charset=utf-8',
//        success: function (data) {
//            $('input.ckprovideruserEdit').each(function () {
//                if ($(this).val() == providerID) {
//                    $(this).iCheck("uncheck");
//                }
//            });
//            $('input.ckprovideruser').each(function () {
//                if ($(this).val() == providerID) {
//                    $(this).iCheck("uncheck");
//                }
//            });
//            //if (data == 1) {
//            //    autohidenotify3s('success', 'bottom right', '', 'Deleted', '<span class="glyphicon glyphicon-chevron-down"></span>');
//            //}
//            //else {
//            //    autohidenotify3s('error', 'bottom right', '', 'Could not delete', '<span class="glyphicon glyphicon-chevron-down"></span>');
//            //}
//            ProviderViewClick()
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            var err = eval("(" + XMLHttpRequest.responseText + ")");
//            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
//        }
//    });
//}

function UpdateUserDataaccesslist() {
    var UserDataaccesslist = [];

    $('.UserDataaccessEdit').each(function () {
        if ($(this).is(':checked')) {
            var UserDataaccesslistValue = $(this).val();
            var ObjUserDataaccesslist = new Object();
            ObjUserDataaccesslist.AccessUserID = UserDataaccesslistValue;
            UserDataaccesslist.push(ObjUserDataaccesslist);

        }
    });
    var UserID = $("#hdUserIDEdit").val();
    var UserInformations = new Object();
    UserInformations.AccessUserID = UserDataaccesslist;
    UserInformations.UserID = UserID;

    $.ajax({
        type: 'POST',
        url: '../api/User/UserDataaccessListUpdate',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(UserInformations),
        success: function (data) {

            if (data == 1) {
                autohidenotify3s('success', 'bottom right', '', msgSaved, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', msgSavedF, '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function checkRequire(classcheck) {
    var check = 0;
    $("." + classcheck + "").each(function () {
        if ($.trim($(this).val()).length == 0) {
            $(this).parent().addClass("has-error");
            check = 1;
            $(this).focus();
        }
        else {
            $(this).parent().removeClass("has-error");
            if (check > 0)
                check = 1;
        }
    });
    return check;
}

function bindDataDropdowlistState(idState) {
    $.ajax({
        dataType: 'JSON',
        type: 'POST',
        url: '../api/Library/ReadFileState',
        success: function (data) {
            var lstPayor = $.parseJSON(data);
            $(idState).typeahead({
                minLength: 2,
                order: "asc",
                template: "{{display}}",
                source: {
                    display: "NAME",
                    data: lstPayor,
                    template: "<b>{{NAME}}</b>",
                },
                callback: {
                    onClickAfter: function (node, a, item, event) {
                    },
                },
                debug: false
            });

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

/////auto parent
function GetAutoParentUser(txtbox, data, txthiden) {
    $('#' + txtbox + '').typeahead({
        minLength: 2,
        order: "asc",
        template: "{{display}}",
        source: {
            display: "UserName",
            data: data,
            template: "{{UserName}}",
        },
        callback: {
            onResult: function (node, query, obj, objCount) {
                if ((objCount == 0 && query.length > 2)) {
                    $('.' + txtbox + ' .txttypehead-listEdit').each(function () {
                        this.style.setProperty('display', 'inline', 'important');
                    });
                } else if (objCount == 0 && query.length == 2) {
                    $('.' + txtbox + ' .txttypehead-listEdit').each(function () {
                        this.style.setProperty('display', 'none', 'important');
                    });
                } else {
                    $('.' + txtbox + ' .txttypehead-listEdit').each(function () {
                        this.style.setProperty('display', 'none', 'important');
                    });
                }
            },
            onClickAfter: function (node, a, item, event) {

                var itemp = $.parseJSON("[" + JSON.stringify(item) + "]");

                $('#' + txthiden + '').val(itemp[0]["ParentUserID"]);
            },

        },
        debug: false
    });
}
