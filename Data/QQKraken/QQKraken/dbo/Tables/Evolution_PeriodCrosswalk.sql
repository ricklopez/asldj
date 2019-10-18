CREATE TABLE [dbo].[Evolution_PeriodCrosswalk] (
    [MigrationID]     INT          NOT NULL,
    [EvolutionPeriod] VARCHAR (50) NOT NULL,
    [CatalystPeriod]  VARCHAR (50) CONSTRAINT [DF_Evolution_PeriodCrosswalk_CatalystPeriod] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_Evolution_PeriodCrosswalk] PRIMARY KEY CLUSTERED ([MigrationID] ASC, [EvolutionPeriod] ASC, [CatalystPeriod] ASC)
);

