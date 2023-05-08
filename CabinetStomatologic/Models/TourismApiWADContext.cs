using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace TourismApiWAD.Models
{
    public class TourismApiWADContext: DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Package> Package { get; set; }
        public DbSet<Offer> Offer { get; set; }  
        public DbSet<TripItinerarium> TripItinerarium { get; set; }
        public DbSet<Book> Book { get; set; }

    }
}