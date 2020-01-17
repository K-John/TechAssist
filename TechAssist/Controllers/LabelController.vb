Imports System.Web.Mvc
Imports TechAssist.Models

Namespace Controllers
    Public Class LabelController
        Inherits Controller

        ' GET: Label
        Function Index() As ActionResult
            Return View()
        End Function

        ' GET: LabelSheet
        Function LabelSheet() As ActionResult
            Return View()
        End Function

        ' GET: PartialView AddLabel
        Function AddLabel() As ActionResult

            Dim LSVM As New LabelSchoolViewModel()
            LSVM.SchoolModel = GetSchools()

            Return PartialView(LSVM)
        End Function

        ' GET: PartialView LabelList
        Function LabelList() As ActionResult
            Return PartialView()
        End Function

        ' GET: PartialView LabelPreview
        Function LabelPreview() As ActionResult
            Return PartialView()
        End Function

        ' GET: JSON School List
        Function SchoolsInfo() As ActionResult
            Dim LSVM As New LabelSchoolViewModel()
            LSVM.SchoolModel = GetSchools()

            Return Json(LSVM.SchoolModel, JsonRequestBehavior.AllowGet)
        End Function

        ' Return a List of SchoolModel format schools
        Function GetSchools()

            Dim schools As New List(Of SchoolModel) From {
                New SchoolModel() With {.SchoolID = 0, .SchoolName = ""},
                New SchoolModel() With {.SchoolID = 1, .SchoolName = "Barkers Mill Elementary", .SchoolAcronym = "BMES"},
                New SchoolModel() With {.SchoolID = 2, .SchoolName = "Barksdale Elementary", .SchoolAcronym = "BES"},
                New SchoolModel() With {.SchoolID = 3, .SchoolName = "Burt Elementary", .SchoolAcronym = "BURT"},
                New SchoolModel() With {.SchoolID = 4, .SchoolName = "Byrns L. Darden Elementary", .SchoolAcronym = "BDES"},
                New SchoolModel() With {.SchoolID = 5, .SchoolName = "Carmel Elementary", .SchoolAcronym = "CES"},
                New SchoolModel() With {.SchoolID = 6, .SchoolName = "Clarksville High", .SchoolAcronym = "CHS"},
                New SchoolModel() With {.SchoolID = 7, .SchoolName = "Cumberland Heights Elementary", .SchoolAcronym = "CHES"},
                New SchoolModel() With {.SchoolID = 8, .SchoolName = "East Montgomery Elementary", .SchoolAcronym = "EMES"},
                New SchoolModel() With {.SchoolID = 9, .SchoolName = "Glenellen Elementary", .SchoolAcronym = "GES"},
                New SchoolModel() With {.SchoolID = 10, .SchoolName = "Hazelwood Elementary", .SchoolAcronym = "HES"},
                New SchoolModel() With {.SchoolID = 11, .SchoolName = "Kenwood Elementary", .SchoolAcronym = "KES"},
                New SchoolModel() With {.SchoolID = 12, .SchoolName = "Kenwood High", .SchoolAcronym = "KHS"},
                New SchoolModel() With {.SchoolID = 13, .SchoolName = "Kenwood Middle", .SchoolAcronym = "KMS"},
                New SchoolModel() With {.SchoolID = 14, .SchoolName = "Liberty Elementary", .SchoolAcronym = "LES"},
                New SchoolModel() With {.SchoolID = 15, .SchoolName = "Middle College", .SchoolAcronym = "MC"},
                New SchoolModel() With {.SchoolID = 16, .SchoolName = "Minglewood Elementary", .SchoolAcronym = "MWES"},
                New SchoolModel() With {.SchoolID = 17, .SchoolName = "Montgomery Central Elementary", .SchoolAcronym = "MCES"},
                New SchoolModel() With {.SchoolID = 18, .SchoolName = "Montgomery Central High", .SchoolAcronym = "MCHS"},
                New SchoolModel() With {.SchoolID = 19, .SchoolName = "Montgomery Central Middle", .SchoolAcronym = "MCMS"},
                New SchoolModel() With {.SchoolID = 20, .SchoolName = "Moore Magnet Elementary", .SchoolAcronym = "MES"},
                New SchoolModel() With {.SchoolID = 21, .SchoolName = "New Providence Middle", .SchoolAcronym = "NPMS"},
                New SchoolModel() With {.SchoolID = 22, .SchoolName = "Norman Smith Elementary", .SchoolAcronym = "NSES"},
                New SchoolModel() With {.SchoolID = 23, .SchoolName = "Northeast Elementary", .SchoolAcronym = "NEES"},
                New SchoolModel() With {.SchoolID = 24, .SchoolName = "Northeast High", .SchoolAcronym = "NEHS"},
                New SchoolModel() With {.SchoolID = 25, .SchoolName = "Northeast Middle", .SchoolAcronym = "NEMS"},
                New SchoolModel() With {.SchoolID = 26, .SchoolName = "Northwest High", .SchoolAcronym = "NWHS"},
                New SchoolModel() With {.SchoolID = 27, .SchoolName = "Oakland Elementary", .SchoolAcronym = "OES"},
                New SchoolModel() With {.SchoolID = 28, .SchoolName = "Pisgah Elementary", .SchoolAcronym = "PES"},
                New SchoolModel() With {.SchoolID = 29, .SchoolName = "Richview Middle", .SchoolAcronym = "RMS"},
                New SchoolModel() With {.SchoolID = 30, .SchoolName = "Ringgold Elementary", .SchoolAcronym = "RES"},
                New SchoolModel() With {.SchoolID = 31, .SchoolName = "Rossview Elementary", .SchoolAcronym = "RSES"},
                New SchoolModel() With {.SchoolID = 32, .SchoolName = "Rossview High", .SchoolAcronym = "RSHS"},
                New SchoolModel() With {.SchoolID = 33, .SchoolName = "Rossview Middle", .SchoolAcronym = "RSMS"},
                New SchoolModel() With {.SchoolID = 34, .SchoolName = "Sango Elementary", .SchoolAcronym = "SES"},
                New SchoolModel() With {.SchoolID = 35, .SchoolName = "West Creek Elementary", .SchoolAcronym = "WCES"},
                New SchoolModel() With {.SchoolID = 36, .SchoolName = "West Creek High", .SchoolAcronym = "WCHS"},
                New SchoolModel() With {.SchoolID = 37, .SchoolName = "West Creek Middle", .SchoolAcronym = "WCMS"},
                New SchoolModel() With {.SchoolID = 38, .SchoolName = "Woodlawn Elementary", .SchoolAcronym = "WES"}
            }

            Return schools
        End Function
    End Class
End Namespace