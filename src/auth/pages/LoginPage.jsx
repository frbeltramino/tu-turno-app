
import './LoginPage.css';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

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
            Swal.fire(t("i18n.auth.012"), error, 'error');
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
                            <h5 className="text-center mb-3">{ t("i18n.auth.013") }</h5>
                            <form>
                                <div className="mb-2">
                                    <input
                                        type="email"
                                        className="form-control form-control-sm"
                                        placeholder={ t("i18n.auth.025") }
                                        name="loginEmail"
                                        onChange={onLoginImputChange}
                                        value={loginEmail}
                                        required
                                        autoCapitalize="none"
                                        autoCorrect="off"  
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    {/* Botón de "Enviar código" antes de recibir el código */}
                                    {!isLoginCodeSent && !haveAcode && (
                                        <button className="btn btn-primary btn-sm" onClick={generateToken} disabled={loadingGenerateCode}>
                                            {loadingGenerateCode ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span> { t("i18n.auth.014") }
                                                </>
                                            ) : t("i18n.auth.015")}
                                        </button>
                                    )}

                                    {/* Botón de "Login" solo si el código ya fue enviado */}
                                    {(isLoginCodeSent || haveAcode) && (
                                        <>
                                            <div className="mb-2 position-relative">
                                                <input
                                                    type={"text"}
                                                    className="form-control form-control-sm"
                                                    placeholder={ t("i18n.auth.027") }
                                                    name="loginPassword"
                                                    onChange={onLoginImputChange}
                                                    value={loginPassword}
                                                />
                                            </div>
                                            <button className="btn btn-success btn-sm" onClick={loginSubmit} disabled={loading}>
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span> { t("i18n.auth.016") }
                                                    </>
                                                ) : t("i18n.auth.017")}
                                            </button>
                                        </>

                                    )}
                                </div>
                            </form>

                             {/* Botón de tengo un codigo de verificacion */}
                             <div className="text-center mt-3">
                                <button className="btn btn-link btn-sm" onClick={() => handleHaveAcode()}>
                                    {!haveAcode ? t("i18n.auth.018") : t("i18n.auth.019")}
                                </button>
                            </div>

                            {/* Botón para mostrar el registro */}
                            <div className="text-center mt-3">
                                <button className="btn btn-link btn-sm" onClick={() => setShowRegister(!showRegister)}>
                                    {showRegister ? t("i18n.auth.020") : t("i18n.auth.021")}
                                </button>
                            </div>

                            {/* Botón de no recibí un codigo de verificacion */}
                            {
                                (isLoginCodeSent || haveAcode) && (  
                                <div className="text-center mt-3">
                                    <button className="btn btn-link btn-sm" onClick={() => generateToken()}>
                                        { t("i18n.auth.022") }
                                    </button>
                                </div>)
                            }
                           

                            
                        </div>
                    </div>
                </div>

                {/* Registro (se muestra solo si showRegister es true) */}
                {showRegister && (
                    <div className="col-md-5 mt-3 mt-md-0">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="text-center mb-3">{ t("i18n.auth.023") }</h5>
                                <form>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder={ t("i18n.auth.024") }
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
                                            placeholder={ t("i18n.auth.025") }
                                            name='registerEmail'
                                            value={registerEmail}
                                            onChange={onRegisterImputChange}
                                            required
                                            autoCapitalize="none"
                                            autoCorrect="off"   
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="tel"
                                            className="form-control form-control-sm"
                                            placeholder={t("i18n.auth.026")}
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
                                                        <span className="spinner-border spinner-border-sm me-2"></span> { t("i18n.auth.014") }
                                                    </>
                                                ) : t("i18n.auth.015")}
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
                                                    placeholder={ t("i18n.auth.027") }
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
                                                    { t("i18n.auth.028") }
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