<%@ Control Language="vb" AutoEventWireup="false" Explicit="True" Inherits="DotNetNuke.UI.Skins.Skin" %>
<%@ Register TagPrefix="dnn" TagName="STYLES" Src="~/Admin/Skins/Styles.ascx" %>
<%@ Register TagPrefix="dnn" TagName="CURRENTDATE" Src="~/Admin/Skins/CurrentDate.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LANGUAGE" Src="~/Admin/Skins/Language.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LOGO" Src="~/Admin/Skins/Logo.ascx" %>
<%@ Register TagPrefix="dnn" TagName="SEARCH" Src="~/Admin/Skins/Search.ascx" %>
<%@ Register TagPrefix="dnn" TagName="USER" Src="~/Admin/Skins/User.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LOGIN" Src="~/Admin/Skins/Login.ascx" %>
<%@ Register TagPrefix="dnn" TagName="PRIVACY" Src="~/Admin/Skins/Privacy.ascx" %>
<%@ Register TagPrefix="dnn" TagName="TERMS" Src="~/Admin/Skins/Terms.ascx" %>
<%@ Register TagPrefix="dnn" TagName="BREADCRUMB" Src="~/Admin/Skins/BreadCrumb.ascx" %>
<%@ Register TagPrefix="dnn" TagName="COPYRIGHT" Src="~/Admin/Skins/Copyright.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LINKTOMOBILE" Src="~/Admin/Skins/LinkToMobileSite.ascx" %>
<%@ Register TagPrefix="dnn" TagName="META" Src="~/Admin/Skins/Meta.ascx" %>
<%@ Register TagPrefix="dnn" TagName="MENU" Src="~/DesktopModules/DDRMenu/Menu.ascx" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
<%@ Register TagPrefix="dnn" TagName="jQuery" Src="~/Admin/Skins/jQuery.ascx" %>

<dnn:META ID="META1" runat="server" Name="viewport" Content="width=device-width,initial-scale=1" />

<dnn:DnnCssInclude runat="server" FilePath="Bootstrap/css/bootstrap.css" PathNameAlias="SkinPath" /> 
<dnn:DnnCssInclude runat="server" FilePath="Css/toastr.css" PathNameAlias="SkinPath" /> 
<dnn:DnnCssInclude runat="server" FilePath="Css/devextremeCss/dx.light.css" PathNameAlias="SkinPath" /> 
<!-- dx.softblue.compact.css / dx.light.css -->
<dnn:DnnCssInclude runat="server" FilePath="Css/Site.css" PathNameAlias="SkinPath" />
<dnn:DnnCssInclude runat="server" FilePath="Css/line-awesome/css/line-awesome.min.css" PathNameAlias="SkinPath" />
<dnn:DnnCssInclude runat="server" FilePath="Css/font-awesome/css/font-awesome.min.css" PathNameAlias="SkinPath" />

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.2.0/jquery-confirm.min.css">
<!-- Plugin: Owl Carousel 2 -->
<dnn:DnnCssInclude runat="server" FilePath="Css/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css"
    PathNameAlias="SkinPath" />
<!-- Plugin: Smart Wizard -->
<dnn:DnnCssInclude runat="server" FilePath="Css/smart_wizard.css" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude ID="customJS1" runat="server" FilePath="Js/DevExtremeJs/jszip.min.js" PathNameAlias="SkinPath"
    AddTag="false" />
<dnn:DnnJsInclude ID="customJS2" runat="server" FilePath="Js/DevExtremeJs/dx.all.js" PathNameAlias="SkinPath"
    AddTag="false" />  
<dnn:DnnJsInclude ID="customJS4" runat="server" FilePath="Js/DevExtremeJs/Localization/dx.messages.vi.js" PathNameAlias="SkinPath"
    AddTag="false" />
<dnn:DnnJsInclude ID="customJS5" runat="server" FilePath="Common/Ckeditor/ckeditor.js" PathNameAlias="SkinPath"
    AddTag="false" />
<dnn:DnnJsInclude ID="customJS6" runat="server" FilePath="Js/toastr/toastr.min.js" PathNameAlias="SkinPath"
    AddTag="false" />
<dnn:DnnJsInclude ID="customJS7" runat="server" FilePath="Js/CustumerJs/MainPage.js" PathNameAlias="SkinPath"
    AddTag="false" />
<dnn:DnnJsInclude ID="customJS8" runat="server" FilePath="Css/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"
    PathNameAlias="SkinPath" AddTag="false" />
	
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.2.0/jquery-confirm.min.js"></script>



