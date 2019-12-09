CREATE PROCEDURE [dbo].[App_Sel_EvolutionOfficeQueue]
(@MigrationID INT)
AS

SET NOCOUNT ON

SELECT 
	  m.MigrationName
	, m.SourceDb
	, m.DestQqID
	, cw.Evolution_OfficeName
	, cw.Evolution_OfficeId
	, cw.Catalyst_OfficeId
FROM dbo.Evolution_OfficeCrosswalk cw WITH (NOLOCK)
	INNER JOIN dbo.Migrations m WITH (NOLOCK) ON cw.MigrationID = m.MigrationID
WHERE m.MigrationID = @MigrationID
ORDER BY cw.Evolution_OfficeName

SET NOCOUNT OFF