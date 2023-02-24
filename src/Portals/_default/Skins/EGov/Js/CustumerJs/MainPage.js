 
//----------------------------------------loadPanel----------------------------------
var loadPanel = $(".loadpanel").dxLoadPanel({
    shadingColor: "rgba(0,0,0,0.4)",
    position: { of: "#divLoadPanel" },
    visible: false,
    showIndicator: true, 
    showPane: true,
    shading: true,
    closeOnOutsideClick: false, 
}).dxLoadPanel("instance");

//----------------------------------------Datetime Now----------------------------------
 
 var DayNow 
 var MonthNow 
 var YearNow = 0 
 
$(document).ready(function () {
	var d = new Date();
    YearNow  = d.getFullYear();
	
	//--------------------------------------required input-------------------------------
	$(".required").append("<span style=\"color:red\"> *</span>");
	
});

//----------------------------------------Tiền tệ Việt Nam----------------------------------

 function DinhDangTienTeVn(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}

 //--------------------------------------RequestQuerystring-------------------------------
function RequestQuerystring(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
 
