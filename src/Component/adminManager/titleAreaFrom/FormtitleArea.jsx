import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import { NavLink } from 'react-router-dom';

class FormtitleArea extends Component {
    render() {
        var { managerTitle = '', managerName = '', urlAdd = '', imageAdd = '', urlRating = '',
            imageRating = '', urlList = '', imageList = '', urlExcelFile = '', imageExcelFile = '', dataExport = '' } = this.props;
           
        return (
            <div className="titleArea">
                <div className="wrapper">
                    <div className="pageTitle">
                        {/* titleArea */}
                        <h5>{managerTitle}</h5>
                        {/* managerName */}
                        <span>{managerName}</span>
                    </div>
                    <div className="horControlB menu_action">
                        <ul>
                            {
                                urlAdd !== '' || imageAdd !== ''

                                    ? (<li>
                                        <NavLink to={urlAdd}>
                                            <img src={imageAdd} alt='' />
                                            <span>Thêm mới</span>
                                        </NavLink>
                                    </li>)
                                    : ''
                            }

                            {
                                urlRating !== '' || imageRating !== ''

                                    ? (<li>
                                        <NavLink to={urlRating}>
                                            <img src={imageRating} alt='' />
                                            <span>Tiêu biểu</span>
                                        </NavLink>
                                    </li>)
                                    : ''
                            }

                            {/* list */}
                            {
                                urlList !== '' || imageList !== ''
                                    ? (<li>
                                        <NavLink to={urlList}>
                                            <img src={imageList} alt='' />
                                            <span>Danh sách</span>
                                        </NavLink>
                                    </li>)
                                    : ''
                            }
                            {
                                urlExcelFile !== '' || imageExcelFile !== ''
                                    ? (
                                    <li>
                                        <span className='span-exportExcel'>

                                            <img src={imageExcelFile} alt='' />
                                            <span>  <CSVLink data={dataExport} filename={'fileName'}> Xuất file excel</CSVLink></span>
                                        </span>
                                    </li>)
                                    : ''
                            }
                        </ul>
                    </div>
                    <div className="clear" />
                </div>
            </div>
        );
    }
}

export default FormtitleArea;