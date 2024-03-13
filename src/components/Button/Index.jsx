import { BaseBtn } from "../../UI"
import Icon from "../Icon/Index"
const Btn = ({action,colors, type, icon, onClick}) => {
    return <BaseBtn onClick={onClick} className={`${colors} ${type}`}>{action} {icon && <Icon icon={icon}/>}</BaseBtn>
}
export default Btn