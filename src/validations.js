export const validateEmail = (value) => {
    const pat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(pat.test(value)){
        return {fail: false, description: ""}
    }
    else{
        return {fail: true, description: "Ingresa un correo valido: nombredeusuario@dominio.com."}
    }
}
export const validatePass = (value) => {
    const pat = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%&/])[A-Za-z0-9@#$%&/]{8,12}$/;
    if(pat.test(value)){
        return {fail: false, description: ""}
    }else{
        return {fail: true, description: "Se requiere: Minimo una Mayúscula, una Minúscula y un Número con al menos uno de estos caracteres @#$%& y una logitud de 8 a 12 caracteres."}
    }
}
export const validatePassconf = (value, passvalue) => {
    if(value === passvalue && value.length > 0){
        return {fail: false, description: ""}
    }else{
        return {fail: true, description: "No debe estar vacío y debe coincidir con la contraseña."}
    }
}
export const validateNameApellidos = (value) => {
    const pat = /^[a-zA-Zá-ó ]{1,50}$/;
    if(value.length > 0 && value.length <= 50){
        if(pat.test(value)){
            return {fail: false, description: ""}
        }else{
            return {fail: true, description: "No debe contener caracteres especiales."}
        }
    }else{
        return {fail: true, description: "No debe estar vacío ni debe contener mas de 50 caracteres."}
    }
}
export const validateTerms = (value) =>{
    if(value){
        return {fail: false, description: ""}
    }else{
        return {fail: true, description: "Debes aceptar los términos y condiciones para crear una cuenta."}
    }
}