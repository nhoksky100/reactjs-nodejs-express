import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search';

class HeaderMid extends Component {


  render() {

    return (
      <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
        <div className="container">
          <div className="row">
            {/* Begin Header Logo Area */}
            <div className="row">
              <div className="header-inline pb-sm-30 pb-xs-30">
                <div className='logo'>
                  <NavLink to="/">
                    <img src="../assets/img/menu/logo/ishop-logo2.png" alt="" />
                  </NavLink>
                </div>

                <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
                  <div className="header-middle-right">


                    <ul 
                    // className="hm-menu"
                    >
                      <Search />



                      {/* Header Mini Cart Area End Here */}
                    </ul>
                  </div>
                  {/* Header Middle Right Area End Here */}
            
                </div>
              </div>
            </div>


            {/* Header Middle Right Area End Here */}
          </div>
        </div>
      </div>

    );
  }
}

export default HeaderMid

