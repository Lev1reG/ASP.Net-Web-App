using MongoDB.Driver;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    public class QuestService : IQuestService
    {
        private readonly IMongoCollection<Quest> _quests;

        public QuestService(IQuestStoreDatabaseSettings settings, IMongoClient mongoClient) 
        {
           var database = mongoClient.GetDatabase(settings.DatabaseName);
            _quests = database.GetCollection<Quest>(settings.QuestCollectionName);
        }

        public Quest Create(Quest quest)
        {
           _quests.InsertOne(quest);
            return quest;
        }

        public List<Quest> Get()
        {
            return _quests.Find(quest => true).ToList();
        }

        public Quest Get(string id)
        {
            return _quests.Find(quest => quest.Id == id).FirstOrDefault();
        }

        public void Remove(string id)
        {
            _quests.DeleteOne(quest => quest.Id == id);
        }

        public void Update(string id, Quest quest)
        {
            _quests.ReplaceOne(quest => quest.Id == id, quest);
        }
    }
}
