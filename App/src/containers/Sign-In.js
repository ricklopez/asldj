import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn } from '../actions/sign-in-actions';
import './Sign-In.css';
import CoreHeader from '../components/header';
import SignInForm from '../components/sign-in-form';
import Jumbotron from '../components/jumbotron';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            useremail: '',
            password: ''
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onUserEmailInputChange = this.onUserEmailInputChange.bind(this);
        this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    }

    onUserEmailInputChange(event) {
        this.setState({ useremail: event.target.value });
        console.log(this.state.useremail)
    }

    onPasswordInputChange(event) {
        this.setState({ password: event.target.value });
        console.log(this.state.password)
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.signIn({useremail: this.state.useremail, password: 'password'});
        this.setState({ useremail: '', password: ''});
        this.props.history.push('/dashboard');

    }

    render() {
        return (
            <div>
                <CoreHeader></CoreHeader>
                <Jumbotron
                    mainText="QQ Kraken"
                    subText="A Simple QQ Migrations Manager"
                >
                </Jumbotron>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-6">
                            <h2 className="text-center">Sign In</h2>
                            <SignInForm
                                onFormSubmit ={ this.onFormSubmit }
                                useremail ={ this.state.useremail }
                                password ={ this.state.password }
                                onUserEmailInputChange={ this.onUserEmailInputChange }
                                onPasswordInputChange ={ this.onPasswordInputChange }
                            >
                            </SignInForm>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signIn
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignIn);