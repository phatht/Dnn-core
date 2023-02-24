/**Start of Popup Support Form**/
/**Global Vars**/
var optStages = [];
var suppDropzone = null;
var objTicket = {};
var valid = true;
/**End of Global Vars**/

$(document).ready(function () {
    $('#frmTicketSupport').focus();
    showPopupSupport();
    $('.datepicker-search').datepicker().on('changeDate', function (e) {
        $(".datepicker .day").click(function () {
            $('.datepicker').hide();
        });
    });
    $('.datepicker-search').mask('99/99/9999');
    $('#txtUserPhone').mask('(999) 999-9999');
    var date = moment().format('MM/DD/YYYY');
    $('.datepicker-search').val(date);
    $('#spUserRequestDate').text(date);
});

Dropzone.options.divSupportAttachmentInput = false;
Dropzone.options.divSupportAttachmentInput = {
    url: "../../api/Authorization/uploadTicketFiles",
    method: 'POST',
    maxFiles: 5,
    uploadMultiple: false,
    addRemoveLinks: true,
    removedfile: function (file) {
        var f = file.previewElement.id;
        deleteAttachment(f, true);
        var _ref;
        return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
    },
    acceptedFiles: 'image/*',
    init: function () {
        this.on("success", function (data, res) {
            if (res.indexOf(';') > 0) {
                var arr = res.split(';');
                for (var i = 0; i < arr.length; i++) {
                    objTicket.Files.push(arr[i]);
                    data.previewElement.id = arr[i];
                }
            } else {
                objTicket.Files.push(res);
                data.previewElement.id = res;
            }
        });
    }
};

