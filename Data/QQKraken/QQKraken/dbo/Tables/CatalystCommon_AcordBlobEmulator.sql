CREATE TABLE [dbo].[CatalystCommon_AcordBlobEmulator] (
    [AcordBlobEmulatorID] INT             NOT NULL,
    [Account]             VARCHAR (100)   NULL,
    [Container]           VARCHAR (100)   NULL,
    [Name]                VARCHAR (100)   NULL,
    [Data]                VARBINARY (MAX) NULL,
    [Notes]               VARCHAR (MAX)   NULL,
    [Test]                INT             NULL
);

