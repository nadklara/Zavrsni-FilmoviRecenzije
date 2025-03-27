using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Backend.Models;

public class Recenzije : Entitet
{
    [ForeignKey("Filmovi")]
    public int FilmSifra { get; set; }

    [ForeignKey("Korisnici")]
    public int KorisnikSifra { get; set; }

    public decimal? Ocjena { get; set; }

    public string? Recenzija { get; set; }

    public DateTime? Datum { get; set; }

    [JsonIgnore]
    public virtual Filmovi? FilmSifraNavigation { get; set; }

    [JsonIgnore]
    public virtual Korisnici? KorisnikSifraNavigation { get; set; }
}
