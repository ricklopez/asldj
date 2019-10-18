CREATE TABLE [dbo].[MigrationsTypes] (
    [MigrationTypeID]   INT          NOT NULL,
    [MigrationTypeDesc] VARCHAR (50) NOT NULL,
    [TargetPrefix]      CHAR (3)     NOT NULL,
    CONSTRAINT [PK_MigrationsTypes] PRIMARY KEY CLUSTERED ([MigrationTypeID] ASC)
);

