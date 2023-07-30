import axios from 'axios';
import React, { Component } from 'react';
import { FormatNumber } from '../../FormatNumber.jsx';


const getDateSalesDate = () => axios.get('/salesDate').then((res) => res.data);
class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: {}, seconds: 1, dataDeal: [],
            flagDayState: true, priceDay: 0, priceMonth: 0, priceYear: 0, priceTotal: 0,

        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }


    componentDidMount() {
        this.checkDealDate();
        // update price sales

        if (getDateSalesDate()) {

            getDateSalesDate().then((res) => {

                this.setState({
                    priceMonth: res.priceMonth,
                    priceYear: res.priceYear,
                    priceTotal: res.priceTotal,

                })

            })
        }
        this.startTimer()

    }
    componentWillUnmount() {
        // this.setState({dataDetal:null})
    }

    selesPrice = () => {
        // up priceDay sales
        // this.startTimer();
        var { dataDeal } = this.props;





        if (dataDeal) {

            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var year = today.getFullYear();

            var priceDay = 0, dayCurrent = [], monthCurrent = [], yearCurrent = [];

            var dete = ''

            dataDeal.map((value, key) => {
                dete = new Date(value.dayShipping)
                
                dayCurrent[key] = parseInt(dete.getDate());
                monthCurrent[key] = parseInt(dete.getMonth() + 1);
                yearCurrent[key] = parseInt(dete.getFullYear());

                if (day === dayCurrent[key] && month === monthCurrent[key] && year === yearCurrent[key]) {
                    if (value.statisticsKey) {
                        // statisticsKey được bật khi đơn hàng đã gửi & giao dịch thành công |
                        //  giá trị sales được tính trong ngày sau 0h00 sẽ cập nhật sales
                        priceDay += parseInt(value.price);

                    }

                }
                return dataDeal

            })


        }
        return priceDay

    }
    checkDealDate = () => {

        var today = new Date();

        var hours = today.getHours();
        var minutes = today.getMinutes();
        var sec = today.getSeconds();

        // Time reset day 
        var hoursCurrent = 23, minutesCurrent = 59, secondsCurrent = 59;
        minutesCurrent -= minutes;
        hoursCurrent -= hours;
        secondsCurrent -= sec;

        var sTemp = minutesCurrent * 60;
        var { seconds } = this.state;
        seconds = hoursCurrent * 60 * 60;
        seconds += sTemp + secondsCurrent;
        // var upday = UpdateDateTime();
        // seconds = 10;
        var timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({
            time: timeLeftVar,
            seconds: seconds,


        });


    }
    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }

    }
    secondsToTime(secs) {
        var year = Math.floor(secs / (60 * 60 * 24 * 365.24));

        var divisor_month = secs % (60 * 60 * 24 * 365.24);
        var month = Math.floor(divisor_month / (60 * 60 * 24 * 30.44));

        var divisor_day = secs % (60 * 60 * 24 * 30.44);
        var day = Math.floor(divisor_day / (60 * 60 * 24));
        var divisor_hours = secs % (60 * 60 * 24);
        var hours = Math.floor(divisor_hours / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        var obj = {
            "y": year,
            "mo": month,
            "d": day,
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }



    countDown() {
        // Remove one second, set state so a re-render happens.
        var seconds = this.state.seconds - 1;

        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,

        });

        // Check if we're at zero.
        if (seconds <= 0) {

            clearInterval(this.timer);

            // return axios json 

            var dateTime = new Date();
            var { priceMonth, priceYear, priceTotal } = this.state;
            var priceDay = this.selesPrice()
            axios.post('/salesDate', { dateTime, priceDay, priceMonth, priceYear, priceTotal }).then(res => {

                priceMonth = res.data.priceMonth;
                priceYear = res.data.priceYear;
                priceTotal = res.data.priceTotal;
                this.setState({
                    priceMonth: priceMonth,
                    priceYear: priceYear,
                    priceTotal: priceTotal,
                })
            })
        }
    }



    showForm = () => {

        var { priceMonth, priceYear, priceTotal } = this.state;
        var priceDay = 0

        priceDay = this.selesPrice()

        return (
            <div className="widget">
                <div className="title">
                    <img src="../admin/images/icons/dark/money.png" className="titleIcon" alt='' />
                    <h6>Doanh số
                       
                    </h6>
                    {/* <span style={{ float: 'right' }}>  <b style={{ color: 'black' }}> h: {this.state.time.h} m: {this.state.time.m} s: {this.state.time.s} </b></span> */}
                </div>
                <table cellPadding={0} cellSpacing={0} width="100%" className="sTable myTable">
                    <tbody>
                        <tr>
                            <td className="fontB blue f13">Tổng doanh số</td>
                            <td className="textR webStatsLink red" style={{ width: '120px' }}>
                                {
                                    priceTotal !== 0 ? FormatNumber(priceTotal)
                                        : FormatNumber(priceDay)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="fontB blue f13">Doanh số hôm nay</td>
                            <td className="textR webStatsLink red" style={{ width: '120px' }}>{FormatNumber(priceDay)}</td>
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


            </div>
        );
    }
}

export default Sales;