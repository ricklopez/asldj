import React from 'react';


export default (props) => {
    return(
        <div>
            <div className="form-check">
                <label className="form-check-label">
                    <input
                        data-id={props['data-id']}
                        disabled={ props.active ? false : true }
                        className="form-check-input"
                        type="radio"
                        name={props.name}
                        id={"task_" + props.id}
                        value={props.value}
                        complete={props.complete}
                        onClick={props.onClick}
                    />
                    {props.name} : {props.description} | {props.complete}
                </label>
            </div>
        </div>
    );
}