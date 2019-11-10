﻿CREATE TABLE [dbo].[Migrations] (
    [MigrationID]          INT            IDENTITY (1, 1) NOT NULL,
    [MigrationTypeID]      INT            NOT NULL,
    [MigrationName]        VARCHAR (50)   NOT NULL,
    [SourceHostName]       VARCHAR (50)   NOT NULL,
    [SourceDb]             VARCHAR (50)   NOT NULL,
    [SourceSchema]         VARCHAR (50)   NOT NULL,
    [SourceXmlCount]       INT            NOT NULL,
    [DestDbHostName]       VARCHAR (50)   CONSTRAINT [DF_Migrations_DestDbHost] DEFAULT ('') NOT NULL,
    [DestDb]               VARCHAR (50)   NOT NULL,
    [DestSchema]           VARCHAR (50)   NOT NULL,
    [DestQqID]             VARCHAR (50)   NOT NULL,
    [IsPhase1]             BIT            NOT NULL,
    [IsPreprocessed]       BIT            NOT NULL,
    [IsPhase2]             BIT            NOT NULL,
    [EstimatedCleanupDate] SMALLDATETIME  NOT NULL,
    [IsPhase3]             BIT            NOT NULL,
    [PlannedMigrationDate] SMALLDATETIME  NOT NULL,
    [IsPhase4]             BIT            NOT NULL,
    [MigrationDate]        SMALLDATETIME  NOT NULL,
    [BeginProcesDate]      DATETIME2 (7)  NOT NULL,
    [LastProcessDate]      DATETIME2 (7)  NOT NULL,
    [IsPhase5]             BIT            NOT NULL,
    [IsPhase6]             BIT            NOT NULL,
    [CsrNotes]             VARCHAR (MAX)  NOT NULL,
    [BlankCostValue]       DECIMAL (9, 2) NOT NULL,
    [AcordAgencyLine1]     VARCHAR (50)   CONSTRAINT [DF_Migrations_AcordAgencyLine1] DEFAULT ('') NOT NULL,
    [AcordAgencyLine2]     VARCHAR (50)   CONSTRAINT [DF_Migrations_AcordAgencyLine2] DEFAULT ('') NOT NULL,
    [AcordAgencyLine3]     VARCHAR (50)   CONSTRAINT [DF_Migrations_AcordAgencyLine3] DEFAULT ('') NOT NULL,
    [AgencyPhoneLine]      VARCHAR (50)   CONSTRAINT [DF_Migrations_AgencyPhoneLine] DEFAULT ('') NOT NULL,
    [AgencyFaxLine]        VARCHAR (50)   CONSTRAINT [DF_Migrations_AgencyFaxLine] DEFAULT ('') NOT NULL,
    [AgencyEmailLine]      VARCHAR (50)   CONSTRAINT [DF_Migrations_AgencyEmailLine] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_Migrations] PRIMARY KEY CLUSTERED ([MigrationID] ASC),
    CONSTRAINT [FK_Migrations_MigrationsTypes] FOREIGN KEY ([MigrationTypeID]) REFERENCES [dbo].[MigrationsTypes] ([MigrationTypeID])
);
