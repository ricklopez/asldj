CREATE TABLE [dbo].[MigrationsTableAlias] (
    [MigrationTypeID] INT           NOT NULL,
    [TableAlias]      VARCHAR (255) NOT NULL,
    CONSTRAINT [PK_MigrationsTableAlias] PRIMARY KEY CLUSTERED ([MigrationTypeID] ASC, [TableAlias] ASC)
);

