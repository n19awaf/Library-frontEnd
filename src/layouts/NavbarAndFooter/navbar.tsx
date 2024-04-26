import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
export const Navbar = () => {

    const {oktaAuth, authState} = useOktaAuth();

    if (!authState){
        return <SpinnerLoading/>
    }

    const handleLogout = async () => oktaAuth.signOut();

    return(
        <nav className='navbar navbar-expand-lg navbar-dark navmain-color py-1'>
        <div className="container-fluid">
            <NavLink to="/home" className='navbar-brand'><img
                src={require("./../../Images/PublicImages/logo22.png")} width="110" height="70" alt="logo"/></NavLink>
            <span className='navbar-brand'>Nono 2 Read</span>
            <button className="navbar-toggler" type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropedown' aria-controls='navbarNavDropedown'
            aria-expanded='false' arai-label='Toggle Navigation'>
            <span className='navbar-toggler-icon'></span>
            </button>
            <div className="collapse navbar-collapse" id='navbarNavDropedown'>
            <ul className="navbar-nav">
                <li className="nav-item">
                <NavLink to="/home" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/search" className="nav-link">Search Books</NavLink>
                </li>
                {authState.isAuthenticated && 
                    <li className="nav-item">
                        <NavLink to="/shelf" className="nav-link">Shelf</NavLink>
                    </li>
                }
                                {authState.isAuthenticated && 
                    <li className="nav-item">
                        <NavLink to="/fees" className="nav-link">Pay Fees</NavLink>
                    </li>
                }
                {authState.isAuthenticated && authState.accessToken?.claims.userType === 'admin' &&
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin">Admin</NavLink>
                    </li>
                }

            </ul>
            <ul className="navbar-nav ms-auto">
                {!authState.isAuthenticated ?
                    <li className="nav-item m-1">
                    <Link type='button' to='/register' className='btn btn-outline-light btn-block mx-2'>Register</Link>
                    <Link type='button' to='/login' className='btn btn-outline-light btn-block mx-2'>Sign in</Link>
                    </li>
                :
                <li>
                    <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                </li>
                }
            </ul>
            </div>
        </div>
        </nav>
    );
}