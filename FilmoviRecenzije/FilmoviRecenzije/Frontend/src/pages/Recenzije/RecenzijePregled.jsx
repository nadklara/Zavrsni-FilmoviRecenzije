import { useEffect, useState, useContext } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RecenzijeService from "../../services/RecenzijeService";
import { AuthContext } from "../../components/AuthContext";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

export default function MyReviews() {
  const { currentUser } = useContext(AuthContext);
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();
  const navigate = useNavigate();

  const [recenzije, setRecenzije] = useState([]);
  const [editingRecenzija, setEditingRecenzija] = useState(null);
  const [editText, setEditText] = useState("");
  const [editOcjena, setEditOcjena] = useState(5.0);

  useEffect(() => {
    async function dohvatiRecenzije() {
      showLoading();
      const odgovor = await RecenzijeService.getByKorisnikSifra(currentUser.sifra);
      if (odgovor.greska) {
        prikaziError(odgovor.poruka);
        hideLoading();
        return;
      }
      setRecenzije(odgovor.poruka);
      hideLoading();
    }

    dohvatiRecenzije();
  }, [currentUser.sifra]);

  async function obrisi(sifra) {
    if (!confirm("Sigurno želite obrisati ovu recenziju?")) return;

    showLoading();
    const odgovor = await RecenzijeService.brisanje(sifra);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }

    const updatedRecenzije = recenzije.filter((recenzija) => recenzija.sifra !== sifra);
    setRecenzije(updatedRecenzije);
  }

  const handleSaveEdit = async (sifra) => {
    if (!editText.trim()) {
      prikaziError("Recenzija ne može biti prazna!");
      return;
    }

    const updatedRecenzija = {
      sifra,
      korisnikSifra: currentUser.sifra,
      ocjena: editOcjena,
      recenzija: editText,
      datum: new Date().toISOString(),
    };

    showLoading();
    const odgovor = await RecenzijeService.promjena(sifra, updatedRecenzija);
    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }

    const updatedRecenzije = recenzije.map((recenzija) =>
      recenzija.sifra === sifra ? { ...recenzija, recenzija: editText, ocjena: editOcjena } : recenzija
    );
    setRecenzije(updatedRecenzije);
    setEditingRecenzija(null);
    setEditText("");
    setEditOcjena(5.0);
  };

  const handleEditClick = (recenzija) => {
    console.log("Editing review:", recenzija); // Check the recenzija object
    setEditingRecenzija(recenzija.sifra);
    setEditText(recenzija.recenzija);
    setEditOcjena(recenzija.ocjena);
  };

  return (
    <Container className="mt-5">
      <h2>Moje Recenzije</h2>
      <Row className="mt-4">
        {recenzije.length === 0 ? (
          <Col>
            <p className="text-center">Nemate nikakvih recenzija.</p>
          </Col>
        ) : (
          recenzije.map((recenzija) => (
            <Col md={12} lg={8} xl={6} key={recenzija.sifra} className="mb-4">
              <Card className="shadow-sm" style={{ height: "100%" }}>
                <Card.Body>
                  <Card.Title>
                    {recenzija.filmNaziv ? recenzija.filmNaziv : "Film naziv nije dostupan"} - ⭐ {recenzija.ocjena}/10
                  </Card.Title>
                  {editingRecenzija === recenzija.sifra ? (
                    <>
                      <Form.Group>
                        <Form.Label>Ocjena</Form.Label>
                        <Form.Control
                          type="number"
                          value={editOcjena}
                          min="1"
                          max="10"
                          onChange={(e) => setEditOcjena(parseFloat(e.target.value))}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Recenzija</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="success" onClick={() => handleSaveEdit(recenzija.sifra)}>
                        Spremi
                      </Button>
                      <Button variant="secondary" onClick={() => setEditingRecenzija(null)}>
                        Odustani
                      </Button>
                    </>
                  ) : (
                    <>
                      <Card.Text>{recenzija.recenzija}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleEditClick(recenzija)}
                      >
                        Uredi
                      </Button>
                      <Button variant="danger" onClick={() => obrisi(recenzija.sifra)}>
                        Ukloni
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
