import React from 'react';
import { authContext } from '../adlConfig';
import logo from "../logo.png";
import {Link} from "react-router-dom";

export default (props) => {
    return(
        <div className="App">
            <header className="App-header">
                <div className="row">
                    <div className="col float-left my-2">
                        <Link to="/" >
                        <img src={logo} className="kraken-logo-main"  id="octopusLogo" alt="logo" />
                        </Link>
                    </div>
                    <div className="col float-right my-3">
                        {props.user.profile.given_name + '  '}    | {'  '}
                        <span onClick={() => authContext.logOut() }>Logout
                    </span>
                    </div>
                </div>
            </header>
        </div>
    );
}