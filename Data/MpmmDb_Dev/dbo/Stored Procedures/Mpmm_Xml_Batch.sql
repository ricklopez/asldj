CREATE PROCEDURE [dbo].[Mpmm_Xml_Batch]
(@MigrationID INT, @PageNumber INT)
AS

SET NOCOUNT ON

DECLARE @Acord_ID INT
DECLARE @ServerName VARCHAR(MAX)
DECLARE @DocumentName VARCHAR(MAX)
DECLARE @SqlHandleCleaner INT

DECLARE db_cursor CURSOR FAST_FORWARD FOR 

--SELECT MAX(x.Acord_ID)
SELECT x.Acord_ID
FROM MpmmDb.dbo.Evolution_XMLTable x
	INNER JOIN MpmmDb.dbo.Evolution_AcordCrosswalk ac
		ON  x.Form1Name = ac.Form1Name
		AND x.MigrationID = ac.MigrationID
	INNER JOIN MpmmDb.dbo.CatalystCommon_AcordFormTemplates aft
		ON  aft.AcordTemplateID = ac.AcordTemplateID
WHERE x.MigrationID = @MigrationID AND x.IsAcord = 1 AND ac.IsApproved = 1
--GROUP BY aft.AcordTemplateID

OPEN db_cursor  
FETCH NEXT FROM db_cursor INTO @Acord_ID

WHILE @@FETCH_STATUS = 0  
BEGIN 
	BEGIN TRY
		EXEC dbo.Mpmm_XmlParse @MigrationID, @Acord_ID = @Acord_ID , @PageNumber = @PageNumber
	END TRY
	BEGIN CATCH
		PRINT 1
	END CATCH
    FETCH NEXT FROM db_cursor INTO @Acord_ID
END 

CLOSE db_cursor  
DEALLOCATE db_cursor 

SET NOCOUNT OFF
