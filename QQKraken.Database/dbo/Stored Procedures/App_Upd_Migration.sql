
CREATE   PROCEDURE dbo.App_Upd_Migration
(
	  @MigrationID			INT
	, @MigrationName		VARCHAR(50)
	, @SourceHostName		VARCHAR(50)
	, @SourceDb				VARCHAR(50)
	, @SourceSchema			VARCHAR(50)
	, @DestDbHostName		VARCHAR(50)
	, @DestDb				VARCHAR(50)
	, @DestSchema			VARCHAR(50)
	, @DestQqID				VARCHAR(50)
	, @PlannedMigrationDate SMALLDATETIME
	, @CsrNotes				VARCHAR(MAX)
	, @BlankCostValue		DECIMAL(9,2)
	, @AcordAgencyLine1		VARCHAR(50)
	, @AcordAgencyLine2		VARCHAR(50)
	, @AcordAgencyLine3		VARCHAR(50)
	, @AgencyPhoneLine		VARCHAR(50)
	, @AgencyFaxLine		VARCHAR(50)
	, @AgencyEmailLine		VARCHAR(50)
)
AS

SET NOCOUNT ON

UPDATE [dbo].[Migrations]
	SET 
	  MigrationName = @MigrationName
	, SourceHostName = @SourceSchema
	, SourceDb = @SourceDb
	, SourceSchema = @SourceSchema
	, DestDbHostName = @DestDbHostName
	, DestDb = @DestDb
	, DestSchema = @DestSchema
	, DestQqID = @DestQqID
	, PlannedMigrationDate = @PlannedMigrationDate
	, CsrNotes = @CsrNotes
	, BlankCostValue = @BlankCostValue
	, AcordAgencyLine1 = @AcordAgencyLine1
	, AcordAgencyLine2 = @AcordAgencyLine2
	, AcordAgencyLine3 = @AcordAgencyLine3
	, AgencyPhoneLine = @AgencyPhoneLine
	, AgencyFaxLine = @AgencyFaxLine
	, AgencyEmailLine = @AgencyEmailLine
WHERE MigrationID = @MigrationID

SET NOCOUNT OFF