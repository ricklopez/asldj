

CREATE FUNCTION [dbo].[AcordPageOneUnionView2]
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
	SELECT DISTINCT
		bv.[Key], 
		CASE  
			WHEN bv.[Value] = 'True' THEN 'true' 
			WHEN bv.[Value] = 'False' THEN 'false'
			WHEN bv.[Value] = '-1' AND LEFT(EvolutionXmlNodeName, 3) IN ('chk', 'frm') THEN 'true'
			WHEN NOT bv.[Value] = '-1' AND LEFT(EvolutionXmlNodeName, 3) IN ('chk', 'frm') THEN 'false'
			WHEN LEFT(EvolutionXmlNodeName, 3) = '#A-' AND LEFT(RIGHT(RTRIM(bv.[Value]), 2), 1) = 'A' THEN 'true'
			WHEN LEFT(EvolutionXmlNodeName, 3) = '#P-' AND LEFT(RIGHT(RTRIM(bv.[Value]), 2), 1) = 'P' THEN 'true'
			WHEN LEFT(EvolutionXmlNodeName, 6) = '#A-grp' AND bv.[Value] = 1 THEN 'true'
			WHEN LEFT(EvolutionXmlNodeName, 6) = '#P-grp' AND bv.[Value] = 2 THEN 'true'
			WHEN LEFT(EvolutionXmlNodeName, 1) = '^' AND NOT bv.[Value] = '0' THEN 'true'
		ELSE [Value] 
		END AS [Value], 
		CAST(0 AS BIT) AS Modified
	FROM dbo.AcordPageOneBaseView(@MigrationID, @Acord_ID) bv
		INNER JOIN [MpmmDb].[dbo].[Evolution_AcordCrosswalk] cw 
			ON cw.MigrationID = @MigrationID
			AND cw.Form1Name = bv.DocumentName
		INNER JOIN dbo.Evolution_AcordNodeCrosswalk ncw
			ON ncw.Form1Name = cw.Form1Name
			AND ncw.CatalystJsonNodeName = bv.[Key]
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
