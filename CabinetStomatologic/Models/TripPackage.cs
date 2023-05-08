using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TourismApiWAD.Models
{
    public class TripPackage
    {
        public string Plane { get; set; }
        public DateTime Start { get; set; }
        public DateTime Finish { get; set; }
        public int Price { get; set; }
        public string DestinationCity { get; set; }
        public string Hotel { get; set; }
        public int BookingId { get; set; }

    }
}