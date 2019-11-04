using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;


namespace QQKraken.Model
{
    public class StandUp
    {
        public int StandUpId { get; set; }
        public int MigrationId { get; set; }
        public bool Completed { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}