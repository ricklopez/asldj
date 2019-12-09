CREATE PROCEDURE [dbo].[App_Sel_ValueNamePairs]
(@PairName VARCHAR(50), @IntVar1 INT, @StrVar1 VARCHAR(50))
AS

SET NOCOUNT ON

IF @PairName = 'LobLookup'

	BEGIN

		SELECT InternalCode AS ValueMember, LOB + ' (' + InternalCode + ')' AS DisplayMember
		FROM dbo.Catalyst_LOBs WITH (NOLOCK)
		WHERE IsSupported = 1
		ORDER BY LOB

	END

ELSE IF @PairName = 'Migrations_Open'

	BEGIN

		SELECT MigrationID AS ValueMember, SourceDb + ' to ' + DestDb AS DisplayMember
		FROM dbo.Migrations WITH (NOLOCK)
		WHERE IsPhase1 = 1 AND IsPhase4 = 0
		ORDER BY LastProcessDate

	END

ELSE IF @PairName = 'Catalyst_LOBs'

	BEGIN

		SELECT InternalCode AS ValueMember, LOB AS DisplayMember
		FROM dbo.Catalyst_LOBs
		ORDER BY LOB

	END

ELSE IF @PairName = 'Catalyst_Periods'

	BEGIN

		SELECT PeriodValue AS ValueMember, PeriodName AS DisplayMember
		FROM dbo.Catalyst_Periods

	END

SET NOCOUNT OFF