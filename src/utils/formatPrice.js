const formatPrice = (cant, moneda) => {
    return  new Intl.NumberFormat("es-MX", {currency: moneda, style: "currency"}).format(cant)
}
export default formatPrice