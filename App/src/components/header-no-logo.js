import React from 'react';
import { authContext } from '../adlConfig';

export default (props) => {
    return(
        <div className="App">
            <header className="App-header">
                <div className="row">
                    <div className="col float-left my-3">
                        Hello, {props.user.profile.given_name}
                    </div>
                    <div className="col float-right my-3">
                        <span onClick={() => authContext.logOut()}>
                        Logout
                    </span>
                    </div>
                </div>
            </header>
        </div>
    );
}