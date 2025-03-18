import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./pages/Login";
import SuperAdmin from "./pages/SuperAdmin";
import PrivateRoute from "./utils/PrivateRoute";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import SuperAdminCreate from "./components/superadmin/SuperAdminCreate";
import SuperAdminView from "./components/superadmin/SuperAdminView";
import Seguridad from "./pages/Seguridad";
import SecurityGuardViewPase from "./components/seguridad/SecurityGuardViewPase";
import SecurityGuardCreate from "./components/seguridad/SecurityGuardCreate";
import SecurityGuardViewRegister from "./components/seguridad/SecurityGuardViewRegister";
import SecurityGuardUpdate from "./components/seguridad/SecurityGuardUpdate";
import ChangePassword from "./pages/ChangePassword"
import Admin from './pages/Admin'
import AdminPaseView from "./components/admin/AdminPaseView";
import AdminPaseCreate from './components/admin/AdminPaseCreate'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-general" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-general"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["superadmin"]}>
                <SuperAdmin />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
        <Route index element={<SuperAdminView />}></Route>
          <Route
            path="/admin-general/alta"
            element={<SuperAdminCreate />}
          >            
          </Route>
        </Route>
        <Route
          path="/seguridad"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["seguridad"]}>
                <Seguridad />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
          <Route index element={<SecurityGuardCreate />}></Route>
          <Route path="/seguridad/cambiar" element={<ChangePassword />}></Route>
          <Route
            path="/seguridad/verpase"
            element={<SecurityGuardViewPase />}
          ></Route>
          <Route
            path="/seguridad/verregistro"
            element={<SecurityGuardViewRegister />}
          ></Route>
          <Route
            path="/seguridad/modificar/:id"
            element={<SecurityGuardUpdate />}
          ></Route>
        </Route>
        <Route
         path="/admin"
         element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <Admin />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
          <Route index element = {<AdminPaseView />}></Route>
          <Route path="/admin/cambiar" element={<ChangePassword />}></Route>
          <Route path="/admin/altapase" element={<AdminPaseCreate />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>  
  )
}

export default App
