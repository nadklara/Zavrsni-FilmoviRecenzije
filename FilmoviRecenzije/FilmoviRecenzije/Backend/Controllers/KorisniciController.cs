using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Backend.DTO;
using API.Backend.Models;
using API.Backend.Data;

namespace FilmoviRecenzije.Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KorisniciController : Controller
    {
        private readonly FilmoviRecenzijeContext _context;

        public KorisniciController(FilmoviRecenzijeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult DohvatiSveKorisnike()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return new JsonResult(_context.Korisnicis);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult DohvatiKorisnike(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var korisnici = _context.Korisnicis.Find(sifra);

            if (korisnici == null)
            {
                return NotFound(new { message = "Korisnik nije pronađen" });
            }

            return Ok(korisnici);
        }
        
        [HttpGet]
        [Route("Naziv/{text}")]
        public IActionResult DohvatiKorisnik(String text)
        {
            var korisnici = _context.Korisnicis.Where(f => f.Ime.Contains(text)).ToList();

            if (!korisnici.Any())
            {
                return NotFound(new { message = "Korisnik nije pronađen" });
            }

            return Ok(korisnici);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult ObrisiKorisnika(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var korisnici = _context.Korisnicis.Find(sifra);

            if (korisnici == null)
            {
                return NotFound(new { message = "Korisnik nije pronađen" });
            }

            _context.Korisnicis.Remove(korisnici);
            _context.SaveChanges();

            return Ok(new { message = "Korisnik uspješno obrisan" });
        }
        
        [HttpPost]
        [Route("dodaj")]
        public IActionResult KreirajNovogKorisnika([FromBody] KorisniciDTO korisnik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var noviKorisnik = new Korisnici
            {
               Ime = korisnik.Ime,
               Email = korisnik.Email,
               Lozinka = korisnik.Lozinka,
               Administrator = korisnik.Administrator
            };

            _context.Korisnicis.Add(noviKorisnik);
            _context.SaveChanges();

            return StatusCode(StatusCodes.Status201Created, noviKorisnik);
        }

        [HttpPut]
        [Route("uredi/{sifra:int}")]
        public IActionResult UrediKategoriju(int sifra, [FromBody] KorisniciDTO promjenaKorisnika)
        {
            var korisnici = _context.Korisnicis.Find(sifra);
            if (korisnici == null)
            {
                return NotFound(new { message = "Korisnik nije pronađen" });
            }

            korisnici.Ime = promjenaKorisnika.Ime;
            korisnici.Email = promjenaKorisnika.Email;
            korisnici.Lozinka = promjenaKorisnika.Lozinka;
            korisnici.Administrator = promjenaKorisnika.Administrator;

            _context.Korisnicis.Update(korisnici);
            _context.SaveChanges();

            return Ok(korisnici);
        }
    }
}