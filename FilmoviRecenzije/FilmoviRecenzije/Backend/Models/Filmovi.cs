using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Backend.Models;

public class Filmovi : Entitet
{
    public string Naziv { get; set; } = null!;

    public int? GodinaIzlaska { get; set; }

    public int? Trajanje { get; set; }

    public string? Opis { get; set; }

    [ForeignKey("Kategorije")] // Explicitly define the foreign key
    public int? Kategorija { get; set; }

    public string? Slika { get; set; }

    [JsonIgnore]
    public virtual Kategorije? KategorijaNavigation { get; set; }

    [JsonIgnore]
    public virtual ICollection<Recenzije> Recenzijes { get; set; } = new List<Recenzije>();
}
