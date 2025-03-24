namespace API.Backend.DTO
{
    public class KorisniciDTO
    {
        public string Ime { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Lozinka { get; set; } = null!;

        public bool Administrator { get; set; }
    }
}
