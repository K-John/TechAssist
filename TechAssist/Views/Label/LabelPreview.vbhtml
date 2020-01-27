<h4><div style="width: fit-content;" data-tooltip="Click a label spot below to select it!">Label Page Preview <span class="glyphicon glyphicon-info-sign info-icon"></span></div></h4>
<hr />
<div class="row">
    <div class="label-page clearfix" id="previewcontainer">
        @For i = 1 To 30
            @<div Class="col-xs-4">
                <div class="student-label" id="previewlabel">
                    @i
                </div>
            </div>
        Next i
    </div>
</div>
