CREATE PROCEDURE [dbo].[Dts_Sel_Migrations_Preprocess]
AS

SET NOCOUNT ON

SELECT MigrationID, SourceHostName, SourceDb
FROM dbo.Migrations
WHERE IsPhase1 = 1 AND IsPreprocessed = 0

SET NOCOUNT OFF