import { Link } from "react-router-dom";
import Logo from "../components/UI/Logo/Index";
import { Header, MainContainer, NavHeader, PageTitle } from "../styled";
import { SignIUFooter } from "../styled/signInUp";
import Icon from "../components/UI/Icon/Index";
import useAppContext from "../hooks/app/useAppContext";
import styled from "styled-components";
const TermsContainer = styled(MainContainer)`
    max-width: 700px;
    margin: 1rem auto;
    text-align: justify;
    & ol, & li{
        margin-left: 1rem;
        margin-bottom: 1rem;
    }
    border: 2px solid ${({theme})=>theme.onbg};
`;
const Terms = () => {
    const {toggleTheme, tema} = useAppContext()
    return <>
        <Header>
            <Logo/>
            <NavHeader>
                <Link to="/auth/register">Register</Link>
                <Icon onClick={toggleTheme} icon={tema ? "light_mode" : "dark_mode"} />
            </NavHeader>
        </Header>
        <TermsContainer>
            <PageTitle>Terminos y Condiciones</PageTitle>
            <h2>D E C L A R A C I O N E S</h2> <br />
            <p>
                <b>Aditum Delta</b> es un sistema que permita el acceso a diversas instalaciones de una manera eficiente utilizando tecnologías de la información para mantener el registro y control de los usuarios. <br />
                <b>Domicilio Legal:</b><br />
                Denominación social: ADITUM DELTA <br />
                Nombre comercial: ADITUM DELTA <br />
                NIF: 000000 <br />
                Domicilio: Av. Paseos del Mayab 4000, Región 79, 77710 Playa del Carmen, QR. <br />
                E-mail: aditumdelta@gmail.com <br />
            </p> <br />
            <h2>Aviso de Confidencialidad</h2> <br />
            <p>
                <b>INFORMACIÓN CONFIDENCIAL:</b> La confidencialidad de los datos es toda aquella información personal o empresarial que no puede ser divulgada a terceros sin su consentimiento y sobre todo que se han de aplicar las medidas pertinentes para garantizar su seguridad. <br />
                <b>PARTE DIVULGANTE:</b> Tendrá tal carácter la parte signante que ponga a disposición de la otra parte información confidencial que, al hacerse del conocimiento de un tercero, sin su previo consentimiento, le ocasione un daño o perjuicio económico. <br />
                <b>PARTE RECEPTORA:</b> Tendrá tal carácter la parte que reciba a su resguardo información confidencial propiedad de la parte divulgante, la cual se obliga a no hacerla del conocimiento de un tercero, bajo pena de indemnizar a la parte divulgante en los términos y condiciones que en este convenio se establecen. <br />
            </p><br />
            <h2>C L Á U S U L A S</h2> <br />
            <ol>
                <li>
                    <b>Propiedad de la Información:</b> 
                    La información que se intercambie con motivo de este convenio no entrará en el ámbito de dominio de la parte receptora (Aditum Delta), sino que siempre la parte divulgante (Usuarios) conservará para sí los derechos inherentes a la propiedad de la información que se haga llegar a la parte receptora.
                </li>
                <li>
                    <b>Corrección de errores: </b>
                    Tendrán el derecho a corregir cualquier error inadvertido al designar información como confidencial mediante notificación escrita que deberán presentarse dentro de los cinco días hábiles siguientes a la determinación del error.
                </li>
                <li>
                    <b>Personal autorizado: </b>
                    Aditum Delta se compromete a no hacer del conocimiento general de sus usuarios la información confidencial que se les haga llegar con motivo de este convenio, pudiendo autorizar el conocimiento de tal información sólo al personal que lo requiera de una forma justificada.
                </li>
                <li>
                    <b>De las copias y de la devolución de la información a la parte divulgante: </b>
                    Aditum Delta no podrá, bajo ninguna circunstancia, hacer más ejemplares o copias de la información que las autorizadas. Nuestros usuarios tienen en todo tiempo el derecho a solicitar la devolución o destrucción de su información.
                </li>
                <li>
                    <b>Excepciones a la confidencialidad: </b>
                    Aditum Delta estará exenta de guardar confidencialidad acerca de la información intercambiada, cuando:
                    <ol style={{listStyleType: "lower-alpha"}}>
                        <li>
                            Previo a su divulgación la información fuera conocida por la parte del usuario libre de toda obligación que la forzara a mantenerla con el carácter de confidencial, según se evidencie por documentación en su posesión;
                        </li>
                        <li>
                            Es desarrollada o elaborada de manera independiente por la parte receptora o legalmente recibida libre de restricciones de otra fuente con derecho a divulgarla;
                        </li>
                        <li>
                            Es o llega a ser del dominio público, sin mediar incumplimiento de este convenio por la parte receptora;
                        </li>
                        <li>
                            Los usuarios otorgan por escrito una dispensa en la que se especifique que una pieza de información se haya exenta de las cargas establecidas en este convenio. En caso de que alguna autoridad solicite de la parte receptora la información confidencial que esté a su resguardo, ésta deberá dar aviso inmediato a los usuarios, para que la última tome las medidas que considere pertinentes. En el mismo supuesto, la parte receptora se obliga a proporcionar únicamente la información requerida, y en caso de que los alcances de la investigación no hayan sido delimitados por la autoridad investigadora, se pedirá a la autoridad que la delimite buscando se cause el menor daño posible a la parte de cuya propiedad sea la información sujeta a investigación.
                        </li>
                    </ol>
                </li>
                <li>
                    <b>Sanciones: </b>
                    En caso de que Aditum Delta incumpliera con alguna de las obligaciones contenidas en el presente convenio, la parte divulgante tendrá en términos de ley, la facultad de ejercitar las acciones civiles, penales y administrativas que se deriven de la conducta ilícita de la parte receptora, de sus socios, empleados y demás personas a quienes ponga en conocimiento de la información confidencial, de conformidad con la Ley de la Propiedad Industrial, el Código Penal Federal (delito de revelación de secretos contemplado en los artículos 210, 211 y 211 bis) y demás leyes y disposiciones aplicables.
                    <br />En caso de incumplimiento de la parte receptora, independientemente de lo especificado en el punto anterior, se obliga a pagar a la parte divulgante los daños y perjuicios que le sean ocasionados con motivo de su incumplimiento.

                </li>
                <li>
                    <b>Cesión de Derechos: </b>
                    Los derechos y obligaciones derivados de este convenio no podrán cederse a un tercero.
                </li>
                <li>
                    <b>Abrogación de acuerdos anteriores: </b>
                    Este convenio y sus adiciones constituyen un acuerdo total entre las partes con respecto al manejo de información confidencial, por lo que desde el momento de su firma queda abrogado todo acuerdo, contrato, convenio o documento previo que tuviere relación directa o indirecta con la materia de este convenio.
                </li>
                <li>
                    <b>Comunicaciones: </b>
                    Todas las comunicaciones entre las partes deberán ser por escrito, con acuse de recibo o por cualquier otro medio que garantice que el destinatario recibió la comunicación, a los domicilios estipulados en las declaraciones.
                </li>
                <li>
                    <b>Salvaguarda laboral: </b>
                    Ambas partes reconocen que el presente convenio no podrá interpretarse como constitutivo de una relación laboral, de asociación, sociedad, licencia o de cualquier otra índole.
                </li>
                <li>
                    <b>No otorgamiento de derechos:</b>
                    Aditum Delta reconoce que el hecho de que sus usuarios le comparta información confidencial no le otorga ningún derecho de licencia, patente o propiedad intelectual sobre la misma y que la revelación de la información no originará ninguna obligación a la parte divulgante de otorgar derecho alguno sobre dicha información.
                </li>
                <li>
                    <b>Vigencia: </b>
                    Las partes acuerdan en que las obligaciones derivadas del presente convenio permanecerán en vigor por un periodo de (--/--/--) contados a partir de la fecha de su firma, aun cuando no se haya desarrollado ninguna negociación conjunta.
                </li>
                <li>
                    <b>Controversias: </b>
                    En caso de presentarse controversia en la aplicación, interpretación o cumplimiento de las obligaciones derivadas del presente convenio, las partes designarán un árbitro para que decida en derecho sobre la controversia surgida. De no llegar a algún acuerdo, se someterán a la jurisdicción de los tribunales competentes de la Ciudad de México, Distrito Federal, renunciando expresamente a cualquier otro que les correspondiera ya sea en razón de la materia, domicilio o cuantía, en el presente o en el futuro.
                </li>
            </ol>
        </TermsContainer>
        <SignIUFooter><h4>Aditum Delta. © Derechos Reservados 2024</h4></SignIUFooter>
    </>
}
export default Terms;