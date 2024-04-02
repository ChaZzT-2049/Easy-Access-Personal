import styled from "styled-components"
import { firestoreErrors } from "../../firebase/firebase.errors";
const ErrorContent = styled.div`
    background: ${({theme}) => theme.errorcont};
    color: ${({theme}) => theme.onerrorcont};
    padding: 1rem;
    border-radius: .25rem;
    margin: 1rem auto;
    max-width: 600px;
    & hr{border-color: ${({theme}) => theme.error}; border-style: solid;}
`;
const ErrorData = ({title, message}) => {
    return <ErrorContent>
        <h4>{firestoreErrors[title] || title}</h4>
        <hr />
        <p>
            {message}
        </p>
        Intentalo mas tarde.
    </ErrorContent>
}
export default ErrorData