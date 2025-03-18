import React from 'react'
import { useAuth } from "../context/authContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ChangePassword = () => {
    const { user } = useAuth();
    const [password, setPassword] = useState("");
    const [passwordChange, setPasswordChange] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const uri = import.meta.env.VITE_API_URL
    const [showPassword, setShowPassword] = useState(false); 
    const [showPassword2, setShowPassword2] = useState(false);  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const togglePasswordVisibility2 = () => {
      setShowPassword2(!showPassword2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (password === passwordChange) {
            const response = await axios.post(
              `${uri}usuario/usuarioprivada/change`,
              {
                id: user.id,
                password,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (response.data.success) {
              e.target.reset();
              navigate("/login");
            }
          } else {
            Swal.fire({
              title: "Error",
              text: 'Las contraseña no son iguales',
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
            setError(error.response.data.error);
          } else {
            Swal.fire({
                        title: "Error",
                        text: 'Error de comunicación',
                        icon: "error"
                      });
          }
        } finally {
          e.target.reset();
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                        <div className="card-body p-5 text-center">
                            <h3 className="mb-3 text-info">Privadas Turquesa</h3>
                            <h3 className="mb-5">Cambiar Contraseña</h3>
                            <div data-mdb-input-init="" className="form-outline mb-4">
                              <label htmlFor="password">Nueva Contraseña</label>
                              <div className="input-group">
                                  <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingresa tu contraseña"
                                  />
                                  <div className="input-group-append">
                                    <button
                                      className="btn btn-outline-secondary"
                                      type="button"
                                      onClick={togglePasswordVisibility}
                                    >
                                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                  </div>
                              </div>
                              <label htmlFor="password2">Repetir Contraseña</label>
                              <div className="input-group">
                                  <input
                                    type={showPassword2 ? 'text' : 'password'}
                                    className="form-control"
                                    id="password2"
                                    value={passwordChange}
                                    onChange={(e) => setPasswordChange(e.target.value)}
                                    placeholder="Ingresa tu contraseña"
                                  />
                                  <div className="input-group-append">
                                    <button
                                      className="btn btn-outline-secondary"
                                      type="button"
                                      onClick={togglePasswordVisibility2}
                                    >
                                      {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                  </div>
                              </div>
                            </div>
                            <button
                            className="btn btn-primary btn-lg btn-block"
                            type="submit"
                            >
                                Aceptar
                            </button>
                            
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </form>
    )
}

export default ChangePassword