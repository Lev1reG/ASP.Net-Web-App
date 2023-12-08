namespace TaskManagementAPI.Models
{
    public class QuestStoreDatabaseSettings : IQuestStoreDatabaseSettings
    {
        public string QuestCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName {  get; set; } = String.Empty;
    }
}
