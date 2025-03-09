import { Navigate, Route, Routes } from "react-router"
import { App } from "../App"
import { LoginPage } from "../auth";

export const AppRouter = () => {

  const authStatus = 'authenticated';

  return (
    <Routes>
      {
        authStatus === 'not-authenticated'
        ? <Route path="/auth/*" element={<LoginPage />} />
        : <Route path="/*" element={<App />} />
     }
      <Route path="/*" element={ <Navigate to="/auth/login" replace /> } />

    </Routes>
  )
}