function getParameterByName(name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function deleteAttachment(f, boolMsg) {
    $.ajax({
        type: 'POST',
        data: { Name: f },
        url: '../../api/Authorization/removeTicketFiles',
        success: function (data) {
            var Output = $.parseJSON(data);
            if (Output == 1) {
                if (boolMsg) {
                    autohidenotify3s('success', 'bottom right', '', 'File has been removed.', '<span class="glyphicon glyphicon-chevron-down"></span>');
                }
                objTicket.Files = $.grep(objTicket.Files, function (value) {
                    return value != f;
                });
            } else {
                autohidenotify3s('error', 'bottom right', '', 'An error has occurred.', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function showPopupSupport() {
    $('#divSuppTickAttach').hide();
    objTicket.URL = encodeURIComponent(window.location.href);
    objTicket.Referral = encodeURIComponent(document.referrer != undefined ? document.referrer : "");
    objTicket.SystemInfo = navigator.userAgent;
    objTicket.Files = [];
    //$('[id=ticketFrame]').addClass('md-show');
    var url = window.location.toString();
    var arrParam = url.split('?');

    if (arrParam.length <= 1) {
        $('[id=ticketFrame]').addClass('md-show');
    } else {
        $('[id=ticketAuthFrame]').addClass('md-show');
        //GetAuthInfo(arrParam);
    }
    loadSelectControls();
    
}

function showTicketPanel(ID) {
    var panels = ["#bugInput", "#enhanceInput", "#userProInput", "#userExitInput", "#hcpcsInput", "#ndcInput"];
    for (var i = 0 ; i < panels.length; i++) {
        if (panels[i] == ID) {
            $(ID).show();
        } else {
            $(panels[i]).hide();
        }
    }
}

function handleTicketChange() {
    var ticketType = $('#selTicType :selected').val();
    switch (ticketType) {
        case "support":
            $('#spTicketOther').text('Questions');
            showTicketPanel("hideAll");
            $('#divSuppTickAttach').hide();
            break;
        case "bug":
            $('#spTicketOther').text('Notes');
            showTicketPanel("#bugInput");
            $('#divSuppTickAttach').show();
            break;
        case "enhance":
            $('#spTicketOther').text('Notes');
            showTicketPanel("#enhanceInput");
            $('#divSuppTickAttach').hide();
            break;
        case "ndc":
            $('#spTicketOther').text('Notes');
            showTicketPanel("#ndcInput");
            $('#divSuppTickAttach').hide();
            break;
        case "drug":
            $('#spTicketOther').text('Notes');
            showTicketPanel("#hcpcsInput");
            $('#divSuppTickAttach').hide();
            break;
        case "pro":
            $('#spTicketOther').text('Notes');
            showTicketPanel("#userProInput");
            $('#divSuppTickAttach').hide();
            break;
        case "exit":
            $('#spTicketOther').text('Notes');
            showTicketPanel("#userExitInput");
            $('#divSuppTickAttach').hide();
            break;
        default:
            processNotify("error", 5000, "Unknown Ticket Type");
            break;
    }
}

function loadSelectControls() {
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: '../../api/Stage/GetStagesList',
        async: true,
        success: function (data) {
            var Output = $.parseJSON(data);
            if (Output != "") {
                var options = '';
                for (var i = 0; i < Output.length; i++) {
                    options += '<option value="' + Output[i].StageID + '">' + Output[i].StageName + '</option>';
                    optStages.push({ id: Output[i].StageID, name: Output[i].StageName });
                }
                $("select#selBugARCStage").html(options);
                $('select#selBugARCStage').multiselect('rebuild');
                if (objTicket.Referral.indexOf("stageid") >= 0) {
                    var currentStage = getParameterByName("stageid", objTicket.Referral);
                    $('select#selBugARCStage').multiselect('select', currentStage);
                }
            }
            else {
                autohidenotify3s('error', 'bottom right', '', 'An error occurred while getting Stages.', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: '../../api/Stage/GetSubPanelsList',
        async: true,
        success: function (data) {
            var Output = $.parseJSON(data);
            if (Output != "") {
                var options = '';
                for (var i = 0; i < Output.length; i++) {
                    options += '<option value="' + Output[i].StageName + '">' + Output[i].StageName + '</option>';
                }
                $("select#selBugARCSubPanel").html(options);
                $('select#selBugARCSubPanel').multiselect('rebuild');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', 'An error occurred while getting Sub Panels.', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: '../../api/Role/Select',
        data: { OrderBy: "", PageNo: 1, PageSize: 150, Condition: { NAME: "" } },
        async: true,
        success: function (Output) {
            //var Output = $.parseJSON(data);
            if (Output.length > 0 ) {
                var options = '<option value="0">Select One</option>';
                for (var i = 0; i < Output.length; i++) {
                    options += '<option value="' + Output[i].RoleName + '">' + Output[i].RoleName + '</option>';
                }
                $("select#selUserAcctAccess").html(options);
                $('select#selUserAcctAccess').multiselect('rebuild');
            }
            else {
                autohidenotify3s('error', 'bottom right', '', 'An error occurred while getting Sub Panels.', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function validation(objTicket) {
    var error = '';
    if (objTicket.Type == 'pro') {
        if (objTicket.FirstName == '') {
            error += 'First Name is required.<br/>';
        }
        if (objTicket.LastName == '') {
            error += 'Last Name is required.<br/>';
        }
        if (objTicket.UserEmail == '') {
            error += 'Email is required.<br/>';
        }
        if (objTicket.DueDate == '') {
            error += 'Date Needed is required.<br/>';
        }
        if (objTicket.Role == '' || objTicket.Role == '0') {
            error += 'Role is required.<br/>';
        }
        if (objTicket.ApprovalBy == '') {
            error += 'Approval By is required.<br/>';
        }
        if (objTicket.ApprovalDate == '') {
            error += 'Approval Date is required.<br/>';
        }
    } else if (objTicket.Type == 'exit') {
        if (objTicket.FirstName == '') {
            error += 'First Name is required.<br/>';
        }
        if (objTicket.LastName == '') {
            error += 'Last Name is required.<br/>';
        }
        if (objTicket.InactiveDate == '') {
            error += 'Inactive Date is required.<br/>';
        }
    } else if (objTicket.Type == 'ndc') {
        if (objTicket.NDC == '') {
            error += 'NDC is required.<br/>';
        }
        if (!$.isNumeric(objTicket.AWP)) {
            error += 'AWP is required.<br/>';
        }
        if (!$.isNumeric(objTicket.ACQ340B)) {
            error += '340B Acquisition Cost is required.<br/>';
        }
        if (!$.isNumeric(objTicket.ACQ)) {
            error += 'Acquisition Cost is required.<br/>';
        }
        if (objTicket.Volume == '') {
            error += 'Volume is required.<br/>';
        }
        if (objTicket.Divisor == '') {
            error += 'Divisor is required.<br/>';
        }
    }
    if (error != '') {
        stickyNotify('error', 'bottom right', '', error, '<span class="glyphicon glyphicon-chevron-down"></span>');
        valid = false;
    }
}

function submitSupport() {
    $('[id=btnYes]').prop("disabled", true);
    processTicketData();
    if (valid) {
        processSupport();
        closeSupport();
    } else {
        valid = true;
        $('[id=btnYes]').prop("disabled", false);
    } 
}

function closeSupport() {
    $('[id=btnClose]').prop("disabled", false);
    //$('[id=ticketFrame]').removeClass('md-show');
    var url = window.location.toString();
    var arrParam = url.split('?');
    if (arrParam.length <= 1) {
        $('[id=ticketFrame]').removeClass('md-show');
    } else {
        $('[id=ticketAuthFrame]').removeClass('md-show');
    }

    parent.closeFrame();
}

function processSupport() {
    $.ajax({
        type: 'POST',
        url: '../../api/Dashboard/SendSupportMail',
        data: JSON.stringify(objTicket),
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (subData) {
            if (subData == 1) {
                parent.autohidenotify3s('success', 'bottom right', '', 'Ticket Email was sent.', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            parent.autohidenotify3s('error', 'bottom right', '', errorThrown, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function resolveOptStages(valStages) {
    var selStages = [];
    var len = valStages.length;
    var count = 0;
    for (var i = 0 ; i < optStages.length; i++) {
        if (valStages[count] == optStages[i].id) {
            selStages.push(optStages[i].name);
            count++;
            if (count >= len) {
                break;
            }
        }
    }
    return selStages;
}

function processTicketData() {
    var ticketType = $('#selTicType :selected').val();
    objTicket.Name = $('#spTicketFirstName').text() + ' ' + $('#spTicketLastName').text();
    var authLbl = $('#lblAuthorizationNumber', parent.document);
    if (authLbl != undefined) {
        objTicket.AuthNum = authLbl.text();
    }
    objTicket.Email = $.trim($('#txtTicketEmail').val());
    objTicket.Type = ticketType;
    objTicket.Notes = $.trim($('[id=txtTicketOther').val());
    objTicket.Subject = $.trim($('[id=txtTicketSubject').val());
    switch (ticketType) {
        case "bug":
            objTicket.Description = $.trim($('#txtBugDesc').val());
            objTicket.Stages = resolveOptStages($('#selBugARCStage').val());
            objTicket.Subpanels = $('#selBugARCSubPanel').val();
            objTicket.ReproduceBug = $("input[name=radRepBug]:radio").val();
            objTicket.ActualResult = $.trim($('#txtActResult').val());
            objTicket.BugSteps = $.trim($('#txtBugReprod').val());
            objTicket.ExpectedResult = $.trim($('#txtExpResult').val());
            break;
        case "enhance":
            objTicket.Reason = $.trim($('#txtReason').val());
            objTicket.Benefit = $.trim($('#txtBenefit').val());
            objTicket.AffectedClients = $.trim($('#txtAffectClients').val());
            objTicket.AffectUsers = $.trim($('#txtAffectUser').val());
            break;
        case "ndc":
            objTicket.NDC = $.trim($('#txtNDC').val());
            objTicket.AWP = $.trim($('#txtAWP').val());
            objTicket.ACQ340B = $.trim($('#txt340B').val());
            objTicket.ACQ = $.trim($('#txtACQ').val());
            objTicket.Volume = $.trim($('#txtVol').val());
            objTicket.Divisor = $.trim($('#txtDiv').val());
            objTicket.Brand = $('#selBrand :selected').val();
            objTicket.Description = $.trim($('#txtNDCDesc').val());
            objTicket.Relation = $.trim($('#txtRelHcpcs').val());
            validation(objTicket);
            break;
        case "drug":
            objTicket.HCPCS = $.trim($('#txtHCPCS').val());
            objTicket.ASP = $.trim($('#txtASP').val());
            objTicket.Unit = $.trim($('#txtUnit').val());
            objTicket.AutoBill = $("input[name=radBill]:radio").val();
            objTicket.Description = $.trim($('#txtHCPCSDesc').val());
            objTicket.Relation = $.trim($('#txtRelNDCs').val());
            break;
        case "pro":
            objTicket.RequestDate = $('#spUserRequestDate').text();
            objTicket.DueDate = $.trim($('#txtUserDueDate').val()); 
            objTicket.FirstName = $.trim($('#txtUserFirstName').val());
            objTicket.LastName = $.trim($('#txtUserLastName').val());
            objTicket.Portal = $("input[name=radPortal]:radio").val();
            objTicket.UserEmail = $.trim($('#txtUserEmail').val());
            objTicket.Job = $.trim($('#txtUserJob').val());
            objTicket.Phone = $.trim($('#txtUserPhone').val());
            objTicket.Team = $.trim($('#txtUserTeam').val());
            objTicket.Role = $('#selUserAcctAccess :selected').val();
            objTicket.ApprovalBy = $.trim($('#txtUserApproved').val());
            objTicket.ApprovalDate = $.trim($('#txtUserApprovalDate').val());
            validation(objTicket);
            break;
        case "exit":
            objTicket.FirstName = $.trim($('#txtExitFirstName').val());
            objTicket.LastName = $.trim($('#txtExitLastName').val());
            objTicket.UserName = $.trim($('#txtExitUserName').val());
            objTicket.InactiveDate = $.trim($('#txtUserInactiveDate').val());
            validation(objTicket);
            break;
        default:
            break;
    }
}

function cancelSupport() {
    var isInAuth = getParameterByName("isInAuth");
    if (isInAuth === "1") {
        $(".supportTicket", parent.document).toggleClass("open-supportTicket-bar");
        $(".bottom-auth", parent.document).css("width", "100%");
    }
    else {
        clearSupportForm();
        setTimeout(closeSupport(), 2000);
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function clearSupportForm() {
    if (objTicket.Files != undefined && objTicket.Files.length > 0) {
        for (var i = 0; i < objTicket.Files.length; i++) {
            try {
                $.ajax({
                    type: 'POST',
                    data: { Name: objTicket.Files[i] },
                    url: '../../api/Authorization/removeTicketFiles',
                    async: false,
                    success: function (data) {
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        var err = eval("(" + XMLHttpRequest.responseText + ")");
                        autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
                    }
                });
            } catch (except) {

            }
        }
    }
}
/**End of Popup Support Form**/

function GetAuthInfo(arrParam) {
    //var url = window.location.toString();
    //var arrParam = url.split('?');

    if (arrParam.length <= 1) return;

    var url = arrParam[1];
    var item = url.split('&');
    if (item.length <= 0) return;
    var id = item[0].split('=')[1];
    var StageID = item[1].split('=')[1];
    var IsCurrent = item[2].split('=')[1];
    var RouteStage = item[3].split('=')[1];

    //var id = getParameterByName("id") == "" ? 0 : getParameterByName("id");
    //var StageID = getParameterByName("stageid") == "" ? 0 : getParameterByName("stageid");
    //var IsCurrent = getParameterByName('current') == "" ? 0 : getParameterByName("current");
    //var RouteStage = getParameterByName('route') == "" ? 0 : getParameterByName("route");
    IsCurrent = parseInt(IsCurrent).toString() == "NaN" ? 0 : parseInt(IsCurrent).toString();
    id = parseInt(id).toString() == "NaN" ? 0 : parseInt(id).toString();
    StageID = parseInt(StageID).toString() == "NaN" ? 0 : parseInt(StageID).toString();

    
    $.ajax({
        dataType: 'JSON',
        url: '../api/Authorization/Authorization_GetByID/?AuthID=' + id + '&StageID=' + StageID + '&IsCurrent=' + IsCurrent + '&RouteStage=' + RouteStage + '',
        async: false,
        success: function (jData) {
            if (jData[0].Authorizations.length > 0) {
                
                var status = jData[0].Authorizations[0].Status;
                $(document.getElementById('h_valAuthoriationNumber')).text(jData[0].Authorizations[0].AuthorizationNumber);
                $(document.getElementById('h_valAuthStatus')).text(jData[0].Authorizations[0].Status).attr('class', status.toUpperCase() == 'APPROVED' ? 'label label-success' : 'label label-danger');
                $(document.getElementById('h_valAssignedUser')).text(jData[0].Authorizations[0].AssignUser).attr('title', jData[0].Authorizations[0].AssignedUserID);
                $(document.getElementById('h_valRequestProvider')).text(jData[0].Authorizations[0].RequestProvider_name).attr('title', jData[0].Authorizations[0].RequestProviderID);
                $(document.getElementById('h_valReferringProvider')).text(jData[0].Authorizations[0].ReferenceProvider_name).attr('title', jData[0].Authorizations[0].ReferenceProviderID);
                $(document.getElementById('h_valAssignedProvider')).text(jData[0].Authorizations[0].AssigProvider).val(jData[0].Authorizations[0].AssignedProviderID);
                $(document.getElementById('h_valPrimaryCareMD')).text(jData[0].Authorizations[0].Providers_name).attr('title', jData[0].Authorizations[0].Providers_name);
                $(document.getElementById('h_valMSO')).text(jData[0].Authorizations[0].mso_name);
                $(document.getElementById('h_valIPA')).text(jData[0].Authorizations[0].ipa_name).attr('title', jData[0].Authorizations[0].IPA);
                $(document.getElementById('h_valTTE')).text(parseDateString(jData[0].Authorizations[0].TTE));
                $(document.getElementById('h_valExpiration')).text(parseDateString(jData[0].Authorizations[0].ExpirationDate));
                $(document.getElementById('h_valRequestDate')).text(parseDateString(jData[0].Authorizations[0].RequestDate));
                $(document.getElementById('h_valStartDate')).text(parseDateString(jData[0].Authorizations[0].StartDate));
                $(document.getElementById('h_valPrimeReview')).text(jData[0].Authorizations[0].IsPrimeReview == 'False' ? 'No' : 'Yes');
                $(document.getElementById('h_val340B')).text(jData[0].Authorizations[0].P340B == 1 ? 'true' : 'false');
                $(document.getElementById('h_valHealthInsurance')).text(jData[0].Authorizations[0].PAYOR_NAME_DEL);
                $(document.getElementById('h_valInsuranceID')).text(jData[0].Authorizations[0].INSURANCE_ID);
                $(document.getElementById('h_valIsReview ')).text(jData[0].Authorizations[0].IsReview == 'False' ? 'No' : 'Yes');
                if (jData[1].Missing.length > 0) {
                    var missing = '';
                    $(jData[1].Missing).each(function (index) {
                        if (jData[1].Missing[index].IsSelected == '1')
                            missing += '<span class="label label-default lblMissing_' + jData[1].Missing[index].MissingDocumentID + '">' + jData[1].Missing[index].MissingDocumentName + '</span>';
                    });
                    $(document.getElementById('h_valMissingDocuments')).html(missing);
                }
                if (jData[2].ToDoList.length > 0) {
                    var todo = '';
                    $(jData[2].ToDoList).each(function (index) {
                        if (jData[2].ToDoList[index].IsSelected == '1')
                            todo += '<span class="label label-default lblToDoList_' + jData[2].ToDoList[index].ToDoListID + '">' + jData[2].ToDoList[index].ToDoListName + '</span>';
                    });
                    $(document.getElementById('h_valTodolist')).html(todo);
                }
            } else {
                autohidenotify3s('warning', 'bottom right', 'Warning', 'Data empty', '<span class="glyphicon glyphicon-chevron-down"></span>');
            }

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function parseDateString(str) {
    var mdy = (str.split(' '))[0].split('/');
    var date = mdy[1], month = mdy[0];
    if (parseInt(mdy[0]) <= 9) {
        month = "0" + mdy[0];
    }
    if (parseInt(mdy[1]) <= 9) {
        date = "0" + mdy[1];
    }
    return month + "/" + date + "/" + mdy[2];
}