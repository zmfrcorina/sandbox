using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using CabinetStomatologic.Models;

namespace CabinetStomatologic.Models
{
    public class CabinetStomatologicContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Package> Package { get; set; }
        public DbSet<Offer> Offer { get; set; }
        public DbSet<TripItinerarium> TripItinerarium { get; set; }
        public DbSet<Book> Book { get; set; }

    }
}