CREATE TABLE [dbo].[Evolution_AcordDocumentParses] (
    [MigrationID]  INT           CONSTRAINT [DF_AccordDocumentParses_MigrationID] DEFAULT ((0)) NOT NULL,
    [Acord_ID]     INT           CONSTRAINT [DF_AccordDocumentParses_Acord_ID] DEFAULT ((0)) NOT NULL,
    [PageNumber]   INT           NOT NULL,
    [NodeName]     VARCHAR (255) NOT NULL,
    [NodeValue]    VARCHAR (255) NULL,
    [DocumentName] VARCHAR (255) NOT NULL,
    CONSTRAINT [PK_Evolution_AcordDocumentParses] PRIMARY KEY CLUSTERED ([MigrationID] ASC, [Acord_ID] ASC, [PageNumber] ASC, [NodeName] ASC) WITH (FILLFACTOR = 90)
);

