import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { connect } from 'react-redux';


class NotPage404 extends Component {
    constructor(props) {
        super(props);
        this.state={
            showAppStatus:false
        }
        // this.goBack = this.goBack.bind(this); 
    }
    
    // goBack(){
    //     this.props.history.goBack();
    // }
    // componentWillUpdate(nextProps, nextState) {
    //     this.props.is_status_app();
    // }
    comback =()=>{
        window.history.back();
    }
    render() {
     var isExact =this.props.match.isExact
      if(isExact===false){
        //  no available url exists
          this.props.isAppShow(false);
      }
       // alert('co 404');
        return (
            <div>
                
                <h1 className="text-center">404 page!</h1>
                <a onClick={()=>this.comback()} title='comback'  className="btn btn-info center"><i className="fa fa-arrow-left" aria-hidden="true"/></a>
                {/* { onClick={()=>window.history.go(-1)} } */}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
      
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        isAppShow: (ac_isApp) => {
            dispatch({type:'isAppShow',ac_isApp})
        }
    }
}
 export default connect(mapStateToProps, mapDispatchToProps)(NotPage404)