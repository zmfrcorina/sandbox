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
using TourismApiWAD.Models;
using System.Web.Http.Cors;

namespace TourismApiWAD.Controllers
{

    public class BooksController : ApiController
    {
        private TourismApiWADContext db = new TourismApiWADContext();

        // GET: api/Books
        public IQueryable<Book> GetBook()
        {
            return db.Book;
        }

        [HttpOptions]
        public IHttpActionResult GetBooks()
        {
            return Ok();
        }

        [HttpGet]
        [ResponseType(typeof(Book))]
        [Route("api/books/user/{id}")]
        public IHttpActionResult GetBooksByUserId(int id)
        {
            IEnumerable<Book> books = db.Book.Where(it => it.UserId == id);



            if (books == null)
            {
                return NotFound();
            }

            return Ok(books);

        }

        // GET: api/Books/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult GetBook(int id)
        {
            Book book = db.Book.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // PUT: api/Books/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBook(int id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.BookId)
            {
                return BadRequest();
            }

            db.Entry(book).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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

        // POST: api/Books
        [ResponseType(typeof(Book))]
        public IHttpActionResult PostBook(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Book.Add(book);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = book.BookId }, book);
        }

        // DELETE: api/Books/5
        [ResponseType(typeof(Book))]
        [Route ("api/books/deleteBook/{id}")]
        public IHttpActionResult DeleteBook(int id)
        {
            Book book = db.Book.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Book.Remove(book);
            db.SaveChanges();

            return Ok(book);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookExists(int id)
        {
            return db.Book.Count(e => e.BookId == id) > 0;
        }
    }
}