using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    public interface IQuestService
    {
        List<Quest> Get();
        Quest  Get(string id);
        Quest Create(Quest quest);
        void Update(string id, Quest quest);
        void Remove(string id);
    }
}
