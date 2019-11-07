CREATE   PROCEDURE dbo.App_Ins_Migration
(
	  @MigrationID			INT OUTPUT
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

INSERT INTO [dbo].[Migrations]
(
	  MigrationID
	, MigrationTypeID
	, MigrationName
	, SourceHostName
	, SourceDb
	, SourceSchema
	, SourceXmlCount
	, DestDbHostName
	, DestDb
	, DestSchema
	, DestQqID
	, IsPhase1
	, IsPreprocessed
	, IsPhase2
	, EstimatedCleanupDate
	, IsPhase3
	, PlannedMigrationDate
	, IsPhase4
	, MigrationDate
	, BeginProcesDate
	, LastProcessDate
	, IsPhase5
	, IsPhase6
	, CsrNotes
	, BlankCostValue
	, AcordAgencyLine1
	, AcordAgencyLine2
	, AcordAgencyLine3
	, AgencyPhoneLine
	, AgencyFaxLine
	, AgencyEmailLine
)

VALUES
(
	  @MigrationID
	, 1
	, @MigrationName
	, @SourceHostName
	, @SourceDb
	, @SourceSchema
	, 0
	, @DestDbHostName
	, @DestDb
	, @DestSchema
	, @DestQqID
	, 0
	, 0
	, 0
	, '1/1/1900'
	, 0
	, @PlannedMigrationDate
	, 0
	, '1/1/1900'
	, '1/1/1900'
	, '1/1/1900'
	, 0
	, 0
	, @CsrNotes
	, @BlankCostValue
	, @AcordAgencyLine1
	, @AcordAgencyLine2
	, @AcordAgencyLine3
	, @AgencyPhoneLine
	, @AgencyFaxLine
	, @AgencyEmailLine
)

SELECT @MigrationID = SCOPE_IDENTITY()

SET NOCOUNT OFF
