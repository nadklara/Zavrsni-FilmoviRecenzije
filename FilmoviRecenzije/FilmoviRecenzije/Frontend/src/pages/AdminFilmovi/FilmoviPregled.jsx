import { useEffect, useState } from "react"
import FilmoviService from "../../services/FilmoviService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';
import KategorijeService from "../../services/KategorijeService";

export default function FilmoviPregled(){

    const navigate = useNavigate()
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    const[filmovi, setFilmove] = useState([]);
    const[kategorije, setKategorije] = useState([]);

    async function dohvatiKategorije(){
        const odgovor = await KategorijeService.get();
        if(odgovor.greska){
            prikaziError(odgovor.poruka)
            return
        }
        setKategorije(odgovor.poruka)
    } 
    async function dohvatiFilmove(){
        const odgovor = await FilmoviService.get();
        if(odgovor.greska){
            prikaziError(odgovor.poruka)
            return
        }
        setFilmove(odgovor.poruka)
    } 

    useEffect(()=>{
        showLoading();
        dohvatiKategorije();
        dohvatiFilmove();
        hideLoading();
    },[])

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati?')){
            return;
        }
        brisanjeFilma(sifra)
    }

    async function brisanjeFilma(sifra) {
        showLoading();
        const odgovor = await FilmoviService.brisanje(sifra);
        hideLoading();
        if(odgovor.greska){
            prikaziError(odgovor.poruka)
            return
        }
        dohvatiFilmove();
    }

    return(
        <>
        <Link to={RouteNames.FILMOVI_NOVO}
        className="btn btn-success siroko">Dodaj novi film</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Slika</th>
                    <th>Naziv</th>
                    <th>Kategorija</th>
                    <th>Opis</th>
                    <th>Trajanje</th>
                    <th>Godina izlaska</th>
                </tr>
            </thead>
            <tbody>
                {filmovi && filmovi.map((film,index)=>(
                    <tr key={index}>
                        <td>
                            {film.slika && (
                                <img
                                src={`data:image/png;base64,${film.slika}`}
                                alt={film.naziv}
                                style={{ width: "200px", borderRadius: "8px" }}
                                />
                            )}
                        </td>
                        <td>
                            {film.naziv}
                        </td>
                        <td className="sredina">
                        {kategorije 
                            ? kategorije.find(kategorija => kategorija.sifra === film.kategorija)?.naziv || "Nepoznato" 
                            : "Učitavanje..."}
                        </td>
                        <td className="sredina">
                            {film.opis}
                        </td>
                        <td>
                            {film.trajanje}
                        </td>
                        <td>
                            {film.godinaIzlaska}
                        </td>
                        <td>
                            <Button variant="danger" onClick={()=>obrisi(film.sifra)}>Ukloni</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button onClick={()=>navigate(`/admin/filmovi/uredi/${film.sifra}`)}>Uredi</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}