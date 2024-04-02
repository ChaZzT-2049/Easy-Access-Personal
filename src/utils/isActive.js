const isActive = (active, itIs = "active", isNot = "inactive", oposite = false) => {
    if(oposite){
        if(active){
            return isNot
        }else{
            return itIs
        }
    }else{
        if(active){
            return itIs
        }else{
            return isNot
        }
    }
}
export default isActive