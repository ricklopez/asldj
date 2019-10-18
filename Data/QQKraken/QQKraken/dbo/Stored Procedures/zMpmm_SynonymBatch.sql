
CREATE   PROCEDURE [dbo].[zMpmm_SynonymBatch]
(@MigrationID INT)
AS

SET NOCOUNT ON

DECLARE @TargetDatabase VARCHAR(255)
DECLARE @TargetSchema VARCHAR(255) 
DECLARE @MigrationTypeID INT 
DECLARE @TargetPrefix CHAR(3)
DECLARE @S VARCHAR(MAX)

SELECT @MigrationTypeID = MigrationTypeID, @TargetDatabase = DestDb, @TargetSchema = DestSchema
FROM Migrations WITH (NOLOCK)
WHERE MigrationID = @MigrationID

SELECT @TargetPrefix = TargetPrefix
FROM MigrationsTypes WITH (NOLOCK)
WHERE MigrationTypeID = @MigrationTypeID

--Preemptive Drop Routine; using 'IF EXISTS'
SELECT @S = STRING_AGG('DROP SYNONYM IF EXISTS ' + @TargetPrefix + a.TableAlias, '; ')
FROM MigrationsTableAlias a
WHERE MigrationTypeID = @MigrationTypeID

EXECUTE(@S)

--Create Routine
SELECT @S = STRING_AGG('CREATE SYNONYM ' + @TargetPrefix + a.TableAlias + ' FOR ' + @TargetDatabase + '.' + @TargetSchema + '.' + a.TableAlias, '; ')
FROM MigrationsTableAlias a
WHERE MigrationTypeID = @MigrationTypeID

SELECT @S = @S + ';'

EXECUTE(@S)

SET NOCOUNT OFF
