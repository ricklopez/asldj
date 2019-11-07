
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

	/*
	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 2)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT 
			ISNULL(ncw.CatalystJsonNodeName, p.NodeName) AS [Key], 
			CASE p.NodeValue WHEN 'True' THEN 'true' WHEN 'False' THEN 'false' ELSE p.NodeValue END AS [Value], 
			CAST(0 AS BIT) AS Modified
		FROM dbo.Evolution_AcordDocumentParses p
			--INNER JOIN [MpmmDb].[dbo].[Evolution_XMLTable] x 
			--	ON p.Acord_ID = x.Acord_ID
			INNER JOIN [MpmmDb].[dbo].[Evolution_AcordCrosswalk] cw 
				ON cw.MigrationID = p.MigrationID
				AND cw.Form1Name = p.DocumentName
			LEFT JOIN dbo.Evolution_AcordNodeCrosswalk ncw
				ON ncw.Form1Name = cw.Form1Name
				AND ncw.EvolutionXmlNodeName = p.NodeName
		WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 2
		FOR JSON AUTO
		) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 3)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT 
			ISNULL(ncw.CatalystJsonNodeName, p.NodeName) AS [Key], 
			CASE p.NodeValue WHEN 'True' THEN 'true' WHEN 'False' THEN 'false' ELSE p.NodeValue END AS [Value], 
			CAST(0 AS BIT) AS Modified
		FROM dbo.Evolution_AcordDocumentParses p
			--INNER JOIN [MpmmDb].[dbo].[Evolution_XMLTable] x 
			--	ON p.Acord_ID = x.Acord_ID
			INNER JOIN [MpmmDb].[dbo].[Evolution_AcordCrosswalk] cw 
				ON cw.MigrationID = p.MigrationID
				AND cw.Form1Name = p.DocumentName
			LEFT JOIN dbo.Evolution_AcordNodeCrosswalk ncw
				ON ncw.Form1Name = cw.Form1Name
				AND ncw.EvolutionXmlNodeName = p.NodeName
		WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 3
		FOR JSON AUTO
		) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 4)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT 
			ISNULL(ncw.CatalystJsonNodeName, p.NodeName) AS [Key], 
			CASE p.NodeValue WHEN 'True' THEN 'true' WHEN 'False' THEN 'false' ELSE p.NodeValue END AS [Value], 
			CAST(0 AS BIT) AS Modified
		FROM dbo.Evolution_AcordDocumentParses p
			--INNER JOIN [MpmmDb].[dbo].[Evolution_XMLTable] x 
			--	ON p.Acord_ID = x.Acord_ID
			INNER JOIN [MpmmDb].[dbo].[Evolution_AcordCrosswalk] cw 
				ON cw.MigrationID = p.MigrationID
				AND cw.Form1Name = p.DocumentName
			LEFT JOIN dbo.Evolution_AcordNodeCrosswalk ncw
				ON ncw.Form1Name = cw.Form1Name
				AND ncw.EvolutionXmlNodeName = p.NodeName
		WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 4
		FOR JSON AUTO
		) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 5)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT 
			ISNULL(ncw.CatalystJsonNodeName, p.NodeName) AS [Key], 
			CASE p.NodeValue WHEN 'True' THEN 'true' WHEN 'False' THEN 'false' ELSE p.NodeValue END AS [Value], 
			CAST(0 AS BIT) AS Modified
		FROM dbo.Evolution_AcordDocumentParses p
			--INNER JOIN [MpmmDb].[dbo].[Evolution_XMLTable] x 
			--	ON p.Acord_ID = x.Acord_ID
			INNER JOIN [MpmmDb].[dbo].[Evolution_AcordCrosswalk] cw 
				ON cw.MigrationID = p.MigrationID
				AND cw.Form1Name = p.DocumentName
			LEFT JOIN dbo.Evolution_AcordNodeCrosswalk ncw
				ON ncw.Form1Name = cw.Form1Name
				AND ncw.EvolutionXmlNodeName = p.NodeName
		WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 5
		FOR JSON AUTO
		) + '}'
	*/
	SELECT @RV = @RV + '], "outdated": false, "ID": "-1" }'

	RETURN @RV

END
