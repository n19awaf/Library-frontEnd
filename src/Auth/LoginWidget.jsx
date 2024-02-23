import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import OktaSignInWidget from "./OktaSignInWidget";

const LoginWedget = ({config}) => {
    const {oktaAuth, authState} = useOktaAuth();
    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log('Sign in error: ', err);
    }

    if (!authState){
        return(<SpinnerLoading/>);
    }
    //provided by Okta
    return authState.isAuthenticated ?
    <Redirect to= {{ pathname:'/'}}/>
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>
}

export default LoginWedget;