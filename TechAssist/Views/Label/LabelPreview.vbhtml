<h4>Label Page Preview</h4>
<hr />
<div class="row">
    <div class="label-page clearfix">
        @For i = 1 To 30
            @<div Class="col-xs-4">
                <div class="student-label" id="labelpreview-@i">
                    @i
                </div>
            </div>
        Next i
    </div>
</div>
