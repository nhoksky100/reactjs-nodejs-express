
 export const SearchDateProduct = (dataOrderProduct,dateTimeStart,dateTimeEnd) => {

    dateTimeStart = new Date(dateTimeStart);
    dateTimeEnd = new Date(dateTimeEnd);
  
    var pushItem = [];
   
    if (dataOrderProduct) {
        dataOrderProduct.map((value) => {
           
            var dateTime = new Date(value.dateTime);

            if (dateTime >= dateTimeStart && dateTime <= dateTimeEnd) {

                pushItem.push(value);
                
            }
            return dataOrderProduct
        })
      
    }
    return pushItem;
}


