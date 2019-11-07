CREATE PROCEDURE [dbo].[Mpmm_Xml_Batch_Database]
AS

SET NOCOUNT ON

DECLARE @MigrationID INT
DECLARE @DatabaseName VARCHAR(MAX)
DECLARE @IterationBegin DATETIME2

DECLARE db_db_cursor CURSOR FAST_FORWARD FOR 

SELECT MigrationID, SourceDb
FROM dbo.Migrations
WHERE IsPhase1 = 1 AND IsPreprocessed = 0

OPEN db_db_cursor  
FETCH NEXT FROM db_db_cursor INTO @MigrationID, @DatabaseName

WHILE @@FETCH_STATUS = 0  
BEGIN 

	SET @IterationBegin = GETDATE()
    EXEC dbo.Mpmm_Xml_Batch @MigrationID, 1

	INSERT INTO dbo.MigrationsLog (MigrationID, MigrationPhaseID, PageNumber, StartDate, EndDate, RecordsProcessed)
		SELECT MigrationID, 1, 1, @IterationBegin, GETDATE(), COUNT(Acord_ID)
		FROM dbo.Evolution_AcordDocumentParses
		WHERE (MigrationID = @MigrationID) AND (PageNumber = 1)
		GROUP BY MigrationID
	
	SET @IterationBegin = GETDATE()
	EXEC dbo.Mpmm_Xml_Batch @MigrationID, 2

	INSERT INTO dbo.MigrationsLog (MigrationID, MigrationPhaseID, PageNumber, StartDate, EndDate, RecordsProcessed)
		SELECT MigrationID, 1, 2, @IterationBegin, GETDATE(), COUNT(Acord_ID)
		FROM dbo.Evolution_AcordDocumentParses
		WHERE (MigrationID = @MigrationID) AND (PageNumber = 2)
		GROUP BY MigrationID

	SET @IterationBegin = GETDATE()
	EXEC dbo.Mpmm_Xml_Batch @MigrationID, 3

	INSERT INTO dbo.MigrationsLog (MigrationID, MigrationPhaseID, PageNumber, StartDate, EndDate, RecordsProcessed)
		SELECT MigrationID, 1, 3, @IterationBegin, GETDATE(), COUNT(Acord_ID)
		FROM dbo.Evolution_AcordDocumentParses
		WHERE (MigrationID = @MigrationID) AND (PageNumber = 3)
		GROUP BY MigrationID

	SET @IterationBegin = GETDATE()
	EXEC dbo.Mpmm_Xml_Batch @MigrationID, 4

	INSERT INTO dbo.MigrationsLog (MigrationID, MigrationPhaseID, PageNumber, StartDate, EndDate, RecordsProcessed)
		SELECT MigrationID, 1, 4, @IterationBegin, GETDATE(), COUNT(Acord_ID)
		FROM dbo.Evolution_AcordDocumentParses
		WHERE (MigrationID = @MigrationID) AND (PageNumber = 4)
		GROUP BY MigrationID

	SET @IterationBegin = GETDATE()
	EXEC dbo.Mpmm_Xml_Batch @MigrationID, 5

	INSERT INTO dbo.MigrationsLog (MigrationID, MigrationPhaseID, PageNumber, StartDate, EndDate, RecordsProcessed)
		SELECT MigrationID, 1, 5, @IterationBegin, GETDATE(), COUNT(Acord_ID)
		FROM dbo.Evolution_AcordDocumentParses
		WHERE (MigrationID = @MigrationID) AND (PageNumber = 5)
		GROUP BY MigrationID

    FETCH NEXT FROM db_db_cursor INTO @MigrationID, @DatabaseName
END 

CLOSE db_db_cursor  
DEALLOCATE db_db_cursor 

SET NOCOUNT OFF
