using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TaskManagementAPI.Models
{
    [BsonIgnoreExtraElements]
    public class Quest
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;
        [BsonElement("quest")]
        public string Tugas { get; set; } = String.Empty;
        [BsonElement("done")]
        public bool IsDone { get; set; }
        [BsonElement("deadline")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime Deadline { get; set; } = DateTime.Now;
    }
}
