CREATE TABLE [dbo].[MigrationTableStats] (
    [MigrationID]    INT           NOT NULL,
    [MigrationState] CHAR (1)      NOT NULL,
    [CountOfRows]    BIGINT        NOT NULL,
    [TableName]      VARCHAR (50)  NOT NULL,
    [DateInserted]   DATETIME2 (7) NOT NULL,
    CONSTRAINT [PK_MigrationTableStats] PRIMARY KEY CLUSTERED ([MigrationID] ASC, [MigrationState] ASC)
);

