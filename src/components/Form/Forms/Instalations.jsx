import useAppContext from "../../../hooks/useAppContext"
import useDialog from "../../../hooks/useDialog"
import useInput from "../../../hooks/useInput"
import useSelect from "../../../hooks/useSelect"
import { validateNameApellidos } from "../../../validations"
import Btn from "../../Button/Index"
import Modal from "../../Modal/Index"
import Input from "../Input"
import Select from "../Select"
const options = [
    {value: "home", title: "Casa 1", icon: "home"},
    {value: "storefront", title: "Tienda", icon: "storefront"},
    {value: "restaurant", title: "Restaurante 1", icon: "restaurant"},
    {value: "location_city", title: "Edificio", icon: "location_city"},
    {value: "restaurant_menu", title: "Restaurante 2", icon: "restaurant_menu"},
    {value: "house", title: "Casa", icon: "house"},
    {value: "corporate_fare", title: "Tarifa corporativa", icon: "corporate_fare"},
    {value: "cottage", title: "Cabaña", icon: "cottage"},
    {value: "domain", title: "Dominio", icon: "domain"},
    {value: "holiday_village", title: "Pueblo vacacional", icon: "holiday_village"},
    {value: "local_dining", title: "Comedor local", icon: "local_dining"},
    {value: "food_bank", title: "Banco de alimentos", icon: "food_bank"},
    {value: "gite", title: "Gite", icon: "gite"},
    {value: "villa", title: "Villa", icon: "villa"},
    {value: "home_filled", title: "Casa llena", icon: "home_filled"},
    {value: "cabin", title: "Cabaña", icon: "cabin"},
    {value: "local_hospital", title: "Hospital local", icon: "local_hospital"},
    {value: "local_laundry_service", title: "Servicio de lavandería local", icon: "local_laundry_service"},
    {value: "bedroom_child", title: "Dormitorio infantil", icon: "bedroom_child"},
    {value: "spa", title: "Spa", icon: "spa"},
    {value: "hot_tub", title: "Jacuzzi", icon: "hot_tub"},
    {value: "fitness_center", title: "Centro de fitness", icon: "fitness_center"},
    {value: "sports_mma", title: "Deportes de MMA", icon: "sports_mma"},
    {value: "sports_martial_arts", title: "Deportes de artes marciales", icon: "sports_martial_arts"},
    {value: "store", title: "Tienda", icon: "store"},
    {value: "local_grocery_store", title: "Tienda de comestibles local", icon: "local_grocery_store"},
    {value: "warehouse", title: "Almacén", icon: "warehouse"},
    {value: "liquor", title: "Licorería", icon: "liquor"},
    {value: "store_mall_directory", title: "Directorio de centros comerciales", icon: "store_mall_directory"},
    {value: "local_fire_department", title: "Departamento de bomberos local", icon: "local_fire_department"},
    {value: "local_library", title: "Biblioteca local", icon: "local_library"},
    {value: "local_cafe", title: "Cafetería local", icon: "local_cafe"},
    {value: "local_police", title: "Policía local", icon: "local_police"},
    {value: "local_parking", title: "Aparcamiento local", icon: "local_parking"},
    {value: "local_bar", title: "Bar local", icon: "local_bar"},
    {value: "local_airport", title: "Aeropuerto local", icon: "local_airport"},
    {value: "museum", title: "Museo", icon: "museum"},
    {value: "local_pharmacy", title: "Farmacia local", icon: "local_pharmacy"},
    {value: "festival", title: "Festival", icon: "festival"},
    {value: "local_convenience_store", title: "Tienda de conveniencia local", icon: "local_convenience_store"},
    {value: "local_movies", title: "Cine local", icon: "local_movies"},
    {value: "stadium", title: "Estadio", icon: "stadium"}
];
const FormInstalation = ({action}) => {
    const {user} = useAppContext()
    const create = useDialog()
    const name = useInput("text", validateNameApellidos)
    const city = useInput("text", validateNameApellidos)
    const icon = useSelect(options)
    const clearInputs = () => {
        name.clear()
        city.clear()
    }
    return <>
        <Btn onClick={create.trigger} type="icon" colors="primary" action="Crear" icon="add_box" />
        
        <Modal confirm="Crear" controls={create} title="Crear Instalación"
        modalFunction={()=>{
            name.validate(name.value)
            city.validate(city.value)
            icon.validate(icon.selected.value)
            if(name.valid && city.valid && icon.valid){
                action({name: name.value, city: city.value, icon: icon.selected.value, user: user.uid})
                create.trigger()
                clearInputs()
            }
        }}>
            <br />
            <Input {...name} 
            label="Nombre" id="name" placeholder="Escribe el nombre de tu Instalación." /><br />
            <Input {...city} 
            label="Ciudad" id="city" placeholder="Escribe la Ciudad de tu Instalación." /><br />
            <Select {...icon} label="Icono" placeholder="Selecciona un Icono" name="icon" id="icon" />
        </Modal>
    </>
}
export default FormInstalation