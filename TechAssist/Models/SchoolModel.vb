Imports System.ComponentModel
Imports System.Data.Entity

Namespace Models
    Public Class SchoolModel
        Public Property SchoolID As Integer
        <DisplayName("School Name")>
        Public Property SchoolName As String
        Public Property SchoolAcronym As String
        Public Property SchoolPhone As String
    End Class
End Namespace