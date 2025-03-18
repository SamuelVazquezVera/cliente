import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PrivadasSeguridad } from "../../utils/PrivadasHelper";
import axios from "axios";
import Swal from "sweetalert2";

const SecurityGuardCreate = () => {

  const [privadas, setPrivadas] = useState([]);
  const [casa, setCasa] = useState("");
  const [nombrePrivada, setNombrePrivada] = useState("");
  const [nombreVisita, setNombreVisita] = useState("");
  const [motivo, setMotivo] = useState("");
  const [ficha, setFicha] = useState("");
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [hora, setHora] = useState("");
  const uri = import.meta.env.VITE_API_URL
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  

  useEffect(() => {
    const getPrivadas = async () => {
      const priv = await PrivadasSeguridad();
      setPrivadas(priv);
    };
    getPrivadas();
  }, []);

  const navigate = useNavigate();

  const returnToView = (url) => {
    navigate(url);
  };
  const handleNombreVisita = (e) => {
    setNombreVisita(e.target.value);
  };
  const handleNombrePrivada = (e) => {
    let index = e.target.selectedIndex;
    setNombrePrivada(e.target.options[index].text);
  };
  const handleCasaChange = (e) => {
    setCasa(e.target.value);
  };
  const handleMotivo = (e) => {
    setMotivo(e.target.value);
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
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if(event.target.checked) {
      setCasa(0)
      setIsDisabled(true)
    }
    else {
      setCasa("")
      setIsDisabled(false)
    }
  }
  const handleSubmit = async (e) => {
    try {
      let now = new Date();
      let yearNow = now.getFullYear();
      let monthNow = now.getMonth();
      let dayNow = now.getDate();

      monthNow = monthNow + 1;
      const month = monthNow < 10 ? "0" + monthNow : monthNow;
      const day = dayNow < 10 ? "0" + dayNow : dayNow;
      let fechaV = day + "/" + month + "/" + yearNow;
      let objAgregarVisitante = {
        fecha: fechaV,
        privada: nombrePrivada,
        nombreVisita: nombreVisita,
        casa: casa,
        motivo: motivo,
        placa: placa,
        marca: marca,
        color: color,
        hora: hora,
        ficha: ficha,
        esGeneral: isDisabled
      };
      const response = await axios.post(
        `${uri}visitante/addvisitante`,
        objAgregarVisitante,
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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Agregar Nueva Visita</h2>
      <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-1">

          </div>
          {/* Primera columna */}
          <div className="col-md-3">
            <div className="mb-3">            
              <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Nombre de la visita"
                  required=""
                  onChange={handleNombreVisita}
                  autoComplete="off"
                />
            </div>
            <div className="mb-3">            
              <select className="form-select"
                id="opcion"
                onChange={handleNombrePrivada}
                required
              >
              <option value="">Dirección</option>
                {privadas.map((privada) => (
                  <option key={privada.idprivada} value={privada.idprivada}>
                    {privada.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">            
              <input
                type="number"
                className="form-control"
                id="casa"
                onChange={handleCasaChange}
                placeholder="Casa"
                value={casa}
                required
                autoComplete="off"
                disabled = {isDisabled}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="exampleCheckbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="exampleCheckbox">
                <b>En General</b>
              </label>
            </div>
          </div>
          {/* Segunda columna */}
          <div className="col-md-3">
            <div className="mb-3">            
                <input
                  type="text"
                  className="form-control"
                  id="motivo"
                  placeholder="Motivo"
                  onChange={handleMotivo}
                  autoComplete="off"
                /> 
            </div>
            <div className="mb-3">            
                <input
                  type="text"
                  className="form-control"
                  id="ficha"
                  placeholder="Ficha"
                  onChange={handleFicha}
                  autoComplete="off"
                />
            </div>
            <div className="mb-3">            
                <input
                  type="text"
                  className="form-control"
                  id="placa"
                  placeholder="Placa"
                  onChange={handlePlaca}
                  autoComplete="off"
                />
            </div>
          </div>
          {/* Tercera columna */}
          <div className="col-md-3">
            <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="marca"
                  placeholder="Marca"
                  onChange={handleMarca}
                  autoComplete="off"
                />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="color"
                placeholder="Color"
                onChange={handleColor}
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="hora"
                placeholder="Hora"
                onChange={handleHora}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary me-3 ">
            Enviar
          </button>
        </div>
      </form>
  </div>
  );
}

export default SecurityGuardCreate