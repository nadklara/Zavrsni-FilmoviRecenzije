﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Backend.DTO;
using API.Backend.Models;
using API.Backend.Data;

namespace FilmoviRecenzije.Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RecenzijeController : Controller
    {
        private readonly FilmoviRecenzijeContext _context;

        public RecenzijeController(FilmoviRecenzijeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult DohvatiSveRecenzije()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return new JsonResult(_context.Recenzijes);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult DohvatiRecenzije(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var recenzije = _context.Recenzijes.Find(sifra);

            if (recenzije == null)
            {
                return NotFound(new { message = "Recenzija nije pronađena" });
            }

            return Ok(recenzije);
        }
       
        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult ObrisiRecenziju(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { message = "Šifra nije validna" });
            }
            var recenzije = _context.Recenzijes.Find(sifra);

            if (recenzije == null)
            {
                return NotFound(new { message = "Recenzija nije pronađen" });
            }

            _context.Recenzijes.Remove(recenzije);
            _context.SaveChanges();

            return Ok(new { message = "Recenzija uspješno obrisana" });
        }
        
        [HttpPost]
        [Route("dodaj")]
        public IActionResult KreirajNovuRecenziju([FromBody] RecenzijeDTO recenzije)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var novaRecenzija = new Recenzije
            {
                KorisnikSifra = recenzije.KorisnikSifra,
                Ocjena = recenzije.Ocjena,
                Recenzija = recenzije.Recenzija,
                Datum = recenzije.Datum
            };

            _context.Recenzijes.Add(novaRecenzija);
            _context.SaveChanges();

            return StatusCode(StatusCodes.Status201Created, novaRecenzija);
        }

        [HttpPut]
        [Route("uredi/{sifra:int}")]
        public IActionResult UrediRecenziju(int sifra, [FromBody] RecenzijeDTO promjenaRecenzije)
        {
            var recenzije = _context.Recenzijes.Find(sifra);
            if (recenzije == null)
            {
                return NotFound(new { message = "Korisnik nije pronađen" });
            }

            recenzije.KorisnikSifra = promjenaRecenzije.KorisnikSifra;
            recenzije.Ocjena = promjenaRecenzije.Ocjena;
            recenzije.Recenzija = promjenaRecenzije.Recenzija;
            recenzije.Datum = promjenaRecenzije.Datum;

            _context.Recenzijes.Update(recenzije);
            _context.SaveChanges();

            return Ok(recenzije);
        }
    }
}