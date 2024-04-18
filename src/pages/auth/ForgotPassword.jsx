import { Link } from "react-router-dom";
import Input from "../../components/Form/Input";
import { validateEmail } from "../../utils/validations";
import Btn from "../../components/UI/Button/Index";
import Logo from "../../components/UI/Logo/Index";
import useInput from "../../hooks/form/useInput";
import useFormResponse from "../../hooks/form/useFormResponse";
import useAuth from "../../hooks/app/useAuth";
import { Header, Container} from "../../styled/index";
import {SignIUCard, CardContent, SignIUFooter} from "../../styled/signInUp";
import {FormResponse } from "../../styled/form";
import { authErrors } from "../../firebase/firebase.errors";

const ForgotPassword = () => {
    const {forgotPassword} = useAuth()
    const email = useInput("email", validateEmail)
    const {response, type, showResponseMessage, showResponseError} = useFormResponse();

    return <Container>
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
                                showResponseError(authErrors[error.code] || authErrors.defaulError)
                            });
                        }
                    }}
                >
                    <Input {...email} label="Correo" id="correo" placeholder="Escribe tu correo electronico" />
                    <Btn action="Cambiar Contraseña" colors="primary" />
                    <div className="enlaces">
                        <Link to="/auth/login">Iniciar Sesión</Link> ó
                        <Link to="/auth/register">Crear Cuenta</Link>
                    </div>
                </form>
            </CardContent>
        </SignIUCard>
        <SignIUFooter><h4>Aditum Delta. © Derechos Reservados 2024</h4></SignIUFooter>
    </Container>
}
export default ForgotPassword;