using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Backend.Models;

public class Kategorije : Entitet
{
    public string Naziv { get; set; } = null!;

    [Required]
    [MaxLength(100)]

    [JsonIgnore]
    public virtual ICollection<Filmovi> Filmovis { get; set; } = new List<Filmovi>();
}
