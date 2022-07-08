using Microsoft.EntityFrameworkCore;

namespace MySearch.API.DAL
{
    public class MySearchContext : DbContext
    {
        public MySearchContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<SearchResult> SearchResults { get; set; }
    }
}
