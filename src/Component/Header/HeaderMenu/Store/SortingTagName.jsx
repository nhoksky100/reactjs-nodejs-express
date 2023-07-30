export const sorting =(hashSort,data)=>{
 
    switch (hashSort) {
        
        case '#A-Z':
            data = data.sort((a, b) => parseInt(b.date_time) - parseInt(a.date_time)).reverse();
            // this.setState({ data: data })
            return data;

        case '#Z-A':
            data = data.sort((a, b) => parseInt(a.date_time) - parseInt(b.date_time)).reverse();
            // this.setState({ data: data })
            return data;

        case '#Price-Low-High':
            data = data.sort((a, b) => parseInt(b.product_complate_price) - parseInt(a.product_complate_price)).reverse();
            // this.setState({ data: data })
            return data;

        case '#Price-High-Low':
            data = data.sort((a, b) => parseInt(a.product_complate_price) - parseInt(b.product_complate_price)).reverse();
            // this.setState({ data: data })
            return data

        default:
            return data;
    }
}
