﻿CREATE TABLE [dbo].[Evolution_XMLTable] (
    [MigrationID]          INT              NOT NULL,
    [Acord_ID]             INT              NOT NULL,
    [Old_Acord_ID]         INT              NULL,
    [Client_ID]            INT              NULL,
    [Old_Client_ID]        INT              NULL,
    [DateAdded]            SMALLDATETIME    NULL,
    [DatePrinted]          SMALLDATETIME    NULL,
    [DateUpdated]          SMALLDATETIME    NULL,
    [Description]          VARCHAR (50)     NULL,
    [Detail_DateAdded]     SMALLDATETIME    NULL,
    [Detail_DateUpdated]   SMALLDATETIME    NULL,
    [Detail_Description]   VARCHAR (50)     NULL,
    [Detail_Form1Name]     VARCHAR (50)     NULL,
    [Detail_txtTodaysDate] SMALLDATETIME    NULL,
    [Dummy1]               VARCHAR (50)     NULL,
    [Dummy10]              INT              NULL,
    [Dummy11]              INT              NULL,
    [Dummy12]              INT              NULL,
    [Dummy13]              VARCHAR (50)     NULL,
    [Dummy14]              VARCHAR (50)     NULL,
    [Dummy15]              VARCHAR (50)     NULL,
    [Dummy16]              SMALLDATETIME    NULL,
    [Dummy17]              SMALLDATETIME    NULL,
    [Dummy18]              SMALLDATETIME    NULL,
    [Dummy19]              BIT              NULL,
    [Dummy2]               VARCHAR (50)     NULL,
    [Dummy20]              BIT              NULL,
    [Dummy21]              BIT              NULL,
    [Dummy22]              INT              NULL,
    [Dummy23]              INT              NULL,
    [Dummy24]              INT              NULL,
    [Dummy3]               VARCHAR (50)     NULL,
    [Dummy4]               SMALLDATETIME    NULL,
    [Dummy5]               SMALLDATETIME    NULL,
    [Dummy6]               SMALLDATETIME    NULL,
    [Dummy7]               BIT              NULL,
    [Dummy8]               BIT              NULL,
    [Dummy9]               BIT              NULL,
    [Form1Name]            VARCHAR (50)     NULL,
    [FormID]               INT              NULL,
    [FormType]             INT              NULL,
    [FormVersion]          VARCHAR (50)     NULL,
    [Group_Name]           VARCHAR (50)     NULL,
    [Group_Number]         INT              NULL,
    [IsAcord]              BIT              NULL,
    [IsActive]             BIT              NULL,
    [IsDetail]             BIT              NULL,
    [IsInvoice]            BIT              NULL,
    [Policy_ID]            INT              NULL,
    [Old_Policy_ID]        INT              NULL,
    [TimePrinted]          DATETIME         NULL,
    [ToBePrinted]          BIT              NULL,
    [txtTodaysDate]        SMALLDATETIME    NULL,
    [WasPrinted]           BIT              NULL,
    [XMLDataDetail]        TEXT             NULL,
    [XMLDataPage1]         TEXT             NULL,
    [XMLDataPage2]         TEXT             NULL,
    [XMLDataPage3]         TEXT             NULL,
    [XMLDataPage4]         TEXT             NULL,
    [XMLDataPage5]         TEXT             NULL,
    [rowguid]              UNIQUEIDENTIFIER ROWGUIDCOL NULL,
    [TimeEntered]          DATETIME         NULL,
    [CurrentCertHolder]    INT              NULL,
    [CSR_XmlTable]         VARCHAR (50)     NULL,
    [bitHtmlFormat]        BIT              NULL,
    [NewImageID]           INT              NULL,
    CONSTRAINT [PK_Evolution_XMLTable] PRIMARY KEY CLUSTERED ([MigrationID] ASC, [Acord_ID] ASC)
);

