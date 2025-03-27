import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import KorisniciService from "../services/KorisniciService";

export default function Registracija() {
    const [ime, setIme] = useState("");
    const [prezime, setPrezime] = useState("");
    const [email, setEmail] = useState("");
    const [lozinka, setLozinka] = useState("");
    const [potvrdiLozinku, setPotvrdiLozinku] = useState("");
    const [greska, setGreska] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!ime || !prezime || !email || !lozinka || !potvrdiLozinku) {
            setGreska("Sva polja moraju biti popunjena.");
            return;
        }

        if (lozinka !== potvrdiLozinku) {
            setGreska("Lozinke se ne poklapaju.");
            return;
        }

        try {
            const userData = {
                ime,
                prezime,
                email,
                lozinka
            };

            const odgovor = await KorisniciService.dodaj(userData);

            if (odgovor.greska) {
                setGreska(odgovor.poruka);
            } else {
                alert("Korisnik je uspješno registriran!");
                navigate("/");  
            }
        } catch (error) {
            setGreska("Došlo je do greške pri registraciji. Pokušajte ponovno.");
        }
    };

    return (
        <Container>
            <h2>Registracija korisnika</h2>
            <Form onSubmit={handleSubmit}>
                {greska && <div className="alert alert-danger">{greska}</div>}

                <Form.Group className="mb-3">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Unesite svoje ime"
                        value={ime}
                        onChange={(e) => setIme(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Unesite svoje prezime"
                        value={prezime}
                        onChange={(e) => setPrezime(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Unesite svoj email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Lozinka</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Unesite svoju lozinku"
                        value={lozinka}
                        onChange={(e) => setLozinka(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Potvrdi lozinku</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Potvrdite lozinku"
                        value={potvrdiLozinku}
                        onChange={(e) => setPotvrdiLozinku(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registriraj se
                </Button>
            </Form>

            <div className="mt-3">
                <p>Već imate korisnički račun? <a href="/login">Prijavite se ovdje</a></p>
            </div>
        </Container>
    );
}
