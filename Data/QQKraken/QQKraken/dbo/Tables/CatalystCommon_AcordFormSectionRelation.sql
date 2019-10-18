CREATE TABLE [dbo].[CatalystCommon_AcordFormSectionRelation] (
    [AcordTemplateId]      UNIQUEIDENTIFIER NOT NULL,
    [SectionCode]          VARCHAR (50)     NOT NULL,
    [Page]                 INT              NOT NULL,
    [Limit]                INT              NOT NULL,
    [SupplementFormNumber] VARCHAR (50)     NULL,
    [SupplementFormState]  NCHAR (2)        NULL
);

