using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CabinetStomatologic.Models;
using System.Web.Http.Cors;

namespace CabinetStomatologic.Controllers
{

    public class TripItinerariumsController : ApiController
    {
        private CabinetStomatologicContext db = new CabinetStomatologicContext();

        // GET: api/TripItinerariums
        public IQueryable<TripItinerarium> GetTripItinerarium()
        {
            return db.TripItinerarium;
        }

        // GET: api/TripItinerariums/5
        [ResponseType(typeof(TripItinerarium))]
        [Route ("api/tripItinerariums/getTrip/{id}")]
        public IHttpActionResult GetTripItinerarium(int id)
        {
            TripItinerarium tripItinerarium = db.TripItinerarium.Find(id);
            if (tripItinerarium == null)
            {
                return NotFound();
            }

            return Ok(tripItinerarium);
        }



        // GET: api/TripItinerariums/5
        [ResponseType(typeof(TripItinerarium))]
        [Route("api/tripItinerariums/getTripPackage/{id}")]
        public IHttpActionResult GetTripItinerariumWithPackage(int id)
        {
            

            TripItinerarium tripItinerarium = db.TripItinerarium.Find(id);

            
                int idPackage = tripItinerarium.PackageId;
                Package package = db.Package.Find(idPackage);
                string city = package.DestinationCity;
                string hotel = package.Hotel;
                TripPackage finalObj = new TripPackage();
                finalObj.Hotel = hotel;
                finalObj.Plane = tripItinerarium.Plane;
                finalObj.Start = tripItinerarium.Start;
                finalObj.Finish = tripItinerarium.Finish;
                finalObj.Price = tripItinerarium.Price;
                finalObj.DestinationCity = city;
            

            

            if (finalObj == null)
            {
                return NotFound();
            }

            return Ok(finalObj);


        }



        [HttpGet]        
        [ResponseType(typeof(TripPackage))]
        [Route("api/tripitinerariums/package/{id}")]
        public IHttpActionResult GetTripPackage(int id)
        {
            IEnumerable<TripItinerarium> tripItinerariums = db.TripItinerarium.Where(it => it.PackageId == id);
            if (tripItinerariums == null)
            {
                return NotFound();
            }

            return Ok(tripItinerariums);
        }
        // PUT: api/TripItinerariums/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTripItinerarium(int id, TripItinerarium tripItinerarium)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tripItinerarium.TripItinerariumId)
            {
                return BadRequest();
            }

            db.Entry(tripItinerarium).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripItinerariumExists(id))
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

        // POST: api/TripItinerariums
        [ResponseType(typeof(TripItinerarium))]
        public IHttpActionResult PostTripItinerarium(TripItinerarium tripItinerarium)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TripItinerarium.Add(tripItinerarium);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tripItinerarium.TripItinerariumId }, tripItinerarium);
        }








        // DELETE: api/TripItinerariums/5
        [ResponseType(typeof(TripItinerarium))]
        public IHttpActionResult DeleteTripItinerarium(int id)
        {
            TripItinerarium tripItinerarium = db.TripItinerarium.Find(id);
            if (tripItinerarium == null)
            {
                return NotFound();
            }

            db.TripItinerarium.Remove(tripItinerarium);
            db.SaveChanges();

            return Ok(tripItinerarium);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TripItinerariumExists(int id)
        {
            return db.TripItinerarium.Count(e => e.TripItinerariumId == id) > 0;
        }
    }
}