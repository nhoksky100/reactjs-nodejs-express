

export const ExChangeRate = (pricePricent, currencyDefault, currencyRate) => {
    
    if (!currencyRate) {
        return pricePricent

    }
    else {

        var rateExchenge = 0;
        var rateConvert = 0;
        pricePricent = parseFloat(pricePricent);
        rateExchenge = parseFloat(currencyRate[1]);
       
        currencyDefault[1] = parseFloat(currencyDefault[1]);
       
        // currencyDefault[0] = rateExchengeCode;
        // currencyDefault[1] = rateExchenge;
        return rateConvert = (pricePricent * rateExchenge) / currencyDefault[1];
       

    }

}
