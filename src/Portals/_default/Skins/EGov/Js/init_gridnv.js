
function BaoCao_getData() {
    return $.ajax({
        url: urlResolved + "/api/BaoCaoController/getData",
        dataType: "json",
        
        async: false,
        success: function (output) {
            console.log(output);
        }
    });
}

$(function () {
    var selectedItems = [];

    var selectItem = function (item) {
        selectedItems.push(item);
    };

    var unselectItem = function (item) {
        selectedItems =$.grep(selectedItems, function (i) {
            return i !== item;
        });
    };
    
    $("#grid").jsGrid({
        height: "auto",
        width: "100%",
        autoload: true,
        sorting: true,
        paging: true,
        filtering: true,
        

        //data: db.reports,
        //loadData: function() {
        //    return db.reports;
        //},
        controller: {
            loadData: function() {
                return BaoCao_getData();
            }
        },
        rowClass: function (item, itemIndex) {
            return "rowGrid";
        },
        fields: [
            {
                filtering: true,
                filterTemplate: function () {
                    return $("<input>")
                        .attr("type", "checkbox")
                        .attr("id", "checkAll")
                        .change(function () {
                            $("input:checkbox").prop('checked', $(this).prop("checked"));
                            $(this).is(":checked") ? getallItem() : removeallItem();
                        });
                },
                //headerTemplate: function () {
                //    return $("<button>").attr("type", "button")
                //        .on("click", function () {

                //        });
                //},
                itemTemplate: function (_, item) {
                    return $("<input>").attr("type", "checkbox")
                        .prop("checked", $.inArray(item, selectedItems) > -1)
                        .on("change", function () {

                        });
                },
                align: "center",
                width: 50
            },
            { name: "groupName", type: "text", width: 100, title: "Tên đơn vị", align: "center", css: "rowGrid" },
            { name: "reportTime", type: "text", width: 60, title: "Kỳ báo cáo", align: "center" },
            { name: "submitTime", type: "text", title: "Ngày nộp", width: 60, align: "center" },
            {
                align: "center",
                type: "control",
                modeSwitchButton: false,
                editButton: false,
                deleteButton: false,
                itemTemplate: function (value, item) {

                    var div = $('<div id=cell>');
                    var img0 = $('<img />', {
                        src: "/CCHCLibraries/Libraries/img/view.png",
                        alt: 'Xem báo cáo',
                        style: "margin:0 6px"
                    });
                    var link0 = $("<a>")
                        .attr("href", "./ReportDetail/" + item.id);
                    img0.appendTo(link0);

                    var img1 = $('<img />', {
                        src: "/CCHCLibraries/Libraries/img/accept.png",
                        alt: 'Duyệt báo cáo',
                        style: "margin:0 6px"
                    });
                    var link1 = $("<a>")
                        .attr("href", "/#!/" + item.id);
                    img1.appendTo(link1);

                    var img2 = $('<img />', {
                        src: "/CCHCLibraries/Libraries/img/delete.png",
                        alt: 'Xóa',
                        style: "margin:0 6px"
                    });
                    var link2 = $("<a>")
                        .on("click", function () {
                            //$("#groupgrid").jsGrid("deleteItem", item);
                        });

                    img2.appendTo(link2);
                    link0.appendTo(div);
                    link1.appendTo(div);
                    link2.appendTo(div);

                    return div;

                }

            }
        ]
    });

});
var db = {
    reports: [
        {
            "groupName": "Sở Tài chính",
            "reportTime": "6 tháng - 2017",
            "submitTime": "20/6/2017"
        },
        {
            "groupName": "Sở Thông tin",
            "reportTime": "3 tháng - 2017",
            "submitTime": "10/3/2017"
        },
        {
            "groupName": "Sở Tư pháp",
            "reportTime": "cả năm - 2016",
            "submitTime": "6/12/2016"
        },
        {
            "groupName": "Sở Kế hoạch Đầu tư",
            "reportTime": "9 tháng - 2016",
            "submitTime": "4/9/2016"
        },
        {
            "groupName": "Sở Khoa học công nghệ",
            "reportTime": "6 tháng - 2016",
            "submitTime": "24/6/2016"
        },
    ]
};

