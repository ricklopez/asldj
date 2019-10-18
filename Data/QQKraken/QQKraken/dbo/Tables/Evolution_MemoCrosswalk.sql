CREATE TABLE [dbo].[Evolution_MemoCrosswalk] (
    [MigrationID]        INT           NOT NULL,
    [CsrNameInEvolution] VARCHAR (100) NOT NULL,
    [CatalystEmployeeID] INT           NOT NULL,
    CONSTRAINT [PK_Evolution_MemoCrosswalk] PRIMARY KEY CLUSTERED ([MigrationID] ASC, [CsrNameInEvolution] ASC, [CatalystEmployeeID] ASC) WITH (FILLFACTOR = 90)
);

