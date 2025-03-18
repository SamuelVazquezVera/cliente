import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Privadas } from "../../utils/PrivadasHelper";
import axios from "axios";
import Swal from 'sweetalert2'

const SuperAdminCreate = () => {
    const [privadas, setPrivadas] = useState([]);
  const [privada, setPrivada] = useState("");
  const [casa, setCasa] = useState(0);
  const [nombrePrivada, setNombrePrivada] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [role, setRole] = useState("");
  const uri = import.meta.env.VITE_API_URL

  let nomUsuario;

  useEffect(() => {
    const getPrivadas = async () => {
      const priv = await Privadas();
      setPrivadas(priv);
    };
    getPrivadas();
  }, []);

  const navigate = useNavigate();

  const returnToView = (url) => {
    navigate(url);
  };

  const handlePrivadaChange = (e) => {
    let index = e.target.selectedIndex;
    nomUsuario = e.target.options[index].text + casa;
    setNombrePrivada(e.target.options[index].text);
    setPrivada(e.target.value);
    setNombreUsuario(nomUsuario);
  };
  const handleCasaChange = (e) => {
    nomUsuario = nombrePrivada + e.target.value;
    setCasa(e.target.value);
    setNombreUsuario(nomUsuario);
  };
  const handleRolechange = (e) => {
    setRole(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let objAgregar = {
        idPrivada: privada,
        casa: casa,
        role: role,
        nombreusuario: nombreUsuario,
        esMoroso: false,
      };
      const response = await axios.post(
        `${uri}usuario/addusuarioprivada`,
        objAgregar,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        returnToView("/admin-general");
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
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: "#5A6978" }}>
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Agregar Nuevo Usuario</h3>
        <form onSubmit={handleSubmit}> 
          <div className="mb-3">
            <label htmlFor="opcion" className="form-label">
            Selecciona la privada:
            </label>
            <select className="form-select"
             id="opcion"
             onChange={handlePrivadaChange}
             required
             >
              <option value="">Selecciona una privada</option>
                {privadas.map((privada) => (
                <option key={privada.idprivada} value={privada.idprivada}>
                    {privada.nombre}
                </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="casa" className="form-label">
              Casa:
            </label>
            <input
              type="number"
              className="form-control"
              id="casa"
              onChange={handleCasaChange}
              placeholder=""
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder=" "
              required=""
              disabled
              value={nombreUsuario}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="users" className="form-label">
            Selecciona el tipo de usuario:
            </label>
            <select className="form-select"
             id="users"
             required
             onChange={handleRolechange}
             >
              <option key="" value="">
                Seleccione el tipo de usuario
                </option>
                <option key="admin" value="admin">
                admin
                </option>
                <option key="seguridad" value="seguridad">
                seguridad
              </option>
            </select>
          </div>          

          {/* Botón de envío */}
          <button type="submit" className="btn btn-primary me-3">
            Enviar
          </button>
          <button className="btn btn-danger"
          type="button"
          onClick={() => returnToView("/admin-general")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );    
};

export default SuperAdminCreate