namespace QQKraken.Model
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