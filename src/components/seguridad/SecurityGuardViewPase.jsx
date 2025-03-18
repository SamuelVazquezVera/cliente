import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Form from 'react-bootstrap/Form';

const SecurityGuardViewPase = () => {

  const [pasefilter, setPaseFilter] = useState([]);
  const [pases, setPases] = useState([]);
  const [pasesLoading, setPasesLoading] = useState(false);
  const uri = import.meta.env.VITE_API_URL

  useEffect(() => {
    const pases = async () => {
      setPasesLoading(true);
      try {
        let now = new Date();
        let yearNow = now.getFullYear();
        let monthNow = now.getMonth();
        let dayNow = now.getDate();
        monthNow = monthNow + 1;
        const month = monthNow < 10 ? "0" + monthNow : monthNow;
        const day = dayNow < 10 ? "0" + dayNow : dayNow;
        let fecha = day + "/" + month + "/" + yearNow;
        const response = await axios.post(
          `${uri}pase/extraertodo`,
          {
            fecha: fecha,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const data = await response.data.pases.map((pase) => ({
            _id: pase._id,
            nombreSolicitante: pase.datoSolicitante,
            casa: pase.casa,
            privada: pase.nombrePrivada,
            elaboro: pase.userSolicitante,
            esMoroso: pase.esMoroso,
            moroso: pase.esMoroso ? "Si" : "No",
            movimiento: pase.tipoMovimiento,
          }));
          setPases(data);
          setPaseFilter(data);
        }
      } catch (error) {
        Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error"
                  });
      } finally {
        setPasesLoading(false);
      }
    };
    pases();
  }, []);
  const filtrarPases = (e) => {
    const filterPases = pases.filter((p) =>
      p.privada.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPaseFilter(filterPases);
  };

  return (
    <>
      {
        pasesLoading ?
        (
          <div>Cargando ...</div>
        ) :
        (
          <div className="p-5 max-3-3xl mx-auto mt-10 P-8 rounded-md shadow-md vh-100">
            <div className="flex justify-between items-center">
              <Form>
                <input type="text" 
                    name="name" 
                    placeholder="Buscar por privada" 
                    autoComplete="off" 
                    className="me-3"
                    style={{                               
                        padding: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "15px", 
                        outline: "none",
                      }}
                      onChange={filtrarPases}
                    />
              </Form>
              <div className="container mt-4">
                <div className="row">
                  {
                    pasefilter.map(
                      (pase) => (
                        <div className="col-md-4 mb-4" key={pase._id}>
                          <div className="card">
                            <div className="card-body"> 
                              <h5 className="card-title"><b className="text-primary">Solicitante:</b> {pase.nombreSolicitante}</h5>
                              <p className="card-text"><b className="text-primary">Casa:</b> {pase.casa}</p>
                              <p className="card-text"><b className="text-primary">Privada:</b> {pase.privada}</p>
                              <p className="card-text"><b className="text-primary">Elaboró:</b> {pase.elaboro}</p>
                              <p className="card-text"><b className="text-primary">Movimiento:</b> {pase.movimiento}</p>
                              <p className="card-text"><b className="text-primary">Moroso:</b> <b className={`${
                                pase.esMoroso ? "text-danger" : "text-dark"
                                }`}> {pase.moroso}</b>
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  }
                </div>                    
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default SecurityGuardViewPase