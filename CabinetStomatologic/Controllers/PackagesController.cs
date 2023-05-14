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
    public class PackagesController : ApiController
    {
        private CabinetStomatologicContext db = new CabinetStomatologicContext();

        // GET: api/Packages
        public IQueryable<Package> GetPackage()
        {
            return db.Package;
        }

        // GET: api/Packages/5
        [ResponseType(typeof(Package))]
        [Route ("api/packages/getPackage/{id}")]
        public IHttpActionResult GetPackage(int id)
        {
            Package package = db.Package.Find(id);
            if (package == null)
            {
                return NotFound();
            }

            return Ok(package);
        }


        [Route("api/packages/{dest}")]
        [ResponseType(typeof(Package))]
        public IHttpActionResult GetPackageByDest(string dest)
        {
            IEnumerable<Package> package = db.Package.Where(pk => pk.Hotel == dest);
            if (package == null)
            {
                return NotFound();
            }

            return Ok(package);
        }




        [Route("api/packages/offer/{id}")]
        [ResponseType(typeof(Package))]
        public IHttpActionResult GetPackageByOffer(int id)
        {
            IEnumerable<Package> packages = db.Package.Where(pk => pk.OfferId == id);
            if (packages == null)
            {
                return NotFound();
            }

            return Ok(packages);
        }

        // PUT: api/Packages/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPackage(int id, Package package)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != package.PackageId)
            {
                return BadRequest();
            }

            db.Entry(package).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackageExists(id))
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

        // POST: api/Packages
        [ResponseType(typeof(Package))]
        public IHttpActionResult PostPackage(Package package)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Package.Add(package);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = package.PackageId }, package);
        }

        // DELETE: api/Packages/5
        [ResponseType(typeof(Package))]
        public IHttpActionResult DeletePackage(int id)
        {
            Package package = db.Package.Find(id);
            if (package == null)
            {
                return NotFound();
            }

            db.Package.Remove(package);
            db.SaveChanges();

            return Ok(package);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PackageExists(int id)
        {
            return db.Package.Count(e => e.PackageId == id) > 0;
        }
    }
}