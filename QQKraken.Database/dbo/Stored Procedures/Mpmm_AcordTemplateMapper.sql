CREATE PROCEDURE [dbo].[Mpmm_AcordTemplateMapper]
(@MigrationID INT)
AS

SET NOCOUNT ON

--This maps the Acord form types to the catalyst 
--Acord "Template" via the FormNumber, State, and Revision-Date

DECLARE @TT TABLE (FormID INT NOT NULL, AcordTemplateID UNIQUEIDENTIFIER, PRIMARY KEY (FormID))

INSERT INTO @TT (FormID, AcordTemplateID)
	SELECT DISTINCT eaf.FormID, ccat.AcordTemplateID
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
		INNER JOIN Evolution_XMLTable x ON x.MigrationID = @MigrationID AND x.Form1Name = eaf.Form1Name

--INSERT INTO @TT (FormID, AcordTemplateID)
--	SELECT eaf.FormID, MAX(ccat.AcordTemplateID)
--	FROM QFWinData_QQ005325.dbo.AcordFormList eaf
--		INNER JOIN dbo.CatalystCommon_AcordFormTemplates ccat
--			ON 
--			CASE LEN(ccat.Number) 
--				WHEN 1 THEN '00' + ccat.Number
--				WHEN 2 THEN '0' + ccat.Number
--			ELSE ccat.Number 
--			END = eaf.FormNumber 
--			AND ISNULL(eaf.[state], '') = ccat.[State]
--		LEFT JOIN @TT t ON eaf.FormID = t.FormID
--	WHERE t.FormID IS NULL
--	GROUP BY eaf.FormID

INSERT INTO dbo.Evolution_AcordCrosswalk ([MigrationID], [FormID], [Form1Name], [AcordTemplateID])
	--Simple list by the two categories to show my work
	SELECT DISTINCT @MigrationID, t.FormID, eaf.Form1Name, t.AcordTemplateID
	FROM QFWinData_QQ005325.dbo.AcordFormList eaf
		INNER JOIN @TT t ON eaf.FormID = t.FormID
		INNER JOIN dbo.CatalystCommon_AcordFormTemplates ccat ON ccat.AcordTemplateID = t.AcordTemplateID
	
SET NOCOUNT OFF