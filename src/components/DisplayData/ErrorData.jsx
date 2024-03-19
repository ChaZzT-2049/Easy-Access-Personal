import styled from "styled-components"
import { firestoreErrors } from "../../firebase.errors";
const ErrorContent = styled.div`
    background: ${({theme}) => theme.errorcont};
    color: ${({theme}) => theme.onerrorcont};
    padding: 1rem;
    border-radius: .25rem;
    margin: 1rem auto;
    max-width: 600px;
    & hr{border-color: ${({theme}) => theme.error}; border-style: solid;}
`;
const ErrorData = ({message}) => {
    return <ErrorContent>
        <h4>{firestoreErrors[message] || message}</h4>
        <hr />
        <span>
            Intentalo mas tarde.
        </span>
    </ErrorContent>
}
export default ErrorData