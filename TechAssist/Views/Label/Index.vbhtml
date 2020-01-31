@ModelType TechAssist.Models.LabelModel
@Code
    ViewData("Title") = "Student Label Assistant"
End Code

<h2>Student Label Assistant</h2>
<hr />
<div class="row" id="alertcontainer"></div>
<div class="row">
    <div class="col-md-6">
        <div class="row">
            <div class="col-xs-4">
                <h4 class="page-nav-title" id="nav_title_addlabel">Add Label to List</h4>
            </div>
            <div class="col-xs-4">
                <h4 class="page-nav-title active-nav-title" id="nav_title_labelimport">Import CSV</h4>
            </div>
        </div>
        <div class="page-nav-content" id="nav_content_addlabel">@Html.Action("AddLabel")</div>
        <div class="page-nav-content active-nav-content" id="nav_content_labelimport">@Html.Action("LabelImport")</div>
        <hr />
        @Html.Action("LabelList")
    </div>
    <div class="col-md-6">
        @Html.Action("LabelPreview")
    </div>
</div>

