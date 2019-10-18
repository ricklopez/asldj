using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace qqkraken.model
{
    public class Migration
    {
        public int MigrationId { get; set; }
        public string MigrationName { get; set; }
        public string MigrationTypeID { get; set; }
        public string SourceHostName { get; set; }
        public string SourceDb { get; set; }
        public string SourceSchema { get; set; }
        public int SourceXmlCount { get; set; }
        public string DestDbHostName { get; set; }
        public string DestDb { get; set; }
        public string DestSchema { get; set; }
        public string DestQqID { get; set; }
        public bool IsPhase1 { get; set; }
        public bool IsPhase2 { get; set; }
        public bool IsPhase3 { get; set; }
        public bool IsPhase4 { get; set; }
        public bool IsPhase5 { get; set; }
        public bool IsPhase6 { get; set; }
        [DefaultValue(false)]
        public bool IsPreprocessed { get; set; }
        [DefaultValue("CsrNotes")]
        public string CsrNotes { get; set; }
        [DefaultValue(0.00)]
        public decimal BlankCostValue { get; set; }
        [DefaultValue("AcordAgencyLine1")]
        public string AcordAgencyLine1 { get; set; }
        [DefaultValue("AcordAgencyLine2")]
        public string AcordAgencyLine2 { get; set; }
        [DefaultValue("AcordAgencyLine3")]
        public string AcordAgencyLine3 { get; set; }
        [DefaultValue("AcordPhoneLine")]
        public string AgencyPhoneLine { get; set; }
        [DefaultValue("AcordFaxLine")]
        public string AgencyFaxLine { get; set; }
        [DefaultValue("AcordEmailLine1")]
        public string AgencyEmailLine { get; set; }
        [DefaultValue("2011-07-01T15:17:33.357")]
        public DateTime EstimatedCleanupDate { get; set; }
        [DefaultValue("2011-07-01T15:17:33.357")]
        public DateTime MigrationDate { get; set; }
        [DefaultValue("2011-07-01T15:17:33.357")]
        public DateTime BeginProcesDate { get; set; }
        [DefaultValue("2011-07-01T15:17:33.357")]
        public DateTime LastProcessDate { get; set; }
        public DateTime TargetDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}