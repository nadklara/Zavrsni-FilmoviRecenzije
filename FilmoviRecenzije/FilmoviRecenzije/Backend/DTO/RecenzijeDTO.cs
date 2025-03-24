using System.ComponentModel.DataAnnotations.Schema;

namespace API.Backend.DTO
{
    public class RecenzijeDTO
    {
        public int? FilmSifra { get; set; }

        public int? KorisnikSifra { get; set; }

        public decimal? Ocjena { get; set; }

        public string? Recenzija { get; set; }

        public DateTime? Datum { get; set; }
    }
}
