import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const SecurityGuardUpdate = () => {

  const { id } = useParams();
  const [visitasLoading, setVisitasLoading] = useState(false);
  const [nombreVisita, setNombreVisita] = useState("");
  const [ficha, setFicha] = useState("");
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [hora, setHora] = useState("");
  const [casa, setCasa] = useState(0);
  const [nombrePrivada, setNombrePrivada] = useState("");
  const [motivo, setMotivo] = useState("");
   
  const uri = import.meta.env.VITE_API_URL

  const navigate = useNavigate();

  const returnToView = (url) => {
    navigate(url);
  };
  const handleNombreVisita = (e) => {
    setNombreVisita(e.target.value);
  };
  const handleFicha = (e) => {
    setFicha(e.target.value);
  };
  const handlePlaca = (e) => {
    setPlaca(e.target.value);
  };
  const handleMarca = (e) => {
    setMarca(e.target.value);
  };
  const handleColor = (e) => {
    setColor(e.target.value);
  };
  const handleHora = (e) => {
    setHora(e.target.value);
  };
  const handleMotivo = (e) => {
    setMotivo(e.target.value)
  }

  useEffect(() => {
    const visitas = async () => {
      setVisitasLoading(true);
      try {
        const response = await axios.get(
          `${uri}visitante/getvisitante/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const data = await response.data.visitante;
          setNombreVisita(data.nombreVisita);
          setNombrePrivada(data.nombrePrivada);
          setCasa(data.casa);
          setMotivo(data.motivo);
          setFicha(data.ficha);
          setPlaca(data.placa);
          setMarca(data.marca);
          setColor(data.color);
          setHora(data.hora);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setVisitasLoading(false);
      }
    };
    visitas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const objModify = {
        id: id,
        privada: nombrePrivada,
        nombreVisita: nombreVisita,
        casa: casa,
        motivo: motivo,
        placa: placa,
        marca: marca,
        color: color,
        hora: hora,
        ficha: ficha,
        esGeneral: casa > 0 ? false : true
      };

      const response = await axios.post(
        `${uri}visitante/modifyvisitante`,
        objModify,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        returnToView("/seguridad");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        Swal.fire({
                    title: "Error",
                    text: error.response.data.error,
                    icon: "error"
                  });
      } else {
        Swal.fire({
                  title: "Error",
                  text: error.message,
                  icon: "error"
                });
      }
    }
  };

  return (
    <>
      {
        visitasLoading ?
        (
          <div>Cargando ...</div>
        ) :
        (
          <div className="container mt-5">
            <form className="p-4 border rounded bg-light">
              <div className="row">
                <div className="col-md-1">

                </div>
                {/* Primera columna */}
                <div className="col-md-3">
                  <div className="mb-3">
                    <label htmlFor="inputNombre"><b>Nombre</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder=" "
                        required
                        onChange={handleNombreVisita}
                        autoComplete="off"
                        value={nombreVisita}
                      />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="direccion"><b>Dirección</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        placeholder=" "
                        required
                        disabled
                        value={nombrePrivada}
                        autoComplete="off"
                        readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="casa"><b>Casa</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="casa"
                        placeholder=" "
                        required
                        disabled
                        value={casa}
                        autoComplete="off"
                        readOnly
                    />
                  </div>
                </div>
                {/* Segunda columna */}
                <div className="col-md-3">
                  <div className="mb-3">
                    <label htmlFor="motivo"><b>Motivo</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="motivo"
                        placeholder=" "
                        required
                        onChange={handleMotivo}
                        autoComplete="off"
                        value={motivo}
                      />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ficha"><b>Ficha</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="ficha"
                        placeholder=" "
                        onChange={handleFicha}
                        autoComplete="off"
                        value={ficha}
                      />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="placa"><b>Placa</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="placa"
                        placeholder=" "
                        onChange={handlePlaca}
                        autoComplete="off"
                        value={placa}
                      />
                  </div>
                </div>
                {/* Tercera columna */}
                <div className="col-md-3">
                  <div className="mb-3">
                    <label htmlFor="marca"><b>Marca</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="marca"
                        placeholder=" "
                        required
                        onChange={handleMarca}
                        autoComplete="off"
                        value={marca}
                      />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="color"><b>Color</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="color"
                        placeholder=" "
                        required
                        onChange={handleColor}
                        autoComplete="off"
                        value={color}
                      />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="hora"><b>Hora</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="hora"
                        placeholder=" "
                        required
                        onChange={handleHora}
                        autoComplete="off"
                        value={hora}
                      />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary me-2"
                  type="button"
                  onClick={handleSubmit}
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  className="btn btn-danger me-2"
                  onClick={() => returnToView("/seguridad")}
                >
                  Cancelar
                </button>                
              </div>              
            </form>
          </div>
        )
      }
    </>
  )
}

export default SecurityGuardUpdate