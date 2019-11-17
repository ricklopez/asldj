CREATE PROCEDURE [dbo].[App_Sel_MigrationsErrors]
(@MigrationID INT)
AS

SET NOCOUNT ON

SELECT 
	me.ErrorID, 
	me.MigrationID, 
	me.TableName, 
	me.PkID, 
	me.PageNumber, 
	me.ErrorNumber, 
	me.ErrorMessage, 
	me.DateInserted, 
	me.ServerName, 
	me.DatabaseName
FROM MigrationsErrors me WITH (NOLOCK)
WHERE (me.MigrationID = @MigrationID)

SET NOCOUNT OFF