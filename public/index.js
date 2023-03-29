function getColor(stock) {
  if (stock === "GME") {
    return "rgba(61, 161, 61, 0.7)";
  }
  if (stock === "MSFT") {
    return "rgba(209, 4, 25, 0.7)";
  }
  if (stock === "DIS") {
    return "rgba(18, 4, 209, 0.7)";
  }
  if (stock === "BNTX") {
    return "rgba(166, 43, 158, 0.7)";
  }
}

async function main() {
  //document.querySelector gets the canvas HTML element so we can refer to the canvas HTML element by the name timeChartCanvas, this HTML element is on line 15
  const timeChartCanvas = document.querySelector("#time-chart"); //timeChartCanvas is a variable, it refers to the canvas HTML element that has the id of time-chart
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );

  const stockData = await fetch(
    `https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=b2b0e11651294ee9a789558a1625b754`
  );

  const result = await stockData.json();
  console.log(result);

  // This is an example of "destructuring" an object
  // "Destructuring" creates new variables from an object or an array
  const { GME, MSFT, DIS, BNTX } = result;

  // const { GME, MSFT, DIS, BNTX } = mockData;

  //this is an array of stock prices, using the variable name stocks
  //so stocks is the name of the array
  const stocks = [GME, MSFT, DIS, BNTX];

  stocks.forEach((stock) => stock.values.reverse());

  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.reverse().map((value) => value.datetime),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.reverse().map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      })),
    },
  });

  console.log(stocks[0].values.map((value) => value.high));
  console.log(Math.max(...stocks[0].values.map((value) => value.high)));
  new Chart(highestPriceChartCanvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: stocks.map((stock) => stock.meta.symbol),
      datasets: [
        {
          label: "high",
          data: stocks.map((stock) =>
            //math.max is a function provided by javascript that finds the highest number in array, our array is highest stock price for each day spaaning 30 days.
            //... is the spread syntax, takes an array and expands it into individual elements
            //found math.max on the internet to do the same thing as my own custom written function, information on math.max showed the ...
            Math.max(...stock.values.map((value) => value.high))
          ),
          backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
        },
      ],
    },
  });
}

main();
