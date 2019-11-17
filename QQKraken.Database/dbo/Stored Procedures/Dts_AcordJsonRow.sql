
CREATE PROCEDURE [dbo].[Dts_AcordJsonRow]
(@MigrationID INT, @Acord_ID INT)
AS

SET NOCOUNT ON

DECLARE @Form1Name VARCHAR(50)
DECLARE @AgencyLine1 VARCHAR(50)
DECLARE @AgencyLine2 VARCHAR(50)
DECLARE @AgencyLine3 VARCHAR(50)
DECLARE @AgencyPhone VARCHAR(50)
DECLARE @AgencyFax VARCHAR(50)
DECLARE @AgencyEmail VARCHAR(50)

SELECT 
	  @AgencyLine1 = AcordAgencyLine1
	, @AgencyLine2 = AcordAgencyLine2
	, @AgencyLine3 = AcordAgencyLine3
	, @AgencyPhone = AgencyPhoneLine
	, @AgencyFax = AgencyFaxLine
	, @AgencyEmail = AgencyEmailLine
FROM dbo.Migrations
WHERE MigrationID = @MigrationID

SELECT @Form1Name = Form1Name
FROM Evolution_XMLTable
WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID

INSERT INTO dbo.Evolution_AcordJsonConverted
	(
	MigrationID,
	Acord_ID,
	JsonString
	)
VALUES
	(
	@MigrationID,
	@Acord_ID,
	dbo.Evo_Acord_Json3(@MigrationID, @Acord_ID, @Form1Name, @AgencyLine1, @AgencyLine2, @AgencyLine3, @AgencyPhone, @AgencyFax, @AgencyEmail)
	)
SET NOCOUNT OFF