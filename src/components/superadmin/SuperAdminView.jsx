import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { UsuarioButtons } from "../../utils/UsuarioHelper";
import Swal from 'sweetalert2'

const SuperAdminView = () => {
    const [userfiler, setUserFilter] = useState([]);
    const [users, setUsers] = useState([]);
    const [userLoading, setUserLoading] = useState(false);
    const uri = import.meta.env.VITE_API_URL

    useEffect(() => {
        const usuarios = async () => {
          setUserLoading(true);
          try {
            const response = await axios.get(
              `${uri}usuario/usuariosprivadas`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (response.data.success) {
              const data = await response.data.usuarios.map((user) => ({
                _id: user._id,
                nombre: user.nombre,
                casa: user.casa,
                privada: user.usuarioPrivada.nombre,
                role: user.role,
              }));
              setUsers(data);
              setUserFilter(data);
            }
          } catch (error) {
            Swal.fire({
                        title: "Error",
                        text: error.message,
                        icon: "error"
                      });
          } finally {
            setUserLoading(false);
          }
        };
        usuarios();
      }, []);

      const filtrarUsuarios = (e) => {
        const filterUser = users.filter((u) =>
          u.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setUserFilter(filterUser);
      };

  return (
    <>
        {
            userLoading ?
            (
                <div>Cargando ...</div>
            ) :
            (
                <div className="p-5 max-3-3xl mx-auto mt-10 P-8 rounded-md shadow-md vh-100" >
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white">
                            Usuarios Administradores Privadas
                        </h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <Form>
                            <input type="text" 
                            name="name" 
                            placeholder="Buscar por nombre" 
                            autoComplete="off" 
                            style={{                               
                                padding: "5px",
                                border: "1px solid #ccc",
                                borderRadius: "15px", 
                                outline: "none",
                              }}
                              onChange={filtrarUsuarios}
                            />
                        </Form>
                    </div>
                    <div className="container mt-4">
                        <div className="row">
                            {userfiler.map((user) => (
                            <div className="col-md-4 mb-4" key={user._id}>
                                <div className="card">
                                    <div className="card-body ">
                                        <h5 className="card-title"><b className="text-primary">Nombre:</b> {user.nombre}</h5>
                                        <p className="card-text"><b className="text-primary">Casa:</b> {user.casa}</p>    
                                        <p className="card-text"><b className="text-primary">Privada:</b> {user.privada}</p> 
                                        <p className="card-text"><b className="text-primary">Tipo de usuario:</b> {user.role}</p>   
                                        <UsuarioButtons _id={user._id} />                                  
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default SuperAdminView