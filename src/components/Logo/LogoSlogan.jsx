import logo from "../../assets/img/logo.png"

import {LSlogan} from "../../UI"
const LogoSlogan = () =>{
    return <LSlogan>
    <img src={logo} alt="Logo" />
    <div>
        <h1>Easy-<b>Access</b></h1>
        <small>Acceso Seguro, Acceso Facil.</small>
    </div>
    </LSlogan>
}

export default LogoSlogan;