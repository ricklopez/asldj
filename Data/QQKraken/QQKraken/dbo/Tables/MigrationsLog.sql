CREATE TABLE [dbo].[MigrationsLog] (
    [PhaseLogID]       BIGINT        IDENTITY (1, 1) NOT NULL,
    [MigrationID]      INT           NOT NULL,
    [MigrationPhaseID] INT           NOT NULL,
    [PageNumber]       INT           NOT NULL,
    [StartDate]        DATETIME2 (7) NOT NULL,
    [EndDate]          DATETIME2 (7) NOT NULL,
    [RecordsProcessed] BIGINT        NOT NULL,
    CONSTRAINT [PK_MigrationsPhasesLog] PRIMARY KEY CLUSTERED ([PhaseLogID] ASC)
);

