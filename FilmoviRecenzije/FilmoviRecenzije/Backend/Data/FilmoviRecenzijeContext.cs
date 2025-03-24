using System;
using System.Collections.Generic;
using API.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Backend.Data;

public partial class FilmoviRecenzijeContext : DbContext
{
    public FilmoviRecenzijeContext()
    {
    }

    public FilmoviRecenzijeContext(DbContextOptions<FilmoviRecenzijeContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Filmovi> Filmovis { get; set; }

    public virtual DbSet<FilmoviGlumci> FilmoviGlumcis { get; set; }

    public virtual DbSet<Glumci> Glumcis { get; set; }

    public virtual DbSet<Kategorije> Kategorijes { get; set; }

    public virtual DbSet<Korisnici> Korisnicis { get; set; }

    public virtual DbSet<Recenzije> Recenzijes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Filmovi>(entity =>
        {
            entity.HasKey(e => e.Sifra).HasName("PK__Filmovi__3E8DFF10968AE372");

            entity.ToTable("Filmovi");

            entity.Property(e => e.Sifra).HasColumnName("sifra");
            entity.Property(e => e.GodinaIzlaska).HasColumnName("godinaIzlaska");
            entity.Property(e => e.Kategorija).HasColumnName("kategorija");
            entity.Property(e => e.Naziv)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("naziv");
            entity.Property(e => e.Opis)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("opis");
            entity.Property(e => e.Slika)
                .IsUnicode(false)
                .HasColumnName("slika");
            entity.Property(e => e.Trajanje).HasColumnName("trajanje");

          
            entity.HasOne(d => d.KategorijaNavigation).WithMany(p => p.Filmovis)
                .HasForeignKey(d => d.Kategorija)
                .HasConstraintName("FK__Filmovi__kategor__4D94879B");
           
        });

        modelBuilder.Entity<FilmoviGlumci>(entity =>
        {
            entity.HasKey(e => e.Sifra).HasName("PK__FilmoviG__3E8DFF10964833ED");
            entity.ToTable("FilmoviGlumci");

            entity.Property(e => e.FilmSifra).HasColumnName("filmSifra");
            entity.Property(e => e.GlumacSifra).HasColumnName("glumacSifra");

            entity.HasOne(d => d.FilmSifraNavigation).WithMany()
                .HasForeignKey(d => d.FilmSifra)
                .HasConstraintName("FK__FilmoviGl__film___5165187F");

            entity.HasOne(d => d.GlumacSifraNavigation).WithMany()
                .HasForeignKey(d => d.GlumacSifra)
                .HasConstraintName("FK__FilmoviGl__gluma__52593CB8");
        });

        modelBuilder.Entity<Glumci>(entity =>
        {
            entity.HasKey(e => e.Sifra).HasName("PK__Glumci__3E8DFF10044A2D67");

            entity.ToTable("Glumci");

            entity.Property(e => e.Sifra).HasColumnName("sifra");
            entity.Property(e => e.Ime)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ime");
            entity.Property(e => e.Prezime)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("prezime");
            entity.Property(e => e.GodinaRodenja).HasColumnName("godinaRodenja");

        });

        modelBuilder.Entity<Kategorije>(entity =>
        {
            entity.HasKey(e => e.Sifra).HasName("PK__Kategori__3E8DFF108648C4B2");

            entity.ToTable("Kategorije");

            entity.Property(e => e.Sifra).HasColumnName("sifra");
            entity.Property(e => e.Naziv)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("naziv");
        });

        modelBuilder.Entity<Korisnici>(entity =>
        {
            entity.HasKey(e => e.Sifra).HasName("PK__Korisnic__3E8DFF104DB06585");

            entity.ToTable("Korisnici");

            entity.Property(e => e.Sifra).HasColumnName("sifra");
            entity.Property(e => e.Administrator).HasColumnName("administrator");
            entity.Property(e => e.Email)
                .HasMaxLength(70)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Ime)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ime");
            entity.Property(e => e.Lozinka)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("lozinka");
        });

        modelBuilder.Entity<Recenzije>(entity =>
        {
            entity.HasKey(e => e.Sifra).HasName("PK__Recenzij__3E8DFF10D516E293");

            entity.ToTable("Recenzije");

            entity.Property(e => e.Sifra).HasColumnName("sifra");
            entity.Property(e => e.Datum)
                .HasColumnType("datetime")
                .HasColumnName("datum");
            entity.Property(e => e.FilmSifra).HasColumnName("filmSifra");
            entity.Property(e => e.KorisnikSifra).HasColumnName("korisnikSifra");
            entity.Property(e => e.Ocjena)
                .HasColumnType("decimal(3, 1)")
                .HasColumnName("ocjena");
            entity.Property(e => e.Recenzija)
                .HasColumnType("text")
                .HasColumnName("recenzija");
            
            entity.HasOne(d => d.FilmSifraNavigation).WithMany(p => p.Recenzijes)
                .HasForeignKey(d => d.FilmSifra)
                .HasConstraintName("FK__Recenzije__film___6754599E");
           

            entity.HasOne(d => d.KorisnikSifraNavigation).WithMany(p => p.Recenzijes)
                .HasForeignKey(d => d.KorisnikSifra)
                .HasConstraintName("FK__Recenzije__koris__68487DD7");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
