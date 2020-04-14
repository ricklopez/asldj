CREATE PROCEDURE [dbo].[Mpmm_Convert_Tick]
AS

SET NOCOUNT ON

DECLARE @MigrationID INT

DECLARE db_cursor CURSOR FAST_FORWARD FOR 
SELECT MigrationID
FROM Migrations
WHERE IsPhase1 = 1 AND IsPhase2 = 1 AND IsPhase3 = 1 AND IsPhase4 = 0

OPEN db_cursor  
FETCH NEXT FROM db_cursor INTO @MigrationID

WHILE @@FETCH_STATUS = 0  
BEGIN 
	EXEC dbo.App_Dts_Convert @MigrationID

	UPDATE Migrations
		SET IsPhase4 = 1
	WHERE MigrationID = @MigrationID

    FETCH NEXT FROM db_cursor INTO @MigrationID
END 

CLOSE db_cursor  
DEALLOCATE db_cursor 

SET NOCOUNT OFF