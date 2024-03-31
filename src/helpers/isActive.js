export const isActive = (active, itIs = "active", isNot = "inactive") => {
    return active ? itIs : isNot
}