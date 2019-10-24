import React from 'react';
import {Container} from "react-bootstrap";



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };


    }
    render() {
        return (
            <div>
                <Container>
                    <p>HOME</p>
                </Container>
            </div>
        )
    }
}