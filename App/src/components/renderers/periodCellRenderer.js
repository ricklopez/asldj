import React, {Component} from "react";
import axios from "axios";
import * as env from "../../constants/app-environment";

let sessionKey = sessionStorage.getItem('adal.idtoken');

export default class PeriodCellRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = { periods: []};
    }

    componentDidMount() {

        const headers = {
            Authorization: `Bearer ${sessionKey}`
        };

        const periods = JSON.parse(sessionStorage.getItem('qq.catalyst-periods'));

        if(periods === null || periods.length < 1){
            const reqPromise = axios.get(`${env.AUTH_ROOT_URL}/catalyst-periods`, {headers});
            reqPromise.then((r) => {
                const newState = {...this.state};
                newState.periods = r.data;
                this.setState(newState, () => sessionStorage.setItem('qq.catalyst-periods',  JSON.stringify(this.state.periods)));
            });
        }else {
            const newState = {...this.state};
            newState.periods = periods;
            this.setState(newState, () => sessionStorage.setItem('qq.catalyst-periods',  JSON.stringify(this.state.periods)));
        }

    }

    onChange = (e) => {
        this.props.setValue(e.target.value);
    }


    render() {

        const optionsList = this.state.periods.map((item, index) => {
            return <option key={index} value={item.periodValue}>{item.periodName}</option>
        });

        return (
            <select value={this.props.value} onChange={this.onChange}>
                {optionsList}
            </select>
        );
    }
}
