using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace TourismApiWAD.Models
{
    public class Book
    {
        public int BookId { get; set; }
        public int UserId { get; set; }
        public int TripItinerariumId { get; set; }

    }
}