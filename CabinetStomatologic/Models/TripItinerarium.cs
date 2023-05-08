using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;


namespace TourismApiWAD.Models
{
    public class TripItinerarium
    {
        public int TripItinerariumId { get; set; }
        public int PackageId { get; set; }
        public string Plane { get; set; }
        public DateTime Start { get; set; }
        public DateTime Finish { get; set; }
        public int Price { get; set; }
        
    }
}