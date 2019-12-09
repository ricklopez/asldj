
CREATE FUNCTION [dbo].[Evo_Acord_Json]
(@MigrationID INT, @Acord_ID INT)
RETURNS VARCHAR(MAX)
AS
BEGIN
	
	DECLARE @RV VARCHAR(MAX)

	SELECT @RV = '{"Pages": [{"Fields":'  +
	(
	SELECT NodeName + '_' + CAST(PageNumber AS VARCHAR(50)) AS [Key], NodeValue AS [Value], CAST(0 AS BIT) AS Modified
	FROM dbo.Evolution_AcordDocumentParses
	WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 1
	FOR JSON AUTO
	) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 2)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT NodeName + '_' + CAST(PageNumber AS VARCHAR(50)) AS [Key], NodeValue AS [Value], CAST(0 AS BIT) AS Modified
		from dbo.Evolution_AcordDocumentParses
		WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 2
		FOR JSON AUTO
		) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 3)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT NodeName + '_' + CAST(PageNumber AS VARCHAR(50)) AS [Key], NodeValue AS [Value], CAST(0 AS BIT) AS Modified
		from dbo.Evolution_AcordDocumentParses
		WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 3
		FOR JSON AUTO
		) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 4)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT NodeName + '_' + CAST(PageNumber AS VARCHAR(50)) AS [Key], NodeValue AS [Value], CAST(0 AS BIT) AS Modified
		from dbo.Evolution_AcordDocumentParses
		WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 4
		FOR JSON AUTO
		) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 5)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT NodeName + '_' + CAST(PageNumber AS VARCHAR(50)) AS [Key], NodeValue AS [Value], CAST(0 AS BIT) AS Modified
		from dbo.Evolution_AcordDocumentParses
		WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 5
		FOR JSON AUTO
		) + '}'

	SELECT @RV = @RV + '], "outdated": false, "ID": "-1" }'

	RETURN @RV

END