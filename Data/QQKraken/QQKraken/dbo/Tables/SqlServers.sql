CREATE TABLE [dbo].[SqlServers] (
    [ServerHostName]  VARCHAR (255) NOT NULL,
    [MigrationTypeID] INT           NOT NULL,
    [IsActive]        CHAR (1)      NOT NULL,
    CONSTRAINT [PK_SqlServers] PRIMARY KEY CLUSTERED ([ServerHostName] ASC)
);

