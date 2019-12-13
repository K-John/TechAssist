Imports System.ComponentModel

Namespace Models
    Public Class LabelModel
        <DisplayName("School")>
        Public Property SchoolID As Integer
        <DisplayName("First Name")>
        Public Property FirstName As String
        <DisplayName("Last Name")>
        Public Property LastName As String
        Public Property Barcode As Integer
        <DisplayName("Label Spot")>
        Public Property LabelPlacement As Integer

    End Class

End Namespace
