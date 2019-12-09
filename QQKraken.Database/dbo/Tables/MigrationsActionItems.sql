CREATE TABLE [dbo].[MigrationsActionItems] (
    [ActionItemID]    INT          IDENTITY (1, 1) NOT NULL,
    [MigrationID]     INT          NOT NULL,
    [ErrorNumber]     INT          NOT NULL,
    [ParentTable]     VARCHAR (50) NOT NULL,
    [ProblemCategory] VARCHAR (50) NOT NULL,
    [ProblemDesc]     VARCHAR (50) NOT NULL,
    [RecordsAffected] INT          NOT NULL,
    [DefaultAction]   VARCHAR (50) NOT NULL,
    [ActionValue]     VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_MigrationsActionItems] PRIMARY KEY CLUSTERED ([ActionItemID] ASC)
);

