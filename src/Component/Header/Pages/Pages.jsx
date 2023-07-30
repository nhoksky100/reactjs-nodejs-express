import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
const dataSidePages = () => axios.get('/getdata_pages').then((res) => res.data)

class Pages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPages: null
        }
    }

    componentDidMount() {
        if (!this.state.dataPages) {
            dataSidePages().then((res) => {
                this.setState({ dataPages: res })
            })
        }
    }
    showForm = () => {
        var { dataPages } = this.state;
        if (dataPages) {
            var category = ''; var url = './';
            return dataPages.map((value, key) => {
                 
                category = url + value.category
              
                return (
                    <div key={key} className="col-xs-12 col-sm-6 col-md-3">
                        <div className="box">

                            {value.slide_pages.indexOf('data:image') !== -1
                                ? <NavLink to={category}>
                                    <img src={value.slide_pages} alt="Background" className="background " /></NavLink>
                                : <NavLink to={category }><img src={'./admin/upload/pages/' + value.slide_pages} alt="Background" className="background " /></NavLink>

                            }
                        </div>
                    </div>
                )
            })
        }
    }
    render() {

        return (
            <Fragment>
                <div className='container' id='pages'>
                    <div className="row">
                        {this.showForm()}
                        {/* <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="box">
                                <p>class="col-xs-12 col-sm-6 col-md-3"</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="box">
                                <p>class="col-xs-12 col-sm-6 col-md-3"</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="box">
                                <p>class="col-xs-12 col-sm-6 col-md-3"</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <div className="box">
                                <p>class="col-xs-12 col-sm-6 col-md-3"</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Pages;