using Microsoft.EntityFrameworkCore;

namespace MySearch.DAL
{
    public class MySearchContext : DbContext
    {
        public MySearchContext(DbContextOptions options) : base(options)
        {
        }
    }
}
