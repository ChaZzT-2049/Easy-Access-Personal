import { Header, NavHeader } from "../../styled/index";
import {SignIUContainer, SignIUCard, SignIUCardLeft, SignIUCardRight, SignIUFooter} from "../../styled/signInUp";
import { FormFields, FormResponse} from "../../styled/form";
import Logo from "../../components/UI/Logo/Index";
import Input from "../../components/Form/Input";
import InputPass from "../../components/Form/InputPass";
import Btn from "../../components/UI/Button/Index";
import Icon from "../../components/UI/Icon/Index";
import { Link } from "react-router-dom";
import { validateEmail, validatePass } from "../../utils/validations";
import signInUp from "../../assets/img/landing/signInUp.webp"
import useAppContext from "../../hooks/app/useAppContext"
import useInput from "../../hooks/form/useInput";
import useFormResponse from "../../hooks/form/useFormResponse";
import useAuth from "../../hooks/app/useAuth";
import { authErrors } from "../../firebase/firebase.errors";

const Login = () => {
    const { toggleTheme, tema } = useAppContext();
    const {login, loginWithGoogle, loginWithFacebook, loginWithMicrosoft} = useAuth()
    const email = useInput("email", validateEmail)
    const pass = useInput("password", validatePass)
    const {response, type, showResponseError} = useFormResponse();

    return <>
        <SignIUContainer>
            <Header>
                <Logo/>
                <NavHeader>
                    <Link to="/auth/register">Register</Link>
                    <Icon onClick={toggleTheme} icon={tema ? "light_mode" : "dark_mode"} />
                </NavHeader>
            </Header>
            <SignIUCard>
                <SignIUCardLeft $url={signInUp}>
                    <div id="backdrop" className={tema ? "light" : "dark"}>
                        <h2 className="message">¡Bienvenido!</h2>
                        <Logo slogan={true}/>
                        <span className="message">Inicia sesión para continuar usando la aplicación y disfrutar los beneficios que brinda Aditum Delta.</span>
                    </div>
                </SignIUCardLeft>
                <SignIUCardRight>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        email.validate(email.value)
                        pass.validate(pass.value)
                        if(email.valid && pass.valid){
                            login(email.value, pass.value).catch((error)=>{
                                showResponseError(authErrors[error.code] || authErrors.defaulError)
                            })
                        }
                    }}>
                        <legend><h1>Iniciar Sesión</h1></legend>
                        <FormResponse className={type}>{response}</FormResponse>
                        <FormFields>
                            <Input {...email} label="Correo" id="correo" placeholder="Escribe tu correo electronico" />
                            <InputPass {...pass}label="Contraseña" id="contra" placeholder="Escribe tu contraseña"/>
                            <small><Link to="/auth/forgot-password">Olvidé mi contraseña</Link></small>
                        </FormFields>
                        <Btn colors="primary" action="Iniciar Sesión" />
                        <span>¿No tienes cuenta? <Link to="/auth/register">Registrate aquí</Link>.</span>
                    </form>
                    <Btn action="Iniciar sesión con Google" colors="primary" type="icon" icon="login" 
                        onClick={() => {
                            loginWithGoogle().catch((error)=>{
                                showResponseError(authErrors[error.code] || authErrors.defaulError)
                            })
                        }}
                    />
                    <Btn action="Iniciar sesión con Facebook" colors="primary" type="icon" icon="login"
                        onClick={()=>{
                            loginWithFacebook().catch((error)=>{
                                showResponseError(authErrors[error.code] || authErrors.defaulError)
                            })
                        }}
                    />
                    <Btn action="Iniciar sesión con Microsoft" colors="primary" type="icon" icon="login"
                        onClick={()=>{
                            loginWithMicrosoft().catch((error)=>{
                                showResponseError(authErrors[error.code] || authErrors.defaulError)
                            })
                        }}
                    />
                </SignIUCardRight>
            </SignIUCard>
            <SignIUFooter><h4>Aditum Delta. © Derechos Reservados 2024</h4></SignIUFooter>
        </SignIUContainer>
    </>
}
export default Login;