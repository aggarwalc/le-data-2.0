import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Stack Overflow Scatter Plot`
)}

function _xSelect(select,tags){return(
select({title: "X-axis",
                         value: "python",
                         description: "Select Tag",
                         options: tags})
)}

function _ySelect(select,tags){return(
select({title: "Y-axis",
                         value: "c#",
                         description: "Select Tag",
                         options: tags})
)}

function _Regline(checkbox,reg){return(
checkbox({
  description: "R-squared: " + reg.rSquared,
  options: ["Regression Line"]
})
)}

function _prediction(md,ySelect,guess){return(
md`Prediction for ${ySelect}: ${guess}`
)}

function _Predict(text,xSelect,ySelect){return(
text({
  placeholder: "Enter % for " + xSelect,
  description: `Predict ${ySelect}% based on ${xSelect}%`})
)}

function _scatter_plot(d3,xScale,yScale,DOM,size,margin,xGrid,yGrid,xSelect,ySelect,points,Regline,reg)
{
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  const svg = d3.select(DOM.svg(size.width, size.height));

  svg.append("rect")
    .attr("fill", "#F0F0F0")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", size.width - margin.left - margin.right)
    .attr("height", size.height - margin.top - margin.bottom);
  svg.append('g').call(xGrid);
  svg.append('g').call(yGrid);
  svg.append('g')
  		.attr('transform', `translate(0, ${size.height - margin.bottom})`)
    	.call(xAxis)
      .style("font", "14px var(--sans-serif)")
      .call(g => g.append("text")
          .style("font", "bold 15px var(--sans-serif)")
          .attr("x", 880)
          .attr("y", -10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(xSelect + ' %'));
  svg.append('g')
    	.attr('transform', `translate(${margin.left}, 0)`)
    	.call(yAxis)
      .style("font", "14px var(--sans-serif)")
      .call(g => g.append("text")
          .style("font", "bold 15px var(--sans-serif)")
          .attr("x", 10)
          .attr("y", 30)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(ySelect + ' %'));
  svg.append("g")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.8)
      .selectAll("circle")
      .data(d3.zip(points[0], points[1]))
      .enter().append("circle")
        .style('fill-opacity', 0.8)
        .attr("cx", d => xScale(d[0]))
        .attr("cy", d => yScale(d[1]))
    	  .attr('fill', "#60a5fa")
        .attr("r", 4.7);
  if (Regline) {
    svg.append("line")
      .attr("class", "regression")
      .style("stroke", "#3b82f6")
      .style("stroke-width", 1.2)
      .datum(reg)
      .attr("x1", d => xScale(d[0][0]))
      .attr("x2", d => xScale(d[1][0]))
      .attr("y1", d => yScale(d[0][1]))
      .attr("y2", d => yScale(d[1][1]));
  }

  return svg.node();
}


function _guess(Predict,reg)
{
  if (Predict === ""){
    return ""
  }
  else {
    return Predict * reg.a + reg.b + "%"
  }
}


function _reg(linearRegression,d3,points){return(
linearRegression(d3.zip(points[0], points[1]).map(([a, b]) => ({"x":a, "y":b})))
)}

function _linearRegression(d3,points){return(
d3.regressionLinear()
  .x(d => d.x)
  .y(d => d.y)
  .domain([0, 1.05 * d3.max(points[0])])
)}

function _size(){return(
{width: 900, height: 500}
)}

function _margin(){return(
{top: 12, right: 10, bottom: 20, left: 34}
)}

async function _data(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("all_tags_results.csv").text(), d3.autoType).slice(1,)
)}

function _tags(data){return(
Array.from(new Set(data.map(d => d.tag))).sort()
)}

function _points(rank){return(
rank()
)}

function _x_arr(xSelect,data)
{
  if (xSelect === "swift"){
    return data.filter(d => d.tag === xSelect).map(d => d.percent).slice(62,)
  }
  else{
    return data.filter(d => d.tag === xSelect).map(d => d.percent)
  }
}


function _y_arr(ySelect,data)
{
  if (ySelect === "swift"){
    return data.filter(d => d.tag === ySelect).map(d => d.percent).slice(62,)
  }
  else{
    return data.filter(d => d.tag === ySelect).map(d => d.percent)
  }
}


function _xScale(d3,points,margin,size){return(
d3.scaleLinear()
			.domain([0, 1.05 * d3.max(points[0])])
			.range([margin.left, size.width - margin.right])
)}

function _yScale(d3,points,size,margin){return(
d3.scaleLinear()
			.domain([0, 1.05 * d3.max(points[1])])
			.range([size.height - margin.bottom, margin.top])
)}

function _xGrid(size,margin,d3,xScale){return(
g => g
  .attr("transform", `translate(0,${size.height - margin.bottom})`)
  .call(d3.axisBottom(xScale).tickSize(-size.height + margin.top + margin.bottom))
  .call(g => g.select(".domain").remove())
  .call(g => g.selectAll("text").remove())
  .call(g => g.selectAll("line").attr("stroke", "white"))
)}

function _yGrid(margin,d3,yScale,size){return(
g => g
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(yScale).tickSize(-size.width + margin.left + margin.right))
  .call(g => g.select(".domain").remove())
  .call(g => g.selectAll("text").remove())
  .call(g => g.selectAll("line").attr("stroke", "white"))
)}

function _rank(x_arr,y_arr){return(
function rank(){
  var x
  var y

  if (x_arr.length > y_arr.length) {
      x = x_arr.slice(x_arr.length - y_arr.length, x_arr.length)
      y = y_arr
  }
  else if (x_arr.length < y_arr.length) {
      y = y_arr.slice(y_arr.length - x_arr.length, y_arr.length)
      x = x_arr
  }
  else {
      x = x_arr
      y = y_arr
  }

  return [x, y];
}
)}

function _d3(require){return(
require('d3@7', 'd3-regression')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["all_tags_results.csv", {url: new URL("https://raw.githubusercontent.com/aggarwalc/le-data-2.0-DATA/main/Stack-Overflow/all-tags/all_tags_results.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof xSelect")).define("viewof xSelect", ["select","tags"], _xSelect);
  main.variable(observer("xSelect")).define("xSelect", ["Generators", "viewof xSelect"], (G, _) => G.input(_));
  main.variable(observer("viewof ySelect")).define("viewof ySelect", ["select","tags"], _ySelect);
  main.variable(observer("ySelect")).define("ySelect", ["Generators", "viewof ySelect"], (G, _) => G.input(_));
  main.variable(observer("viewof Regline")).define("viewof Regline", ["checkbox","reg"], _Regline);
  main.variable(observer("Regline")).define("Regline", ["Generators", "viewof Regline"], (G, _) => G.input(_));
  main.variable(observer("prediction")).define("prediction", ["md","ySelect","guess"], _prediction);
  main.variable(observer("viewof Predict")).define("viewof Predict", ["text","xSelect","ySelect"], _Predict);
  main.variable(observer("Predict")).define("Predict", ["Generators", "viewof Predict"], (G, _) => G.input(_));
  main.variable(observer("scatter_plot")).define("scatter_plot", ["d3","xScale","yScale","DOM","size","margin","xGrid","yGrid","xSelect","ySelect","points","Regline","reg"], _scatter_plot);
  main.variable(observer("guess")).define("guess", ["Predict","reg"], _guess);
  main.variable(observer("reg")).define("reg", ["linearRegression","d3","points"], _reg);
  main.variable(observer("linearRegression")).define("linearRegression", ["d3","points"], _linearRegression);
  main.variable(observer("size")).define("size", _size);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], _data);
  main.variable(observer("tags")).define("tags", ["data"], _tags);
  main.variable(observer("points")).define("points", ["rank"], _points);
  main.variable(observer("x_arr")).define("x_arr", ["xSelect","data"], _x_arr);
  main.variable(observer("y_arr")).define("y_arr", ["ySelect","data"], _y_arr);
  main.variable(observer("xScale")).define("xScale", ["d3","points","margin","size"], _xScale);
  main.variable(observer("yScale")).define("yScale", ["d3","points","size","margin"], _yScale);
  main.variable(observer("xGrid")).define("xGrid", ["size","margin","d3","xScale"], _xGrid);
  main.variable(observer("yGrid")).define("yGrid", ["margin","d3","yScale","size"], _yGrid);
  main.variable(observer("rank")).define("rank", ["x_arr","y_arr"], _rank);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("select", child1);
  main.import("checkbox", child1);
  main.import("text", child1);
  return main;
}
