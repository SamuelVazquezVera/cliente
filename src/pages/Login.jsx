import React, { useState }  from 'react'
import axios from 'axios'
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const uri = import.meta.env.VITE_API_URL
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(
                `${uri}auth/login`,
                {
                  nombre,
                  password,
                }
              )
              if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                e.target.reset();
                if (response.data.user.role === "superadmin") {
                  navigate("/admin-general");
                } else if (response.data.user.role === "admin") {
                  if (response.data.user.primeraVez) {
                    navigate("/admin/cambiar");
                  } else {
                    navigate("/admin");
                  }
                } else if (response.data.user.role === "residente") {
                  if (response.data.user.primeraVez) {
                    navigate("/residente/cambiar");
                  } else {
                    navigate("/residente");
                  }
                } else if (response.data.user.role === "seguridad") {
                  if (response.data.user.primeraVez) {
                    navigate("/seguridad/cambiar");
                  } else {
                    navigate("/seguridad");
                  }
                } else {
                  navigate("/error");
                }
              }
        } catch (error) {
            e.target.reset();
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Error de comunicación");
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                        <div className="card-body p-5 text-center">
                            <h3 className="mb-3 text-info">Privadas Turquesa</h3>
                            <h3 className="mb-5">Login</h3>
                            <div data-mdb-input-init="" className="form-outline mb-4">
                            <label className="form-label" htmlFor="usuario">
                                Usuario
                            </label>
                            <input
                                type="text"
                                id="usuario"
                                className="form-control form-control-lg"
                                autoComplete='off'
                                placeholder='Ingresa tu usuario'
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                            
                            </div>
                            <label htmlFor="password">Contraseña</label>
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
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-center"> 
                          <button
                              className="btn btn-outline-primary"
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

export default Login