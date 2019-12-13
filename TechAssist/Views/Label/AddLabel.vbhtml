@ModelType TechAssist.Models.LabelSchoolViewModel

<div class="form-horizontal">
        <h4>Add Label to List</h4>
        <hr />
        @Html.ValidationSummary(True, "", New With {.class = "text-danger"})
        <div class="form-group">
            @Html.LabelFor(Function(model) model.LabelModel.SchoolID, htmlAttributes:=New With {.class = "control-label col-md-3"})
            <div class="col-md-9">
                @Html.DropDownList("SchoolId", New SelectList(Model.SchoolModel, "SchoolId", "SchoolName", Model.SchoolModel), New With {.class = "form-control"})
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(Function(model) model.LabelModel.FirstName, htmlAttributes:=New With {.class = "control-label col-md-3"})
            <div class="col-md-9">
                @Html.EditorFor(Function(model) model.LabelModel.FirstName, New With {.htmlAttributes = New With {.class = "form-control"}})
                @Html.ValidationMessageFor(Function(model) model.LabelModel.FirstName, "", New With {.class = "text-danger"})
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(Function(model) model.LabelModel.LastName, htmlAttributes:=New With {.class = "control-label col-md-3"})
            <div class="col-md-9">
                @Html.EditorFor(Function(model) model.LabelModel.LastName, New With {.htmlAttributes = New With {.class = "form-control"}})
                @Html.ValidationMessageFor(Function(model) model.LabelModel.LastName, "", New With {.class = "text-danger"})
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(Function(model) model.LabelModel.Barcode, htmlAttributes:=New With {.class = "control-label col-md-3"})
            <div class="col-md-9">
                @Html.EditorFor(Function(model) model.LabelModel.Barcode, New With {.htmlAttributes = New With {.class = "form-control"}})
                @Html.ValidationMessageFor(Function(model) model.LabelModel.Barcode, "", New With {.class = "text-danger"})
            </div>
        </div>

        <div class="form-group">
            @Html.LabelFor(Function(model) model.LabelModel.LabelPlacement, htmlAttributes:=New With {.class = "control-label col-md-3"})
            <div class="col-md-9">
                @Html.EditorFor(Function(model) model.LabelModel.LabelPlacement, New With {.htmlAttributes = New With {.class = "form-control"}})
                @Html.ValidationMessageFor(Function(model) model.LabelModel.LabelPlacement, "", New With {.class = "text-danger"})
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-push-1 col-md-11">
                <input type="submit" value="Add to List" class="btn btn-default" id="submit" />
            </div>
        </div>
    </div>
