CREATE PROCEDURE [dbo].[zGetSchemaFromInstance]
AS

SET NOCOUNT ON

SELECT d.name, s.SCHEMA_NAME
FROM sys.databases d
	INNER JOIN INFORMATION_SCHEMA.SCHEMATA s ON d.name = s.CATALOG_NAME
WHERE NOT s.SCHEMA_NAME IN ('db_accessadmin', 'db_backupoperator', 'db_datareader', 'db_datawriter', 'db_ddladmin', 'db_denydatareader', 'db_denydatawriter', 'db_owner', 'db_securityadmin', 'dbo', 'guest', 'INFORMATION_SCHEMA', 'sys')
ORDER BY d.Name


SET NOCOUNT OFF
