CREATE TABLE [dbo].[Evolution_OfficeCrosswalk] (
    [MigrationID]          INT          NOT NULL,
    [Evolution_OfficeName] VARCHAR (50) NOT NULL,
    [Evolution_OfficeId]   VARCHAR (50) NOT NULL,
    [Catalyst_OfficeId]    VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Evolution_OfficeCrosswalk] PRIMARY KEY CLUSTERED ([MigrationID] ASC, [Evolution_OfficeName] ASC, [Evolution_OfficeId] ASC)
);

