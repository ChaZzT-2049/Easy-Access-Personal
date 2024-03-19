const Alerts = ({alerts}) => {
    const variants = {
        info: "Aditum dice:",
        success: "Exito",
        warning: "Advertencia",
        error: "Error"
    }
    return <div>
        {alerts.map((alert, i) => 
            <div key={i} className={alert.variant}>
                <span>
                    {variants[alert.variant]}
                </span>
                {alert.title}
                {alert.message}
            </div>
        )}
    </div>
}
export default Alerts