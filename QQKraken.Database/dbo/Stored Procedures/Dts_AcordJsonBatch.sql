CREATE PROCEDURE [dbo].[Dts_AcordJsonBatch]
(@MigrationID INT)
AS

SET NOCOUNT ON

DECLARE @Acord_ID INT

DECLARE xj_db_cursor CURSOR FAST_FORWARD FOR

	--SELECT MAX(x.Acord_ID)
	SELECT x.Acord_ID
	FROM MpmmDb.dbo.Evolution_XMLTable x
		INNER JOIN MpmmDb.dbo.Evolution_AcordCrosswalk ac
			ON  x.Form1Name = ac.Form1Name
			AND x.MigrationID = ac.MigrationID
		INNER JOIN MpmmDb.dbo.CatalystCommon_AcordFormTemplates aft
			ON  aft.AcordTemplateID = ac.AcordTemplateID
	WHERE x.MigrationID = @MigrationID AND x.IsAcord = 1 AND ac.IsApproved = 1 AND ac.Form1Name = 'Acord_Endorsement1'
	--GROUP BY aft.AcordTemplateID

OPEN xj_db_cursor  
FETCH NEXT FROM xj_db_cursor INTO @Acord_ID

WHILE @@FETCH_STATUS = 0  
BEGIN 

	EXEC dbo.Dts_AcordJsonRow
		@MigrationID = @MigrationID, 
		@Acord_ID = @Acord_ID

	FETCH NEXT FROM xj_db_cursor INTO @Acord_ID

END

CLOSE xj_db_cursor  
DEALLOCATE xj_db_cursor 

SET NOCOUNT OFF