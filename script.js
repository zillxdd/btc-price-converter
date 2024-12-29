// Function to fetch current BTC price and update the UI
async function fetchBTCPrice() {
  const priceElement = document.getElementById("price");

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    const data = await response.json();
    const btcPrice = data.bitcoin.usd;

    priceElement.textContent = `1 BTC = $${btcPrice.toLocaleString()}`;
    return btcPrice;
  } catch (error) {
    console.error("Error fetching BTC price:", error);
    priceElement.textContent = "Error fetching price!";
  }
}

// Function to convert BTC to USD
async function convertBTC() {
  const btcAmount = document.getElementById("btc-amount").value;
  const resultElement = document.getElementById("result");
  const btcPrice = await fetchBTCPrice();

  if (!btcAmount || isNaN(btcAmount) || btcAmount <= 0) {
    resultElement.textContent = "Please enter a valid BTC amount.";
    return;
  }

  const usdValue = (btcAmount * btcPrice).toFixed(2);
  resultElement.textContent = `Result: $${usdValue.toLocaleString()}`;
}

// Fetch the BTC price when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchBTCPrice();

  const convertButton = document.getElementById("convert-btn");
  convertButton.addEventListener("click", convertBTC);
});
