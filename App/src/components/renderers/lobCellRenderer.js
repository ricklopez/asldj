import React, {Component} from "react";
import axios from "axios";
import * as env from "../../constants/app-environment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

let sessionKey = sessionStorage.getItem('adal.idtoken');

export default class LobCellRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {lobs: []};
    }

    componentDidMount() {

        const headers = {
            Authorization: `Bearer ${sessionKey}`
        };

        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            const itemA = a.lob.toUpperCase();
            const itemB = b.lob.toUpperCase();

            let comparison = 0;
            if (itemA > itemB) {
                comparison = 1;
            } else if (itemA < itemB) {
                comparison = -1;
            }
            return comparison;
        }


        const lobs = JSON.parse(sessionStorage.getItem('qq.catalyst-lobs'));

        if(lobs === null ||lobs.length < 1){
            const reqPromise = axios.get(`${env.AUTH_ROOT_URL}/catalyst-lobs`, {headers});
            reqPromise.then((r) => {
                const newState = {...this.state};
                newState.lobs = r.data.sort(compare);
                this.setState(newState, () => sessionStorage.setItem('qq.catalyst-lobs',  JSON.stringify(this.state.lobs)));
            });
        }else {
            const newState = {...this.state};
            newState.lobs = lobs;
            this.setState(newState, () => sessionStorage.setItem('qq.catalyst-lobs',  JSON.stringify(this.state.lobs)));
        }

    }

    onChange = (e) => {
        this.props.setValue(e.target.value);
    };


    render() {

        const optionsList = this.state.lobs.map((item, index) => {
            return <option key={index} value={item.internalCode}>{item.lob}</option>
        });

        const shouldSpin = this.state.lobs.length <    1;

        return (
            <React.Fragment>
                {shouldSpin ? (
                    <FontAwesomeIcon icon="spinner" spin/>) : (
                    <select value={this.props.value} onChange={this.onChange}>
                        <option key="null" value="null">Please Select</option>
                        {optionsList}
                    </select>
                )}
            </React.Fragment>);
    }
}
