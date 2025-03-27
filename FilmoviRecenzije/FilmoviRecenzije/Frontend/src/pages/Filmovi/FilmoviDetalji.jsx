import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecenzijeService from "../../services/RecenzijeService";
import FilmoviService from "../../services/FilmoviService";
import KorisniciService from "../../services/KorisniciService";
import { Container, Row, Col, Image, Button, Card, Form } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";
import { AuthContext } from "../../components/AuthContext";
import KategorijeService from "../../services/KategorijeService";

export default function FilmoviDetalji() {
    const { sifra } = useParams();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();
    const { isLoggedIn, currentUser } = useContext(AuthContext);
    
    const [film, setFilm] = useState(null);
    const [recenzije, setRecenzije] = useState([]);
    const [glumci, setGlumci] = useState([]);
    const [kategorija, setKategorija] = useState(null);
    const [novaRecenzija, setNovaRecenzija] = useState("");
    const [ocjena, setOcjena] = useState(5.0);
    const [hasReview, setHasReview] = useState(false);
    
    const [editingRecenzija, setEditingRecenzija] = useState(null);
    const [editText, setEditText] = useState("");
    const [editOcjena, setEditOcjena] = useState(5.0);

    useEffect(() => {
        async function dohvatiPodatkeFilma() {
            showLoading();
            const odgovor = await FilmoviService.getBySifra(sifra);
            if (odgovor.greska) {
                prikaziError(odgovor.poruka);
                hideLoading();
                return;
            }
            setFilm(odgovor.poruka);

            const odgovorKategorija = await KategorijeService.getBySifra(odgovor.poruka.kategorija);
            setKategorija(odgovorKategorija.poruka);

            const odgovorGlumci = await FilmoviService.getGlumciByFilmSifra(sifra);
            setGlumci(odgovorGlumci.poruka)

            await dohvatiRecenzije();
            hideLoading();
        }

        dohvatiPodatkeFilma();
    }, [sifra]);

    async function dohvatiRecenzije() {
        showLoading();
        const odgovorRecenzija = await FilmoviService.getRecenzije(sifra);
        if (odgovorRecenzija.greska) {
            prikaziError(odgovorRecenzija.poruka);
            hideLoading();
            return;
        }

        const recenzijePodaci = await Promise.all(
            odgovorRecenzija.poruka.map(async (recenzija) => {
                const userResponse = await KorisniciService.getBySifra(recenzija.korisnikSifra);
                if (userResponse.poruka.sifra === currentUser.sifra) {
                    setHasReview(true);
                }
                return {
                    ...recenzija,
                    korisnikIme: userResponse.greska ? "Nepoznati korisnik" : userResponse.poruka.ime
                };
            })
        );

        setRecenzije(recenzijePodaci);
        hideLoading();
    }

    async function obrisi(sifra) {
        if (!confirm("Sigurno obrisati?")) return;

        showLoading();
        const odgovor = await RecenzijeService.brisanje(sifra);
        hideLoading();
        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }

        setHasReview(false);
        await dohvatiRecenzije();
    }

    const handleDodajRecenziju = async () => {
        if (!novaRecenzija.trim()) {
            prikaziError("Recenzija ne može biti prazna!");
            return;
        }

        const novaRecenzijaData = {
            filmSifra: parseInt(sifra),
            korisnikSifra: currentUser.sifra,
            ocjena: ocjena, 
            recenzija: novaRecenzija,
            datum: new Date().toISOString(),
        };

        const odgovor = await RecenzijeService.dodaj(novaRecenzijaData);
        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }

        await dohvatiRecenzije();
        setHasReview(true);
        setNovaRecenzija("");
        setOcjena(5.0);
    };

    async function saveEdit(sifra) {
        if (!editText.trim()) {
            prikaziError("Recenzija ne može biti prazna!");
            return;
        }

        const updatedRecenzija = {
            sifra,
            filmSifra: parseInt(sifra),
            korisnikSifra: currentUser.sifra,
            ocjena: editOcjena,
            recenzija: editText,
            datum: new Date().toISOString(),
        };

        console.log(updatedRecenzija)
        const odgovor = await RecenzijeService.promjena(updatedRecenzija.sifra, updatedRecenzija);
        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }

        await dohvatiRecenzije();
        setEditingRecenzija(null);
    }

    if (!film) {
        return <p className="text-center mt-5">Učitavanje detalja filma...</p>;
    }

    return (
        <Container className="mt-5">
            <Row className="shadow-lg p-4 rounded bg-light">
                <Col md={4} className="text-center">
                    <Image
                        src={`data:image/png;base64,${film.slika}`}
                        alt={film.naziv}
                        fluid
                        className="rounded shadow-sm"
                    />
                </Col>
                <Col md={8}>
                    <h2 className="mb-3">{film.naziv}</h2>
                    <p><strong>Kategorija:</strong> {kategorija?.naziv}</p>
                    <p><strong>Opis:</strong> {film.opis}</p>
                    <p><strong>Trajanje:</strong> {film.trajanje} min</p>
                    <p><strong>Godina izlaska:</strong> {film.godinaIzlaska}</p>
                    <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h5><strong>Glumci:</strong></h5>
                    <p>{glumci.map((glumac, index) => (
                        <span key={glumac.sifra}>
                            {glumac.imeGlumca}{index < glumci.length - 1 ? ', ' : ''}
                        </span>
                    ))}</p>
                </Col>
            </Row>

            {isLoggedIn && !hasReview && (
                <Row className="mt-4">
                    <Col>
                        <Form.Group>
                            <Form.Label>Ocjena</Form.Label>
                            <Form.Control type="number" min="1" max="10" value={ocjena} onChange={(e) => setOcjena(parseFloat(e.target.value))} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Recenzija</Form.Label>
                            <Form.Control as="textarea" rows={3} value={novaRecenzija} onChange={(e) => setNovaRecenzija(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleDodajRecenziju}>Dodaj Recenziju</Button>
                    </Col>
                </Row>
            )}

            <h3 className="mt-5">Recenzije</h3>
            {recenzije.map((recenzija) => (
                <Card key={recenzija.sifra} className="mt-3 shadow-sm">
                    <Card.Body>
                        <Card.Title>{recenzija.korisnikIme} - ⭐ {recenzija.ocjena}/10</Card.Title>
                        {editingRecenzija === recenzija.sifra ? (
                            <>
                                <Form.Control as="textarea" value={editText} onChange={(e) => setEditText(e.target.value)} />
                                <Button variant="success" onClick={() => saveEdit(recenzija.sifra)}>Spremi</Button>
                                <Button variant="secondary" onClick={() => setEditingRecenzija(null)}>Odustani</Button>
                            </>
                        ) : (
                            <>
                                <Card.Text>{recenzija.recenzija}</Card.Text>
                                {recenzija.korisnikSifra === currentUser.sifra && (
                                    <>
                                        <Button variant="primary" onClick={() => { setEditingRecenzija(recenzija.sifra); setEditText(recenzija.recenzija); }}>Uredi</Button>
                                        <Button variant="danger" onClick={() => obrisi(recenzija.sifra)}>Ukloni</Button>
                                    </>
                                )}
                            </>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}
