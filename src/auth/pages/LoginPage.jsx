
import './LoginPage.css';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';

export const LoginPage = () => {

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerRepeatPassword, setRegisterRepeatPassword] = useState("");

    const { handleLogin, handleRegister, email, setEmail, password, setPassword, loading, error, name, setName, errorRegister, registerLoading, setRegisterError } = useContext(AuthContext);

    const onSubmitLogin = (event) => {
        handleLogin(event);
    }

    const onSubmitRegister = (e) => {
      if (registerPassword !== registerRepeatPassword) {
          setRegisterError("Las contraseñas no coinciden");
          return;
      }
    
      const userData = { name: registerName, email: registerEmail, password: registerPassword };
  
      handleRegister(e, userData); // Llama a la función para registrar usuario
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                                onClick={ onSubmitLogin }
                                disabled={loading}
                            />
                        </div>
                    </form>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={registerName}
                                onChange={(e) => setRegisterName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                value={registerRepeatPassword}
                                onChange={(e) => setRegisterRepeatPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" 
                                onClick={ onSubmitRegister }
                                />
                        </div>
                    </form>
                    {errorRegister && <p style={{ color: "red" }}>{errorRegister}</p>}
                </div>
            </div>
        </div>
    )
}