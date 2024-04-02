import { SignIUContainer, Header, NavHeader, SignIUCard, SignIUCardLeft, SignIUCardRight, FormFields, SignIUFooter, InputColum, FormResponse } from "../../styled/index";
import Logo from "../../components/UI/Logo/Index";
import Input from "../../components/Form/Input";
import InputPass from "../../components/Form/InputPass";
import InputCheck from "../../components/Form/InputCheck";
import Btn from "../../components/UI/Button/Index";
import Icon from "../../components/UI/Icon/Index";
import signInUp from "../../assets/img/landing/signInUp.webp"
import { Link } from "react-router-dom";
import { validateNames, validateEmail, validatePass, validatePassconf, validateTerms } from "../../utils/validations";
import useAppContext from "../../hooks/app/useAppContext"
import useInput from "../../hooks/form/useInput";
import useFormResponse from "../../hooks/form/useFormResponse";
import useAuth from "../../hooks/app/useAuth";
import { authErrors } from "../../firebase/firebase.errors";

const Register = () => {
    const { toggleTheme, tema } = useAppContext();
    const {signUp, loginWithGoogle, loginWithFacebook, loginWithMicrosoft} = useAuth()
    const name = useInput("text", validateNames)
    const lastname = useInput("text", validateNames)
    const email = useInput("email", validateEmail)
    const pass = useInput("password", validatePass)
    const passconf = useInput("password", validatePassconf)
    const terms = useInput("checkbox", validateTerms, false)
    const {response, type, showResponseError} = useFormResponse();

    return <>
        <SignIUContainer>
            <Header>
                <Logo/>
                <NavHeader>
                    <Link to="/auth/login">Login</Link>
                    <Icon onClick={toggleTheme} icon={tema ? "light_mode" : "dark_mode"} />
                </NavHeader>
            </Header>
            <SignIUCard>
                <SignIUCardLeft $url={signInUp}>
                    <div id="backdrop" className={tema ? "light" : "dark"}>
                        <h2 className="message">¡Bienvenido nuevo usuario!</h2>
                        <Logo slogan={true}/>
                        <span className="message">Descubre los beneficios de usar Aditum Delta, registra tus datos para crear tu cuenta.</span>
                    </div>
                </SignIUCardLeft>
                <SignIUCardRight>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        name.validate(name.value)
                        lastname.validate(lastname.value)
                        email.validate(email.value)
                        pass.validate(pass.value)
                        passconf.validate(passconf.value, pass.value)
                        terms.validate(terms.value)
                        if(name.valid && lastname.valid && email.valid && pass.valid && passconf.valid && terms.valid){
                            signUp(name.value, lastname.value, email.value, pass.value).catch((error)=>{
                                showResponseError(authErrors[error.code])
                            })
                        }
                    }}>
                        <legend><h1>Crear Cuenta</h1></legend>
                        <FormResponse className={type}>{response}</FormResponse>
                        <FormFields>
                            <InputColum>
                                <Input {...name} label="Nombre" id="nombre" placeholder="Escribe tu nombre" />
                                <Input {...lastname} label="Apellidos" id="apellidos" placeholder="Escribe tus apellidos" />
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
                        onClick={() => {
                            loginWithGoogle().catch((error)=>{
                                showResponseError("error", error.code)
                            })
                        }}
                    />
                    <Btn action="Iniciar sesión con Facebook" colors="primary" type="icon" icon="login"
                        onClick={()=>{
                            loginWithFacebook().catch((error)=>{
                                console.log(error)
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
    </>
}
export default Register;