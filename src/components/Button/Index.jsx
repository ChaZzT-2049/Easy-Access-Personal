import { BaseBtn } from "../../UI"
import Icon from "../Icon/Index"
const Btn = ({action,colors, type, icon, onClick, disabled}) => {
    return <BaseBtn disabled={disabled}
    onClick={onClick} className={`${colors} ${type}`}>{action} {icon && <Icon icon={icon}/>}</BaseBtn>
}
export default Btn