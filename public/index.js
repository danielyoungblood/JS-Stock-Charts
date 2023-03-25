async function main() {
  //document.querySelector gets the canvas HTML element so we can refer to the canvas HTML element by the name timeChartCanvas, this HTML element is on line 15
  const timeChartCanvas = document.querySelector("#time-chart"); //timeChartCanvas is a variable, it refers to the canvas HTML element that has the id of time-chart
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );
}

main();
