import { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import KorisniciService from "../services/KorisniciService";
import useLoading from "../hooks/useLoading";
import useError from "../hooks/useError";

export default function KorisniciPregled() {
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    const [korisnici, setKorisnici] = useState([]);

    const dohvatiKorisnike = async () => {
        showLoading();
        const odgovor = await KorisniciService.get();
        hideLoading();

        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }
        setKorisnici(odgovor.poruka);
    };

    useEffect(() => {
        dohvatiKorisnike();
    }, []);

    const obrisiKorisnika = async (sifra) => {
        if (!window.confirm("Sigurno obrisati korisnika?")) return;

        showLoading();
        const odgovor = await KorisniciService.brisanje(sifra);
        hideLoading();

        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }

        dohvatiKorisnike();
    };

    return (
        <Container>
            <h2>Pregled korisnika</h2>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {korisnici.map((korisnik) => (
                        <tr key={korisnik.sifra}>
                            <td>{korisnik.ime} {korisnik.prezime}</td>
                            <td>{korisnik.email}</td>
                            <td>
                                {!korisnik.administrator && (
                                    <Button variant="danger" onClick={() => obrisiKorisnika(korisnik.sifra)}>
                                        Ukloni
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
