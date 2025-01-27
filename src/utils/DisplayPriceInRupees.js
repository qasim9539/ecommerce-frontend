export const DisplayPriceInRupees = (price)=>{
    return new Intl.NumberFormat('en-PK',{
        style : 'currency',
        currency : 'PKR'
    }).format(price)
}