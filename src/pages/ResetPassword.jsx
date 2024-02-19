import InputPass from "../components/Form/InputPass";
import { validatePass } from "../validations";
import Btn from "../components/Button/Index";
import Logo from "../components/Logo/Index";
import useInput from "../hooks/useInput";
import useFormResponse from "../hooks/useFormResponse";
import useAppContext from "../hooks/useAppContext";
import { Header, SignIUCard, CardContent, Container, SignIUFooter, FormResponse } from "../UI";
import useRouteParams from "../hooks/useRouteParams";
import useMiddleware from "../hooks/useMiddleware";
import Middleware from "../components/Middleware/Index";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const {resetPassword} = useAppContext()
    const password = useInput("password", validatePass)
    const {response, type, showResponseMessage, showResponseError} = useFormResponse();

    const getParam = useRouteParams();
    const oobCode = getParam("oobCode");

    const modeMiddleware = useMiddleware("/login", oobCode === null)

    return <Middleware {...modeMiddleware}>
        <Container>
            <Header>
                <Logo/>
            </Header>
            <SignIUCard>
                <CardContent>
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
                                    showResponseError(error.code)
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
            </SignIUCard>
            <SignIUFooter><h4>Easy-Access. © Derechos Reservados 2023</h4></SignIUFooter>
        </Container>
    </Middleware>
}
export default ResetPassword;