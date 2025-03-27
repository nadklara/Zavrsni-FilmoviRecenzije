import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FilmoviService from '../../services/FilmoviService';
import KategorijeService from '../../services/KategorijeService';
import { RouteNames } from '../../constants';
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';

export default function FilmoviEdit() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();
  const { sifra } = useParams();

  const [kategorije, setKategorije] = useState([]);
  const [film, setFilm] = useState({
    naziv: "",
    opis: "",
    trajanje: "",
    godinaIzlaska: "",
    kategorija: "",
    slika: "", // Base64 image
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // Thumbnail preview

  useEffect(() => {
    async function fetchData() {
        showLoading();
        const odgovor = await KategorijeService.get();
        hideLoading();
        if(odgovor.greska){
            prikaziError(odgovor.poruka);
            return;
        }
        setKategorije(odgovor.poruka);

        showLoading();
        const filmOdgovor = await FilmoviService.getBySifra(sifra);
        hideLoading();
        if (filmOdgovor.greska) {
            prikaziError(filmOdgovor.poruka);
            return;
        }
        console.log(filmOdgovor.poruka)
        setFilm(filmOdgovor.poruka);

        if (filmOdgovor.poruka.slika) {
        setPreview(`data:image/png;base64,${filmOdgovor.poruka.slika}`);
        }
    }

    fetchData();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    }
  };

  const handleChange = (e) => {
    setFilm({ ...film, [e.target.name]: e.target.value });
  };

  function obradiSubmit(e) {
    e.preventDefault();

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const slikaBase64 = reader.result.split(",")[1];
        submitForm(slikaBase64);
      };
    } else {
      submitForm(film.slika);
    }
  }

  async function submitForm(slikaBase64) {
    showLoading();
    const podatci = {
      ...film,
      slika: slikaBase64,
      trajanje: parseInt(film.trajanje),
      godinaIzlaska: parseInt(film.godinaIzlaska),
      kategorija: parseInt(film.kategorija),
    };

    const odgovor = await FilmoviService.update(sifra, podatci);

    hideLoading();
    if (odgovor.greska) {
      prikaziError(odgovor.poruka);
      return;
    }

    navigate(RouteNames.FILMOVI_PREGLED);
  }

  return (
    <>
      <h2>Uredi film</h2>
      <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="naziv">
          <Form.Label>Naziv</Form.Label>
          <Form.Control
            type="text"
            name="naziv"
            value={film.naziv}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="slika">
          <Form.Label>Slika</Form.Label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <img
              src={preview}
              alt="Thumbnail"
              style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
            />
          )}
        </Form.Group>

        <Form.Group controlId="trajanje">
          <Form.Label>Trajanje filma</Form.Label>
          <Form.Control
            type="number"
            name="trajanje"
            value={film.trajanje}
            onChange={handleChange}
            placeholder="Unesite trajanje u minutama"
          />
        </Form.Group>

        <Form.Group controlId="opis">
          <Form.Label>Opis</Form.Label>
          <Form.Control
            type="text"
            name="opis"
            value={film.opis}
            onChange={handleChange}
            placeholder="Unesite kratak opis filma"
          />
        </Form.Group>

        <Form.Group controlId="godinaIzlaska">
          <Form.Label>Godina izlaska</Form.Label>
          <Form.Control
            type="number"
            name="godinaIzlaska"
            value={film.godinaIzlaska}
            onChange={handleChange}
            placeholder="Unesite godinu izlaska"
            min="1900"
            max={new Date().getFullYear()}
            onInput={(e) => {
              if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="kategorija">
          <Form.Label>Kategorija</Form.Label>
          <Form.Select name="kategorija" value={film.kategorija} onChange={handleChange}>
            <option value="" disabled>Odaberi kategoriju</option>
            {kategorije.map((s) => (
              <option key={s.sifra} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <hr />
        <Row>
          <Col xs={6}>
            <Link to={RouteNames.FILMOVI_PREGLED} className="btn btn-danger siroko">
              Odustani
            </Link>
          </Col>
          <Col xs={6}>
            <Button variant="primary" type="submit" className="siroko">
              Spremi promjene
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}