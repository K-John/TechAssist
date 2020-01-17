@Code
    Layout = Nothing
End Code
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>LabelSheet</title>
    <link rel="stylesheet" href="/content/labelsheet.css" />
    <script src="~/Scripts/JsBarcode.code128.min.js"></script>
</head>
<body>
    <div class="page" id="pagecontainer">
        <div class="label"></div>
        <div class="label">
            <img class="image" src="/content/img/KMS.png">
            <div class="student">
                <div id="resize">Kendallasdfasdfasdfasdf</div>
                <div id="resize">Johnsonasdfasdfsasdfasasdfasddd</div>
                <svg class="barcode"
                     jsbarcode-value="*123456*"
                     jsbarcode-displayvalue="false"
                     jsbarcode-width="1"
                     jsbarcode-height="20"
                     jsbarcode-margin="5">
                </svg>
            </div>
            <div class="school">
                <span>IF FOUND, CALL KMS: 931-387-3201</span>
            </div>
        </div>
        <div class="label">
            <img class="image" src="/content/img/CES.png">
            <div class="student">
                <div id="resize">Kendall</div>
                <div id="resize">Johnsonasdfasdfsadfs</div>
                <svg class="barcode"
                     jsbarcode-value="*654321*"
                     jsbarcode-displayvalue="false"
                     jsbarcode-width="1"
                     jsbarcode-height="20"
                     jsbarcode-margin="5">
                </svg>
            </div>
            <div class="school">
                <span>IF FOUND, CALL KMS: 931-387-3201</span>
            </div>
        </div>
    </div>
</body>
@Scripts.Render("~/bundles/labelsheet")
</html>
<script>
    JsBarcode(".barcode").init();
</script>