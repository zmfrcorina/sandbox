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

    public class OffersController : ApiController
    {
        private CabinetStomatologicContext db = new CabinetStomatologicContext();

        // GET: api/Offers
        public IQueryable<Offer> GetOffer()
        {
            return db.Offer;
        }



        [Route("api/offers/{country}")]
        [ResponseType(typeof(Offer))]
        public IHttpActionResult GetOfferByDest(string country)
        {
            IEnumerable<Offer> offer = db.Offer.Where(pk => pk.Destination == country);
            if (offer == null)
            {
                return NotFound();
            }

            return Ok(offer);
        }




        // GET: api/Offers/5
        [ResponseType(typeof(Offer))]
        public IHttpActionResult GetOffer(int id)
        {
            Offer offer = db.Offer.Find(id);
            if (offer == null)
            {
                return NotFound();
            }

            return Ok(offer);
        }

        // PUT: api/Offers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOffer(int id, Offer offer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != offer.OfferId)
            {
                return BadRequest();
            }

            db.Entry(offer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OfferExists(id))
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

        // POST: api/Offers
        [ResponseType(typeof(Offer))]
        public IHttpActionResult PostOffer(Offer offer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Offer.Add(offer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = offer.OfferId }, offer);
        }

        // DELETE: api/Offers/5
        [ResponseType(typeof(Offer))]
        public IHttpActionResult DeleteOffer(int id)
        {
            Offer offer = db.Offer.Find(id);
            if (offer == null)
            {
                return NotFound();
            }

            db.Offer.Remove(offer);
            db.SaveChanges();

            return Ok(offer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OfferExists(int id)
        {
            return db.Offer.Count(e => e.OfferId == id) > 0;
        }
    }
}