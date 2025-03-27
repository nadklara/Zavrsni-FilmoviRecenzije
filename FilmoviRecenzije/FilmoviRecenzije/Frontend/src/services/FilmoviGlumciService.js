import { HttpService } from "./HttpService";

async function get(){
    return await HttpService.get('/FilmoviGlumci')
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja FilmoviGlumci'}   
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/FilmoviGlumci/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja FilmoviGlumci'}   
    })
}

async function dodaj(film){
    return await HttpService.post('/FilmoviGlumci/dodaj/',film)
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
                return {greska: true, poruka: 'FilmoviGlumci se ne može dodati!'}
        }
    })
}

async function promjena(sifra, film){
    return await HttpService.put('/FilmoviGlumci/uredi/' + sifra, film)
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
                return {greska: true, poruka: 'FilmoviGlumci se ne može promjeniti!'}
        }
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/FilmoviGlumci/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja s šifrom '+sifra}   
    })
}

export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena
}