import React, {Component} from "react";
import axios from "axios";
import * as env from "../../constants/app-environment";
import moment from 'moment';

export default class DateCellRender extends Component {
    constructor(props) {
        super(props);
    }




    render() {

        const dataDisplay = moment(this.props.value).format('MMMM Do YYYY, h:mm:ss a');
        return (
            <time> {dataDisplay}</time>
        );
    }
}

