import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker"

const AdminPaseCreate = () => {

    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [moroso, setMoroso] = useState("");
    const [solicitante, setSolicitante] = useState("");
    const [casa, setCasa] = useState(0);
    const [movimiento, setMovimiento] = useState("");
    const uri = import.meta.env.VITE_API_URL

    const navigate = useNavigate();
    const returnToView = (url) => {
        navigate(url);
    };
    const handleCasaChange = (e) => {
        setCasa(e.target.value);
    };
    const handleSolicitanteChange = (e) => {
        setSolicitante(e.target.value);
    };
    const handleMovimientoChange = (e) => {
        setMovimiento(e.target.value);
    };
    const handleMorosochange = (e) => {
        setMoroso(e.target.value);
    };
    const handleSubmit = async (e) => {
        try {
            let fechaValido = selectedDate
            let now = new Date();
            let yearValido = fechaValido.getFullYear();
            let monthValido = fechaValido.getMonth();
            let dayValido = fechaValido.getDate();

            let yearNow = now.getFullYear();
            let monthNow = now.getMonth();
            let dayNow = now.getDate();

            if (
                yearValido >= yearNow &&
                monthValido >= monthNow &&
                dayValido >= dayNow
              ){
                monthValido = monthValido + 1;
                const month = monthValido < 10 ? "0" + monthValido : monthValido;
                const day = dayValido < 10 ? "0" + dayValido : dayValido;
                let fechaV = day + "/" + month + "/" + yearValido;
                let objAgregarPase = {
                    fecha: fechaV,
                    privada: user.privada,
                    solicitante: solicitante,
                    casa: casa,
                    movimiento: movimiento,
                    elabora: user.nombre,
                    esMoroso: moroso === "si" ? true : false,
                };
                const response = await axios.post(
                  `${uri}pase/addpase`,
                  objAgregarPase,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                if (response.data.success) {
                    returnToView("/admin")
                }           
            }else {
                Swal.fire({
                    title: "Error",
                    text: "No se pueden crear Pases de accesos con fechas pasadas",
                    icon: "error"
                });
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
    }

  return (
    <div className="container mt-5">
        <h3 className="text-center mb-4">Agregar Nuevo Pase</h3>
        <form  className="p-4 border rounded bg-light">
            <div  className="row">
                <div className="col-md-1"></div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label htmlFor="privada" className="form-label">
                            <b>Privada</b>
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="privada"
                        placeholder=""
                        required
                        disabled
                        value={user.privada}
                        readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="datospropietario" className="form-label">
                            <b>Propietario o Administrador</b>
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="datospropietario"
                        placeholder=""
                        required
                        autoComplete="off"
                        onChange={handleSolicitanteChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="casa" className="form-label">
                            <b>Casa</b>
                        </label>
                        <input
                        type="number"
                        className="form-control"
                        id="casa"
                        placeholder=""
                        required
                        autoComplete="off"
                        onChange={handleCasaChange}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="mb-3">
                        <label htmlFor="movimiento" className="form-label">
                            <b>Tipo de Movimiento</b>
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="movimiento"
                        placeholder=""
                        required
                        autoComplete="off"
                        onChange={handleMovimientoChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="roles" className="form-label">
                            <b>¿Es Moroso?</b>
                        </label>
                        <select className="form-select"
                        id="roles"
                        required
                        onChange={handleMorosochange}
                        >
                            <option key="" value="">
                                Seleccione si es moroso
                            </option>
                            <option key="si" value="si">
                                Sí
                            </option>
                            <option key="no" value="no">
                                No
                            </option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quienlocrea" className="form-label">
                            <b>Nombre de quien lo crea</b>
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="quienlocrea"
                        placeholder=""
                        required
                        disabled
                        value={user.nombre}
                        readOnly
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mb-3">
                        <label htmlFor="datepicker" className="form-label">
                            <b> Fecha</b>
                        </label>
                        <DatePicker
                            id="datepicker"
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona una fecha"
                            autoComplete="off"
                            minDate={new Date()}
                        />
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button type="button" onClick={handleSubmit} className="btn btn-primary me-3">
                    Enviar
                </button>
                <button className="btn btn-danger"
                type="button"
                onClick={() => returnToView("/admin")}
                >
                    Cancelar
                </button>
            </div>
        </form>
    </div>
  )
}

export default AdminPaseCreate