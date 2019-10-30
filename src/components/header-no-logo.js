import React from 'react';
import { authContext } from '../adlConfig';
import logo from "../logo.png";
import { Link } from 'react-router-dom';
export default (props) => {
    return(
        <div className="App">
            <header className="App-header">
                <div className="row">
                    <div className="col float-left my-3">
                        Hello, {props.user.profile.given_name}
                    </div>
                    <div className="col float-right my-3">
                        <a onClick={() => authContext.logOut()}>
                        Logout
                    </a>
                    </div>
                </div>
            </header>
        </div>
    );
}