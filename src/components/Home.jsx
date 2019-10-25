import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};


    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group controlId="formSearchAnnounce">
                                <Form.Label>Localiastion</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formSelectAnimalType">
                                <Form.Label>Type d'animaux</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formSelectService">
                                <Form.Label>Service</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>

                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
