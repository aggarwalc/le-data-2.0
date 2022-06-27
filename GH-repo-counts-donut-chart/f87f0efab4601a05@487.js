import define1 from "./a33468b95d0b15b0@808.js";
import define2 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Simple Pie Chart`
)}

function _SelectY(select,d3){return(
select({value: 2022,
                        description: "Select Year",
                        options: d3.range(2008, 2023)})
)}

function _SelectM(select,months){return(
select({value: "May",
                        description: "Select Month",
                        options: months})
)}

function _months(SelectY)
{
  if (SelectY == 2022){
    return ["January", "February", "March",
            "April", "May"]
  }
  return ["January", "February", "March",
          "April", "May", "June",
          "July", "August", "September",
          "October", "November", "December"]
}


function _key(Legend,colors){return(
Legend(colors, {
  title: "Languages",
  width: 500
})
)}

function _pieChart(d3,sizes,SelectM,SelectY,repocounts,colors,arc)
{
  const svg = d3.create('svg').attr('height', sizes.height).attr('width', sizes.width)
  const container = svg.append('g').attr('transform', `translate(${sizes.width/2}, ${sizes.height/2})`)

  container.append("text")
        .attr("x", (svg.width / 2))
        .attr("y", (svg.height / 2))
        .attr('dy', '-0.3em')
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", 32)
        .attr("fill", "#3b82f6")
        .text(SelectM)
  container.append("text")
        .attr("x", (svg.width / 2))
        .attr("y", (svg.height / 2))
        .attr('dy', '0.6em')
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("font-size", 28)
        .attr("fill", "#60a5fa")
        .text(SelectY)



  const pie = d3.pie()
  const pieData = pie.value(d=> d.count)(repocounts)

  const segments = d3.arc()
    .innerRadius(150)
    .outerRadius(235)
    .padAngle(.5)
    .padRadius(3)
    .cornerRadius(3)

  //Rendering sections
  let sections = container.selectAll('path').data(pieData, d => d.data.language)
  sections.exit().remove()
  const sectionsEnter = sections.enter().append('path').attr("d", segments).attr('fill', d => colors(d.data.language))
  sections = sectionsEnter.merge(sections).data(pieData)

  sections
    .on('mouseover', function() {
      d3.select(this).transition().duration(500).attr('transform', 'scale(1.05)')
    })
    .on('mouseout', function() {
      d3.select(this).transition().duration(500).attr('transform', 'scale(1)');
    })

  container.append("g")
    .attr("font-family", "'Work sans', sans-serif")
    .attr("font-size", 13)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(pieData)
    .join("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.215).append("tspan")
        .attr("y", "-0.1em")
        .attr("font-weight", "800")
        .attr("fill", "white")
        .text(d => d.data.language));
  container.append("g")
    .attr("font-family", "'Work sans', sans-serif")
    .attr("font-size", 11)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(pieData)
    .join("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.215).append("tspan")
        .attr("y", "0.9em")
        .attr("font-weight", "800")
        .attr("fill", "white")
        .text(d => d.data.count));

  return svg.node()
}


function _7(md){return(
md`## Size`
)}

function _arc(d3){return(
d3.arc()
  .innerRadius(160)
  .outerRadius(235)
)}

function _sizes(){return(
{height: 500, width: 500}
)}

function _10(md){return(
md`## Data`
)}

function _data(FileAttachment){return(
FileAttachment("gh_top_monthly_results.csv").csv({typed: false})
)}

function _datause(data,SelectY,numMonth,parseMonth,SelectM){return(
data.filter(d => d.date.substring(0, 7) === SelectY.toString()+ "-" + numMonth(parseMonth(SelectM)))
)}

function _repocounts(languages,datause){return(
languages.flatMap(language => datause.map(d => ({date: d.date, language, count: d[language]})))
)}

function _languages(data)
{
  let cols = data.columns.slice(1)
  cols.unshift(cols.splice(7, 1)[0])
  return cols
}


function _15(md){return(
md`## Utils`
)}

function _colors(d3,languages){return(
d3.scaleOrdinal()
    .domain(languages)
    .range(["#D9D9D9","#756BB1","#636363","#6BAED6","#FD8D3C","#74C476","#9E9AC8","#969696","#9ECAE1",
            "#FDAE6B","#A1D99B","#BCBDDC"])
)}

function _parseMonth(d3){return(
d3.timeParse("%B")
)}

function _numMonth(d3){return(
d3.timeFormat("%m")
)}

function _d3(require){return(
require('d3')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["gh_top_monthly_results.csv", {url: new URL("https://raw.githubusercontent.com/aggarwalc/le-data-2.0-DATA/main/GitHub/gh-top/gh_top_monthly_results.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof SelectY")).define("viewof SelectY", ["select","d3"], _SelectY);
  main.variable(observer("SelectY")).define("SelectY", ["Generators", "viewof SelectY"], (G, _) => G.input(_));
  main.variable(observer("viewof SelectM")).define("viewof SelectM", ["select","months"], _SelectM);
  main.variable(observer("SelectM")).define("SelectM", ["Generators", "viewof SelectM"], (G, _) => G.input(_));
  main.variable(observer("months")).define("months", ["SelectY"], _months);
  main.variable(observer("key")).define("key", ["Legend","colors"], _key);
  main.variable(observer("pieChart")).define("pieChart", ["d3","sizes","SelectM","SelectY","repocounts","colors","arc"], _pieChart);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("arc")).define("arc", ["d3"], _arc);
  main.variable(observer("sizes")).define("sizes", _sizes);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("datause")).define("datause", ["data","SelectY","numMonth","parseMonth","SelectM"], _datause);
  main.variable(observer("repocounts")).define("repocounts", ["languages","datause"], _repocounts);
  main.variable(observer("languages")).define("languages", ["data"], _languages);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("colors")).define("colors", ["d3","languages"], _colors);
  main.variable(observer("parseMonth")).define("parseMonth", ["d3"], _parseMonth);
  main.variable(observer("numMonth")).define("numMonth", ["d3"], _numMonth);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.import("Swatches", child1);
  const child2 = runtime.module(define2);
  main.import("select", child2);
  return main;
}
