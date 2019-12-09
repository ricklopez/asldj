namespace QQKraken.Api.Models.Mappings
{
    public class LineOfBusiness
    {
        public int Id { get; set; }
        public int MigrationId { get; set; }
        public string SourceLOB { get; set; }
        public string SourceCoverage { get; set; }
        public string TargetLOB { get; set; }
        public string DisplayName { get; set; }
        public int RecordCount { get; set; }
    }
}