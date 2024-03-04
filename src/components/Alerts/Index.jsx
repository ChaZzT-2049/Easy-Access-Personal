const Alerts = ({alerts}) => {
    return <div className="fixed bottom-0 w-full">
        {alerts.map((alert, i) => 
            <div key={i} className={alert.variant}>
                <span className="text-2xl">
                {alert.variant === "success" ? (
                    "Exito"
                ) : alert.variant === "warning" ? (
                    "Advertencia"
                ) : (
                    "Error"
                )}
                </span>
            {alert.message}
        </div>
        )}
    </div>
}
export default Alerts