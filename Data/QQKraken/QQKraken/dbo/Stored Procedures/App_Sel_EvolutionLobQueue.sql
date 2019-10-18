CREATE PROCEDURE [dbo].[App_Sel_EvolutionLobQueue]
(@MigrationID INT)
AS

SET NOCOUNT ON

SELECT 
	  m.MigrationName
	, m.SourceDb
	, m.DestQqID
	, cw.EvolutionLOB
	, cw.EvolutionCoverage
	, FORMAT(cw.CountOfEvolutionRows, 'N0') AS [CountOfEvolutionRows]
	, cw.CatalystLOB
FROM dbo.Evolution_LobCrosswalk cw WITH (NOLOCK)
	INNER JOIN dbo.Migrations m WITH (NOLOCK) ON cw.MigrationID = m.MigrationID
WHERE m.MigrationID = @MigrationID
ORDER BY cw.EvolutionLOB, cw.EvolutionCoverage

SET NOCOUNT OFF
