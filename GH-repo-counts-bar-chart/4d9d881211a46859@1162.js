import define1 from "./a33468b95d0b15b0@808.js";
import define2 from "./7a9e12f9fb3d8e06@459.js";
import define3 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Stacked Bar Chart
`
)}

function _Select(select,options){return(
select({value: "All Years",
                        description: "Select Data",
                        options: options})
)}

function _key(Legend,chart){return(
Legend(chart.scales.color, {
  title: "Languages",
  width: 500
})
)}

function _chart(StackedBarChart,repocounts,d3,languages,width){return(
StackedBarChart(repocounts, {
  x: d => d.date,
  y: d => d.count,
  z: d => d.language,
  xDomain: d3.groupSort(repocounts, D => d3.sum(D, d => +d.count), d => d.date),
  yLabel: "GitHub Repository Count",
  zDomain: languages,
  colors: ["#D9D9D9","#756BB1","#636363","#6BAED6","#FD8D3C","#74C476","#9E9AC8","#969696","#9ECAE1","#FDAE6B","#A1D99B","#BCBDDC"],
  width,
  height: 500
})
)}

function _options(d3)
{
  let arr = d3.range(2021, 2007, -1)
  arr.unshift("All Years")
  return arr
}


function _data(Select,FileAttachment)
{
  if (Select === "All Years"){
    var file = FileAttachment("gh_top_yearly_results.csv").csv({typed: true})
  }
  else {
    file = FileAttachment("gh_top_monthly_results.csv").csv({typed: false})
  }
  return file
}


function _datause(Select,data)
{
  if (Select === "All Years"){
    data.splice(14,1)
    return data
  }
  return data.filter(d => d.date.substring(0,4) === Select.toString())
}


function _languages(data)
{
  let cols = data.columns.slice(1)
  cols.unshift(cols.splice(7, 1)[0])
  return cols
}


function _repocounts(languages,datause){return(
languages.flatMap(language => datause.map(d => ({date: d.date, language, count: d[language]})))
)}

function _StackedBarChart(d3,Select){return(
function StackedBarChart(data, {
  x = (d, i) => i, // given d in data, returns the (ordinal) x-value
  y = d => d, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  title, // given d in data, returns the title text
  marginTop = 30, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 85, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 1000, // outer height, in pixels
  xDomain, // array of x-values
  xRange = [marginLeft, width - marginRight], // [left, right]
  xPadding = 0.1, // amount of x-range to reserve to separate bars
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  zDomain, // array of z-values
  offset = d3.stackOffsetDiverging, // stack offset method
  order = d3.stackOrderNone, // stack order method
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  colors = d3.schemeTableau10, // array of colors
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);

  // Compute default x- and z-domains, and unique them.
  if (xDomain === undefined) xDomain = X;
  if (zDomain === undefined) zDomain = Z;
  xDomain = new d3.InternSet(xDomain);
  zDomain = new d3.InternSet(zDomain);

  // Omit any data not present in the x- and z-domains.
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));

  // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
  // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
  // each tuple has an i (index) property so that we can refer back to the
  // original data point (data[i]). This code assumes that there is only one
  // data point for a given unique x- and z-value.
  const series = d3.stack()
      .keys(zDomain)
      .value(([x, I], z) => Y[I.get(z)])
      .order(order)
      .offset(offset)
    (d3.rollup(I, ([i]) => i, i => X[i], i => Z[i]))
    .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));

  // Compute the default y-domain. Note: diverging stacks can be negative.
  if (yDomain === undefined) yDomain = d3.extent(series.flat(2));

  // Construct scales, axes, and formats.
  const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
  if (Select !== "All Years") {
    var xScale1 = d3.scaleBand(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                               "Oct", "Nov", "Dec"], xRange).paddingInner(xPadding);
  }
  else {
    xScale1 = xScale
  }
  const yScale = yType(yDomain, yRange);
  const color = d3.scaleOrdinal(zDomain, colors);
  const xAxis = d3.axisBottom(xScale1).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

  // Compute titles.
  if (title === undefined) {
    const formatValue = yScale.tickFormat(100, yFormat);
    title = i => `${Z[i]}\n${formatValue(Y[i])}`;
  } else {
    const O = d3.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .style("font", "14px var(--sans-serif)")
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .style("font", "bold 15px var(--sans-serif)")
          .attr("x", -marginLeft)
          .attr("y", 15)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel));

  const bar = svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("fill", ([{i}]) => color(Z[i]))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x" , ({i}) => xScale(X[i]))
      .attr("y", ([y1, y2]) => Math.min(yScale(y1), yScale(y2)))
      .attr("height", ([y1, y2]) => Math.abs(yScale(y1) - yScale(y2)))
      .attr("width", xScale.bandwidth());

  if (title) bar.append("title")
      .text(({i}) => title(i));

  svg.append("g")
      .attr("transform", `translate(0,${yScale(0)})`)
      .style("font", "14px var(--sans-serif)")
      .call(xAxis);

  return Object.assign(svg.node(), {scales: {color}});
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["gh_top_yearly_results.csv", {url: new URL("https://raw.githubusercontent.com/aggarwalc/le-data-2.0-DATA/main/GitHub/gh-top/gh_top_yearly_results.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["gh_top_monthly_results.csv", {url: new URL("https://raw.githubusercontent.com/aggarwalc/le-data-2.0-DATA/main/GitHub/gh-top/gh_top_monthly_results.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof Select")).define("viewof Select", ["select","options"], _Select);
  main.variable(observer("Select")).define("Select", ["Generators", "viewof Select"], (G, _) => G.input(_));
  main.variable(observer("key")).define("key", ["Legend","chart"], _key);
  main.variable(observer("chart")).define("chart", ["StackedBarChart","repocounts","d3","languages","width"], _chart);
  main.variable(observer("options")).define("options", ["d3"], _options);
  main.variable(observer("data")).define("data", ["Select","FileAttachment"], _data);
  main.variable(observer("datause")).define("datause", ["Select","data"], _datause);
  main.variable(observer("languages")).define("languages", ["data"], _languages);
  main.variable(observer("repocounts")).define("repocounts", ["languages","datause"], _repocounts);
  main.variable(observer("StackedBarChart")).define("StackedBarChart", ["d3","Select"], _StackedBarChart);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.import("Swatches", child1);
  const child2 = runtime.module(define2);
  main.import("howto", child2);
  main.import("altplot", child2);
  const child3 = runtime.module(define3);
  main.import("select", child3);
  return main;
}
