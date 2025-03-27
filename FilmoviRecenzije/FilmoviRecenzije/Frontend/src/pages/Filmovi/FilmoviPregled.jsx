import { useEffect, useState } from "react";
import FilmoviService from "../../services/FilmoviService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';
import KategorijeService from "../../services/KategorijeService";

export default function FilmoviPregled() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();
    
    const [filmovi, setFilmove] = useState([]);
    const [kategorije, setKategorije] = useState([]);

    async function dohvatiKategorije() {
        showLoading();
        const odgovor = await KategorijeService.get();
        hideLoading();
        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }
        setKategorije(odgovor.poruka);
    }

    async function dohvatiFilmove() {
        showLoading();
        const odgovor = await FilmoviService.get();
        hideLoading();
        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }
        setFilmove(odgovor.poruka);
    }

    useEffect(() => {
        showLoading();
        dohvatiKategorije();
        dohvatiFilmove();
        hideLoading();
    }, []);

    return (
        <Container className="mt-4">
            <Row className="g-4">
                {filmovi.length === 0 ? (
                    <p className="text-center">Nema dostupnih filmova.</p>
                ) : (
                    filmovi.map((film, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card className="shadow-sm rounded">
                                {film.slika && (
                                    <Card.Img
                                        variant="top"
                                        src={`data:image/png;base64,${film.slika}`}
                                        alt={film.naziv}
                                        className="rounded-top"
                                        style={{ height: "250px", objectFit: "cover" }}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{film.naziv}</Card.Title>
                                    <Card.Text>
                                        <strong>Kategorija: </strong>
                                        {kategorije.find(k => k.sifra === film.kategorija)?.naziv || "Nepoznato"}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Opis: </strong>{film.opis}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Trajanje: </strong>{film.trajanje} min
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Godina izlaska: </strong>{film.godinaIzlaska}
                                    </Card.Text>
                                    <Button variant="primary" className="w-100" onClick={() => navigate(`/filmovi/detalji/${film.sifra}`)}>
                                        Vidi više
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}
