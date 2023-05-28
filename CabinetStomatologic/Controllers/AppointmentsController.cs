using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using CabinetStomatologic.Models;

namespace CabinetStomatologic.Controllers
{
    public class AppointmentsController : ApiController
    {
        private CabinetStomatologicContext db = new CabinetStomatologicContext();
        string[] timeSlots = { "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM" };

        // GET: api/Appointments
        public IQueryable<Appointment> GetAppointment()
        {
            return db.Appointment;
        }

        [HttpGet]
        [ResponseType(typeof(Appointment))]
        [Route("api/appointments/{date}")]
        public IHttpActionResult GetAppointmentsOnDate(DateTime date)
        {
            IEnumerable<Appointment> appointmnets = db.Appointment.Include(a => a.User).Where(it => it.Date == date).ToArray();
            
            if (appointmnets == null)
            {
                return NotFound();
            }

            return Ok(appointmnets);
        }

        [HttpOptions]
        public IHttpActionResult GetAppointments()
        {
            return Ok();
        }

        [HttpGet]
        [ResponseType(typeof(string[]))]
        [Route("api/freeAppointments/{date}")]
        public IHttpActionResult GetFreeAppointments(DateTime date)
        {
            IEnumerable<Appointment> appointmnets = db.Appointment.Where(it => it.Date == date).ToArray();
            var usedHours = appointmnets.Select(q => q.Time).ToArray();
            var freeHours = timeSlots.Except(usedHours).ToArray();

            if (appointmnets == null)
            {
                return NotFound();
            }

            return Ok(freeHours);
        }

        [HttpGet]
        [ResponseType(typeof(Appointment))]
        [Route("api/appointments/user/{id}")]
        public IHttpActionResult GetAppointmentsByUserId(int id)
        {
            IEnumerable<Appointment> appointmnets = db.Appointment.Where(it => it.UserId == id).ToArray();

            if (appointmnets == null)
            {
                return NotFound();
            }

            return Ok(appointmnets);

        }

        // GET: api/Appointments/5
        [ResponseType(typeof(Appointment))]
        public IHttpActionResult GetAppointment(int id)
        {
            Appointment appointment = db.Appointment.Find(id);
            if (appointment == null)
            {
                return NotFound();
            }

            return Ok(appointment);
        }

        // PUT: api/Appointments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAppointment(int id, Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appointment.AppointmentId)
            {
                return BadRequest();
            }

            db.Entry(appointment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Appointments
        [ResponseType(typeof(Appointment))]
        public IHttpActionResult PostAppointment(Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Appointment.Add(appointment);
            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }
            return CreatedAtRoute("DefaultApi", new { id = appointment.AppointmentId }, appointment);
        }

        // DELETE: api/Appointment/5
        [ResponseType(typeof(Appointment))]
        [Route ("api/appointments/deleteAppointment/{id}")]
        public IHttpActionResult DeleteAppointment(int id)
        {
            Appointment appointment = db.Appointment.Find(id);
            if (appointment == null)
            {
                return NotFound();
            }

            db.Appointment.Remove(appointment);
            db.SaveChanges();

            return Ok(appointment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AppointmentExists(int id)
        {
            return db.Appointment.Count(e => e.AppointmentId == id) > 0;
        }
    }
}
