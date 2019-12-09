CREATE PROCEDURE dbo.App_Sel_MigrationsActionDetails_MigrationID
(@MigrationID INT)
AS

SET NOCOUNT ON

SELECT
	  [ActionDetailID]
	, [MigrationID]
	, [ErrorNumber]
	, [ParentTable]
	, [ProblemCategory]
	, [ProblemDesc]
	, [ClientNumber]
	, [FullClientName]
	, [Phone]
	, [PolicyNumber]
	, [PolicyEffective]
	, [PolicyExpiration]
	, [Coverage]
FROM [dbo].[MigrationsActionDetails]
WHERE MigrationID = @MigrationID

SET NOCOUNT OFF