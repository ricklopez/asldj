namespace QQKraken.Api.Models
{
    public class MigrationActionItem
    {
        public int Id { get; set; }

        public int MigrationId { get; set; }

        public int ErrorNumber { get; set; }

        public string ParentTable { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }

        public int RecordsAffected { get; set; }

        public string DefaultAction { get; set; }

        public string ActionValue { get; set; }
    }
}