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
    public class DentalServicesController : ApiController
    {
        private CabinetStomatologicContext db = new CabinetStomatologicContext();

        // GET: api/Appointments
        public IQueryable<Service> GetService()
        {
            return db.Services;
        }

        [HttpGet]
        [ResponseType(typeof(Service))]
        [Route("api/services/{name}")]
        public IHttpActionResult GetServiceByName(string name)
        {
            IEnumerable<Service> services = db.Services.Where(it => it.Name == name).ToArray();
            
            if (services == null)
            {
                return NotFound();
            }

            return Ok(services.First());
        }

        [HttpOptions]
        public IHttpActionResult GetServices()
        {
            return Ok();
        }
    }
}
