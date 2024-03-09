import { Header, SignIUCard, CardContent, Container, SignIUFooter, FormResponse } from "../UI";
import InputPass from "../components/Form/InputPass";
import { validatePass } from "../validations";
import Btn from "../components/Button/Index";
import Logo from "../components/Logo/Index";
import useInput from "../hooks/useInput";
import useFormResponse from "../hooks/useFormResponse";
import useAppContext from "../hooks/useAppContext";
import useRouteParams from "../hooks/useRouteParams";
import useAuth from "../hooks/useAuth"
import Middleware from "../components/Middleware/Index";
import { Link } from "react-router-dom";
import { authErrors } from "../firebase.errors";

const AccountVerifyReset = () => {
    const { auth } = useAppContext()
    const { resetPassword, verifyEmail } = useAuth()
    const password = useInput("password", validatePass)
    const {response, type, showResponseMessage, showResponseError} = useFormResponse();

    const getParam = useRouteParams();
    const oobCode = getParam("oobCode");
    const mode = getParam("mode");

    return <Middleware redirect="/login" validacion={(oobCode === null || (mode === "resetPassword" && auth))}>
        <Container>
            <Header>
                <Logo/>
            </Header>
            <SignIUCard>
                {
                    mode === "resetPassword" && <CardContent>
                        <legend><h1>Cambiar Contraseña</h1></legend>
                        <FormResponse className={type}>{response}</FormResponse>
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault()
                                password.validate(password.value)
                                if(password.valid){
                                    resetPassword(oobCode, password.value).then(()=>{
                                        showResponseMessage("Se ha actalizado tu contraseña, intenta iniciar sesion de nuevo.")
                                        
                                    }).catch((error)=>{
                                        showResponseError(authErrors[error.code])
                                    })
                                }
                            }}
                        >
                            <InputPass {...password} label="Contraseña" id="pass" placeholder="Ingresa tu nueva contraseña" />
                            <Btn action="Cambiar Contraseña" colors="primary" />
                            <div className="enlaces">
                                <Link to="/login">Iniciar Sesión</Link> ó
                                <Link to="/register">Crear Cuenta</Link>
                            </div>
                        </form>
                    </CardContent>
                }
                {
                    mode === "verifyEmail" && <CardContent>
                        <FormResponse className={type}>{response}</FormResponse>
                        Haz clic en el boton para verificar tu correo electronico.
                        <Btn action="Verificar" colors="primary"
                            click={()=>{
                                verifyEmail(oobCode).then(()=>{
                                    showResponseMessage("Correo verificado.")
                                    
                                }).catch((error)=>{
                                    showResponseError(authErrors[error.code])
                                })
                            }} 
                        />
                    </CardContent>
                }
            </SignIUCard>
            <SignIUFooter><h4>Easy-Access. © Derechos Reservados 2023</h4></SignIUFooter>
        </Container>
    </Middleware>
}
export default AccountVerifyReset;