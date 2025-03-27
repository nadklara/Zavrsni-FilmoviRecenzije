import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FilmoviService from '../../services/FilmoviService';
import KategorijeService from '../../services/KategorijeService';
import { RouteNames } from '../../constants';
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function VozilaDodaj() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const [kategorije, setKategorije] = useState([]);
    const [kategorija, setKategoriju] = useState(0);
    const { prikaziError } = useError();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
  

  async function dohvatiKategorije(){
    showLoading();
    const odgovor = await KategorijeService.get();
    hideLoading();
    setKategorije(odgovor.poruka);
  }

  useEffect(()=>{
    dohvatiKategorije();
  },[]);

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

  async function dodaj(e) {
    showLoading();
    const odgovor = await FilmoviService.dodaj(e);
    hideLoading();
    if(odgovor.greska){
      prikaziError(odgovor.poruka);
      return;
    }
    navigate(RouteNames.FILMOVI_PREGLED);
  }

  function obradiSubmit(e) {
    e.preventDefault();
    
    const naziv = e.target.naziv.value;
    const opis = e.target.opis.value;
    const trajanje = parseInt(e.target.trajanje.value);
    const godinaIzlaska= parseInt(e.target.godinaIzlaska.value);
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onloadend = () => {
        const slikaBase64 = reader.result.split(",")[1]; 
        
        dodaj({
            naziv,
            slika: slikaBase64,
            opis,
            kategorija: parseInt(kategorija),
            godinaIzlaska,
            trajanje
        });
    };
  }

  return (
      <>
      Dodavanje novog filma
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
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
                <Form.Control type="number" name="trajanje" placeholder="Unesite trajanje u minutama"/>
            </Form.Group>

            <Form.Group controlId="kategorija">
                <Form.Label>Opis</Form.Label>
                <Form.Control type="text" name="opis" placeholder="Unesite kratak opis filma"/>
            </Form.Group>

            <Form.Group controlId="godinaIzlaska">
            <Form.Label>Godina izlaska</Form.Label>
            <Form.Control 
                type="number" 
                name="godinaIzlaska" 
                placeholder="Unesite godinu izlaska" 
                min="1900" 
                max={new Date().getFullYear()} 
                onInput={(e) => {
                if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
                }}
            />
            </Form.Group>

          <Form.Group className='mb-3' controlId='kategorija'>
            <Form.Label>Vrsta vozila</Form.Label>
            <Form.Select onChange={(e) => setKategoriju(e.target.value)}>
            <option selected value="" disabled>Odaberi kategoriju</option> 
            {kategorije && kategorije.map((s,index)=>(
              <option key={index} value={s.sifra}>
                {s.naziv}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

          <hr />
          <Row>
              <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link to={RouteNames.FILMOVI_PREGLED}
              className="btn btn-danger siroko">
              Odustani
              </Link>
              </Col>
              <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
              <Button variant="primary" type="submit" className="siroko">
                  Dodaj novi film
              </Button>
              </Col>
          </Row>
      </Form>
  </>
  );
}