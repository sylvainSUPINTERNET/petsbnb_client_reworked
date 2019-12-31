import React from "react";

export default class AnnouncesCard extends React.Component {


    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>


                <div className="card card-cascade">
                    <div className="view view-cascade overlay">
                        <img className="card-img-top"
                             src="https://mdbootstrap.com/img/Photos/Others/men.jpg"
                             alt="Card image cap"/>
                        <a>
                            <div className="mask rgba-white-slight"></div>
                        </a>
                    </div>
                    <div className="card-body card-body-cascade text-center">
                        <h4 className="card-title"><strong>{this.props.announce.id}</strong></h4>
                        <h6 className="font-weight-bold indigo-text py-2">Web developer</h6>
                        <p className="card-text">
                            {
                                this.props.announce.description
                            }
                        </p>
                        <a type="button" className="btn-floating btn-small btn-fb"><i
                            className="fab fa-facebook-f"></i></a>
                        <a type="button" className="btn-floating btn-small btn-tw"><i
                            className="fab fa-twitter"></i></a>
                        <a type="button" className="btn-floating btn-small btn-dribbble"><i
                            className="fab fa-dribbble"></i></a>
                    </div>
                    <div className="card-footer text-muted text-center">
                        2 days ago
                    </div>
                </div>


            </div>

        )
    }

}
