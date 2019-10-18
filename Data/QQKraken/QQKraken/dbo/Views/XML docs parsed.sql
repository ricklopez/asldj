
CREATE   VIEW [XML docs parsed]
AS
SELECT 
	FORMAT(SUM(RowCounts),'N0') AS [XML docs parsed]
FROM [Evolution_XMLTable].[dbo].[XMLTable_size_rowcount]
WHERE DatabaseName IN 
(
	SELECT DISTINCT 
		DatabaseName
	FROM [dbo].[AccordDocumentParses] WITH(NOLOCK)
)
--AND 
--	RowCounts = 0
