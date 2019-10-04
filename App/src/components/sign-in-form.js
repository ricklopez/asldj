import React from 'react';

export default (props) => {
    return(
        <form onSubmit={props.onFormSubmit}>
            <div className="form-group">
                <input className="form-control" type="email" value={props.useremail} onChange={props.onUserEmailInputChange}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="password" value={props.password} onChange={props.onPasswordInputChange}/>
            </div>
            <div className="form-group">
                <input className="btn btn-outline-info btn-lg btn-block" type="submit" />
            </div>
        </form>
    );
}