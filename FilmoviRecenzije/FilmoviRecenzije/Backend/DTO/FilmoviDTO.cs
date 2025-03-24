using System.ComponentModel.DataAnnotations.Schema;

namespace API.Backend.DTO
{
    public class FilmoviDTO
    {
        public string Naziv { get; set; } = null!;

        public int? GodinaIzlaska { get; set; }

        public int? Trajanje { get; set; }

        public string? Opis { get; set; }

        public int? Kategorija { get; set; }

        public string? Slika { get; set; }
    }
}
