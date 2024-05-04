import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";


export const LibraryServices = () => {

    const {authState} = useOktaAuth();

    return(
        //the my-5 class is used to add margin (space) on the y-axis (top and bottom) around an element
        <div className="container my-5">
            {/*p-4: This class sets padding on all sides of the element*/}
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-7 p-3">
                    {/*display-4: This class sets the font size of the text to be larger than normal
                    //fw-bold: This class sets the font weight of the text to bold*/}
                    <h1 className="display-4 fw-bold">
                        Can's find what you are looking for?
                    </h1>
                    {/*lead is used to style a paragraph of text to make it stand out and appear larger than normal body text*/}
                    <p className="lead">
                        if you connet find what you are looking for,
                        send our library admin's a personal message!
                    </p>
                    <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
                        {authState?.isAuthenticated ? 
                            <Link to='/message' type="button" className="btn main-color btn-lg px-4 me-md-2 fw-bold text-white">Library Services</Link>
                        :
                        <Link to='/login' className="btn main-color btn-lg text-white ">
                            Sign up
                        </Link>
                        }
                        
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
            </div>
        </div>
    );
}