CREATE TABLE [dbo].[Catalyst_LOBs] (
    [LOBID]        INT           NOT NULL,
    [LOB]          VARCHAR (MAX) NOT NULL,
    [InternalCode] VARCHAR (MAX) NOT NULL,
    [IsSupported]  BIT           NOT NULL,
    CONSTRAINT [PK_Catalyst_LOBs] PRIMARY KEY CLUSTERED ([LOBID] ASC)
);

