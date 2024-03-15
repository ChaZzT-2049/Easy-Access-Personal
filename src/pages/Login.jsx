import { SignIUContainer, Header, NavHeader, SignIUCard, SignIUCardLeft, SignIUCardRight, FormFields, SignIUFooter, FormResponse } from "../UI";
import Logo from "../components/Logo/Index";
import Input from "../components/Form/Input";
import InputPass from "../components/Form/InputPass";
import Btn from "../components/Button/Index";
import Icon from "../components/Icon/Index";
import { Link } from "react-router-dom";
import Middleware from "../components/Middleware/Index";
import { validateEmail, validatePass } from "../validations";
import signInUp from "../assets/img/landing/signInUp.webp"
import useAppContext from "../hooks/useAppContext"
import useInput from "../hooks/useInput";
import useFormResponse from "../hooks/useFormResponse";
import useMiddleware from "../hooks/useMiddleware";
import useAuth from "../hooks/useAuth";
import { authErrors } from "../firebase.errors";

const Login = () => {
    const { toggleTheme, tema } = useAppContext();
    const {login, loginWithGoogle, loginWithFacebook, loginWithMicrosoft} = useAuth()

    const email = useInput("email", validateEmail)
    const pass = useInput("password", validatePass)
    const {response, type, showResponseError} = useFormResponse();
    const {loginM} = useMiddleware()

    return <Middleware {...loginM}>
        <SignIUContainer>
            <Header>
                <Logo/>
                <NavHeader>
                    <Link to="/register">Register</Link>
                    <Icon onClick={toggleTheme} icon={tema ? "light_mode" : "dark_mode"} />
                </NavHeader>
            </Header>
            <SignIUCard>
                <SignIUCardLeft url={signInUp}>
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
                                showResponseError(authErrors[error.code])
                            })
                        }
                    }}>
                        <legend><h1>Iniciar Sesión</h1></legend>
                        <FormResponse className={type}>{response}</FormResponse>
                        <FormFields>
                            <Input {...email} label="Correo" id="correo" placeholder="Escribe tu correo electronico" />
                            <InputPass {...pass}label="Contraseña" id="contra" placeholder="Escribe tu contraseña"/>
                            <small><Link to="/forgot-password">Olvidé mi contraseña</Link></small>
                        </FormFields>
                        <Btn colors="primary" action="Iniciar Sesión" />
                        <span>¿No tienes cuenta? <Link to="/register">Registrate aquí</Link>.</span>
                    </form>
                    <Btn action="Iniciar sesión con Google" colors="primary" type="icon" icon="login" 
                        onClick={() => {
                            loginWithGoogle().catch((error)=>{
                                showResponseError(authErrors[error.code])
                            })
                        }}
                    />
                    <Btn action="Iniciar sesión con Facebook" colors="primary" type="icon" icon="login"
                        onClick={()=>{
                            loginWithFacebook().catch((error)=>{
                                showResponseError(authErrors[error.code])
                            })
                        }}
                    />
                    <Btn action="Iniciar sesión con Microsoft" colors="primary" type="icon" icon="login"
                        onClick={()=>{
                            loginWithMicrosoft().catch((error)=>{
                                showResponseError(authErrors[error.code])
                            })
                        }}
                    />
                </SignIUCardRight>
            </SignIUCard>
            <SignIUFooter><h4>Aditum Delta. © Derechos Reservados 2024</h4></SignIUFooter>
        </SignIUContainer>
    </Middleware>
}
export default Login;