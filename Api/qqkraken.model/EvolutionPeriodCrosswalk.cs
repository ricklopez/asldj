using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;


namespace QQKraken.Model
{
    public class EvolutionPeriodCrosswalk
    {
        public int MigrationId { get; set; }
        public string EvolutionPeriod { get; set; }
        public string CatalystPeriod { get; set; }
    }
}