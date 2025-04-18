
import './LoginPage.css';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPhone: '',
    registerPassword: ''
}

export const LoginPage = () => {

    const [showRegister, setShowRegister] = useState(false);
    const [haveAcode, setHaveAcode] = useState(false);


    const { loading, error, loadingGenerateCode, loadingRegisterCode, isRegisterCodeSent, isLoginCodeSent } = useContext(AuthContext);

    const { loginEmail, loginPassword, onInputChange: onLoginImputChange } = useForm(loginFormFields);
    const { registerName, registerEmail, registerPhone, registerPassword, onInputChange: onRegisterImputChange } = useForm(registerFormFields);

    const { startLogin, handleGenerateToken, startRegister, handleGenerateTokenRegister } = useAuth();

    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        console.log({ registerName, registerEmail, registerPhone, registerPassword });
        startRegister({ name: registerName, email: registerEmail, phone: registerPhone, password: registerPassword });
    }

    useEffect(() => {
        if (error) {
            Swal.fire('Error en la autenticación', error, 'error');
        }
    }, [error]);

    const generateToken = () => {
        handleGenerateToken(loginEmail);
    }

    const generateTokenRegister = () => {
        handleGenerateTokenRegister(registerEmail);
    }

    const handleHaveAcode = () => {
        setHaveAcode(!haveAcode);
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                {/* Login */}
                <div className="col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="text-center mb-3">🔑 Ingreso</h5>
                            <form>
                                <div className="mb-2">
                                    <input
                                        type="email"
                                        className="form-control form-control-sm"
                                        placeholder="Correo"
                                        name="loginEmail"
                                        onChange={onLoginImputChange}
                                        value={loginEmail}
                                        required
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    {/* Botón de "Enviar código" antes de recibir el código */}
                                    {!isLoginCodeSent && !haveAcode && (
                                        <button className="btn btn-primary btn-sm" onClick={generateToken} disabled={loadingGenerateCode}>
                                            {loadingGenerateCode ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span> Generando...
                                                </>
                                            ) : "Enviar código"}
                                        </button>
                                    )}

                                    {/* Botón de "Login" solo si el código ya fue enviado */}
                                    {(isLoginCodeSent || haveAcode) && (
                                        <>
                                            <div className="mb-2 position-relative">
                                                <input
                                                    type={"text"}
                                                    className="form-control form-control-sm"
                                                    placeholder="Ingrese el código"
                                                    name="loginPassword"
                                                    onChange={onLoginImputChange}
                                                    value={loginPassword}
                                                />
                                            </div>
                                            <button className="btn btn-success btn-sm" onClick={loginSubmit} disabled={loading}>
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span> Iniciando sesión...
                                                    </>
                                                ) : "Login"}
                                            </button>
                                        </>

                                    )}
                                </div>
                            </form>

                             {/* Botón de tengo un codigo de verificacion */}
                             <div className="text-center mt-3">
                                <button className="btn btn-link btn-sm" onClick={() => handleHaveAcode()}>
                                    {!haveAcode ? "Ya tengo un código de verificación" : "No tengo un código de verificación"}
                                </button>
                            </div>

                            {/* Botón para mostrar el registro */}
                            <div className="text-center mt-3">
                                <button className="btn btn-link btn-sm" onClick={() => setShowRegister(!showRegister)}>
                                    {showRegister ? "← Volver al Login" : "¿No tienes cuenta? Registrarse"}
                                </button>
                            </div>

                            
                        </div>
                    </div>
                </div>

                {/* Registro (se muestra solo si showRegister es true) */}
                {showRegister && (
                    <div className="col-md-5 mt-3 mt-md-0">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="text-center mb-3">📝 Registro</h5>
                                <form>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="Nombre"
                                            name="registerName"
                                            value={registerName}
                                            onChange={onRegisterImputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="email"
                                            className="form-control form-control-sm"
                                            placeholder="Correo"
                                            name='registerEmail'
                                            value={registerEmail}
                                            onChange={onRegisterImputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="tel"
                                            className="form-control form-control-sm"
                                            placeholder="Teléfono"
                                            name='registerPhone'
                                            value={registerPhone}
                                            onChange={onRegisterImputChange}
                                            required
                                        />
                                    </div>

                                    {/* Botón de "Enviar código" antes de recibir el código */}
                                    {!isRegisterCodeSent && (
                                        <div className="d-grid gap-2">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={generateTokenRegister}
                                                disabled={loadingRegisterCode}
                                            >
                                                {loadingRegisterCode ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span> Generando...
                                                    </>
                                                ) : "Enviar código"}
                                            </button>
                                        </div>
                                    )}

                                    {/* Botón de "Crear cuenta" solo si el código ya fue enviado */}
                                    {isRegisterCodeSent && (
                                        <>
                                            <div className="mb-2 position-relative">
                                                <input
                                                    type={"text"}
                                                    className="form-control form-control-sm"
                                                    placeholder="Ingrese el código"
                                                    name='registerPassword'
                                                    value={registerPassword}
                                                    onChange={onRegisterImputChange}
                                                />
                                            </div>
                                            <div className="d-grid gap-2 mt-2">
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={registerSubmit}
                                                >
                                                    Crear cuenta
                                                </button>
                                            </div>
                                        </>

                                    )}
                                </form>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};