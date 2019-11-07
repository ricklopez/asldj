CREATE PROCEDURE [dbo].[Dts_AcordTemplateMap]
(@MigrationID INT)
AS

--TODO: ***********************************
--Need Synum hack and DTS Love in DTS
--TODO: ***********************************

SET NOCOUNT ON

DECLARE @TT TABLE (FormID INT NOT NULL, AcordTemplateID UNIQUEIDENTIFIER, PRIMARY KEY (FormID))

INSERT INTO @TT (FormID, AcordTemplateID)
	SELECT eaf.FormID, ccat.AcordTemplateID
	FROM QFWinData_QQ005325.dbo.AcordFormList eaf
		INNER JOIN dbo.CatalystCommon_AcordFormTemplates ccat
			ON 
			CASE LEN(ccat.Number) 
				WHEN 1 THEN '00' + ccat.Number
				WHEN 2 THEN '0' + ccat.Number
			ELSE ccat.Number 
			END = eaf.FormNumber 
			AND ISNULL(eaf.[state], '') = ccat.[State]
			AND (eaf.FormDate < '1/9/1993' OR ccat.EditionDate = eaf.FormDate)
			--AND eaf.[Type] = 'Acord'

INSERT INTO @TT (FormID, AcordTemplateID)
	SELECT eaf.FormID, MAX(ccat.AcordTemplateID)
	FROM QFWinData_QQ005325.dbo.AcordFormList eaf
		INNER JOIN dbo.CatalystCommon_AcordFormTemplates ccat
			ON 
			CASE LEN(ccat.Number) 
				WHEN 1 THEN '00' + ccat.Number
				WHEN 2 THEN '0' + ccat.Number
			ELSE ccat.Number 
			END = eaf.FormNumber 
			AND ISNULL(eaf.[state], '') = ccat.[State]
			--AND eaf.[Type] = 'Acord'
		LEFT JOIN @TT t ON eaf.FormID = t.FormID
	WHERE t.FormID IS NULL
	GROUP BY eaf.FormID

--The final match table
INSERT INTO dbo.Evolution_AcordCrosswalk
	(
	MigrationID, 
	FormID, 
	Form1Name,
	AcordTemplateID
	)
	SELECT 
		@MigrationID,
		eaf.FormID, 
		eaf.Form1Name,
		ccat.AcordTemplateID
	FROM QFWinData_QQ005325.dbo.AcordFormList eaf
		INNER JOIN @TT t ON eaf.FormID = t.FormID
		INNER JOIN dbo.CatalystCommon_AcordFormTemplates ccat ON ccat.AcordTemplateID = t.AcordTemplateID
	WHERE ccat.IsEvolutionConversion = 1
	ORDER BY eaf.FormID

SET NOCOUNT OFF
