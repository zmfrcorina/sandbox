using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace TourismApiWAD.Models
{
    public class Offer
    {
        
        public int OfferId { get; set; }
        public string Destination { get; set; }
        public string Image { get; set; }
        
        //public virtual ICollection<Package> Package { get; set; }

    }
}


