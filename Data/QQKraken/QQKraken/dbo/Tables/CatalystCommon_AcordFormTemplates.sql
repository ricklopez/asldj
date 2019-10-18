CREATE TABLE [dbo].[CatalystCommon_AcordFormTemplates] (
    [AcordTemplateID]              UNIQUEIDENTIFIER NOT NULL,
    [Number]                       VARCHAR (50)     NULL,
    [Name]                         VARCHAR (255)    NULL,
    [State]                        NCHAR (2)        NULL,
    [EditionDate]                  DATE             NULL,
    [Html]                         VARCHAR (MAX)    NULL,
    [Pdf]                          VARCHAR (MAX)    NULL,
    [LastVersion]                  BIT              NULL,
    [EditionDateStr]               VARCHAR (11)     NULL,
    [MultipeLossPayees]            BIT              NULL,
    [DescriptionOfOperationsField] VARCHAR (MAX)    NULL,
    [UniqueFields]                 VARCHAR (MAX)    NULL,
    [Hidden]                       BIT              NOT NULL,
    [IsEvolutionConversion]        BIT              NOT NULL
);

