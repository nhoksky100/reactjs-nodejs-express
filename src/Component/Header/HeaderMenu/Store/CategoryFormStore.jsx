import { t } from 'i18next';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import ScrollToggleMenu from './ScrollToggleMenu';
class CategoryFormStore extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    isChange = (event) => {
        var value = event.target.value;
        var name = event.target.name;
        console.log(value);
        this.props.getValueSortingName(value);
        this.setState({ [name]: value })

    }
    showFormMenuScroll = () => {
        return (
          <div className="scroll-toggle">
            <span style={{ display: 'contents' }}
              className='scroll-toggle__button scroll-toggle__button--left'>
              <i style={{marginLeft:'70px' }}
                className="fa fa-arrow-left " aria-hidden="true" />
            </span>
            {/* <button className="scroll-toggle__button scroll-toggle__button--left">
                    Scroll Left
                </button> */}
            <ul className="scroll-toggle__list ">
              <li id='Allproduct' className="scroll-toggle__list-item active">
                <label id="Allproduct" htmlFor="options"
    
                  className={" btn btn-default btn-sm  active"}>
                  <NavLink
                    activeClassName="active "
                    to='/store/allproduct'>
                    {t("all-products")}
                  </NavLink>
                </label>
                {/* <input type="radio" name="menuopt" id="drop1" />
                        <label className="opener" htmlFor="drop1">Parent item 1</label>
                        <label className="closer" htmlFor="dropclose">Parent item 1</label>
                        <ul>
                            <li><a href="#">Menu item 1</a></li>
                            <li><a href="#">Menu item 2</a></li>
                            <li><a href="#">Menu item 3</a></li>
                        </ul>
                        <input type="radio" name="menuopt" id="dropclose" /> */}
              </li>
    
              <li className="scroll-toggle__list-item">
                <label id="Smartphone" htmlFor="option2"
    
                  className={" btn btn-default btn-sm "}>
                  <NavLink
                    activeClassName="active "
                    to='/store/smartphone'>
                    {t("smartphone")}
                  </NavLink>
                </label>
              </li>
              <li className="scroll-toggle__list-item">
                <label id="Laptops"
    
                  className={" btn btn-default btn-sm "}>
                  <NavLink
                    activeClassName="active "
                    to='/store/laptop'>
                    {t("laptop")}
                  </NavLink>
                </label>
              </li>
              <li className="scroll-toggle__list-item">
                <label id="Tablets"
                  className={" btn btn-default btn-sm "}>
                  <NavLink
                    activeClassName="active "
                    to='/store/tablet'>
                    {t("tablet")}
                  </NavLink>
                </label>
    
              </li>
              <li className="scroll-toggle__list-item">
                <label id="TVAudio"
                  className={" btn btn-default btn-sm "}>
                  <NavLink
                    activeClassName="active "
                    to='/store/tvaudio'>
                    {t("tvaudio")}
                  </NavLink>
                </label>
              </li>
              <li className="scroll-toggle__list-item">
                <label id="Smartwatch"
                  className={" btn btn-default btn-sm "}>
    
                  <NavLink
                    activeClassName="active "
                    to='/store/smartwatch'>
                    {t("smartwatch")}
                  </NavLink>
                </label>
              </li>
              <li className="scroll-toggle__list-item">
                <label id="Accessories"
                  className={" btn btn-default btn-sm "}>
    
                  <NavLink
                    activeClassName="active "
                    to='/store/accessories'>
                    {t("accessories")}
                  </NavLink>
                </label>
              </li>
    
            </ul>
            <i className="fa fa-arrow-right scroll-toggle__button scroll-toggle__button--right" aria-hidden="true" />
            {/* <button className="scroll-toggle__button scroll-toggle__button--right">
                    Scroll Right
                </button> */}
          </div>
    
        )
      }
    // showFormMenu = () => {
    //     return (

    //         <div className="btn-group front-z" >

    //             <label id="Allproduct" htmlFor="options"

    //                 className={" btn btn-default btn-sm  active"}>
    //                 <NavLink
    //                     activeClassName="active "
    //                     to='/store/allproduct'>
    //                     {t("all-products")}
    //                 </NavLink>
    //             </label>

    //             <label id="Smartphone" htmlFor="option2"

    //                 className={" btn btn-default btn-sm "}>
    //                 <NavLink
    //                     activeClassName="active "
    //                     to='/store/smartphone'>
    //                     {t("smartphone")}
    //                 </NavLink>
    //             </label>

    //             <label id="Laptops"
    //                 //  onClick={(e) => this.Show_Caterogy_product(e)} 
    //                 className={" btn btn-default btn-sm "}>
    //                 <NavLink
    //                     activeClassName="active "
    //                     to='/store/laptop'>
    //                     {t("laptop")}
    //                 </NavLink>
    //             </label>

    //             <label id="Tablets"
    //                 className={" btn btn-default btn-sm "}>
    //                 <NavLink
    //                     activeClassName="active "
    //                     to='/store/tablet'>
    //                     {t("tablet")}
    //                 </NavLink>
    //             </label>

    //             <label id="TVAudio"
    //                 className={" btn btn-default btn-sm "}>
    //                 <NavLink
    //                     activeClassName="active "
    //                     to='/store/tvaudio'>
    //                     {t("tvaudio")}
    //                 </NavLink>
    //             </label>

    //             <label id="Smartwatch"
    //                 className={" btn btn-default btn-sm "}>
    //                 {/* <input type="radio" name="options" id="option5" /> */}
    //                 <NavLink
    //                     activeClassName="active "
    //                     to='/store/smartwatch'>
    //                     {t("smartwatch")}
    //                 </NavLink>
    //             </label>
    //             <label id="Accessories"
    //                 className={" btn btn-default btn-sm "}>
    //                 {/* <input type="radio" name="options" id="option5" /> */}
    //                 <NavLink
    //                     activeClassName="active "
    //                     to='/store/accessories'>
    //                     {t("accessories")}
    //                 </NavLink>
    //             </label>
    //         </div>
    //     )
    // }
    render() {

        return (
            <div>
                <hr className="offset-top" />
                <div className="tags">
                    <div className="container">
                        <div className="btn-group pull-right sorting">

                          

                                {/* <span>Sorting by name</span> */}
                                <div className="custom-select" style={{ width: '200px' }}>

                                    <select onChange={(event) => this.isChange(event)} name='selectName' ref={'selectName'}>
                                        <option value="#">{t("sort-by-Name")}:</option>
                                        <option value="#A-Z">{t("name")} [A-Z]</option>
                                        <option value="#Z-A">{t("name")} [Z-A]</option>
                                        <option value="#Price-Low-High">{t("price")} [{t("low-high")}]</option>
                                        <option value="#Price-High-Low">{t("price")} [{t("high-low")}]</option>

                                    </select>
                                </div>

                            


                        </div>
                        <span style={{ display: 'flex', marginBottom: '20px' }}>{t("search-the-tag")}</span>
                       <ScrollToggleMenu formMenuToggle={this.showFormMenuScroll()}/>
                       
                    </div>
                </div>
            </div >

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        getValueSortingName: (value_action) => {
            dispatch({ type: 'valueSorttingName', value_action })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryFormStore)
