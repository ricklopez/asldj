﻿CREATE TABLE [dbo].[Evolution_LobCrosswalk] (
    [MigrationID]          INT          NOT NULL,
    [EvolutionLOB]         VARCHAR (50) NOT NULL,
    [EvolutionCoverage]    VARCHAR (50) NOT NULL,
    [CatalystLOB]          VARCHAR (50) CONSTRAINT [DF_Evolution_LobCrosswalk_CatalystLOB] DEFAULT ('') NOT NULL,
    [DisplayName]          VARCHAR (50) CONSTRAINT [DF_Evolution_LobCrosswalk_DisplayName] DEFAULT ('') NOT NULL,
    [CountOfEvolutionRows] INT          NOT NULL,
    [Uuid]                 VARCHAR (50) NULL,
    CONSTRAINT [PK_Evolution_LobCrosswalk] PRIMARY KEY CLUSTERED ([MigrationID] ASC, [EvolutionLOB] ASC, [EvolutionCoverage] ASC, [CatalystLOB] ASC) WITH (FILLFACTOR = 90)
);


GO
CREATE NONCLUSTERED INDEX [IX_Evolution_LobCrosswalk]
    ON [dbo].[Evolution_LobCrosswalk]([Uuid] ASC);

