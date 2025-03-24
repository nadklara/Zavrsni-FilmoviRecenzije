using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Backend.Models;

public class Korisnici : Entitet
{
    public string Ime { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Lozinka { get; set; } = null!;

    public bool Administrator { get; set; }

    [JsonIgnore]
    public virtual ICollection<Recenzije> Recenzijes { get; set; } = new List<Recenzije>();
}
