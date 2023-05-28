using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace CabinetStomatologic.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserNane { get; set; }
        public string FirstName { get; set; }
        public string userType { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string password { get; set; }
    }
}
