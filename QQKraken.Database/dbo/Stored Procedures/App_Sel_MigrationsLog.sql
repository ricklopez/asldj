CREATE PROCEDURE [dbo].[App_Sel_MigrationsLog]
(@MigrationID INT)
AS

SET NOCOUNT ON

SELECT 
	m.SourceDb, 
	PageNumber, 
	CONVERT(VARCHAR, StartDate, 100) AS StartDate,
	CONVERT(VARCHAR, EndDate, 100) AS EndDate,
	DATEDIFF(SECOND, StartDate, EndDate) AS ElapsedSec, 
	FORMAT(RecordsProcessed, 'N0') AS RecordsProcessed,
	RecordsProcessed / DATEDIFF(SECOND, StartDate, EndDate) AS RecPerSec
FROM dbo.MigrationsLog ml WITH (NOLOCK)
	INNER JOIN dbo.Migrations m WITH (NOLOCK) ON ml.MigrationID = m.MigrationID
WHERE m.MigrationID = @MigrationID

SET NOCOUNT OFF