CREATE PROCEDURE [dbo].[Mpmm_XmlParse]
(@MigrationID INT, @Acord_ID BIGINT, @PageNumber INT)
AS

SET NOCOUNT ON

DECLARE @XML NVARCHAR(MAX)
DECLARE @Form1Name VARCHAR(50)
DECLARE @handle INT  
DECLARE @PrepareXmlStatus INT  

BEGIN TRY

	IF @PageNumber = 1

		BEGIN

			SELECT @XML = XMLDataPage1, @Form1Name = Form1Name
			FROM dbo.Evolution_XMLTable
			WHERE Acord_ID = @Acord_ID AND MigrationID = @MigrationID

		END

	ELSE IF @PageNumber = 2

		BEGIN

			SELECT @XML = XMLDataPage2, @Form1Name = Form1Name
			FROM dbo.Evolution_XMLTable
			WHERE Acord_ID = @Acord_ID AND MigrationID = @MigrationID

		END

	ELSE IF @PageNumber = 3

		BEGIN

			SELECT @XML = XMLDataPage3, @Form1Name = Form1Name
			FROM dbo.Evolution_XMLTable
			WHERE Acord_ID = @Acord_ID AND MigrationID = @MigrationID

		END

	ELSE IF @PageNumber = 4

		BEGIN

			SELECT @XML = XMLDataPage4, @Form1Name = Form1Name
			FROM dbo.Evolution_XMLTable
			WHERE Acord_ID = @Acord_ID AND MigrationID = @MigrationID

		END

	ELSE IF @PageNumber = 5

		BEGIN

			SELECT @XML = XMLDataPage5, @Form1Name = Form1Name
			FROM dbo.Evolution_XMLTable
			WHERE Acord_ID = @Acord_ID AND MigrationID = @MigrationID

		END

	IF NOT @XML IS NULL AND NOT CAST(@XML AS VARCHAR) = ''

		BEGIN

			EXEC @PrepareXmlStatus= sp_xml_preparedocument @handle OUTPUT, @XML  

			INSERT INTO dbo.Evolution_AcordDocumentParses
			(
				MigrationID,
				Acord_ID,
				DocumentName,
				PageNumber,
				NodeName,
				NodeValue
			)
			SELECT
				@MigrationID, 
				@Acord_ID, 
				@Form1Name, 
				@PageNumber, 
				p.localname AS NodeName, 
				c.text AS NodeValue
				FROM OPENXML(@handle, '/xml', 2) p
					INNER JOIN OPENXML(@handle, '/xml', 2) v ON p.id = v.parentid
					INNER JOIN OPENXML(@handle, '/xml', 2) c ON v.id = c.parentid
				WHERE p.parentid = 0
				

			EXEC sp_xml_removedocument @handle

		END
END TRY
BEGIN CATCH
	
	INSERT INTO MigrationsErrors 
	(
		MigrationID, 
		TableName, 
		PageNumber, 
		PkID, 
		ErrorNumber, 
		ErrorMessage, 
		DateInserted, 
		ServerName, 
		DatabaseName
	)
	VALUES 
	(
		@MigrationID, 
		@Form1Name, 
		@PageNumber, 
		@Acord_ID, 
		ERROR_NUMBER(), 
		ERROR_MESSAGE(), 
		GETDATE(), 
		'', 
		'')

	EXEC sp_xml_removedocument @handle

END CATCH

SET NOCOUNT OFF
