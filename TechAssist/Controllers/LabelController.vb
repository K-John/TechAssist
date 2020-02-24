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

        ' GET: GenerateTestData
        Function GenerateTestData() As ActionResult
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

        ' GET: PartialView LabelImport
        Function LabelImport() As ActionResult

            Dim LSVM As New LabelSchoolViewModel()
            LSVM.SchoolModel = GetSchools()
            Return PartialView(LSVM)
        End Function

        ' GET: PartialView AssetTag
        Function AssetTag() As ActionResult
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
                New SchoolModel() With {.SchoolID = 1, .SchoolName = "Barkers Mill Elementary", .SchoolAcronym = "BMES", .SchoolPhone = "931-906-7235"},
                New SchoolModel() With {.SchoolID = 2, .SchoolName = "Barksdale Elementary", .SchoolAcronym = "BES", .SchoolPhone = "931-648-5685"},
                New SchoolModel() With {.SchoolID = 3, .SchoolName = "Burt Elementary", .SchoolAcronym = "BURT", .SchoolPhone = "931-648-5630"},
                New SchoolModel() With {.SchoolID = 4, .SchoolName = "Byrns L. Darden Elementary", .SchoolAcronym = "BDES", .SchoolPhone = "931-648-5615"},
                New SchoolModel() With {.SchoolID = 5, .SchoolName = "Carmel Elementary", .SchoolAcronym = "CES", .SchoolPhone = "931-802-5025"},
                New SchoolModel() With {.SchoolID = 6, .SchoolName = "Clarksville High", .SchoolAcronym = "CHS", .SchoolPhone = "931-648-5690"},
                New SchoolModel() With {.SchoolID = 7, .SchoolName = "Cumberland Heights Elementary", .SchoolAcronym = "CHES", .SchoolPhone = "931-648-5695"},
                New SchoolModel() With {.SchoolID = 8, .SchoolName = "East Montgomery Elementary", .SchoolAcronym = "EMES", .SchoolPhone = "931-358-2868"},
                New SchoolModel() With {.SchoolID = 9, .SchoolName = "Glenellen Elementary", .SchoolAcronym = "GES", .SchoolPhone = "931-920-6158"},
                New SchoolModel() With {.SchoolID = 10, .SchoolName = "Hazelwood Elementary", .SchoolAcronym = "HES", .SchoolPhone = "931-553-2075"},
                New SchoolModel() With {.SchoolID = 11, .SchoolName = "Kenwood Elementary", .SchoolAcronym = "KES", .SchoolPhone = "931-553-2059"},
                New SchoolModel() With {.SchoolID = 12, .SchoolName = "Kenwood High", .SchoolAcronym = "KHS", .SchoolPhone = "931-905-7900"},
                New SchoolModel() With {.SchoolID = 13, .SchoolName = "Kenwood Middle", .SchoolAcronym = "KMS", .SchoolPhone = "931-553-2080"},
                New SchoolModel() With {.SchoolID = 14, .SchoolName = "Liberty Elementary", .SchoolAcronym = "LES", .SchoolPhone = "931-905-5729"},
                New SchoolModel() With {.SchoolID = 15, .SchoolName = "Middle College", .SchoolAcronym = "MidCol", .SchoolPhone = "931-221-1350"},
                New SchoolModel() With {.SchoolID = 16, .SchoolName = "Minglewood Elementary", .SchoolAcronym = "MWES", .SchoolPhone = "931-648-5646"},
                New SchoolModel() With {.SchoolID = 17, .SchoolName = "Montgomery Central Elementary", .SchoolAcronym = "MCES", .SchoolPhone = "931-387-3208"},
                New SchoolModel() With {.SchoolID = 18, .SchoolName = "Montgomery Central High", .SchoolAcronym = "MCHS", .SchoolPhone = "931-387-3201"},
                New SchoolModel() With {.SchoolID = 19, .SchoolName = "Montgomery Central Middle", .SchoolAcronym = "MCMS", .SchoolPhone = "931-387-2575"},
                New SchoolModel() With {.SchoolID = 20, .SchoolName = "Moore Magnet Elementary", .SchoolAcronym = "MMES", .SchoolPhone = "931-648-5635"},
                New SchoolModel() With {.SchoolID = 21, .SchoolName = "New Providence Middle", .SchoolAcronym = "NPMS", .SchoolPhone = "931-648-5655"},
                New SchoolModel() With {.SchoolID = 22, .SchoolName = "Norman Smith Elementary", .SchoolAcronym = "NSES", .SchoolPhone = "931-648-5660"},
                New SchoolModel() With {.SchoolID = 23, .SchoolName = "Northeast Elementary", .SchoolAcronym = "NEES", .SchoolPhone = "931-648-5662"},
                New SchoolModel() With {.SchoolID = 24, .SchoolName = "Northeast High", .SchoolAcronym = "NEHS", .SchoolPhone = "931-648-5640"},
                New SchoolModel() With {.SchoolID = 25, .SchoolName = "Northeast Middle", .SchoolAcronym = "NEMS", .SchoolPhone = "931-648-5665"},
                New SchoolModel() With {.SchoolID = 26, .SchoolName = "Northwest High", .SchoolAcronym = "NWHS", .SchoolPhone = "931-648-5675"},
                New SchoolModel() With {.SchoolID = 27, .SchoolName = "Oakland Elementary", .SchoolAcronym = "OES", .SchoolPhone = "931-920-7422"},
                New SchoolModel() With {.SchoolID = 28, .SchoolName = "Pisgah Elementary", .SchoolAcronym = "PES", .SchoolPhone = "931-802-6790"},
                New SchoolModel() With {.SchoolID = 29, .SchoolName = "Richview Middle", .SchoolAcronym = "RMS", .SchoolPhone = "931-648-5620"},
                New SchoolModel() With {.SchoolID = 30, .SchoolName = "Ringgold Elementary", .SchoolAcronym = "RES", .SchoolPhone = "931-648-5625"},
                New SchoolModel() With {.SchoolID = 31, .SchoolName = "Rossview Elementary", .SchoolAcronym = "RSES", .SchoolPhone = "931-645-1403"},
                New SchoolModel() With {.SchoolID = 32, .SchoolName = "Rossview High", .SchoolAcronym = "RSHS", .SchoolPhone = "931-553-2070"},
                New SchoolModel() With {.SchoolID = 33, .SchoolName = "Rossview Middle", .SchoolAcronym = "RSMS", .SchoolPhone = "931-920-6150"},
                New SchoolModel() With {.SchoolID = 34, .SchoolName = "St Bethlehem Elementary", .SchoolAcronym = "SBES", .SchoolPhone = "931-648-5670"},
                New SchoolModel() With {.SchoolID = 35, .SchoolName = "Sango Elementary", .SchoolAcronym = "SES", .SchoolPhone = "931-358-4093"},
                New SchoolModel() With {.SchoolID = 36, .SchoolName = "West Creek Elementary", .SchoolAcronym = "WCES", .SchoolPhone = "931-802-8637"},
                New SchoolModel() With {.SchoolID = 37, .SchoolName = "West Creek High", .SchoolAcronym = "WCHS", .SchoolPhone = "931-503-1788"},
                New SchoolModel() With {.SchoolID = 38, .SchoolName = "West Creek Middle", .SchoolAcronym = "WCMS", .SchoolPhone = "931-503-3288"},
                New SchoolModel() With {.SchoolID = 39, .SchoolName = "Woodlawn Elementary", .SchoolAcronym = "WES", .SchoolPhone = "931-648-5680"}
            }

            Return schools
        End Function
    End Class
End Namespace