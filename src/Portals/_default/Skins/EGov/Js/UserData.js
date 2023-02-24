var PayorPageSize = 1000;
var ProviderPageSize = 25;
var UserPageSize = 25;

var UserPayorData = null;
var UserProviderData = null;
var UserPayorSearch = new Object();

function processSearchPayor() {
    UserPayorSearch.Name = $('[id=txtSearchName]').val();
    //UserPayorSearch.Type = $('#slSearchPayType').val();
    UserPayorSearch.Type = "MSO";
    PayorPaging(1);
}

function InitPayorInformation() {
    UserPayorSearch.Name = "";
    UserPayorSearch.Type = "MSO";
    PayorPaging(1);
}

function chkPayorUserHandle(PayorID, checked, Name) {
    var added = false;
    checked = !checked;
    if (UserPayorData == null) {
        UserPayorData = [];
    } else {
        for (var item in UserPayorData) {
            if (UserPayorData[item].PayorID == PayorID) {
                if (!checked == UserPayorData[item].isSelect) {
                    UserPayorData.splice(item, 1);
                } else {
                    UserPayorData[item].isSelect = checked;
                }
                added = true;
                break;
            }
        }
    }
    if (!added) {
        UserPayorData.push({ "PayorID": PayorID, "isSelect": checked, "Name": Name, "OriValue": !checked });
    }
}

