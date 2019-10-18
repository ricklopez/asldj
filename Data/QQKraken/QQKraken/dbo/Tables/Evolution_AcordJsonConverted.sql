CREATE TABLE [dbo].[Evolution_AcordJsonConverted] (
    [MigrationID] INT           NOT NULL,
    [Acord_ID]    INT           NOT NULL,
    [JsonString]  VARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_Evolution_AcordJsonConverted] PRIMARY KEY CLUSTERED ([MigrationID] ASC, [Acord_ID] ASC)
);

