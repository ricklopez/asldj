CREATE PROCEDURE [dbo].[Mpmm_PivotAcordBatch]
(@MigrationID INT, @Acord_ID INT)
AS

SET NOCOUNT ON

/*
The following code is a well formed T-SQL block illustrating a single example. Code below has been abstracted to deal
with variable columns in schema
*/

/*
SELECT *
FROM
(
SELECT PageNumber, NodeName, NodeValue
FROM AccordDocumentParses
WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID AND PageNumber = 1
GROUP BY PageNumber, NodeName, NodeValue
) AS ps
PIVOT
(
	MIN(NodeValue)

FOR
NodeName IN (
[txtInsured2], [txtInsured3], [txtInsured4], [txtInsured1], [lblAgencyName2], [txtPhone], [txtFax], [txtTodaysDate], [txtEmail], [txtEach], [txtFire], [txtMed], [txtPersonal], [txtGenAgg], [txtProducts], [txtPolicyNum1], [txtEffective1], [txtExpiration1], [txtLet1], [chkGL1], [chkGL2C], [txtCertHolder1], [txtInsurerA], [txtAI1], [txtContactName], [txtCertHolder2], [txtCertHolder3], [txtCertHolder4], [txtAuthorized]
) 
) AS pv
*/

DECLARE @CSV VARCHAR(MAX)
SELECT @CSV = STRING_AGG('[' + NodeName + ']', ', ') FROM Evolution_AcordDocumentParses WHERE MigrationID = @MigrationID AND Acord_ID = @Acord_ID

DECLARE @T VARCHAR(MAX) = 'SELECT * FROM (SELECT PageNumber, NodeName, NodeValue FROM AccordDocumentParses WHERE MigrationID = ' 
SELECT @T = @T + CAST(@MigrationID AS VARCHAR(MAX)) + ' AND Acord_ID = ' + CAST(@Acord_ID AS VARCHAR(MAX)) + ' AND PageNumber = 1'
SELECT @T = @T + ' GROUP BY PageNumber, NodeName, NodeValue) AS ps PIVOT (MIN(NodeValue) FOR NodeName IN (' + @CSV + ')) AS pv'
EXECUTE(@T)

SET NOCOUNT OFF
