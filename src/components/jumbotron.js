
import React from 'react';

export default (props) => {
    return(
        <div className="jumbotron jumbotron-fluid jumbotron-white">
            <div className="container">
                <h1 className="display-3 text-center">{ props.mainText }</h1>
                <p className="lead text-center">{ props.subText }</p>
            </div>
        </div>
    );
}