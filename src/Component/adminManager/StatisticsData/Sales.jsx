import axios from 'axios';
import React, { Component } from 'react';
import { FormatNumber } from '../../FormatNumber.jsx';
import { randomId } from '../RandomId/randomId.jsx';
import { toast } from 'react-toastify';


const getDataSales = () => axios.get('/salesDate').then((res) => res.data);
const getDataCheckout = () => axios.get('/checkout').then((res) => res.data)
class Sales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // time: {}, seconds: 1, 
            dataDeal: [],
            flagDayState: true, priceDay: 0, priceMonth: 0, priceYear: 0, priceTotal: 0, priceDayTeamp: 0,
            //dateTime:
            dateTime: '',
            isRefresh: false,


        }
        // this.timer = 0;
        // this.startTimer = this.startTimer.bind(this);
        // this.countDown = this.countDown.bind(this);


    }

    dataCheckout = () => {
        getDataCheckout().then((res) => {
            if (res) {
                this.setState({ dataDeal: res })
            }

        })
    }
    dataSales = () => {
        getDataSales().then((res) => {
            if (res) {
                this.setState({
                    priceDay: res.priceDay,
                    priceMonth: res.priceMonth,
                    priceYear: res.priceYear,
                    priceTotal: res.priceTotal,
                    priceDayTeamp: res.priceDayTeamp,

                })
            }
        })

    }
    componentDidMount() {
        // this.checkDealDate();
        this.dataSales()
        this.dataCheckout()
        this.getDateTime()

        // this.updateSales()

    }

    getDateTime = (isRefresh) => {
        axios.get('http://worldtimeapi.org/api/ip').then((response) => {
            var { datetime } = response.data;
            // var formattedDateTime = new Date(datetime).toLocaleString('vi-VN');
            var today = new Date(datetime);

            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();

            // var tomorrow = new Date(today);
            // tomorrow.setDate(tomorrow.getDate() + 1);
            this.setState({
                day: day,
                month: month,
                year: year,
                isRefresh: isRefresh
            });

        }).catch((error) => {
            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            this.setState({
                day: day,
                month: month,
                year: year,
            })
            // console.log('loi', error);
        });

    }


    updateSales = (priceDay, day, month, priceDayTeamp) => {
        var { priceMonth, priceYear, priceTotal } = this.state
        if (day === 1 && month === 1) {

            priceMonth = priceDay;
            priceYear = priceDay;
            priceTotal += priceDay;
        }
        //reset month
        else if (day === 1) {
            priceMonth = priceDay;

        } else {

            //+day
            priceMonth += priceDay;
            priceYear += priceDay;
            priceTotal += priceDay;


        }

        axios.post('/salesDate', { priceDay, priceDayTeamp, priceMonth, priceYear, priceTotal })

    }




    selesPrice = () => {
        // up priceDay sales
        var { day, month, year, dataDeal, priceDay, priceDayTeamp } = this.state

        if (dataDeal) {
            var dayCurrent = [], monthCurrent = [], yearCurrent = [];
            var dayShipping = '', isPrice = false, isPriceDay = false
            dataDeal.map((value, key) => {
                dayShipping = new Date(value.dayShipping)
                dayCurrent[key] = parseInt(dayShipping.getDate());
                monthCurrent[key] = parseInt(dayShipping.getMonth() + 1);
                yearCurrent[key] = parseInt(dayShipping.getFullYear());

                if (day !== undefined && month !== undefined && year !== undefined) {
                    if (day > dayCurrent[key] || month > monthCurrent[key] || year > yearCurrent[key]) {
                        isPriceDay = true
                    }
                    else if (day === dayCurrent[key] && month === monthCurrent[key] && year === yearCurrent[key]) {
                        // today
                        if (value.statisticsKey) {

                            // statisticsKey được bật khi đơn hàng đã gửi & giao dịch thành công |
                            //  giá trị sales được tính trong ngày sau 0h00 sẽ cập nhật sales
                            priceDay += parseInt(value.price);
                            isPrice = true

                        }
                    }
                }
                // return dataDeal

            })
            if (isPrice) {
                var priceTeamp = 0
                priceTeamp = priceDay
                priceDay -= priceDayTeamp
                priceDayTeamp = priceTeamp
                this.updateSales(priceDay, day, month, priceDayTeamp)
            }
            else if (isPriceDay) {

                this.updateSales(0, day, month, 0)
            }


            // return priceDay

        }


    }
    // checkDealDate = () => {

    //     var today = new Date();

    //     var hours = today.getHours();
    //     var minutes = today.getMinutes();
    //     var sec = today.getSeconds();

    //     // Time reset day 
    //     var hoursCurrent = 23, minutesCurrent = 59, secondsCurrent = 59;
    //     minutesCurrent -= minutes;
    //     hoursCurrent -= hours;
    //     secondsCurrent -= sec;

    //     var sTemp = minutesCurrent * 60;
    //     var { seconds } = this.state;
    //     seconds = hoursCurrent * 60 * 60;
    //     seconds += sTemp + secondsCurrent;
    //     // var upday = UpdateDateTime();
    //     // seconds = 10;
    //     var timeLeftVar = this.secondsToTime(this.state.seconds);
    //     this.setState({
    //         time: timeLeftVar,
    //         seconds: seconds,


    //     });


    // }
    // startTimer() {
    //     if (this.timer === 0 && this.state.seconds > 0) {
    //         this.timer = setInterval(this.countDown, 1000);
    //     }

    // }
    // secondsToTime(secs) {
    //     var year = Math.floor(secs / (60 * 60 * 24 * 365.24));

    //     var divisor_month = secs % (60 * 60 * 24 * 365.24);
    //     var month = Math.floor(divisor_month / (60 * 60 * 24 * 30.44));

    //     var divisor_day = secs % (60 * 60 * 24 * 30.44);
    //     var day = Math.floor(divisor_day / (60 * 60 * 24));
    //     var divisor_hours = secs % (60 * 60 * 24);
    //     var hours = Math.floor(divisor_hours / (60 * 60));

    //     var divisor_for_minutes = secs % (60 * 60);
    //     var minutes = Math.floor(divisor_for_minutes / 60);

    //     var divisor_for_seconds = divisor_for_minutes % 60;
    //     var seconds = Math.ceil(divisor_for_seconds);

    //     var obj = {
    //         "y": year,
    //         "mo": month,
    //         "d": day,
    //         "h": hours,
    //         "m": minutes,
    //         "s": seconds
    //     };
    //     return obj;
    // }

    // countDown() {
    //     // Remove one second, set state so a re-render happens.
    //     var seconds = this.state.seconds - 1;

    //     this.setState({
    //         time: this.secondsToTime(seconds),
    //         seconds: seconds,

    //     });

    //     // Check if we're at zero.
    //     if (seconds <= 0) {

    //         clearInterval(this.timer);

    //         // return axios json 

    //         var { priceMonth, priceYear, priceTotal, priceDay } = this.state
    //         // dateTime = new Date(dateTime);

    //         // var priceDay = 0
    //         //  this.selesPrice()
    //         axios.post('/salesDate', { priceDay, priceMonth, priceYear, priceTotal }).then(res => {

    //             priceMonth = res.data.priceMonth;
    //             priceYear = res.data.priceYear;
    //             priceTotal = res.data.priceTotal;
    //             this.setState({
    //                 priceMonth: priceMonth,
    //                 priceYear: priceYear,
    //                 priceTotal: priceTotal,
    //             })
    //         })
    //     }
    // }

    refreshDateTime = () => {
        this.getDateTime(true)
        this.selesPrice()
        var { isRefresh } = this.state
        if (isRefresh) {
            toast(
                <div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />
                    <i>Tải dữ liệu API dateTime thành công</i>
                </div>
            )
        }
    }

    showForm = () => {
        this.selesPrice()
        var { priceMonth, priceYear, priceTotal, priceDayTeamp } = this.state;

        return (
            <div className="widget">
                <div className="title">
                    <img src="../admin/images/icons/dark/money.png" className="titleIcon" alt='' />
                    <h6>Doanh số

                    </h6>
                    <span style={{ float: 'right', position: 'relative', top: '5px', right: '10px' }}>
                        <i onClick={() => this.refreshDateTime()} style={{ cursor: 'pointer' }}
                            title='Tải lại dữ liệu ngày tháng API' className="fa fa-refresh" aria-hidden="true" />

                    </span>
                    {/* <span style={{ float: 'right' }}>  <b style={{ color: 'black' }}> h: {this.state.time.h} m: {this.state.time.m} s: {this.state.time.s} </b></span> */}
                </div>
                <table cellPadding={0} cellSpacing={0} width="100%" className="sTable myTable">
                    <tbody>
                        <tr>
                            <td className="fontB blue f13">Tổng doanh số</td>
                            <td className="textR webStatsLink red" style={{ width: '120px' }}>
                                {
                                    priceTotal !== 0 ? FormatNumber(priceTotal)
                                        : FormatNumber(priceDayTeamp)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="fontB blue f13">Doanh số hôm nay

                            </td>
                            <td className="textR webStatsLink red" style={{ width: '120px' }}>{FormatNumber(priceDayTeamp)}</td>
                        </tr>
                        <tr>
                            <td className="fontB blue f13">Doanh số theo tháng</td>
                            <td className="textR webStatsLink red" style={{ width: '120px' }}>
                                {
                                    priceMonth !== 0 ? FormatNumber(priceMonth)
                                        : '0.00'
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="fontB blue f13">Doanh số theo Năm</td>
                            <td className="textR webStatsLink red" style={{ width: '120px' }}>
                                {
                                    priceYear !== 0 ? FormatNumber(priceYear)
                                        : '0.00'

                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )


    }
    render() {

        return (
            <div className="oneTwo">
                {this.showForm()}
                <span title='ghi chú' className="tipClick">
                    <a href="#tooltip">®</a>
                    <strong style={{ left: '0' }} className="tooltipT">
                        <p> 'Danh số hôm nay' sẽ được tính khi giao dịch thành công & đã thanh toán & đã gửi hàng cho khách! </p>

                        <span><a href="#closeTooltip">✕</a></span>
                        {/* <span className="arrow" /> */}
                    </strong>

                </span>

            </div>
        );
    }
}

export default Sales;