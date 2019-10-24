import React from 'react';
import {Button, Container, Form} from "react-bootstrap";

import {default as Api} from '../../api/index';
import {default as GlobalConfiguration} from "../../globalConfiguration";
import Cookie from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';
import {apiConfiguration, jwtConfiguration} from "../../api/config";


export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        // can use this into the method
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        Api
            .authenticationLogin(this.state)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    const {exp} = jsonwebtoken.decode(response.data.token, jwtConfiguration.secret);
                    Cookie
                        .set("accessToken", response.data.token,{ expires: exp, secure: GlobalConfiguration.cookiesConfiguration.secure });

                    // TODO => redirection
                }
            })
            .catch(e => console.log(e))

        // TODO request avec axios
    }

    render() {
        return (
            <div>
                <Container>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Adresse email *</Form.Label>
                            <Form.Control type="email" placeholder="Votre email" required
                                          onChange={this.onChangeEmail}/>
                            <Form.Text className="text-muted">
                                Cette email ne sera pas divulgué sur notre application.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Mot de passe" required
                                          onChange={this.onChangePassword}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Se connecter
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}