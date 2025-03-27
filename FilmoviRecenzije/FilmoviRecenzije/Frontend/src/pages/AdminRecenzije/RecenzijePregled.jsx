import { useEffect, useState } from "react";
import RecenzijeService from "../../services/RecenzijeService";
import FilmoviService from "../../services/FilmoviService";
import KorisniciService from "../../services/KorisniciService";
import { Button, Table } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

export default function RecenzijePregled() {
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    const [recenzije, setRecenzije] = useState([]);
    const [filmovi, setFilmovi] = useState([]);
    const [korisnici, setKorisnici] = useState([]);

    async function dohvatiPodatke() {
        showLoading();
        const odgovorRecenzije = await RecenzijeService.get();
        if (odgovorRecenzije.greska) {
            prikaziError(odgovorRecenzije.poruka);
            hideLoading();
            return;
        }
        const recenzijeData = odgovorRecenzije.poruka;

        const odgovorFilmovi = await FilmoviService.get();
        if (odgovorFilmovi.greska) {
            prikaziError(odgovorFilmovi.poruka);
            hideLoading();
            return;
        }
        setFilmovi(odgovorFilmovi.poruka);

        const odgovorKorisnici = await KorisniciService.get();
        if (odgovorKorisnici.greska) {
            prikaziError(odgovorKorisnici.poruka);
            hideLoading();
            return;
        }
        setKorisnici(odgovorKorisnici.poruka);

        const recenzijePodaci = recenzijeData.map((recenzija) => {
            const film = odgovorFilmovi.poruka.find(f => f.sifra === recenzija.filmSifra);
            const korisnik = odgovorKorisnici.poruka.find(k => k.sifra === recenzija.korisnikSifra);
            
            return {
                ...recenzija,
                filmNaziv: film ? film.naziv : "Nepoznato",
                korisnikIme: korisnik ? korisnik.ime : "Nepoznati korisnik"
            };
        });

        setRecenzije(recenzijePodaci);
        hideLoading();
    }

    useEffect(() => {
        dohvatiPodatke();
    }, []);

    function obrisi(sifra) {
        if (!confirm("Sigurno obrisati?")) {
            return;
        }
        brisanjeRecenzije(sifra);
    }

    async function brisanjeRecenzije(sifra) {
        showLoading();
        const odgovor = await RecenzijeService.brisanje(sifra);  // Assuming a service method for deleting reviews
        hideLoading();
        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }
        dohvatiPodatke();
    }

    return (
        <>
            <h2 className="mb-4">Pregled svih recenzija</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Film</th>
                        <th>Korisnik</th>
                        <th>Ocjena</th>
                        <th>Recenzija</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {recenzije && recenzije.map((recenzija, index) => (
                        <tr key={index}>
                            <td>{recenzija.filmNaziv}</td>
                            <td>{recenzija.korisnikIme}</td>
                            <td>{recenzija.ocjena}/10</td>
                            <td>{recenzija.recenzija}</td>
                            <td>
                                <Button variant="danger" onClick={() => obrisi(recenzija.sifra)}>
                                    Ukloni
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
