using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySearch.DAL;

namespace MySearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        private readonly MySearchContext _context;
        public ApiController(MySearchContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("api/[controller]/[action]")]
        public void SaveQuery(List<SearchResult> results)
        {
            _context.SearchResults.AddRange(results);
            _context.SaveChanges();
        }
    }
}
