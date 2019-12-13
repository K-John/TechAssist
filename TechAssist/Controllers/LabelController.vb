Imports System.Web.Mvc
Imports TechAssist.Models

Namespace Controllers
    Public Class LabelController
        Inherits Controller

        ' GET: Label
        Function Index() As ActionResult
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

        ' Return a List of SchoolModel format schools
        Function GetSchools()

            Dim schools As New List(Of SchoolModel) From {
                New SchoolModel() With {.SchoolID = 0, .SchoolName = ""},
                New SchoolModel() With {.SchoolID = 1, .SchoolName = "Barkers Mill Elementary"},
                New SchoolModel() With {.SchoolID = 2, .SchoolName = "Barksdale Elementary"},
                New SchoolModel() With {.SchoolID = 3, .SchoolName = "Burt Elementary"},
                New SchoolModel() With {.SchoolID = 4, .SchoolName = "Byrns L. Darden Elementary"},
                New SchoolModel() With {.SchoolID = 5, .SchoolName = "Carmel Elementary"},
                New SchoolModel() With {.SchoolID = 6, .SchoolName = "Clarksville High"},
                New SchoolModel() With {.SchoolID = 7, .SchoolName = "Cumberland Heights Elementary"},
                New SchoolModel() With {.SchoolID = 8, .SchoolName = "East Montgomery Elementary"},
                New SchoolModel() With {.SchoolID = 9, .SchoolName = "Glenellen Elementary"},
                New SchoolModel() With {.SchoolID = 10, .SchoolName = "Hazelwood Elementary"},
                New SchoolModel() With {.SchoolID = 11, .SchoolName = "Kenwood Elementary"},
                New SchoolModel() With {.SchoolID = 12, .SchoolName = "Kenwood High"},
                New SchoolModel() With {.SchoolID = 13, .SchoolName = "Kenwood Middle"},
                New SchoolModel() With {.SchoolID = 14, .SchoolName = "Liberty Elementary"},
                New SchoolModel() With {.SchoolID = 15, .SchoolName = "Middle College"},
                New SchoolModel() With {.SchoolID = 16, .SchoolName = "Minglewood Elementary"},
                New SchoolModel() With {.SchoolID = 17, .SchoolName = "Montgomery Central Elementary"},
                New SchoolModel() With {.SchoolID = 18, .SchoolName = "Montgomery Central High"},
                New SchoolModel() With {.SchoolID = 19, .SchoolName = "Montgomery Central Middle"},
                New SchoolModel() With {.SchoolID = 20, .SchoolName = "Moore Magnet Elementary"},
                New SchoolModel() With {.SchoolID = 21, .SchoolName = "New Providence Middle"},
                New SchoolModel() With {.SchoolID = 22, .SchoolName = "Norman Smith Elementary"},
                New SchoolModel() With {.SchoolID = 23, .SchoolName = "Northeast Elementary"},
                New SchoolModel() With {.SchoolID = 24, .SchoolName = "Northeast High"},
                New SchoolModel() With {.SchoolID = 25, .SchoolName = "Northeast Middle"},
                New SchoolModel() With {.SchoolID = 26, .SchoolName = "Northwest High"},
                New SchoolModel() With {.SchoolID = 27, .SchoolName = "Oakland Elementary"},
                New SchoolModel() With {.SchoolID = 28, .SchoolName = "Pisgah Elementary"},
                New SchoolModel() With {.SchoolID = 29, .SchoolName = "Richview Middle"},
                New SchoolModel() With {.SchoolID = 30, .SchoolName = "Ringgold Elementary"},
                New SchoolModel() With {.SchoolID = 31, .SchoolName = "Rossview Elementary"},
                New SchoolModel() With {.SchoolID = 32, .SchoolName = "Rossview High"},
                New SchoolModel() With {.SchoolID = 33, .SchoolName = "Rossview Middle"},
                New SchoolModel() With {.SchoolID = 34, .SchoolName = "Sango Elementary"},
                New SchoolModel() With {.SchoolID = 35, .SchoolName = "West Creek Elementary"},
                New SchoolModel() With {.SchoolID = 36, .SchoolName = "West Creek High"},
                New SchoolModel() With {.SchoolID = 37, .SchoolName = "West Creek Middle"},
                New SchoolModel() With {.SchoolID = 38, .SchoolName = "Woodlawn Elementary"}
            }

            Return schools
        End Function
    End Class
End Namespace