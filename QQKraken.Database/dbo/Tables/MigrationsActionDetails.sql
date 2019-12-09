CREATE TABLE [dbo].[MigrationsActionDetails] (
    [ActionDetailID]   INT           IDENTITY (1, 1) NOT NULL,
    [MigrationID]      INT           NOT NULL,
    [ErrorNumber]      INT           NOT NULL,
    [ParentTable]      VARCHAR (50)  NOT NULL,
    [ProblemCategory]  VARCHAR (50)  NOT NULL,
    [ProblemDesc]      VARCHAR (50)  NOT NULL,
    [ClientNumber]     VARCHAR (255) NULL,
    [FullClientName]   VARCHAR (255) NULL,
    [Phone]            VARCHAR (255) NULL,
    [PolicyNumber]     VARCHAR (255) NULL,
    [PolicyEffective]  DATETIME2 (7) NULL,
    [PolicyExpiration] DATETIME2 (7) NULL,
    [Coverage]         VARCHAR (255) NULL
);

