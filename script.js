//eslint-disable-next-line strict

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line strict
  'use strict';

  const inputs = document.querySelectorAll('input'),
    currency = document.getElementById('currency'),
    usdcurrency = document.getElementById('usdcurrency'),
    usdcurrency1 = document.getElementById('usdcurrency1'),
    rub = document.getElementById('rub'),
    rub1 = document.getElementById('rub1'),
    converter1 = document.getElementById('converter1'),
    converter2 = document.getElementById('converter2'),
    labels = document.querySelectorAll('label');


  let typeCurrency = 'USD';

  const getData = () => fetch('https://www.cbr-xml-daily.ru/daily_json.js');

  const convertToRub = (typeCurrency, usd, eur) => {
    if (typeCurrency === 'USD') {
      rub.value = usd * usdcurrency.value;
    } else if (typeCurrency === 'EUR') {
      rub.value = eur * usdcurrency.value;
    }
  };

  const convertRub = (typeCurrency, usd, eur) => {
    if (typeCurrency === 'USD') {
      usdcurrency1.value = rub1.value / usd;
    } else if (typeCurrency === 'EUR') {
      usdcurrency1.value = rub1.value / eur;
    }
  };

  const eventListeners = (typeCurrency, usd, eur) => {
    inputs.forEach(item => {
      item.addEventListener('input', event => {
        const target = event.target;
        target.value = target.value.replace(/[^0-9]/g, '');
      });
    });

    currency.addEventListener('change', () => {
      typeCurrency = currency.value;
      if (typeCurrency === 'USD') {
        labels[0].innerText = 'Доллар США (USD)';
        labels[3].innerText = 'Доллар США (USD)';
      } else {
        labels[0].innerText = 'Евро (EUR)';
        labels[3].innerText = 'Евро (EUR)';
      }
    });

    converter1.addEventListener('click', () => {
      convertToRub(typeCurrency, usd, eur);
      console.log(1);
    });

    converter2.addEventListener('click', () => {
      convertRub(typeCurrency, usd, eur);
      console.log(2);
    });
  };

  getData()
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Server not found');
      }
      return response.json();
    })
    .then(response => {
      let usd = 0,
        eur = 0;
      console.log(response.Valute);
      usd = response.Valute.USD.Value;
      eur = response.Valute.EUR.Value;
      eventListeners(typeCurrency, usd, eur);
    })
    .catch(error => {
      console.error(error);
    });

});
