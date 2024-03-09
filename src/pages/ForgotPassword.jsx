import { Link } from "react-router-dom";
import Input from "../components/Form/Input";
import { validateEmail } from "../validations";
import Btn from "../components/Button/Index";
import Logo from "../components/Logo/Index";
import useInput from "../hooks/useInput";
import useFormResponse from "../hooks/useFormResponse";
import useAuth from "../hooks/useAuth";
import { Header, SignIUCard, CardContent, Container, SignIUFooter, FormResponse } from "../UI";
import useMiddleware from "../hooks/useMiddleware";
import Middleware from "../components/Middleware/Index";

const ForgotPassword = () => {
    const {forgotPassword} = useAuth()
    const email = useInput("email", validateEmail)
    const {response, type, showResponseMessage, showResponseError} = useFormResponse();

    const loginM = useMiddleware()

    return <Middleware {...loginM}> 
        <Container>
            <Header>
                <Logo/>
            </Header>
            <SignIUCard>
                <CardContent>
                    <legend><h1>Olvide mi Contraseña</h1></legend>
                    <FormResponse className={type}>{response}</FormResponse>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault()
                            email.validate(email.value)
                            if(email.valid){
                                forgotPassword(email.value).then(()=>{
                                    showResponseMessage("Hemos enviado un correo para actualizar tu contraseña.")
                                }).catch((error)=>{
                                    showResponseError(error.code)
                                });
                            }
                        }}
                    >
                        <Input {...email} label="Correo" id="correo" placeholder="Escribe tu correo electronico" />
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
export default ForgotPassword;