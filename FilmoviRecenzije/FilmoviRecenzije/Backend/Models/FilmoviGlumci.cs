using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Backend.Models;

public class FilmoviGlumci :Entitet
{
    [ForeignKey("Filmovi")]
    public int? FilmSifra { get; set; }

    [ForeignKey("Glumci")]
    public int? GlumacSifra { get; set; }

    [JsonIgnore]

    public virtual Filmovi? FilmSifraNavigation { get; set; }
    [JsonIgnore]
    public virtual Glumci? GlumacSifraNavigation { get; set; }
}
