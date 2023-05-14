using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace CabinetStomatologic.Models
{
    public class Package
    {
        
        public int PackageId { get; private set; }
        public int OfferId { get; set; }
        public string DestinationCity { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Hotel { get; set; }
        public string Food { get; set; }
        public int NoPassengers { get; set; }
        public int Price { get; set; }
        public string Location { get; set; }
        public string HotelFacility { get; set; }
        public string RoomFacility { get; set; }
        //public virtual ICollection<Offer> Offer { get; set; }

    }
}