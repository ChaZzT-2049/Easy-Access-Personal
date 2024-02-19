const Icon = ({icon, onClick}) => {

    return <i onClick={onClick} className="material-icons">
        {icon}
    </i>
}

export default Icon;