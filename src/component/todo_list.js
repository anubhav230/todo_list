import React, { Component } from 'react';
import {
    Card, CardHeader, CardBody,
    Row,
    Col

} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
class ActiveEvents extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            dataField: 'id',
            text: 'ID',
        }];

        this.state = {
            todo_list: [],
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: '' }}>
                <div style={{ width: '30%' }}>
                    <Card>
                        <CardHeader></CardHeader>
                        <CardBody></CardBody>
                    </Card>
                    <Row>
                        <form id="create-form">
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Title: </span>
                                    <input class="form-control" type="text"
                                    />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Desvription: </span>
                                    <input class="form-control" type="text"
                                    />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Due date: </span>
                                    <input class="form-control" type="text"
                                    />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Tag </span>
                                    <input class="form-control" type="text"
                                    />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Status </span>
                                    <input class="form-control" type="text"/>
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </Col>
                        </form>
                    </Row>
                    <button className="btn btn-primary btn-sm radius-md"><span>Submit</span></button>
                </div>
                <div>
                </div>
            </div>
        )
    }
}

export default ActiveEvents;