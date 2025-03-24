using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Backend.DTO;
using API.Backend.Models;
using API.Backend.Data;

namespace FilmoviRecenzije.Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class GlumciController : Controller
    {
        private readonly FilmoviRecenzijeContext _context;

        public GlumciController(FilmoviRecenzijeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult DohvatiSveGlumce()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return new JsonResult(_context.Glumcis);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult DohvatiGlumca(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var glumci = _context.Glumcis.Find(sifra);

            if (glumci == null)
            {
                return NotFound(new { message = "Glumac nije pronađen" });
            }

            return Ok(glumci);
        }
        
        [HttpGet]
        [Route("Naziv/{text}")]
        public IActionResult DohvatiGlumca(String text)
        {
            var glumci = _context.Glumcis.Where(f => f.Ime.Contains(text) || f.Prezime.Contains(text)).ToList();

            if (!glumci.Any())
            {
                return NotFound(new { message = "Vozilo nije pronađeno" });
            }

            return Ok(glumci);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult ObrisiGlumca(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var glumci = _context.Glumcis.Find(sifra);

            if (glumci == null)
            {
                return NotFound(new { message = "Glumac nije pronađen" });
            }

            _context.Glumcis.Remove(glumci);
            _context.SaveChanges();

            return Ok(new { message = "Glumac uspješno obrisan" });
        }
        
        [HttpPost]
        [Route("dodaj")]
        public IActionResult KreirajNovogGlumca([FromBody] Glumci glumci)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var noviGlumac = new Glumci
            {
                Ime = glumci.Ime,
                Prezime = glumci.Prezime,
                GodinaRodenja = glumci.GodinaRodenja
            };

            _context.Glumcis.Add(noviGlumac);
            _context.SaveChanges();

            return StatusCode(StatusCodes.Status201Created, noviGlumac);
        }

        [HttpPut]
        [Route("uredi/{sifra:int}")]
        public IActionResult UrediGlumca(int sifra, [FromBody] Glumci promjenaGlumca)
        {
            var glumac = _context.Glumcis.Find(sifra);
            if (glumac == null)
            {
                return NotFound(new { message = "Glumac nije pronađen" });
            }

            glumac.Ime = promjenaGlumca.Ime;
            glumac.Prezime = promjenaGlumca.Prezime;
            glumac.GodinaRodenja = promjenaGlumca.GodinaRodenja;

            _context.Glumcis.Update(glumac);
            _context.SaveChanges();

            return Ok(glumac);
        }
    }
}