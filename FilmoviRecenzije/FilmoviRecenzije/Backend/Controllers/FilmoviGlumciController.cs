using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Backend.DTO;
using API.Backend.Models;
using API.Backend.Data;

namespace FilmoviRecenzije.Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FilmoviGlumciController : Controller
    {
        private readonly FilmoviRecenzijeContext _context;

        public FilmoviGlumciController(FilmoviRecenzijeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult DohvatiSveFilmoveGlumce()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return new JsonResult(_context.FilmoviGlumcis);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult DohvatiFilmoveGlumce(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var filmoviGlumci = _context.FilmoviGlumcis.Find(sifra);

            if (filmoviGlumci == null)
            {
                return NotFound(new { message = "Veza između filma i glumca nije pronađena" });
            }

            return Ok(filmoviGlumci);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult ObrisiFilmoveGlumce(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var filmoviGlumci = _context.FilmoviGlumcis.Find(sifra);

            if (filmoviGlumci == null)
            {
                return NotFound(new { message = "Veza između filma i glumca nije pronađena" });
            }

            _context.FilmoviGlumcis.Remove(filmoviGlumci);
            _context.SaveChanges();

            return Ok(new { message = "Veza između filma i glumca uspješno obrisana" });
        }
        
        [HttpPost]
        [Route("dodaj")]
        public IActionResult KreirajNoveFilmoviGlumci([FromBody] FilmoviGlumciDTO filmoviGlumci)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var noviFilmoviGlumci = new FilmoviGlumci
            {
                FilmSifra = filmoviGlumci.FilmSifra,
                GlumacSifra = filmoviGlumci.GlumacSifra,
            };

            _context.FilmoviGlumcis.Add(noviFilmoviGlumci);
            _context.SaveChanges();

            return StatusCode(StatusCodes.Status201Created, filmoviGlumci);
        }

        [HttpPut]
        [Route("uredi/{sifra:int}")]
        public IActionResult UrediFilmoviGlumci(int sifra, [FromBody] FilmoviGlumciDTO promjenaFilmoviGlumci)
        {
            var filmoviGlumci = _context.FilmoviGlumcis.Find(sifra);
            if (filmoviGlumci == null)
            {
                return NotFound(new { message = "Veza između filma i glumca nije pronađena" });
            }

            filmoviGlumci.FilmSifra = promjenaFilmoviGlumci.FilmSifra;
            filmoviGlumci.GlumacSifra = promjenaFilmoviGlumci.GlumacSifra;

            _context.FilmoviGlumcis.Update(filmoviGlumci);
            _context.SaveChanges();

            return Ok(filmoviGlumci);
        }
    }
}