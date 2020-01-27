@Code
    Layout = Nothing
End Code
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>LabelSheet</title>
    <link rel="stylesheet" href="/content/labelsheet.css" />
    <script src="~/Scripts/JsBarcode.code39.min.js"></script>
</head>
<body>
    <div class="page" id="pagecontainer"></div>
</body>
@Scripts.Render("~/bundles/labelsheet")
</html>