CREATE TABLE [dbo].[SqlServersDatabases] (
    [ServerHostName]  VARCHAR (255) NOT NULL,
    [SqlDatabaseName] VARCHAR (255) NOT NULL,
    [IsCollected]     BIT           NOT NULL,
    CONSTRAINT [PK_SqlServersDatabases] PRIMARY KEY CLUSTERED ([ServerHostName] ASC, [SqlDatabaseName] ASC)
);

