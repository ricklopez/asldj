CREATE PROCEDURE dbo.App_Sel_MigrationsActionItems_MigrationID
(@MigrationID INT)
AS

SET NOCOUNT ON

SELECT 
	  [ActionItemID]
	, [MigrationID]
	, [ErrorNumber]
	, [ParentTable]
	, [ProblemCategory]
	, [ProblemDesc]
	, [RecordsAffected]
	, [DefaultAction]
	, [ActionValue]
FROM [dbo].[MigrationsActionItems]
WHERE MigrationID = @MigrationID

SET NOCOUNT OFF