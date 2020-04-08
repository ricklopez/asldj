

CREATE FUNCTION [dbo].[AcordPageOneBaseView]
(
	  @MigrationID INT
	, @Acord_ID INT
)
RETURNS TABLE 
AS
RETURN 
(
	SELECT 
		  p.DocumentName																		AS [DocumentName]
		, ISNULL(ncw.CatalystJsonNodeName, p.NodeName)											AS [Key]
		, STRING_AGG(p.NodeValue, ' ')															AS [Value]
		, CAST(0 AS BIT)																		AS [Modified]
	FROM dbo.Evolution_AcordDocumentParses p
		INNER JOIN [MpmmDb].[dbo].[Evolution_AcordCrosswalk] cw 
			ON cw.MigrationID = p.MigrationID
			AND cw.Form1Name = p.DocumentName
		INNER JOIN dbo.Evolution_AcordNodeCrosswalk ncw
			ON ncw.Form1Name = cw.Form1Name
			AND REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
				ncw.EvolutionXmlNodeName
				, '#A-', ''), '#P-', ''), '#M-', ''), '#A-grp', ''), '#P-grp', ''), '^', '') = p.NodeName
	WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 1
	GROUP BY p.DocumentName, ISNULL(ncw.CatalystJsonNodeName, p.NodeName)
)