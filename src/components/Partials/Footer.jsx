import React from "react";

export default class Footer extends React.Component {


    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                <footer className="bg-dark text-white mt-4">
                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-md-3">
                                <h5>Footer</h5></div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3"></div>
                            <div className="col-md-3"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-3 text-right small align-self-end">©2017 Brand, Inc.</div>
                        </div>
                    </div>
                </footer>
            </div>

        )
    }

}
