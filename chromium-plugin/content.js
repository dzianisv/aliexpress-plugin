const pluginName = 'Aliexpress Helper';

function getPriceInNumber(priceStr) {
  // List of possible 'Free' translations
  const freeTranslations = ['free', 'бесплатно']; // Add more translations as needed

  // If the price is free in any language, return 0
  if (freeTranslations.includes(priceStr.trim().toLowerCase())) {
    return 0;
  }

  // List of possible currency codes
  const currencyCodes = ['US $', 'BYN', 'RUB', 'EUR', 'YEN'];

  let price = priceStr;

  // Remove currency code if it exists
  for (let i = 0; i < currencyCodes.length; i++) {
    if (priceStr.includes(currencyCodes[i])) {
      price = priceStr.replace(currencyCodes[i], '');
      break;
    }
  }

  // Parse the price as a floating point number
  return parseFloat(price);
}

window.addEventListener('load', (event) => {
  try {
    const goodPriceElement = document.querySelector('div[class*="HazeProductPrice__priceMain__"]');
    const deliveryPriceElement = document.querySelector('div.HazeProductDelivery_DeliveryMethodItem__item__1gbbr p span');

    if (!goodPriceElement || !deliveryPriceElement) {
      console.log(`${pluginName}: One or more elements not found.`);
      return;
    }

    const goodPrice = getPriceInNumber(goodPriceElement.innerText);
    const deliveryPrice = getPriceInNumber(deliveryPriceElement.innerText);
    console.log(`${pluginName}: item price: ${goodPrice}, delivery cost: ${deliveryPrice}`);
    const totalPrice = goodPrice + deliveryPrice;

    const priceDisplay = document.createElement('div');
    priceDisplay.style.fontSize = '20px';
    priceDisplay.style.color = 'red';
    priceDisplay.textContent = `Total Price: ${totalPrice.toFixed(2)}`;  // Removed currency code here

    goodPriceElement.parentNode.insertBefore(priceDisplay, goodPriceElement.nextSibling);
  } catch (error) {
    console.error(`${pluginName}: An error occurred.`, error);
  }
});
