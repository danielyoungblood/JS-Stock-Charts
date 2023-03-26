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

  let GME = result.GME;
  let MSFT = result.MSFT;
  let DIS = result.DIS;
  let BTNX = result.BTNX;

  const stocks = [GME, MSFT, DIS, BTNX];

  // Bonus Note:
  // Another way to write the above lines would to refactor it as:
  // const {GME, MSFT, DIS, BTNX} = result
  // This is an example of "destructuring" an object
  // "Destructuring" creates new variables from an object or an array

  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.map((value) => value.datetime),
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
  });
}

main();
