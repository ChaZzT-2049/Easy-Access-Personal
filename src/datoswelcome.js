import school from "./assets/img/landing/school-min.webp"
import schoolanim from "./assets/img/landing/school-anim-min.png"
import bussines from "./assets/img/landing/business-min.webp"
import bussinesanim from "./assets/img/landing/building-anim-min.png"
import smallbuss from "./assets/img/landing/smallbusiness-min.webp"
import smallbussanim from "./assets/img/landing/business-anim-min.png"
import residences from "./assets/img/landing/residences-min.webp"
import houseanim from "./assets/img/landing/house-anim-min.png"

import qrscan from "./assets/img/landing/qrscan-min.webp"
import buildaccess from "./assets/img/landing/buildingaccess-min.webp"
import analitics from "./assets/img/landing/analitics-min.webp"
import parkentry from "./assets/img/landing/parkentry-min.webp"
import users from "./assets/img/landing/users-min.webp"

import starter from "./assets/img/landing/starter-min.webp"
import business from "./assets/img/landing/businessplan-min.webp"
import manager from "./assets/img/landing/manager-min.webp"
import premium from "./assets/img/landing/premiun-min.webp"

export const clients = [
    {
        id: 1,
        cover: school,
        icon: schoolanim,
        titulo: "Escuelas",
        descripcion: "Primarias, secundarias, bachillerato y universidad. Cualquier instancia educativa que requiera registrar accesos y mantener al tanto a tutores."
    },
    {
        id: 2,
        cover: bussines,
        icon: bussinesanim,
        titulo: "Empresas",
        descripcion: "El registro de empleados es necesario en toda empresa, agiliza este proceso y manten al tanto a quien lo requiera sobre el personal de manera sencilla."
    },
    {
        id: 3,
        cover: smallbuss,
        icon: smallbussanim,
        titulo: "Negocios",
        descripcion: "Con Easy Access puedes gestionar la entrada tanto de personal como de clientes, nuestro sistema se adapta a cualquier modelo de negocio."
    },
    {
        id: 4,
        cover: residences,
        icon: houseanim,
        titulo: "Residencias",
        descripcion: "¿Te preocupa la seguridad de tu hogar y vecindario?. Ya puedes relajarte, monitorear casas y fraccionamientos privados nunca fue tan eficiente."
    }
]

export const features = [
    {
        id: 1,
        img: qrscan,
        titulo: "Escaneo de codigos QR para acceder a diferentes sitios.",
        descripcion: "Ya no necesitas ingresar tus datos diariamente, ahorra tiempo pues nuestro sistema generará un QR con los datos necesarios para acceder a tus instalaciones."
    },
    {
        id: 2,
        img: buildaccess,
        titulo: "Registra los accesos de una instalación.",
        descripcion: "La gestión de accesos es eficaz y facil de integrar en tus instalaciones, si no deseas invertir en infraestructura, realiza escaneos en cualquier dispositivo."
    },
    {
        id: 3,
        img: parkentry,
        titulo: "Registra la entrada de vehiculos de forma rápida.",
        descripcion: "¿Vas a ingresar con un vehiculo?, hazlo de la misma forma que lo haces a pie. Nos integramos de forma facil al acceso por estacionamientos."
    },
    {
        id: 4,
        img: users,
        titulo: "Enterate de cuando personal o conocidos acceden a un sitio.",
        descripcion: "Generamos alertas para saber cuando se realiza un registro, es importante mantener a tutores o supervisores informados en tiempo real."
    },
    {
        id: 5,
        img: analitics,
        titulo: "Revisa estadisticas sobre tus instalaciones.",
        descripcion: "Brindamos herramientas e información de interés que facilita la gestión de instalaciones de manera rápida."
    }
]

export const planes = [
    {
        id: 1,
        titulo: "Starter",
        mensual: 0,
        anual: (0 * 12)-(15 * (0 * 12))/100,
        moneda: "MXN",
        img: starter,
        features: [
            {feature: "solicita acceso a instalaciones"},
            {feature: "obtenen QRs de acceso"},
            {feature: "agrega vehiculos"},
            {feature: "recibe alertas"},
        ],
        action: "Crear Cuenta",
        icon: "account_box"
    },
    {
        id: 2,
        titulo: "Manager",
        mensual: 200,
        anual: (200 * 12)-(15 * (200 * 12))/100,
        moneda: "MXN",
        img: manager,
        features: [
            {feature: "administra una instalacion"},
            {feature: "gestiona hasta 200 usuarios"},
            {feature: "escaneo de QRs"},
            {feature: "filtra Registros"},
        ],
        action: "Contratar Ahora",
        icon: "add_card"
    },
    {
        id: 3,
        titulo: "Business",
        mensual: 500,
        anual: (500 * 12)-(15 * (500 * 12))/100,
        moneda: "MXN",
        img: business,
        features: [
            {feature: "administra hasta 4 instalaciones"},
            {feature: "gestiona hasta 800 usuarios"},
            {feature: "maneja 400 invitados/clientes"},
            {feature: "obten estadísticas"},
        ],
        action: "Contratar Ahora",
        icon: "add_card"
    },
    {
        id: 4,
        titulo: "Premium",
        mensual: 1000,
        anual: (1000 * 12)-(15 * (1000 * 12))/100,
        moneda: "MXN",
        img: premium,
        features: [
            {feature: "instalaciones ilimitadas"},
            {feature: "gestion ilimitada de usuarios"},
            {feature: "invitados/clientes ilimitados"},
            {feature: "integración con tecnologías"},
        ],
        action: "Contratar Ahora",
        icon: "add_card"
    }
]