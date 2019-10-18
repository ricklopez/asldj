CREATE TABLE [dbo].[MigrationsDictionaries] (
    [DictionaryName]   VARCHAR (50) NOT NULL,
    [SourceValue]      VARCHAR (50) NOT NULL,
    [DestinationValue] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_MigrationsDictionaries] PRIMARY KEY CLUSTERED ([DictionaryName] ASC, [SourceValue] ASC, [DestinationValue] ASC)
);

