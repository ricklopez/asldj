﻿using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;


namespace qqkraken.model
{
    public class EvolutionLobCrosswalk
    {
        public int Id { get; set; }
        public int MigrationId { get; set; }
        public string EvolutionLOB { get; set; }
        public string EvolutionCoverage { get; set; }
        public string CatalystLOB { get; set; }
        public string DisplayName { get; set; }
        public int CountOfEvolutionRows { get; set; }
    }
}