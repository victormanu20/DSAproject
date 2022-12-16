const API = 'https://www.datos.gov.co/resource/vy9n-w6hc.json'
const inputPoyectEolico = document.getElementById('proyect-eolicos')
const inputPoyectSolar = document.getElementById('proyect-solar')
const pricePoyectEolico = document.getElementById('total-price-eolicos')
const pricePoyectSolar = document.getElementById('total-price-solar')

const callApi = async (api) =>{
    data = await fetch(api);
    res = await data.json();
    return res;
}
function currencyFormatter({ currency, value}) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      currency
    }) 
    return formatter.format(value)
  }

const getElements = async () =>{
    const data = await callApi(API)
    const eolico = data.filter(element =>{
        return element.tipo == 'Eólico'
    })
    const solar = data.filter(element =>{
        return element.tipo == 'Solar'
    })
    inputPoyectEolico.textContent = eolico.length
    inputPoyectSolar.textContent = solar.length

    const totalSolar =solar.reduce((acum,item)  =>{
        return acum + parseInt(item.inversi_n_estimada_cop)
    },0)
    const totalEolico =eolico.reduce((acum,item)  =>{
        return acum + parseInt(item.inversi_n_estimada_cop)
    },0)

    console.log(totalEolico)

    const  parsetotalEolico =  currencyFormatter({
        currency: "CLP",
        value:totalEolico
      }) 
      const  parsetotalSolar=  currencyFormatter({
        currency: "CLP",
        value:totalSolar
      }) 

    console.log(parsetotalEolico)
    
    pricePoyectEolico.textContent = `$ ${parsetotalEolico}`;
    pricePoyectSolar.textContent = `$ ${parsetotalSolar}`;

}



getElements()