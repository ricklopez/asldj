import React, {Component} from "react";
import axios from "axios";
import * as env from "../../constants/app-environment";



export default class NameCellRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = { lobs: []};
    }

    componentDidMount() {
        const { id } = 1;

        const reqPromise = axios.get(`${env.AUTH_ROOT_URL}/catalyst-lobs`);


        reqPromise.then((r) => {
            const newState = {...this.state};
            newState.lobs = r.data;
            this.setState(newState, (r) => console.log(this.state));
        });


    }

    onChange = (e) => {
        console.log(this.props.actions);
        this.props.setValue(e.target.value);
    }


    render() {

        const optionsList = this.state.lobs.map((item, index) => {
            return <option key={item.lobId} value={item.internalCode}>{item.lob}</option>
        });

        return (
            <select value={this.props.value} onChange={this.onChange}>
                {optionsList}
            </select>
        );
    }
}
