using System;
using System.Collections.Generic;

namespace API.Backend.Models;

public class Glumci : Entitet
{
    public string Ime { get; set; } = null!;
    public string Prezime { get; set; } = null!;
    public int? GodinaRodenja { get; set; }

}
