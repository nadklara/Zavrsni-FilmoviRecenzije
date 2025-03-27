import { useEffect, useState } from "react";
import GlumciService from "../../services/GlumciService"; 
import { Button, Table, Form } from "react-bootstrap";
import useLoading from "../../hooks/useLoading"; 
import useError from "../../hooks/useError"; 

export default function Glumci() {
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    const [glumci, setGlumci] = useState([]);
    const [novaGlumac, setNovaGlumac] = useState({
        ime: "",
        prezime: "",
        godinaRodenja: "",
    });
    const [editingGlumac, setEditingGlumac] = useState(null);
    const [editGlumac, setEditGlumac] = useState({
        ime: "",
        prezime: "",
        godinaRodenja: "",
    });

    async function dohvatiGlumce() {
        showLoading();
        const odgovor = await GlumciService.get();
        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            hideLoading();
            return;
        }
        setGlumci(odgovor.poruka);
        hideLoading();
    }

    useEffect(() => {
        dohvatiGlumce();
    }, []);

    const handleAddGlumac = async () => {
        if (!novaGlumac.ime.trim() || !novaGlumac.prezime.trim() || !novaGlumac.godinaRodenja.trim()) {
            prikaziError("Sva polja moraju biti popunjena!");
            return;
        }

        const novaGlumacData = { ...novaGlumac };
        showLoading();
        const odgovor = await GlumciService.dodaj(novaGlumacData);
        hideLoading();

        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }

        setNovaGlumac({
            ime: "",
            prezime: "",
            godinaRodenja: "",
        }); 
        dohvatiGlumce();
    };

    const handleEditGlumac = async () => {
        if (!editGlumac.ime.trim() || !editGlumac.prezime.trim() || !editGlumac.godinaRodenja.trim()) {
            prikaziError("Sva polja moraju biti popunjena!");
            return;
        }

        const updatedGlumac = { sifra: editingGlumac, ...editGlumac };
        showLoading();
        const odgovor = await GlumciService.promjena(updatedGlumac.sifra, updatedGlumac);
        hideLoading();

        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }

        setEditingGlumac(null);
        setEditGlumac({
            ime: "",
            prezime: "",
            godinaRodenja: "",
        });
        dohvatiGlumce();
    };

    const handleDeleteGlumac = async (sifra) => {
        if (!window.confirm("Sigurno obrisati ovog glumca?")) return;

        showLoading();
        const odgovor = await GlumciService.brisanje(sifra);
        hideLoading();

        if (odgovor.greska) {
            prikaziError(odgovor.poruka);
            return;
        }

        dohvatiGlumce();
    };

    return (
        <div>
            <h2>Pregled i upravljanje glumcima</h2>

            <Form.Group className="mt-4">
                <Form.Label>Dodaj novog glumca</Form.Label>
                <Form.Control
                    type="text"
                    value={novaGlumac.ime}
                    onChange={(e) => setNovaGlumac({ ...novaGlumac, ime: e.target.value })}
                    placeholder="Unesite ime glumca"
                />
                <Form.Control
                    type="text"
                    value={novaGlumac.prezime}
                    onChange={(e) => setNovaGlumac({ ...novaGlumac, prezime: e.target.value })}
                    placeholder="Unesite prezime glumca"
                    className="mt-2"
                />
                <Form.Control
                    type="number"
                    value={novaGlumac.godinaRodenja}
                    onChange={(e) => setNovaGlumac({ ...novaGlumac, godinaRodenja: e.target.value })}
                    placeholder="Unesite godinu rođenja"
                    className="mt-2"
                />
                <Button variant="primary" onClick={handleAddGlumac} className="mt-2">
                    Dodaj Glumca
                </Button>
            </Form.Group>

            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr>
                        <th>Ime Glumca</th>
                        <th>Prezime Glumca</th>
                        <th>Godina Rođenja</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {glumci && glumci.map((glumac, index) => (
                        <tr key={index}>
                            <td>
                                {editingGlumac === glumac.sifra ? (
                                    <Form.Control
                                        type="text"
                                        value={editGlumac.ime}
                                        onChange={(e) => setEditGlumac({ ...editGlumac, ime: e.target.value })}
                                    />
                                ) : (
                                    glumac.ime
                                )}
                            </td>
                            <td>
                                {editingGlumac === glumac.sifra ? (
                                    <Form.Control
                                        type="text"
                                        value={editGlumac.prezime}
                                        onChange={(e) => setEditGlumac({ ...editGlumac, prezime: e.target.value })}
                                    />
                                ) : (
                                    glumac.prezime
                                )}
                            </td>
                            <td>
                                {editingGlumac === glumac.sifra ? (
                                    <Form.Control
                                        type="number"
                                        value={editGlumac.godinaRodenja}
                                        onChange={(e) => setEditGlumac({ ...editGlumac, godinaRodenja: e.target.value })}
                                    />
                                ) : (
                                    glumac.godinaRodenja
                                )}
                            </td>
                            <td>
                                {editingGlumac === glumac.sifra ? (
                                    <>
                                        <Button variant="success" onClick={handleEditGlumac}>Spremi</Button>
                                        <Button variant="secondary" onClick={() => setEditingGlumac(null)} className="ml-2">Odustani</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="primary" onClick={() => { setEditingGlumac(glumac.sifra); setEditGlumac({ ime: glumac.ime, prezime: glumac.prezime, godinaRodenja: glumac.godinaRodenja }); }}>
                                            Uredi
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteGlumac(glumac.sifra)} className="ml-2">
                                            Ukloni
                                        </Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
