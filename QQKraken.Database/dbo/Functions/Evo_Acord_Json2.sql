
CREATE FUNCTION [dbo].[Evo_Acord_Json2]
(@MigrationID INT, @Acord_ID INT)
RETURNS VARCHAR(MAX)
AS
BEGIN
	
	DECLARE @RV VARCHAR(MAX)

	SELECT @RV = '{"Pages": [{"Fields":'  +
	(
	SELECT ISNULL(ncw.CatalystJsonNodeName, p.NodeName) AS [Key], p.NodeValue AS [Value], CAST(0 AS BIT) AS Modified
	FROM dbo.Evolution_AcordDocumentParses p
		INNER JOIN [dbo].[Evolution_XMLTable] x 
			ON p.Acord_ID = x.Acord_ID
		INNER JOIN [dbo].[Evolution_AcordCrosswalk] cw 
			ON cw.MigrationID = p.MigrationID
			AND cw.Form1Name = x.Form1Name
		LEFT JOIN dbo.Evolution_AcordNodeCrosswalk ncw
			ON ncw.Form1Name = cw.Form1Name
			AND ncw.EvolutionXmlNodeName = p.NodeName
	WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 1
	FOR JSON AUTO
	) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 2)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT ISNULL(ncw.CatalystJsonNodeName, p.NodeName) AS [Key], p.NodeValue AS [Value], CAST(0 AS BIT) AS Modified
		FROM dbo.Evolution_AcordDocumentParses p
			INNER JOIN [dbo].[Evolution_XMLTable] x 
				ON p.Acord_ID = x.Acord_ID
			INNER JOIN [dbo].[Evolution_AcordCrosswalk] cw 
				ON cw.MigrationID = p.MigrationID
				AND cw.Form1Name = x.Form1Name
			LEFT JOIN dbo.Evolution_AcordNodeCrosswalk ncw
				ON ncw.Form1Name = cw.Form1Name
				AND ncw.EvolutionXmlNodeName = p.NodeName
		WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 2
		FOR JSON AUTO
		) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 3)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT ISNULL(ncw.CatalystJsonNodeName, p.NodeName) AS [Key], p.NodeValue AS [Value], CAST(0 AS BIT) AS Modified
		FROM dbo.Evolution_AcordDocumentParses p
			INNER JOIN [dbo].[Evolution_XMLTable] x 
				ON p.Acord_ID = x.Acord_ID
			INNER JOIN [dbo].[Evolution_AcordCrosswalk] cw 
				ON cw.MigrationID = p.MigrationID
				AND cw.Form1Name = x.Form1Name
			LEFT JOIN dbo.Evolution_AcordNodeCrosswalk ncw
				ON ncw.Form1Name = cw.Form1Name
				AND ncw.EvolutionXmlNodeName = p.NodeName
		WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 3
		FOR JSON AUTO
		) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 4)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT ISNULL(ncw.CatalystJsonNodeName, p.NodeName) AS [Key], p.NodeValue AS [Value], CAST(0 AS BIT) AS Modified
		FROM dbo.Evolution_AcordDocumentParses p
			INNER JOIN [dbo].[Evolution_XMLTable] x 
				ON p.Acord_ID = x.Acord_ID
			INNER JOIN [dbo].[Evolution_AcordCrosswalk] cw 
				ON cw.MigrationID = p.MigrationID
				AND cw.Form1Name = x.Form1Name
			LEFT JOIN dbo.Evolution_AcordNodeCrosswalk ncw
				ON ncw.Form1Name = cw.Form1Name
				AND ncw.EvolutionXmlNodeName = p.NodeName
		WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 4
		FOR JSON AUTO
		) + '}'

	IF EXISTS(SELECT * FROM dbo.Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID and PageNumber = 5)
		SELECT @RV = @RV + ',{"Fields":'  +
		(
		SELECT ISNULL(ncw.CatalystJsonNodeName, p.NodeName) AS [Key], p.NodeValue AS [Value], CAST(0 AS BIT) AS Modified
		FROM dbo.Evolution_AcordDocumentParses p
			INNER JOIN [dbo].[Evolution_XMLTable] x 
				ON p.Acord_ID = x.Acord_ID
			INNER JOIN [dbo].[Evolution_AcordCrosswalk] cw 
				ON cw.MigrationID = p.MigrationID
				AND cw.Form1Name = x.Form1Name
			LEFT JOIN dbo.Evolution_AcordNodeCrosswalk ncw
				ON ncw.Form1Name = cw.Form1Name
				AND ncw.EvolutionXmlNodeName = p.NodeName
		WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 5
		FOR JSON AUTO
		) + '}'

	SELECT @RV = @RV + '], "outdated": false, "ID": "-1" }'

	RETURN @RV

END