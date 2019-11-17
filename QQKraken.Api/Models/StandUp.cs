using System;

namespace QQKraken.Api.Models
{
    public class StandUp
    {
        public int StandUpId { get; set; }
        public int MigrationId { get; set; }
        public bool Completed { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}