@Code
    ViewData("Title") = "GenerateTestData"
End Code
@section Scripts
    <script src="~/Scripts/app-testdatagenerator.js"></script>
End Section

<h2>Generate Random Label Data</h2>
<div class="row">
    <div class="col-md-6">
        <div class="form-horizontal">
            <div class="form-group" id="firstName">
                <label class="control-label col-md-3">How Many?</label>
                <div class="col-md-9">
                    <input class="form-control text-box single-line" id="labelcount" name="LabelCount" type="number" value="">
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-push-1 col-md-11">
                    <input type="submit" value="Add to List" class="btn btn-default" id="submitlabelcount">
                </div>
            </div>
            <div class="form-group" id="progresslabelcount"></div>
        </div>
    </div>
</div>

