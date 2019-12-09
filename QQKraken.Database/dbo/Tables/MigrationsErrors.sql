CREATE TABLE [dbo].[MigrationsErrors] (
    [ErrorID]      INT           IDENTITY (1, 1) NOT NULL,
    [MigrationID]  INT           NOT NULL,
    [TableName]    VARCHAR (255) NOT NULL,
    [PkID]         INT           NOT NULL,
    [PageNumber]   INT           NOT NULL,
    [ErrorNumber]  INT           NOT NULL,
    [ErrorMessage] VARCHAR (MAX) NOT NULL,
    [DateInserted] SMALLDATETIME NOT NULL,
    [ServerName]   VARCHAR (MAX) NOT NULL,
    [DatabaseName] VARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_MigrationsErrors] PRIMARY KEY CLUSTERED ([ErrorID] ASC)
);

