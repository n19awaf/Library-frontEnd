import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heros = () => {

    const {authState} = useOktaAuth();

    return (
        <div>
            <div className="d-none d-lg-block">
                <div className="row g-0 mt-5">
                <div className="col-sm-6 col-md-6">
                    <div className="col-image-left"></div>
                </div>
                <div className="col-4 col-md-4 container d-flex justify-content-center align-item-center">
                    <div className="ml-2">
                    <h1>What have you been reading?</h1>
                    <p className="lead">
                        The library team would love to know what have been reading.
                        whether it is to learn a new skill or grow within one, we will
                        be able to provide the top content for you!
                    </p>
                    {authState?.isAuthenticated ? 
                        <Link type="button" className="btn main-color btn-lg text-white" to='search' >Explore top books</Link>
                        :
                        <Link to="/login" className="btn main-color btn-lg text-white">Sign up</Link>
                    }
                    </div>
                </div>
                </div>
                <div className="row g-0">
                    <div className="col-4 col-md-4 container d-flex jsutify-content-center align-item-center">
                        <div className="ml-2">
                            <h1 className="mt-3">Our collection is always changing!</h1>
                            <p className="lead">
                                Try to check in daily as our collection is always changing!
                                we work nonstop to provide the most accurate book slection possible 
                                for our luv 2 Read student! We are diligent about our book slection
                                and our books are always going to be our 
                                top pririty.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>
            {/** Mobile Heros */}
            <div className="div d-lg-none">
                <div className="container">
                    <div className="m-2">
                        <div className="col-image-left"></div>
                            <div className="mt-2">
                                <h1>What have you been reading?</h1>
                                <p className="lead">
                                    The library team would love to know what have been reading.
                                    whether it is to learn a new skill or grow within one, we will
                                    be able to provide the top content for you!
                                </p>
                                {authState?.isAuthenticated ? 
                                    <Link type="button" className="btn main-color btn-lg text-white" to='search' >Explore top books</Link>
                                    :
                                    <Link to="/login" className="btn main-color btn-lg text-white">Sign up</Link>
                                }
                            </div>
                        </div>
                        <div className="m-2">
                            <div className="col-image-right"></div>
                            <div className="mt-2">
                                <h1 className="mt-3">Our collection is always changing!</h1>
                                <p className="lead">
                                    Try to check in daily as our collection is always changing!
                                    we work nonstop to provide the most accurate book slection possible 
                                    for our luv 2 Read student! We are diligent about our book slection
                                    and our books are always going to be our 
                                    top pririty.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};
