import React, { useEffect, useState } from "react";
import axios from "axios";
import { SeguridadButtons } from "../../utils/UsuarioHelper";
import Swal from "sweetalert2";
import Form from 'react-bootstrap/Form';

const SecurityGuardViewRegister = () => {

  const [visitafilter, setVisitaFilter] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [visitasLoading, setVisitasLoading] = useState(false);
  const uri = import.meta.env.VITE_API_URL

  useEffect(() => {
    const visitas = async () => {
    setVisitasLoading(true);
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
        `${uri}visitante/getvisitantes`,
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
        const data = await response.data.visitantes.map((visita) => ({
          id: visita._id,
          nombre: visita.nombreVisita,
          direccion: visita.nombrePrivada,
          casa: visita.esGeneral ? "General" : visita.casa,
          motivo: visita.motivo,
          ficha: visita.ficha,
          placa: visita.placa,
          marca: visita.marca,
          color: visita.color,
          hora: visita.hora,
          privadaVisitante: visita.nombrePrivada + " " + (visita.esGeneral ? "General" : visita.casa)
        }));
        setVisitas(data);
        setVisitaFilter(data);
      }
    } catch (error) {
      Swal.fire({
                      title: "Error",
                      text: error.message,
                      icon: "error"
                    });
    } finally {
      setVisitasLoading(false);
    }
  };
    visitas();
  }, []);

  const filtrarVisitas = (e) => {
    const filterVisitas = visitas.filter((v) =>
      v.privadaVisitante.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setVisitaFilter(filterVisitas);
  };

  const filtrarVisitasNombre = (e) => {
    const filterVisitas = visitas.filter((v) =>
      v.nombre.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setVisitaFilter(filterVisitas);
  };

  return (
    <>
      {
        visitasLoading ?
        (
          <div>Cargando ...</div>          
        ) :
        (
          <div className="p-5 max-3-3xl mx-auto mt-10 P-8 rounded-md shadow-md vh-100" >
            <div className="flex justify-between items-center">
              <Form>
                  <input type="text" 
                  name="name" 
                  placeholder="Buscar por dirección" 
                  autoComplete="off" 
                  className="me-3"
                  style={{                               
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "15px", 
                      outline: "none",
                    }}
                    onChange={filtrarVisitas}
                  />
                  <input type="text" 
                  name="name" 
                  placeholder="Buscar por nombre" 
                  autoComplete="off" 
                  className="mt-2"
                  style={{                               
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "15px", 
                      outline: "none",
                    }}
                    onChange={filtrarVisitasNombre}
                  />
              </Form>
            </div>
            <div className="container mt-4">
              <div className="row">
                {
                  visitafilter.map(
                    (visita) => (
                      <div className="col-md-4 mb-4" key={visita.id} >
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title"><b className="text-primary">Nombre:</b> {visita.nombre}</h5>
                            <p className="card-text"><b className="text-primary">Dirección:</b> {visita.direccion}</p>  
                            <p className="card-text"><b className="text-primary">Casa:</b> {visita.casa}</p>
                            <p className="card-text"><b className="text-primary">Motivo:</b> {visita.motivo}</p>
                            <p className="card-text"><b className="text-primary">Ficha:</b> {visita.ficha}</p>
                            <p className="card-text"><b className="text-primary">Placa:</b> {visita.placa}</p>
                            <p className="card-text"><b className="text-primary">Marca:</b> {visita.marca}</p> 
                            <p className="card-text"><b className="text-primary">Color:</b> {visita.color}</p> 
                            <p className="card-text"><b className="text-primary">Hora:</b> {visita.hora}</p>  
                            <SeguridadButtons _id={visita.id} />
                          </div>

                        </div>
                      </div>
                    )
                  )
                }                    
              </div>
            </div>
            
          </div>
        )
      }
    </>
  )
}

export default SecurityGuardViewRegister