import logo from "../../assets/img/logo.png"
import { Link } from "react-router-dom";

import {SLogo} from "../../UI"
const Logo = () =>{
    return <SLogo>
        <img src={logo} alt="Logo" />
        <h2><Link to="/">Easy-<b>Access</b></Link></h2>
    </SLogo>
}

export default Logo;
