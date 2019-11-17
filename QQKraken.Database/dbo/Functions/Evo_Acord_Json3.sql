
CREATE FUNCTION [dbo].[Evo_Acord_Json3]
(
	  @MigrationID INT
	, @Acord_ID INT
	, @Form1Name VARCHAR(50)
	, @AcordAgency1 VARCHAR(50)
	, @AcordAgency2 VARCHAR(50)
	, @AcordAgency3 VARCHAR(50)
	, @AgencyPhoneLine VARCHAR(50)
	, @AgencyFaxLine VARCHAR(50)
	, @AgencyEmailLine VARCHAR(50)
)
RETURNS VARCHAR(MAX)
AS
BEGIN
	
	DECLARE @RV VARCHAR(MAX)

	SELECT @RV = '{"Pages": [{"Fields":'  +

	(
		SELECT [Key], [Value], [Modified]
		FROM dbo.AcordPageOneUnionView2(@MigrationID, @Acord_ID, @Form1Name, @AcordAgency1, @AcordAgency2, @AcordAgency3, @AgencyPhoneLine, @AgencyFaxLine, @AgencyEmailLine)
		FOR JSON AUTO
	) + '}'

	SELECT @RV = @RV + '], "outdated": false, "ID": "-1" }'

	RETURN @RV

END