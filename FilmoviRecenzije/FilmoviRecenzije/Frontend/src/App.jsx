import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, NavbarBrand } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import { RouteNames } from './constants'
import AdminFilmoviPregled from './pages/AdminFilmovi/FilmoviPregled'
import AdminFilmoviDodaj from './pages/AdminFilmovi/FilmoviDodaj'
import AdminFilmoviUredi from './pages/AdminFilmovi/FilmoviUredi'
import FilmoviPregled from './pages/Filmovi/FilmoviPregled'
import FilmoviDetalji from './pages/Filmovi/FilmoviDetalji'
import RecenzijePregled from './pages/Recenzije/RecenzijePregled'
import AdminRecenzijePregled from './pages/AdminRecenzije/RecenzijePregled'
import AdminGlumciPregled from './pages/AdminGlumci/GlumciPregled'
import AdminGlumciFilmovi from './pages/AdminGlumci/GlumciFilmDodaj'
import Pocetna from './pages/Pocetna'
import Login from './pages/Login'
import AdminKorisniciPregled from './pages/AdminPregledKorisnika'
import Registracija from './pages/Registracija'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-datepicker/dist/react-datepicker.css";
import NavBar from './components/NavBar'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorModal from "./components/ErrorModal"
import useAuth from "./hooks/useAuth"
import useError from "./hooks/useError"

function App() {
  const [count, setCount] = useState(0)
  const { isLoggedIn, isAdmin } = useAuth();
  const { errors, prikaziErrorModal, sakrijError } = useError();

  function godina(){
    const pocetna = 2024;
    const trenutna = new Date().getFullYear();
    if(pocetna===trenutna){
      return trenutna;
    }
    return pocetna + ' - ' + trenutna;
  }

  return (
    <>
      <LoadingSpinner />
      <Container>
        <NavBar/>
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna/>}/>
        </Routes>

        {isLoggedIn ? (
        <>
          <Routes>
          {isAdmin && (
                <>
                  <Route path={RouteNames.ADMIN_FILMOVI_PREGLED} element={<AdminFilmoviPregled />} />
                  <Route path={RouteNames.ADMIN_FILMOVI_NOVO} element={<AdminFilmoviDodaj />} />
                  <Route path={RouteNames.ADMIN_FILMOVI_UREDI} element={<AdminFilmoviUredi />} />
                  <Route path={RouteNames.ADMIN_RECENZIJE_PREGLED} element={<AdminRecenzijePregled />} />
                  <Route path={RouteNames.ADMIN_GLUMCI_PREGLED} element={<AdminGlumciPregled />} />
                  <Route path={RouteNames.ADMIN_GLUMCI_FILM} element={<AdminGlumciFilmovi />} />
                  <Route path={RouteNames.ADMIN_KORISNICI_PREGLED} element={<AdminKorisniciPregled />} />
                </>
              )}
            <Route path={RouteNames.FILMOVI_PREGLED} element={<FilmoviPregled/>}/>
            <Route path={RouteNames.RECENZIJE_PREGLED} element={<RecenzijePregled/>}/>
            <Route path={RouteNames.FILMOVI_DETALJI} element={<FilmoviDetalji/>}/>

          </Routes>
          </>
        ) : (
          <>
          <Routes>           
             <Route path={RouteNames.LOGIN} element={<Login />} />
             <Route path={RouteNames.REGISTRACIJA} element={<Registracija />} />
          </Routes>
          </>
        )}

      </Container>
      <Container>
        <hr />
        Klara Nađ &copy; {godina()}
      </Container>
    </>
  )
}

export default App