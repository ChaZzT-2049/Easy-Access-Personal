import { SignIUContainer, Header, NavHeader, SignIUCard, SignIUCardLeft, SignIUCardRight, FormFields, SignIUFooter, FormResponse } from "../UI";
import Logo from "../components/Logo/Index";
import LogoSlogan from "../components/Logo/LogoSlogan";
import Input from "../components/Form/Input";
import InputPass from "../components/Form/InputPass";
import Btn from "../components/Button/Index";
import Icon from "../components/Icon/Index";

import { Link } from "react-router-dom";

import { validateEmail, validatePass } from "../validations";
import signInUp from "../assets/img/landing/signInUp.jpeg"

import useAppContext from "../hooks/useAppContext"
import useInput from "../hooks/useInput";
import useFormResponse from "../hooks/useFormResponse";

const Login = () => {
    const {login, loginWithGoogle, toggleTheme, tema} = useAppContext();

    const email = useInput("email", validateEmail)
    const pass = useInput("password", validatePass)
    const {response, type, showResponseError} = useFormResponse();

    return <SignIUContainer>
        <Header>
            <Logo/>
            <NavHeader>
                <Link to="/register">Register</Link>
                <Icon onClick={()=>{toggleTheme()}} icon={tema ? "light_mode" : "dark_mode"} />
            </NavHeader>
        </Header>
        <SignIUCard>
            <SignIUCardLeft url={signInUp}>
                <div id="backdrop" className={tema ? "light" : "dark"}>
                    <h2 className="message">¡Bienvenido!</h2>
                    <Link to="/">
                        <LogoSlogan />
                    </Link>
                    <span className="message">Inicia sesión para continuar usando la aplicación y disfrutar los beneficios que brinda Easy Access.</span>
                </div>
            </SignIUCardLeft>
            <SignIUCardRight>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    email.validate(email.value)
                    pass.validate(pass.value)
                    if(email.valid && pass.valid){
                        login(email.value, pass.value).catch((error)=>{
                            showResponseError(error.code)
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
                    click={() => {
                        loginWithGoogle().catch((error)=>{
                            showResponseError(error.code)
                        })
                    }}
                />
            </SignIUCardRight>
        </SignIUCard>
        <SignIUFooter><h4>Easy-Access. © Derechos Reservados 2023</h4></SignIUFooter>
    </SignIUContainer>
}
export default Login;