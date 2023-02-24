<%@ Control language="C#" Inherits="DotNetNuke.Modules.Html.HtmlModule" CodeBehind="HtmlModule.ascx.cs" AutoEventWireup="false" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.UI.WebControls" Assembly="DotNetNuke.WebControls" %>
 
<link href="DesktopModules/MVC/KeKhaiGiaDichVu/GUI/Content/login.css" rel="stylesheet" />

<div class="header">

    <!--Content before waves-->
    <div class="flex">
        <!--Just the logo.. Don't mind this-->

        <div class="row">
            <div class="col-md-offset-1 col-md-10" style="padding-top: 20pt;">

                <p>
                    <ul>
                        <li style="margin-bottom: 6pt;text-align:center">
                            <span style="font-size: 16pt;color:orange">HỆ THỐNG QUẢN LÝ KÊ KHAI GIÁ</span>
                        </li>
                        <li style="text-align: center">
                            <b style="font-size: 16pt; color: orange">NGÀNH Y TẾ THÀNH PHỐ HỒ CHÍ MINH</b>
                        </li>
                    </ul>
                </p>

            </div>
            <div class="col-md-offset-2 col-md-8">
                <div class="alert alert-info" role="alert">
                    <p>
                        <dnn:DNNLabelEdit id="lblContent" runat="server" cssclass="Normal" enableviewstate="False" MouseOverCssClass="LabelEditOverClassML"
                                          LabelEditCssClass="LabelEditTextClass" EditEnabled="False" MultiLine="True" RichTextEnabled="True"
                                          ToolBarId="editorDnnToobar" RenderAsDiv="True" EventName="none" LostFocusSave="False" CallBackType="Simple" ClientAPIScriptPath="" LabelEditScriptPath="" WorkCssClass=""></dnn:DNNLabelEdit>
                        <DNN:DNNToolBar id="editorDnnToobar" runat="server" CssClass="eipbackimg" ReuseToolbar="true"
                                        DefaultButtonCssClass="eipbuttonbackimg" DefaultButtonHoverCssClass="eipborderhover" ViewStateMode="Disabled">
                            <DNN:DNNToolBarButton ControlAction="edit" ID="tbEdit" ToolTip="Edit" CssClass="eipbutton_edit" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="save" ID="tbSave" ToolTip="Save" CssClass="eipbutton_save" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="cancel" ID="tbCancel" ToolTip="Cancel" CssClass="eipbutton_cancel" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="bold" ID="tbBold" ToolTip="Bold" CssClass="eipbutton_bold" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="italic" ID="tbItalic" ToolTip="Italic" CssClass="eipbutton_italic" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="underline" ID="tbUnderline" ToolTip="Underline" CssClass="eipbutton_underline" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="justifyleft" ID="tbJustifyLeft" ToolTip="JustifyLeft" CssClass="eipbutton_justifyleft" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="justifycenter" ID="tbJustifyCenter" ToolTip="JustifyCenter" CssClass="eipbutton_justifycenter" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="justifyright" ID="tbJustifyRight" ToolTip="JustifyRight" CssClass="eipbutton_justifyright" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="insertorderedlist" ID="tbOrderedList" ToolTip="OrderedList" CssClass="eipbutton_orderedlist" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="insertunorderedlist" ID="tbUnorderedList" ToolTip="UnorderedList" CssClass="eipbutton_unorderedlist" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="outdent" ID="tbOutdent" ToolTip="Outdent" CssClass="eipbutton_outdent" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="indent" ID="tbIndent" ToolTip="Indent" CssClass="eipbutton_indent" runat="server" />
                            <DNN:DNNToolBarButton ControlAction="createlink" ID="tbCreateLink" ToolTip="CreateLink" CssClass="eipbutton_createlink" runat="server" />
                        </DNN:DNNToolBar>


                </div>
            </div>
        </div>




    </div>

    <!--Waves Container-->
    <div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
        </svg>
    </div>
    <!--Waves end-->

</div>
<!--Header ends-->
<!--Content starts-->
<div class="content flex">
    <div class="container">
        <div class="">
            <div class="col-md-12">
                <p>
                    <b>Địa chỉ:</b>
                    59 Nguyễn Thị Minh Khai, Quận 1, Thành phố Hồ Chí Minh
                </p>
                <p>
                    <b>Điện thoại: </b>(+84-28) 3930 9912 &emsp;
                    <b>Email: </b>
                    <a href="bbt.syt@tphcm.gov.vn" target="_top">bbt.syt@tphcm.gov.vn</a>
                </p>
            </div>
        </div>
    </div>
</div>
<!--Content ends-->