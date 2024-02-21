import { SignIUContainer, Header, NavHeader, SignIUCard, SignIUCardLeft, SignIUCardRight, FormFields, SignIUFooter, InputColum, FormResponse } from "../UI";
import Logo from "../components/Logo/Index";
import LogoSlogan from "../components/Logo/LogoSlogan";
import Input from "../components/Form/Input";
import InputPass from "../components/Form/InputPass";
import InputCheck from "../components/Form/InputCheck";
import Btn from "../components/Button/Index";
import Icon from "../components/Icon/Index";
import signInUp from "../assets/img/landing/signInUp.jpeg"

import { Link } from "react-router-dom";
import { validateNameApellidos, validateEmail, validatePass, validatePassconf, validateTerms } from "../validations";

import useAppContext from "../hooks/useAppContext"
import useInput from "../hooks/useInput";
import useFormResponse from "../hooks/useFormResponse";
import { authErrors } from "../firebase.errors";

const Register = () => {
    const {SignUp, loginWithGoogle, toggleTheme, tema} = useAppContext();
    const name = useInput("text", validateNameApellidos)
    const apellidos = useInput("text", validateNameApellidos)
    const email = useInput("email", validateEmail)
    const pass = useInput("password", validatePass)
    const passconf = useInput("password", validatePassconf)
    const terms = useInput("checkbox", validateTerms)
    const {response, type, showResponseError} = useFormResponse();

    return <SignIUContainer>
        <Header>
            <Logo/>
            <NavHeader>
                <Link to="/login">Login</Link>
                <Icon onClick={()=>{toggleTheme()}} icon={tema ? "light_mode" : "dark_mode"} />
            </NavHeader>
        </Header>
        <SignIUCard>
            <SignIUCardLeft url={signInUp}>
                <div id="backdrop" className={tema ? "light" : "dark"}>
                    <h2 className="message">¡Bienvenido nuevo usuario!</h2>
                    <Link to="/">
                        <LogoSlogan />
                    </Link>
                    <span className="message">Descubre los beneficios de usar Easy Access, registra tus datos para crear tu cuenta.</span>
                </div>
            </SignIUCardLeft>
            <SignIUCardRight>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    name.validate(name.value)
                    apellidos.validate(apellidos.value)
                    email.validate(email.value)
                    pass.validate(pass.value)
                    passconf.validate(passconf.value, pass.value)
                    terms.validate(terms.value)
                    if(name.valid && apellidos.valid && email.valid && pass.valid && passconf.valid && terms.valid){
                        SignUp(name.value, apellidos.value, email.value, pass.value).catch((error)=>{
                            showResponseError(authErrors[error.code])
                        })
                    }
                }}>
                    <legend><h1>Crear Cuenta</h1></legend>
                    <FormResponse className={type}>{response}</FormResponse>
                    <FormFields>
                        <InputColum>
                            <Input {...name} label="Nombre" id="nombre" placeholder="Escribe tu nombre" />
                            <Input {...apellidos} label="Apellidos" id="apellidos" placeholder="Escribe tus apellidos" />
                        </InputColum>
                        <Input {...email} label="Correo" id="correo" placeholder="Escribe tu correo electronico" />
                        <InputPass {...pass} label="Contraseña" id="contra" placeholder="Escribe una contraseña"/>
                        <InputPass confirm={pass.value} {...passconf} label="Confirmar Contraseña" id="contraC" placeholder="Confirma la contraseña"/>
                        <InputCheck {...terms} id="terms" label="He leído y acepto los términos y condiciones."/>
                    </FormFields>
                    <Btn colors="primary" action="Crear Cuenta" />
                    <span>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>.</span>
                </form>
                <Btn action="Iniciar sesión con Google" colors="primary" type="icon" icon="login"
                    click={() => {
                        loginWithGoogle().catch((error)=>{
                            showResponseError("error", error.code)
                        })
                    }}
                />
            </SignIUCardRight>
        </SignIUCard>
        <SignIUFooter><h4>Easy-Access. © Derechos Reservados 2023</h4></SignIUFooter>
    </SignIUContainer>
}
export default Register;