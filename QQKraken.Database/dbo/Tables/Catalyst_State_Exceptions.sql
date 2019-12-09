CREATE TABLE [dbo].[Catalyst_State_Exceptions] (
    [StateCode]             CHAR (2)      NOT NULL,
    [State]                 VARCHAR (255) NOT NULL,
    [LicenseValidationMask] VARCHAR (50)  NULL,
    [CountryCode]           VARCHAR (3)   NULL,
    [DefaultTimezone]       VARCHAR (50)  NULL,
    CONSTRAINT [PK_Catalyst_State_Exceptions] PRIMARY KEY CLUSTERED ([StateCode] ASC)
);

