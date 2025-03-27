import { useEffect, useState } from "react";
import FilmoviService from "../../services/FilmoviService";
import GlumciService from "../../services/GlumciService";
import FilmoviGlumciService from "../../services/FilmoviGlumciService";
import { Button, Form, Table } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

export default function GlumciFilmDodaj() {
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    const [filmovi, setFilmovi] = useState([]);
    const [glumci, setGlumci] = useState([]);
    const [filmoviGlumci, setFilmoviGlumci] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState("");
    const [selectedGlumac, setSelectedGlumac] = useState("");

    useEffect(() => {
        async function fetchFilmoviAndGlumci() {
            showLoading();
            try {
                const filmoviResponse = await FilmoviService.get(); 
                const glumciResponse = await GlumciService.get(); 
                const filmoviGlumciResponse = await FilmoviGlumciService.get(); 
                
                if (filmoviResponse.greska || glumciResponse.greska || filmoviGlumciResponse.greska) {
                    prikaziError("greška");
                } else {
                    setFilmovi(filmoviResponse.poruka);
                    setGlumci(glumciResponse.poruka);
                    setFilmoviGlumci(filmoviGlumciResponse.poruka); s
                }
            } catch (error) {
                prikaziError("greška u dohvacanju podataka");
            } finally {
                hideLoading();
            }
        }
        fetchFilmoviAndGlumci();
    }, []);

    const handleSubmit = async () => {
        if (!selectedFilm || !selectedGlumac) {
            prikaziError("Odaberite film i glumca.");
            return;
        }

        const filmGlumacData = {
            filmSifra: selectedFilm,
            glumacSifra: selectedGlumac,
        };

        showLoading();
        try {
            const response = await FilmoviGlumciService.dodaj(filmGlumacData);
            if (response.greska) {
                prikaziError(response.poruka);
            } else {
                alert("Glumac dodan u film!");
                setSelectedFilm("");
                setSelectedGlumac("");
                fetchFilmoviAndGlumci(); 
            }
        } catch (error) {
            prikaziError("GLumac nije uspjesno dodan u film.");
        } finally {
            hideLoading();
        }
    };

    const handleDeleteActorFromFilm = async (id) => {
        if (!confirm("Sigurno ukloniti glumca iz filma?")) {
            return;
        }

        showLoading();
        try {
            const response = await FilmoviGlumciService.brisanje(id); 
            if (response.greska) {
                prikaziError(response.poruka);
            } else {
                alert("Glumac uklonjen iz filma!");
                fetchFilmoviAndGlumci();
            }
        } catch (error) {
            prikaziError("Glumac neuspjesno uklonjen.");
        } finally {
            hideLoading();
        }
    };

    return (
        <div>
            <h2>Dodaj glumca u film</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Odaberite film</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedFilm}
                        onChange={(e) => setSelectedFilm(e.target.value)}
                    >
                        <option value="">Odaberite film</option>
                        {filmovi.map((film) => (
                            <option key={film.sifra} value={film.sifra}>
                                {film.naziv}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Odaberite glumca</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedGlumac}
                        onChange={(e) => setSelectedGlumac(e.target.value)}
                    >
                        <option value="">Odaberite glumca</option>
                        {glumci.map((glumac) => (
                            <option key={glumac.sifra} value={glumac.sifra}>
                                {glumac.ime} {glumac.prezime}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>Spremi</Button>
            </Form>

            <h3 className="mt-4">Glumci u filmovima</h3>
            {filmoviGlumci.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Film</th>
                            <th>Glumac</th>
                            <th>Akcija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filmoviGlumci.map((fg) => (
                            <tr key={fg.sifra}>
                                <td>
                                    {filmovi.find((film) => film.sifra === fg.filmSifra)?.naziv || "Nepoznato"}
                                </td>
                                <td>
                                    {glumci.find((glumac) => glumac.sifra === fg.glumacSifra)?.ime}{" "}
                                    {glumci.find((glumac) => glumac.sifra === fg.glumacSifra)?.prezime || "Nepoznato"}
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteActorFromFilm(fg.sifra)}
                                    >
                                        Ukloni
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>Nema glumaca u filmovima.</p>
            )}
        </div>
    );
}
