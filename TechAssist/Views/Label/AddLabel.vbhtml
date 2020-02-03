@ModelType TechAssist.Models.LabelSchoolViewModel

<div class="form-horizontal">
        @Html.ValidationSummary(True, "", New With {.class = "text-danger"})
        <div class="form-group" id="schoolId_inputrow">
            @Html.LabelFor(Function(model) model.LabelModel.SchoolID, htmlAttributes:=New With {.class = "control-label col-md-3"})
            <div class="col-md-9">
                @Html.DropDownList("SchoolId", New SelectList(Model.SchoolModel, "SchoolId", "SchoolName", Model.SchoolModel), New With {.class = "form-control", .id = "LabelModel_SchoolId"})
            </div>
        </div>

        <div class="form-group" id="firstName_inputrow">
            @Html.LabelFor(Function(model) model.LabelModel.FirstName, htmlAttributes:=New With {.class = "control-label col-md-3"})
            <div class="col-md-9">
                @Html.EditorFor(Function(model) model.LabelModel.FirstName, New With {.htmlAttributes = New With {.class = "form-control"}})
                @Html.ValidationMessageFor(Function(model) model.LabelModel.FirstName, "", New With {.class = "text-danger"})
            </div>
        </div>

        <div class="form-group" id="lastName_inputrow">
            @Html.LabelFor(Function(model) model.LabelModel.LastName, htmlAttributes:=New With {.class = "control-label col-md-3"})
            <div class="col-md-9">
                @Html.EditorFor(Function(model) model.LabelModel.LastName, New With {.htmlAttributes = New With {.class = "form-control"}})
                @Html.ValidationMessageFor(Function(model) model.LabelModel.LastName, "", New With {.class = "text-danger"})
            </div>
        </div>

        <div class="form-group" id="barcode_inputrow">
            @Html.LabelFor(Function(model) model.LabelModel.Barcode, htmlAttributes:=New With {.class = "control-label col-md-3"})
            <div class="col-md-9">
                @Html.EditorFor(Function(model) model.LabelModel.Barcode, New With {.htmlAttributes = New With {.class = "form-control"}})
                @Html.ValidationMessageFor(Function(model) model.LabelModel.Barcode, "", New With {.class = "text-danger"})
            </div>
        </div>

        <div class="form-group" id="labelSpot_inputrow">
            <label class="control-label col-md-3" for="LabelModel_LabelPlacement" data-tooltip="Where do you want your label to be on the sheet?">Label Spot <span class="glyphicon glyphicon-info-sign info-icon" style="vertical-align: text-bottom;"></span></label>
            <div class="col-md-9">
                @Html.EditorFor(Function(model) model.LabelModel.LabelPlacement, New With {.htmlAttributes = New With {.class = "form-control"}})
                @Html.ValidationMessageFor(Function(model) model.LabelModel.LabelPlacement, "", New With {.class = "text-danger"})
            </div>
        </div>

        <div class="form-group" id="duplicate_inputrow" style="display: none;">
            <div class="col-md-push-3 col-md-9">
                    <input type="checkbox" id="duplicate"/> <label>Duplicate <div style="display: inline-block;" data-tooltip="Create an additional label with the same details."><span class="glyphicon glyphicon-info-sign info-icon" style="vertical-align: text-bottom;"></span></div></label>
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-push-1 col-md-11">
                <input type="submit" value="Add to List" class="btn btn-default" id="submit" />
            </div>
        </div>
    </div>