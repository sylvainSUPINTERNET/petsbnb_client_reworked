import React from 'react';
import Api from '../../api/index';
import Footer from '../../components/Partials/Footer';
import {withRouter} from "react-router-dom";
import {getLoadingText} from '../LoaderSettings';
import LoadingOverlay from 'react-loading-overlay';

class AnnouncesProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            delay: 1000,

            announce: {}
        };
    }


    componentDidMount() {
        // url
        const {uuid} = this.props.match.params;

        // call APIs
        setTimeout( () => {
            this.getAnnounce(uuid);
        }, this.state.delay)
    }

    

    async getAnnounce(uuid) {
        try {
            const {data, status} = await Api.Announces.getOne(uuid);

            if (status === 200) {
                this.setState({
                    announce: data,
                    isLoading: false
                });
            } else {
                // todo -> error
                this.setState({
                    isLoading: false
                })
            }

        } catch (e) {
            // todo -> error
            this.setState({
                isLoading: false
            });
            console.log("error -> ", e)
        }
    }


    render() {
        return (
            <div>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text={getLoadingText()}>

                    <div className="container white darken-4 rounded-1 p-4 mt-2">
                        {
                            JSON.stringify(this.state.announce)
                        }
                    </div>

                </LoadingOverlay>


                <Footer></Footer>

            </div>
        )

    }
}


export default withRouter(AnnouncesProfile);
