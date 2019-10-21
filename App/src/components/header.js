import React from 'react';
import { authContext } from '../adlConfig';

export default (props) => {
    return(
        <div className="App">
            <header className="App-header">
                <a onClick={() => authContext.logOut()}>
                    Logout
                </a>
            </header>
        </div>
    );
}