<div id="siteWrapper" class="LayoutCustom">

    <!--Header -->
    <div class="btHeader">
        <div class="col-md-12">
            <div class="container">
                <div class="">
                    <div class="col-sm-6">
                        <dnn:LOGO runat="server" ID="dnnLOGO" CssClass="logo_QuocHuy" />
                        <p class="btTieuDe">
                            <b class="btDVTT">NGÀNH Y TẾ TP. HỒ CHÍ MINH</b>
                            <br> 
							PHẦN MỀM QUẢN LÝ KÊ KHAI GIÁ DỊCH VỤ KỸ THUẬT
                        </p>
                    </div>

                    <div class="col-md-6">
                        <p class="text-right btHeaderLienHe">
                            <i class="fa fa-phone" aria-hidden="true"></i>
                            (+84-28) 3930 9912
                            &emsp;
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                            bbt.syt@tphcm.gov.vn
                        </p>
                        
                        <div class="btDangNhapDangKy text-right">
                            <dnn:LOGIN ID="dnnLogin" CssClass="LoginLink" runat="server" LegacyMode="false" />
                            <dnn:USER ID="dnnUser" runat="server" LegacyMode="false" />

                            <!-- <a class="btDangKy" href="/Đang-ky"> -->
                                <!-- Tạo tài khoản ! -->
                            <!-- </a> -->
                            <!-- <a class="btDangNhap" href='?ctl=login'> -->
                                <!-- Đăng nhập -->
                            <!-- </a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Navigation -->
   

    <!-- Page Content -->
    <div class="LayoutDefault-Main">
        <main role="main">
            <div class=" dnnpane">
                <div id="HeaderPane" class="headerPane" runat="server"></div>
            </div>
            <div id="mainContent-inner">
                <div class=" dnnpane">
                    <div id="ContentPane" class="col-md-12 contentPane" runat="server"></div>
                </div>

                <div class=" dnnpane">
                    <div id="P1_75_1" class="col-md-8 spacingTop" runat="server"></div>
                    <div id="P1_25_2" class="col-md-4 spacingTop" runat="server"></div>
                </div>

                <div class=" dnnpane">
                    <div id="P2_25_1" class="col-md-4 spacingTop" runat="server"></div>
                    <div id="P2_75_2" class="col-md-8 spacingTop" runat="server"></div>
                </div>

                <div class=" dnnpane">
                    <div id="P3_33_1" class="col-md-4 spacingTop" runat="server"></div>
                    <div id="P3_33_2" class="col-md-4 spacingTop" runat="server"></div>
                    <div id="P3_33_3" class="col-md-4 spacingTop" runat="server"></div>
                </div>

                <div class=" dnnpane">
                    <div id="ContentPaneLower" class="col-md-12 contentPane spacingTop" runat="server"></div>
                </div>
            </div>
            <!-- /.mainContent-inner -->
        </main>
        <!-- /.mainContent -->
    </div>
    <!-- /.container -->

    <!-- Footer -->
    <!-- <div class="container-fluid btFooter">  -->
        <!-- <hr class="hidden-xs"> -->
        <!-- <div class=""> -->
            <!-- <div class="col-md-12"> -->
                <!-- <div class="container"> -->
                    <!-- <div class=""> -->
                        <!-- <div class="col-md-12"> -->
                            
                            <!-- <p> -->
                                <!-- <b>Địa chỉ:</b> -->
                                <!-- 59 Nguyễn Thị Minh Khai, Quận 1, Thành phố Hồ Chí Minh -->
                            <!-- </p> -->
                            <!-- <p> -->
                                <!-- <b>Điện thoại: </b>(+84-28) 3930 9912 &emsp; -->
								<!-- <b>Email: </b> -->
                                <!-- <a href="bbt.syt@tphcm.gov.vn" target="_top" class="btMailTo">bbt.syt@tphcm.gov.vn</a> -->
                            <!-- </p> -->
                             
                        <!-- </div>  -->
                    <!-- </div> -->
                <!-- </div> -->
            <!-- </div> -->
        <!-- </div> -->
    <!-- </div> -->
</div>
<!-- /.SiteWrapper -->

<%-- CSS & JS includes --%>
<!--#include file="Common/AddFiles.ascx"-->

<script>

	// Thay đổi ngôn ngữ devExtreme
	DevExpress.localization.locale('vi');   
	
    $(document).ready(function () {
        if ($('.loginGroup').length > 0 && $('.registerGroup').length > 0) {
            $('.btDangKy').addClass('hidden');
            
        }
        else {
            $('.loginGroup').addClass('hidden');
            $('.registerGroup').addClass('hidden'); 
        }

        //--------------------------------------------------------------
        if (window.screen.width >= 992) {
            var h_header = $("header").outerHeight();
            var h_footer = $("footer").outerHeight();
            var h_body = document.documentElement.clientHeight - (h_header + h_footer);
            $(".container-fluid.LayoutDefault-Main").css("min-height", h_body + "px");
        }
    });
</script>