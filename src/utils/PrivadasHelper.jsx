import axios from "axios";
import Swal from 'sweetalert2'

const uri = import.meta.env.VITE_API_URL
export const Privadas = async () => {
  let privadas;
  try {
    const response = await axios.get(
      `${uri}privada/privadas`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      privadas = response.data.privadas;
    }
  } catch (error) {
     Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
              });
  }
  return privadas;
};
export const PrivadasSeguridad = async () => {
  let privadas;
  try {
    const response = await axios.get(
      `${uri}privada/privadaseguridad`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      privadas = response.data.privadas;
    }
  } catch (error) {
     Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error"
              });
  }
  return privadas;
};
