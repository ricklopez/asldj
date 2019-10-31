import React, {Component} from "react";
import axios from "axios";
import * as env from "../../constants/app-environment";

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


        const lobs = JSON.parse(sessionStorage.getItem('qq.catalyst-lobs'));

        if(lobs === null ||lobs.length < 1){
            const reqPromise = axios.get(`${env.AUTH_ROOT_URL}/catalyst-lobs`, {headers});
            reqPromise.then((r) => {
                const newState = {...this.state};
                newState.lobs = r.data;
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
    }


    render() {

        const optionsList = this.state.lobs.map((item, index) => {
            return <option key={index} value={item.internalCode}>{item.lob}</option>
        });


        return (
            <select value={this.props.value} onChange={this.onChange}>
                {optionsList}
            </select>
        );
    }
}
