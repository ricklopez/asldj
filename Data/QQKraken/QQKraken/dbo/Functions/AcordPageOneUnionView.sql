

CREATE FUNCTION [dbo].[AcordPageOneUnionView]
(
	  @MigrationID INT
	, @Acord_ID INT
	, @Form1Name VARCHAR(50)
	, @AcordAgency1 VARCHAR(50)
	, @AcordAgency2 VARCHAR(50)
	, @AcordAgency3 VARCHAR(50)
	, @AgencyPhoneLine VARCHAR(50)
	, @AgencyFaxLine varchar(50)
	, @AgencyEmailLine VARCHAR(50)
)
RETURNS TABLE 
AS
RETURN 
(
	SELECT 
		ISNULL(ncw.CatalystJsonNodeName, p.NodeName) AS [Key], 
		CASE  
			WHEN p.NodeValue = 'True' THEN 'true' 
			WHEN p.NodeValue = 'False' THEN 'false'
			WHEN p.NodeValue = '-1' AND LEFT(ncw.EvolutionXmlNodeName, 3) IN ('chk', 'frm') THEN 'true'
			WHEN NOT p.NodeValue = '-1' AND LEFT(ncw.EvolutionXmlNodeName, 3) IN ('chk', 'frm') THEN 'false'
			WHEN LEFT(ncw.EvolutionXmlNodeName, 3) = '#A-' AND LEFT(RIGHT(RTRIM(p.NodeValue), 2), 1) = 'A' THEN 'true'
			WHEN LEFT(ncw.EvolutionXmlNodeName, 3) = '#P-' AND LEFT(RIGHT(RTRIM(p.NodeValue), 2), 1) = 'P' THEN 'true'
			WHEN LEFT(ncw.EvolutionXmlNodeName, 6) = '#A-grp' AND p.NodeValue = 1 THEN 'true'
			WHEN LEFT(ncw.EvolutionXmlNodeName, 6) = '#P-grp' AND p.NodeValue = 2 THEN 'true'
		ELSE p.NodeValue 
		END AS [Value], 
		CAST(0 AS BIT) AS Modified
	FROM dbo.Evolution_AcordDocumentParses p
		INNER JOIN [MpmmDb].[dbo].[Evolution_AcordCrosswalk] cw 
			ON cw.MigrationID = p.MigrationID
			AND cw.Form1Name = p.DocumentName
		INNER JOIN dbo.Evolution_AcordNodeCrosswalk ncw
			ON ncw.Form1Name = cw.Form1Name
			AND REPLACE(REPLACE(REPLACE(ncw.EvolutionXmlNodeName, '#A-', ''), '#P-', ''), '#M-', '') = p.NodeName
	WHERE p.MigrationID = @MigrationID AND p.Acord_ID = @Acord_ID and PageNumber = 1
	UNION ALL
	SELECT 
		CatalystJsonNodeName AS [Key],
		CASE  
			WHEN ncw.EvolutionXmlNodeName = '-AcordAgencyLine1' THEN @AcordAgency1 
			WHEN ncw.EvolutionXmlNodeName = '-AcordAgencyLine2' THEN @AcordAgency2 
			WHEN ncw.EvolutionXmlNodeName = '-AcordAgencyLine3' THEN @AcordAgency3
			WHEN ncw.EvolutionXmlNodeName = '-AgencyPhoneLine' THEN @AgencyPhoneLine
			WHEN ncw.EvolutionXmlNodeName = '-AgencyFaxLine' THEN @AgencyFaxLine
			WHEN ncw.EvolutionXmlNodeName = '-AgencyEmailLine' THEN @AgencyEmailLine
			WHEN ncw.EvolutionXmlNodeName = '-grpCancelReason' THEN 'true'
			WHEN ncw.EvolutionXmlNodeName = '-grpCancelRequest' THEN 'true'
			WHEN ncw.EvolutionXmlNodeName = '-grpCancelType' THEN 'true'
		END AS [value],
		CAST(0 AS BIT) AS Modified
	FROM dbo.Evolution_AcordNodeCrosswalk ncw
	WHERE ncw.Form1Name = @Form1Name AND LEFT(ncw.EvolutionXmlNodeName, 1) = '-'
)
