using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CabinetStomatologic.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string Message { get; set; }

        public virtual User User { get; set; }
    }
}
