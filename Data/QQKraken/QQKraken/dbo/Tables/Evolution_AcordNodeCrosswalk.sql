CREATE TABLE [dbo].[Evolution_AcordNodeCrosswalk] (
    [Form1Name]            VARCHAR (50)  NOT NULL,
    [EvolutionXmlNodeName] VARCHAR (255) NOT NULL,
    [CatalystJsonNodeName] VARCHAR (255) NOT NULL,
    CONSTRAINT [PK_Evolution_AcordNodeCrosswalk] PRIMARY KEY CLUSTERED ([Form1Name] ASC, [EvolutionXmlNodeName] ASC, [CatalystJsonNodeName] ASC) WITH (FILLFACTOR = 90)
);