function btnSearchAdvange_Click(PageNo) {
    var selectObj = new Object();
    selectObj.OrderBy = '';
    selectObj.PageNo = PageNo;
    selectObj.PageSize = UserPageSize;
    var condition = new Object();
    var fistname = $.trim($('[id=txtSearchFirstName]').val()), OrderSQL = '';
    var lastname = $.trim($('[id=txtSearchLastName]').val());
    var SSN = $.trim($('[id=txtSearchSocialSecurityNo]').val());
    condition.fistName = fistname;
    condition.lastName = lastname;
    condition.SSN = SSN;
    selectObj.Condition = condition;
    $.ajax({
        url: '../api/User/Select',
        async: false,
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(selectObj),
        contentType: 'application/json; charset=utf-8',
        success: function (jData) {
            //var jData = $.parseJSON(data);
            var total = 0;
            if (jData.length > 0)
                total = jData[0].Total;
            BindUserTable('tbUser', jData, total, PageNo);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
    ///get data userrole
    $.ajax({
        dataType: 'JSON',
        url: '../api/User/GetUserRole?userID=' + 0 + '',
        success: function (data) {
            BindTableUserRole('tbUserRole', data);
            $("#tbUserRole_paginate").remove();
            $("#tbUserRole_filter").remove();
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}

function ProviderPaging(PageNo) {
    var UserID = $("#hdUserIDEdit").val();
    $.ajax({
        dataType: 'JSON',
        url: '../api/User/User_Provider_Select_ByUserID?userID=' + UserID + '&PageNo=' + PageNo + '&PageSize=' + ProviderPageSize,
        async: false,
        success: function (data) {
            var total = 0;
            if (data.length > 0) {
                total = data[0].Total;
            }
            BindTableProvider('tbProvider', data, total, PageNo, ProviderPageSize);
            BindTableProvider('tbProviderEdit', data, total, PageNo, ProviderPageSize);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function PayorPaging(PageNo) {
    var selectObj = new Object();
    var UserID = $("#hdUserIDEdit").val();
    selectObj.OrderBy = '';
    selectObj.UserID = UserID;
    selectObj.PageNo = PageNo;
    selectObj.PageSize = PayorPageSize;

    selectObj.FilterBy = UserPayorSearch;
    //var str = '<tr role="row">' +
    //                '<th style="width:20% !important">Payor Name</th>' +
    //                '<th style="width:5% !important">Type</th>' +
    //                '<th style="width:20% !important">Address</th>' +
    //                '<th style="width:10% !important">City</th>' +
    //                '<th style="width:20% !important">Email</th>' +
    //                '<th style="width:20% !important">Phone</th>' +
    //                '<th style="width:55px !important;text-align:center;" >' +
    //                ' <input type="checkbox" id="ckPayorUserAll" /></th>' +
    //            '</tr>'
    

    $.ajax({
        dataType: 'JSON',
        data: JSON.stringify(selectObj),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: '../api/User/User_Payor_Select_ByUserID',
        async: false,
        success: function (lstPayor) {
            //var lstPayor = $.parseJSON(data);
            var total = 0;
            if (lstPayor.length > 0) {
                total = lstPayor[0].Total;
                $("#tbPayorUserEdit tbody").html('');
                $("#tbPayorUserEdit thead").html('');
                var a = '';

                for (var i = 0; i < lstPayor.length; i++) {
                    var check = "";
                    if (lstPayor[i]["IsSelect"] == 1) {
                        check = "checked='checked'";
                    }
                    a += '<tr><td class="text-center"><a  href="javascript:void(0);" id="lblName' + lstPayor[i]['PayorID'] + '">' + lstPayor[i]['Name'] + '</a></td>';
                    a += '<td class="text-center">' + lstPayor[i]['Type'] + '</td>';
                    a += '<td class="text-center">' + lstPayor[i]['Address'] + '</td>';
                    a += '<td class="text-center">' + lstPayor[i]['City'] + '</td>';
                    a += '<td class="text-center">' + lstPayor[i]['Email'] + '</td>';
                    a += '<td class="text-center">' + lstPayor[i]['Phone'] + '</td>';

                    a += '<td class="min-width:5px !important;max-width:5px !important;text-align:center;"><input type="checkbox" class="ckPayoruser" name="ckPayorUser"  id="ckPayorUser_' + $.trim(lstPayor[i]['PayorID']) + '"  value="' + lstPayor[i]['PayorID'] + ";;;" + lstPayor[i]['Name'] + '" ' + check + ' /></td></tr>';

                }
                $("#tbPayorUserEdit thead").append('<tr> <th style="width:20% !important">Payor Name</th>' +
                                                        '<th style="width:5% !important">Type </th>' +
                                                        '<th style="width:20% !important">Address </th>' +
                                                        '<th style="width:10% !important">City </th>' +
                                                        '<th style="width:20% !important">Email </th>' +
                                                        '<th style="width:20% !important">Phone </th>' +

                                                        '<th style="min-width:5px !important;max-width:5px !important;text-align:center;">' +
                                                        ' <input type="checkbox" id="ckPayorUserAll" name="ckPayorUserAll"  /></th>' +
                                          
                                      '</tr>');
                $("#tbPayorUserEdit tbody").append(a);
            }

            $('input[type="checkbox"]').iCheck({
                checkboxClass: 'icheckbox_square-aero',
                increaseArea: '20%' // optional
            });

            $('input[type="checkbox"]').iCheck({
                checkboxClass: 'icheckbox_square-aero'
                //increaseArea: '10%' // optional
            });

            $('[id=ckPayorUserAll]').on('ifClicked', function (event) {
                var checkAllvalue = $(this).is(':checked');
                if (checkAllvalue == false) {
                    $('input[type="checkbox"].ckPayoruser').iCheck('check');
                    UserPayorData = [];
                    $('.ckPayoruser').each(function () {
                        //if ($(this).is(':checked')) {
                        var value = $(this).val();
                        var tmp = value.split(";;;");
                        var PayorID = tmp[0];
                        var checked = $(this).is(":checked");
                        var Name = tmp[1];

                        UserPayorData.push({ "PayorID": PayorID, "isSelect": checked, "Name": Name, "OriValue": !checked });

                        //}
                    });
                }
                else {
                    $('input[type="checkbox"].ckPayoruser').iCheck('uncheck');
                    UserPayorData = [];
                    $('.ckPayoruser').each(function () {
                        //if ($(this).is(':checked')) {
                        var value = $(this).val();
                        var tmp = value.split(";;;");
                        var PayorID = tmp[0];
                        var checked = $(this).is(":checked");
                        var Name = tmp[1];

                        UserPayorData.push({ "PayorID": PayorID, "isSelect": checked, "Name": Name, "OriValue": !checked });

                        //}
                    });
                }

            });

            $('input.ckPayoruserEdit').on('ifClicked', function (event) {
                flagpayor = 0;
                var value = $(this).val();
                var tmp = value.split(";;;");
                var currentID = tmp[0];
                var checked = $(this).is(":checked");
                chkPayorUserHandle(currentID, checked, tmp[1]);
            });
            $('input.ckPayoruser').on('ifClicked', function (event) {
                flagpayor = 0;
                var value = $(this).val();
                var tmp = value.split(";;;");
                var currentID = tmp[0];
                var checked = $(this).is(":checked");
                chkPayorUserHandle(currentID, checked, tmp[1]);
            });

            $('[id=tbPayorUserEdit]').addClass('table table-striped table-bordered');


            $("#tbPayorUserEdit_paginate").remove();
            if (isViewDisable==true) {
                $(".ckPayoruser").attr("disabled", "disabled");
                $("input.ckPayorUserAll").attr("disabled", true);
            } else {
                $("input.ckPayorUserAll").removeAttr("disabled");
            }
            
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            autohidenotify3s('error', 'bottom right', '', err.Message, '<span class="glyphicon glyphicon-chevron-down"></span>');
        }
    });
}

function BindUserTable(tableName, data, total, index) {
    $('#' + tableName).dataTable({
        "language": {
            "search": "Filter records:"
        },
        'bDestroy': true,
        "bInfo": true,
        "bLengthChange": false,
        "pageLength": UserPageSize,
        'aaSorting': [],
        "processing": false,
        'aaData': data,
        'sPaginationType': 'full_numbers',
        'aoColumns': [
            {
                'sClass': 'text-center',
                'bSortable': false,
                'mData': 'UserID',
                'render': function (data, type, full) {
                    return '<button type="button" class="btn btn-default btn-xs hidden" name="ActionUpdate" onclick="btnVieworEdit_Click(' + data + ',false )" data-toggle="modal" data-target="#Edit"><i class="icon-pencil"></i></button>';
                },
                'width': '5%'
            },
            {
                'mData': 'UserID',

                "render": function (data, type, full) {

                    return '<a href="#" id="lblUser' + full['UserID'] + '" onclick="btnVieworEdit_Click(' + data + ' ,true)" data-toggle="modal" data-target="#Edit">' + full['FirstName'] + ' ' + full['LastName'] + '</a>';

                },
                'width': '20%',
                'sDefaultContent': ''
            },
            {
                'mData': ['UserID', 'UserName'],
                'sClass': 'customCl',
                'title': 'USER NAME',
                "render": function (data, type, full, meta) {

                    return '<spand id="lbl' + full['UserID'] + '">' + full['UserName'] + '</spand>';

                },
                'width': '15%',
                'sDefaultContent': ''
            },
            {

                'mData': 'Email',
                "render": function (data, type, full, meta) {
                    return '<a href="javascript:;" id="lblQuantity' + full['UserID'] + '">' + full['Email'] + '</a>';
                },
                'width': '15%',
                'sDefaultContent': ''
            },
            {

                'mData': 'Phone',
                'width': '25%',
                'sClass': 'numberFormat',
                "render": function (data, type, full, meta) {
                    return '<spand id="lblPhone' + full['UserID'] + '" class="numberFormat">' + full['CellPhone'] + ' </spand>';
                },
            },

            {
                'sClass': 'text-center',
                'bSortable': false,
                'mData': 'UserID',
                'render': function (data, type, full) {
                    return '<button  id="btn' + full["UserID"] + '" type="button" class="btn btn-default btn-xs hidden" name="ActionDelete" onclick="ConfirmDelete(\'' + full["UserID"] + '\',\'danger\')"><i class="glyphicon glyphicon-trash"></i></button>';

                },
                'width': '5%'
            }
        ],
        "initComplete": function (settings, json) {
            $('input[type="checkbox"]').iCheck({
                checkboxClass: 'icheckbox_square-aero',
                increaseArea: '10%' // optional
            });
            paging(tableName, total, index, UserPageSize);
            ModuleActionById();
            //autohidenotify3s('success', 'bottom right', '', 'Bind data success', '<span class="glyphicon glyphicon-chevron-down"></span>');
        }

    });
}

function BindTable(tableName, data, total, index) {
    $('#' + tableName).dataTable({
        "language": {
            "search": "Filter records:"
        },
        'bDestroy': true,
        "pageLength": 25,
        "bInfo": true,
        "bLengthChange": false,
        'aaSorting': [],
        "processing": false,
        'aaData': data,
        'sPaginationType': 'full_numbers',
        'aoColumns': [
            {
                'sClass': 'text-center',
                'bSortable': false,
                'mData': 'PROVIDERID',
                'render': function (data, type, full) {
                    return '<button type="button" class="btn btn-default btn-xs hidden" name="ActionUpdate" onclick="btnVieworEdit_Click(\'' + full['PROVIDERID'] + '\',false)" data-toggle="modal" data-target="#New"><i class="icon-pencil"></i></button>';
                }
            },
            {
                'mData': 'PROVIDERID',
                "render": function (data, type, full) {
                    return '<a  href="#" id="lblName' + full['PROVIDERID'] + '" onclick="btnVieworEdit_Click(\'' + full['PROVIDERID'] + '\',true)" data-toggle="modal" data-target="#New">' + full['NAME'] + '</a>';
                }
            },
            {
                'mData': 'TYPE'
            },

              {
                  'mData': 'CITY'
              },
               {
                   'mData': 'PHONE',
                   'render': function (data, type, full) {
                       return '<span class="maskPhone"> ' + full["PHONE"] + ' </span>';
                   }
               },
            {
                'mData': 'DEA'
            },

              {
                  'mData': 'NPI'
              },

            {
                'sClass': 'text-center',
                'bSortable': false,
                'mData': 'PROVIDERID',
                'render': function (data, type, full) {
                    return '<button id="btn' + full["PROVIDERID"] + '" type="button" class="btn btn-default btn-xs hidden" name="ActionDelete" onclick="ConfirmDelete(\'' + full["PROVIDERID"] + '\',\'danger\')"><i class="glyphicon glyphicon-trash"></i></button>';
                }
            }
        ],
        "initComplete": function (settings, json) {
            paging(tableName, total, index, 25);
            ModuleActionById();
        }
    });
}

function BindTablePayorStaging(tableName, data) {
    $('#' + tableName).dataTable({
        "language": {
            "search": "Filter records:"
        },
        'bDestroy': true,
        "bPaginate": false,
        "bInfo": false,
        "bLengthChange": false,
        'aaSorting': [],
        "processing": false,
        'aaData': data,
        'sPaginationType': 'full_numbers',
        'aoColumns': [
            {
                'sClass': 'text-center',
                'bSortable': true,
                'mData': 'Name',
                'width': '100%'
            },
            {
                'sClass': 'text-center',
                'bSortable': false,
                'render': function (data, type, full) {
                    var a = full["OriValue"] ? "Selected" : "Unselected";
                    var b = full["isSelect"] ? "Selected" : "Unselected";
                    return a + ' -> ' + b;

                },
                'width': '5px'
            }
        ],
        "initComplete": function (settings, json) {
            $('input[type="checkbox"]').iCheck({
                checkboxClass: 'icheckbox_square-aero',
                increaseArea: '10%' // optional
            });
            $('input.ckPayoruserEdit').on('ifClicked', function (event) {
                flagpayor = 0;
                var value = $(this).val();
                var tmp = value.split(";;;");
                var currentID = tmp[0];
                var checked = $(this).is(":checked");
                chkPayorUserHandle(currentID, checked, tmp[1]);
            });
            $('input.ckPayoruser').on('ifClicked', function (event) {
                flagpayor = 0;
                var value = $(this).val();
                var tmp = value.split(";;;");
                var currentID = tmp[0];
                var checked = $(this).is(":checked");
                chkPayorUserHandle(currentID, checked, tmp[1]);
            });
        }
    });
}

function BindTablePayor(tableName, data, TotalRows, PageNo, PageSize) {
    //PayorPageSize = PageSize;
    $('#' + tableName).dataTable({
        "language": {
            "search": "Filter records:"
        },
        //'bDestroy': true,
        //"bPaginate": false,
        //"pageLength": PageSize,
        //"bFilter": true,
        ////"bInfo": false,
        //"bLengthChange": false,
        //'aaSorting': [],
        //"processing": false,
        //'aaData': data,
        //'sPaginationType': 'full_numbers',

        'bDestroy': true,
        "bInfo": false,
        "pageLength": PageSize,
        "bLengthChange": false,
        //'aaSorting': [],
        "processing": false,
        'aaData': data,
        'sPaginationType': 'full_numbers',

        'aoColumns': [
            {
                'mData': ['PayorID', 'Name'],
                "render": function (data, type, full, meta) {
                    return '<a  href="javascript:void(0);" id="lblName' + full['PayorID'] + '">' + full['Name'] + '</a>';
                }
            },
            {
                'sClass': 'text-center',
                'mData': 'Type'
            },
            {
                'sClass': 'text-center',
                'mData': 'Address'
            },

              {
                  'sClass': 'text-center',
                  'mData': 'City'
              },
               {
                   'sClass': 'text-center',
                   'mData': 'Email',
               },

            {
                'sClass': 'text-center',
                'mData': 'Phone',
                'width': '10%'
            },
            {
                'sClass': 'text-center',
                'bSortable': false,
                'mData': 'PayorID',
                'render': function (data, type, full) {
                    var check = "";
                    if (full["IsSelect"] == 1) {
                        check = "checked='checked'";
                    }
                    //return '<div class="form-group"><div><input id="ckPayorUser_' + full['PayorID'] + '" value="' + full['PayorID'] + ";;;" + full['Name'] + '" ' + check + ' class="ckPayorUser" type="checkbox" style="width:5% !important"></div></div>';
                    return '<div class="form-group"><div class="checkbox"><input id="ckPayorUser_' + full['PayorID'] + '" value="' + full['PayorID'] + ";;;" + full['Name'] + '" ' + check + ' class="ckPayoruser" type="checkbox"></div></div>';
                },
                'width': '5px'
            },
        ],
        "initComplete": function (settings, json) {
            $('input[type="checkbox"]').iCheck({
                checkboxClass: 'icheckbox_square-aero'
                //increaseArea: '10%' // optional
            });
            
            $('[id=ckPayorUserAll]').on('ifClicked', function (event) {
                var checkAllvalue = $(this).is(':checked');
                if (checkAllvalue == false) {
                    $('input[type="checkbox"].ckPayoruser').iCheck('check');
                    UserPayorData = [];
                    $('.ckPayoruser').each(function () {
                        //if ($(this).is(':checked')) {
                            var value = $(this).val();
                            var tmp = value.split(";;;");
                            var PayorID = tmp[0];
                            var checked = $(this).is(":checked");
                            var Name = tmp[1];

                            UserPayorData.push({ "PayorID": PayorID, "isSelect": checked, "Name": Name, "OriValue": !checked });

                        //}
                    });
                }
                else {
                    $('input[type="checkbox"].ckPayoruser').iCheck('uncheck');
                    UserPayorData = [];
                    $('.ckPayoruser').each(function () {
                        //if ($(this).is(':checked')) {
                            var value = $(this).val();
                            var tmp = value.split(";;;");
                            var PayorID = tmp[0];
                            var checked = $(this).is(":checked");
                            var Name = tmp[1];

                            UserPayorData.push({ "PayorID": PayorID, "isSelect": checked, "Name": Name, "OriValue": !checked });

                        //}
                    });
                }

            });

            $('input.ckPayoruserEdit').on('ifClicked', function (event) {
                flagpayor = 0;
                var value = $(this).val();
                var tmp = value.split(";;;");
                var currentID = tmp[0];
                var checked = $(this).is(":checked");
                chkPayorUserHandle(currentID, checked, tmp[1]);
            });
            $('input.ckPayoruser').on('ifClicked', function (event) {
                flagpayor = 0;
                var value = $(this).val();
                var tmp = value.split(";;;");
                var currentID = tmp[0];
                var checked = $(this).is(":checked");
                chkPayorUserHandle(currentID, checked, tmp[1]);
            });
            
            $('[id=' + tableName + ']').addClass('table table-striped table-bordered');
            //$('[id=' + tableName + '_paginate]').html('');
            //pagingV2(PayorPaging, "PayorPaging", tableName, TotalRows, PageNo, PageSize);
        }
    });
}

function BindTableUserRole(tableName, data) {
    $('#' + tableName).dataTable({
        "language": {
            "search": "Filter records:"
        },
        'bDestroy': true,
        "bInfo": false,
        "pageLength": 1000,
        "bLengthChange": false,
        'aaSorting': [],
        "processing": false,
        'aaData': data,
        'sPaginationType': 'full_numbers',
        'aoColumns': [
            {
                'sClass': 'text-center',
                'bSortable': false,
                'mData': 'RoleID',
                'render': function (data, type, full) {
                    var check = "";
                    if (full["IsSelect"] == 1)
                        check = "checked='checked'";
                    return '<input type="checkbox" class="ckuserrole" value="' + full['RoleID'] + '" id="ckrole' + full['RoleID'] + '"  ' + check + '/>';
                },
                'width': '5%'
            },
            {
                'mData': ['RoleID', 'RoleName'],

                "render": function (data, type, full, meta) {
                    var rolename = "'" + full['RoleName'] + "'";

                    return '<a  href="javascript:;" id="lblrole' + full['RoleID'] + '" onclick="onChangeRole(' + full['RoleID'] + ',' + rolename + ')">' + full['RoleName'] + '</a>';

                },
                'width': '20%',
                'sDefaultContent': ''
            },
        ],
        "initComplete": function (settings, json) {
            $('input[type="checkbox"]').iCheck({
                checkboxClass: 'icheckbox_square-aero',
                increaseArea: '10%' // optional
            });
            //autohidenotify3s('success', 'bottom right', '', 'Bind data success', '<span class="glyphicon glyphicon-chevron-down"></span>');
        }

    });


}

function BindTableProviderStaging(tableName, data) {
    $('#' + tableName).dataTable({
        "language": {
            "search": "Filter records:"
        },
        'bDestroy': true,
        "pageLength": 10,
        "bInfo": false,
        "bLengthChange": false,
        'aaSorting': [],
        "processing": false,
        'aaData': data,
        'sPaginationType': 'full_numbers',
        'aoColumns': [
            {
                'sClass': 'text-center',
                'bSortable': false,
                'mData': 'NAME',
                'width': '100%'
            },
            {
                'sClass': 'text-center',
                'bSortable': false,
                'mData': 'ProviderID',
                'render': function (data, type, full) {
                    return '<button  id="btn' + full["ProviderID"] + '" type="button" class="btn btn-default btn-xs" onclick="DeleteProviderStaging(' + full["ProviderID"] + ')"><i class="glyphicon glyphicon-trash"></i></button>';

                },
                'width': '5px'
            },
        ],
        "initComplete": function (settings, json) {
            $('input[type="checkbox"]').iCheck({
                checkboxClass: 'icheckbox_square-aero',
                increaseArea: '10%' // optional
            });
            $('input.ckprovideruserEdit').on('ifClicked', function (event) {
                flagprovider = 0;
                var currentID = $(this).val();
                if (!$(this).is(":checked")) {
                    InsertUserProviderStaging(currentID);
                }
                else {
                    DeleteProviderStaging(currentID);
                }
            });
            $('input.ckprovideruser').on('ifClicked', function (event) {
                flagprovider = 0;
                var currentID = $(this).val();
                if (!$(this).is(":checked")) {
                    InsertUserProviderStaging(currentID);
                }
                else {
                    DeleteProviderStaging(currentID);
                }
            });
        }

    });
}

function BindTableProvider(tableName, data, TotalRows, PageNo, PageSize) {
    ProviderPageSize = PageSize;
    $('#' + tableName).dataTable({
        "language": {
            "search": "Filter records:"
        },
        'bDestroy': true,
        "bPaginate": true,
        "bInfo": false,
        "pageLength": PageSize,
        "bLengthChange": false,
        'aaSorting': [],
        "processing": false,
        'aaData': data,
        'sPaginationType': 'full_numbers',
        'aoColumns': [
            {
                'mData': ['PROVIDERID', 'NAME'],
                "render": function (data, type, full, meta) {
                    return '<a  href="javascript:;" id="lblName' + full['PROVIDERID'] + '">' + full['NAME'] + '</a>';
                },
                'width': '12%',
                'sDefaultContent': ''
            },
            {
                'mData': 'NAME',
                'width': '12%',
                'sDefaultContent': ''
            },
            {
                'mData': 'TYPE',
                'width': '5%'
            },

              {
                  'mData': 'CITY',
                  'width': '10%'
              },
               {
                   'mData': 'PHONE',
                   'width': '12%',
                   'sDefaultContent': ''
               },
            {
                'mData': 'DEA',
                'width': '7%'
            },

              {
                  'mData': 'NPI',
                  'width': '7%'
              },
            {
                'sClass': 'text-center',
                'bSortable': false,
                'mData': 'ProviderID',
                'render': function (data, type, full) {
                    var check = "";
                    if (full['IsSelect'] == 1)
                        check = "checked='checked'";
                    return '<div class="form-group"><div class="checkbox"><input value="' + full['PROVIDERID'] + '" ' + check + ' class="ckprovideruser" type="checkbox"></div></div>';
                },
                'width': '3%'
            },
        ],
        "initComplete": function (settings, json) {
            $('input[type="checkbox"]').iCheck({
                checkboxClass: 'icheckbox_square-aero',
                increaseArea: '10%' // optional
            });
            $('[id=' + tableName + ']').addClass('table table-striped table-bordered');
            $('[id=' + tableName + '_paginate]').html('');
            pagingV2(ProviderPaging, "ProviderPaging", tableName, TotalRows, PageNo, PageSize);
        }
    });
}