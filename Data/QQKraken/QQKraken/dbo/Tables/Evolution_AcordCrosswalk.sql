CREATE TABLE [dbo].[Evolution_AcordCrosswalk] (
    [MigrationID]     INT              NOT NULL,
    [Form1Name]       VARCHAR (50)     NOT NULL,
    [FormID]          INT              NOT NULL,
    [AcordTemplateID] UNIQUEIDENTIFIER NOT NULL,
    [IsApproved]      BIT              CONSTRAINT [DF_Evolution_AcordCrosswalk_IsApproved] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_MigrationsAcordTemplates] PRIMARY KEY CLUSTERED ([MigrationID] ASC, [FormID] ASC, [Form1Name] ASC) WITH (FILLFACTOR = 90)
);

