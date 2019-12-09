CREATE PROCEDURE [dbo].[App_Sel_EvolutionPeriodQueue]
(@MigrationID INT)
AS

SET NOCOUNT ON

SELECT 
	  m.MigrationName
	, m.SourceDb
	, m.DestQqID
	, cw.EvolutionPeriod
	, cw.CatalystPeriod
FROM dbo.Evolution_PeriodCrosswalk cw
	INNER JOIN dbo.Migrations m ON cw.MigrationID = m.MigrationID
WHERE m.MigrationID = @MigrationID
ORDER BY EvolutionPeriod

SET NOCOUNT OFF