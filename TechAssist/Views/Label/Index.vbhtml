@ModelType TechAssist.Models.LabelModel
@Code
    ViewData("Title") = "Student Label Assistant"
End Code

<h2>Student Label Assistant</h2>
<hr />
<div class="row">
    <div class="col-md-6">
        @Html.Action("AddLabel")
        <hr />
        @Html.Action("LabelList")
    </div>
    <div class="col-md-6">
        @Html.Action("LabelPreview")
    </div>
</div>

