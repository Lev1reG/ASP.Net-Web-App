using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Models;
using TaskManagementAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestController : ControllerBase
    {
        private readonly IQuestService questService;

        public QuestController(IQuestService questService) 
        { 
            this.questService = questService;
        }
        // GET: api/<QuestController>
        [HttpGet]
        public ActionResult<List<Quest>> Get()
        {
            return questService.Get();
        }

        // GET api/<QuestController>/5
        [HttpGet("{id}")]
        public ActionResult<Quest> Get(string id)
        {
            var quest = questService.Get(id);

            if (quest == null) 
            {
                return NotFound($"Quest with Id = {id} not found");
            }
            return quest;
        }

        // POST api/<QuestController>
        [HttpPost]
        public ActionResult<Quest> Post([FromBody] Quest quest)
        {
            questService.Create(quest);

            return CreatedAtAction(nameof(Get), new { id = quest.Id }, quest);
        }

        // PUT api/<QuestController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Quest quest)
        {
            var existingQuest = questService.Get(id);

            if (existingQuest == null)
            {
                return NotFound($"Quest with Id = {id} not found");
            }

            questService.Update(id, quest);

            return NoContent();
        }

        // DELETE api/<QuestController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var quest = questService.Get(id);

            if(quest == null)
            {
                return NotFound($"Quest with Id = {id} not found");
            }

            questService.Remove(quest.Id);

            return Ok($"Student with Id = {id} deleted");
        }
    }
}
