﻿<h4>Current List</h4>
<div class="form-horizontal">
    <table class="table table-hover">
        <tbody id="listcontainer">
            <tr>
                <th>School</th>
                <th>First</th>
                <th>Last</th>
                <th>Barcode</th>
                <th style="text-align: center;">Label Spot</th>
                <th style="text-align: center;">Details</th>
            </tr>
            <tr class="hover-view" id="labelrow-2">
                <td id="schoolacronym-2">KHS</td>
                <td id="firstname-2"><input type="text" name="firstname-2" value="Kendall" /></td>
                <td id="lastname-2"><input type="text" name="lastname-2" value="Johnson" /></td>
                <td id="barcode-2"><input type="number" name="barcode-2" value="123456" /></td>
                <td id="labelspot-2" style="text-align: center;">2</td>
                <td style="text-align: center;">
                    <span class="glyphicon glyphicon-ok icon-hover" data-toggle="tooltip" data-placement="top" title="Save Edits" style="display:inline-block !important"></span>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="form-group">
        <div class="col-md-10">
            <input type="submit" value="Export List to Label Sheet" class="btn btn-primary" id="export" />
            <input type="submit" value="Clear List" class="btn" id="clear" />
        </div>
    </div>
</div>