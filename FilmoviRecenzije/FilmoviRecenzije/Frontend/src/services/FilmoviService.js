import { HttpService } from "./HttpService";

async function get(){
    return await HttpService.get('/Filmovi')
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja filmova'}   
    })
}

async function getRecenzije(sifra){
    return await HttpService.get('/Filmovi/recenzije/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja recenzija filma'}   
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Filmovi/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja filma'}   
    })
}

async function dodaj(film){
    return await HttpService.post('/Filmovi/dodaj/',film)
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
                return {greska: true, poruka: 'Film se ne može dodati!'}
        }
    })
}

async function promjena(sifra, film){
    return await HttpService.put('/Filmovi/uredi/' + sifra, film)
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
                return {greska: true, poruka: 'Film se ne može promjeniti!'}
        }
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/Filmovi/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja filma s šifrom '+sifra}   
    })
}

async function getGlumciByFilmSifra(sifra){
    return await HttpService.get('/Glumci/film/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja filma/glumaca s šifrom '+sifra}   
    })
}

export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena,
    getRecenzije,
    getGlumciByFilmSifra
}