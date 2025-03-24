using API.Backend.Data;
using API.Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Backend.DTO;

namespace API.Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FilmoviController : Controller
    {
        private readonly FilmoviRecenzijeContext _context;

        public FilmoviController(FilmoviRecenzijeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult dohvatiSveFilmove()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return new JsonResult(_context.Filmovis);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult dohvatiFilm(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var film = _context.Filmovis.Find(sifra);

            if (film == null)
            {
                return NotFound(new { message = "Film nije pronađen" });
            }

            return Ok(film); 
        }

        [HttpGet]
        [Route("naziv/{naziv}")]
        public IActionResult dohvatiFilm(String naziv)
        {
            var film = _context.Filmovis.Where(f => f.Naziv.Contains(naziv));

            if (film == null)
            {
                return NotFound(new { message = "Film nije pronađen" });
            }

            return Ok(film);
        }


        [HttpGet]
        [Route("recenzije/{sifra:int}")]
        public IActionResult dohvatiRecenzijeFilma(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var film = _context.Filmovis.Find(sifra);

            if (film == null)
            {
                return NotFound(new { message = "Film nije pronađen" });
            }

            var reviews = _context.Recenzijes
                .Where(r => r.FilmSifra == sifra)
                .ToList();

            if (reviews == null || reviews.Count() == 0)
            {
                return NotFound(new { message = "No reviews found for the given film." });
            }

            return Ok(reviews);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult obrisiFilm(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var film = _context.Filmovis.Find(sifra);

            if (film == null)
            {
                return NotFound(new { message = "Film nije pronađen" });
            }

            _context.Filmovis.Remove(film);
            _context.SaveChanges();

            return Ok(new { message = "Film uspješno obrisan" });
        }

        [HttpPost]
        [Route("dodaj")]
        public IActionResult KreirajNoviFilm([FromBody] FilmoviDTO film)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var noviFilm = new Filmovi
            {
                Naziv = film.Naziv,
                Kategorija = film.Kategorija,
                Trajanje = film.Trajanje,
                Opis = film.Opis,
                GodinaIzlaska = film.GodinaIzlaska,
                Slika = film.Slika
            };

            _context.Filmovis.Add(noviFilm);
            _context.SaveChanges();

            return StatusCode(StatusCodes.Status201Created, noviFilm);
        }

        [HttpPut]
        [Route("uredi/{sifra:int}")]
        public IActionResult UrediFilm(int sifra, [FromBody] FilmoviDTO promjenaFilma)
        {
            var film = _context.Filmovis.Find(sifra);
            if (film == null)
            {
                return NotFound(new { message = "Film nije pronađen" });
            }

            film.Naziv = promjenaFilma.Naziv;
            film.Kategorija = promjenaFilma.Kategorija;
            film.Trajanje = promjenaFilma.Trajanje;
            film.Opis = promjenaFilma.Opis;
            film.GodinaIzlaska = promjenaFilma.GodinaIzlaska;
            film.Slika = promjenaFilma.Slika;

            _context.Filmovis.Update(film);
            _context.SaveChanges();

            return Ok(film);
        }
    }
}
