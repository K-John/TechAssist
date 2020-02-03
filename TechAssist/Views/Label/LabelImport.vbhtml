@ModelType TechAssist.Models.LabelSchoolViewModel

<div class="form-horizontal">
    <div class="form-group">
        <div class="col-md-12">
            <details>
                <summary>Import(ant) Details</summary>
                <ul>
                    <li>
                        1. Must be a CSV File
                        <ul>
                            <li>Cannot be in excel spreadsheet format</li>
                        </ul>
                    </li>
                    <li>2. Must have headers set
                        <ul>
                            <li>The first row needs to include headers: first_name, last_name, and barcode.</li>
                            <li>The order of the headers does not matter</li>
                        </ul>
                    </li>
                </ul>
            </details>
        </div>
    </div>
    <div class="form-group" id="schoolid_importrow">
        @Html.LabelFor(Function(model) model.LabelModel.SchoolID, htmlAttributes:=New With {.class = "control-label col-md-3"})
        <div class="col-md-9">
            @Html.DropDownList("SchoolId", New SelectList(Model.SchoolModel, "SchoolId", "SchoolName", Model.SchoolModel), New With {.class = "form-control", .id = "schoolid_import"})
        </div>
    </div>

    <div class="form-group" id="file_importrow">
        <label class="control-label col-md-3">Upload CSV</label>
        <div class="col-md-9">
            <input type="file" id="file_import" />
        </div>
    </div>

    <div class="form-group" id="status_importrow">
        <label class="control-label col-md-3">Status</label>
        <div class="col-md-9">
            <span>Waiting</span>
        </div>
    </div>

    <div class="form-group">
        <div class="col-md-push-1 col-md-11">
            <input type="submit" value="Start Import" class="btn btn-default" id="submit_import" />
        </div>
    </div>
</div>