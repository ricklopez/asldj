namespace QQKraken.Api.Models
{
    public class MigrationActionItemDetail
    {
        public int Id { get; set; }

        public int MigrationId { get; set; }

        public int ErrorNumber { get; set; }

        public string ParentTable { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }

        public string ClientNumber { get; set; }

        public string FullClientName { get; set; }

        public string Phone { get; set; }

        public string PolicyNumber { get; set; }

        public string PolicyEffective { get; set; }

        public string PolicyExpiration { get; set; }

        public string Coverage { get; set; }
    }
}