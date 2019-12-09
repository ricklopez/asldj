CREATE PROCEDURE [dbo].[App_Dts_Convert]
(@MigrationID INT)
AS

SET NOCOUNT ON

DECLARE @M NVARCHAR(50) = CAST(@MigrationID AS NVARCHAR)

DECLARE @execution_id bigint  
EXEC [SSISDB].[catalog].[create_execution] @package_name=N'02-Convert.dtsx', @execution_id=@execution_id OUTPUT, @folder_name=N'QQMigrations', @project_name=N'QQMigrationsETL', @use32bitruntime=False, @reference_id=1  

Select @execution_id  
DECLARE @var0 smallint = 3  --Logging Level 3
EXEC [SSISDB].[catalog].[set_execution_parameter_value] @execution_id,  @object_type=50, @parameter_name=N'LOGGING_LEVEL', @parameter_value = @var0  

--MigrationID
EXEC [SSISDB].[catalog].[set_execution_parameter_value] @execution_id,  @object_type=20, @parameter_name=N'MigrationID', @parameter_value= @M  

EXEC [SSISDB].[catalog].[start_execution] @execution_id  

SET NOCOUNT OFF