using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Backend.DTO;
using API.Backend.Models;
using API.Backend.Data;

namespace FilmoviRecenzije.Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KategorijeController : Controller
    {
        private readonly FilmoviRecenzijeContext _context;

        public KategorijeController(FilmoviRecenzijeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult DohvatiSveKategorije()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return new JsonResult(_context.Kategorijes);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult DohvatiKategorije(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var kategorije = _context.Kategorijes.Find(sifra);

            if (kategorije == null)
            {
                return NotFound(new { message = "Kategorija nije pronađena" });
            }

            return Ok(kategorije);
        }
        
        [HttpGet]
        [Route("Naziv/{text}")]
        public IActionResult DohvatiKategorije(String text)
        {
            var kategorije = _context.Kategorijes.Where(f => f.Naziv.Contains(text)).ToList();

            if (!kategorije.Any())
            {
                return NotFound(new { message = "Kategorija nije pronađena" });
            }

            return Ok(kategorije);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult ObrisiKategoriju(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var kategorije = _context.Kategorijes.Find(sifra);

            if (kategorije == null)
            {
                return NotFound(new { message = "Kategorija nije pronađena" });
            }

            _context.Kategorijes.Remove(kategorije);
            _context.SaveChanges();

            return Ok(new { message = "Kategorija uspješno obrisana" });
        }
        
        [HttpPost]
        [Route("dodaj")]
        public IActionResult KreirajNovuKategoriju([FromBody] KategorijeDTO kategorije)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var novaKategorija = new Kategorije
            {
                Naziv = kategorije.Naziv,
            };

            _context.Kategorijes.Add(novaKategorija);
            _context.SaveChanges();

            return StatusCode(StatusCodes.Status201Created, novaKategorija);
        }

        [HttpPut]
        [Route("uredi/{sifra:int}")]
        public IActionResult UrediKategoriju(int sifra, [FromBody] KategorijeDTO promjenaKategorije)
        {
            var kategorije = _context.Kategorijes.Find(sifra);
            if (kategorije == null)
            {
                return NotFound(new { message = "Kategorija nije pronađena" });
            }

            kategorije.Naziv = promjenaKategorije.Naziv;

            _context.Kategorijes.Update(kategorije);
            _context.SaveChanges();

            return Ok(kategorije);
        }
    }
}