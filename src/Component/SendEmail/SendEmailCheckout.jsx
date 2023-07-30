
import { send } from 'emailjs-com';
import { toast } from 'react-toastify';

export const  SendEmailCheckout = (dataCheckOut) => {
    // this.refs.messageReply.value = "";
    // var { messageReply } = this.state;
    // var { dataSupportReply } = this.props;
    const pushItem = [];
    dataCheckOut.map((value) => {
        pushItem.push(value);
        return dataCheckOut
    })
    // console.log('push2:', pushItem[0]);
    const profile = JSON.parse(localStorage.getItem('tokenProfileCustomer'));

    const data = {
        to_email: profile.email,
        from_name: 'Ishop',
        to_name: profile.name,
        message: [pushItem[0].tradingCode, pushItem[0].id], // port 2 array
        reply_to: 'nhoksky100@gmail.com', // send support admin
    };
    send('service_q2c9y4h', 'template_56t8hbo', data, 'user_1Zgrt13xMD2pw9OVJI6E4')
    toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />
        <i>{'Email sent successfully!'}</i></div>)




}

// export  default SendEmailCheckout;