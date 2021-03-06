﻿<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - Tech Assist</title>
    @Styles.Render("~/Content/css")
    @Scripts.Render("~/bundles/modernizr")
</head>
<body>
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                @Html.ActionLink("Home", "Index", "Label", New With {.area = ""}, New With {.class = "navbar-brand"})
            </div>
        </div>
    </div>
    <div class="container body-content">
        @RenderBody()
        <hr />
        <footer>
            <p>&copy; @DateTime.Now.Year - <a href="mailto:kendall.johnson@cmcss.net">Kendall Johnson</a><span id="version"></span></p>
        </footer>
    </div>
</body>
@Scripts.Render("~/bundles/techassist")
@Scripts.Render("~/bundles/bootstrap")
@RenderSection("scripts", required:=False)
</html>
