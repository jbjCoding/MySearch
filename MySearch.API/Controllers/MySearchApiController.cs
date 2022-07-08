using Microsoft.AspNetCore.Mvc;
using MySearch.API.DAL;

namespace MySearch.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MySearchApiController : ControllerBase
    {
        private readonly ILogger<MySearchApiController> _logger;
        private readonly MySearchContext _context;

        public MySearchApiController(ILogger<MySearchApiController> logger, MySearchContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult SaveQuery(List<SearchResult> results)
        {
            try
            {
                _context.SearchResults.AddRange(results);
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}