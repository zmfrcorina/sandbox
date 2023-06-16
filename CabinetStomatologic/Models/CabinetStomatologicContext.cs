using System.Data.Entity;

namespace CabinetStomatologic.Models
{
    public class CabinetStomatologicContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Appointment> Appointment { get; set; }
        public DbSet<Service> Services { get; set; }
    }
}
