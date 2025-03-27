import { HttpService } from "./HttpService";

async function get(){
    return await HttpService.get('/Korisnici')
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja korisnika'}   
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Korisnici/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja korisnika'}   
    })
}

async function dodaj(korisnik){
    return await HttpService.post('/Korisnici/dodaj/',korisnik)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
                }
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Korisnik se ne može dodati!'}
        }
    })
}

async function promjena(sifra, korisnik){
    return await HttpService.put('/Korisnici/uredi/' + sifra, korisnik)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
                }
                console.log(poruke)
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Korisnik se ne može promjeniti!'}
        }
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/Korisnici/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja korisnika s šifrom '+sifra}   
    })
}

async function getByEmail(email){
    return await HttpService.get('/Korisnici/email/'+email)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja korisnika s emailom '+sifra}   
    })
}

export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena,
    getByEmail
}