import define1 from "./848ede03e6b8a9d1@163.js";
import define2 from "./2f5bc64de12c3563@867.js";

function _chart(d3,width,height,addWebFont,background,x,gradient1,gradient2,data2,area,areaMirror,data,values,labels,percentages)
{
  const svg = d3.create('svg')
      .attr('viewBox', [0, 0, width, height])
      .call(addWebFont, 'Lato', 'https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2')
      .call(addWebFont, 'Lato-Bold', 'https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2')
      .attr('style', `
        background-color: ${background};
        font-family: 'Lato';
      `);

  svg.append('linearGradient')
    .attr('id', 'temperature-gradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', x(1)).attr('y1', 0)
    .attr('x2', x(3)).attr('y2', 0)
    .selectAll('stop')
      .data([
        {offset: '0%', color: gradient1 },
        {offset: '100%', color: gradient2 },
      ])
    .enter().append('stop')
      .attr('offset', function(d) { return d.offset; })
      .attr('stop-color', function(d) { return d.color; });

  svg.append('path')
      .datum(data2)
      .attr('fill', 'url(#temperature-gradient)')
      .attr('d', area);

  svg.append('path')
    .datum(data2)
    .attr('fill', 'url(#temperature-gradient)')
    .attr('d', areaMirror);

  svg.selectAll('.values')
    .data(data)
    .enter()
    .append('text')
      .attr('class', 'values')
      .attr('x', ({ step }) => x(step) + 5)
      .attr('y', 30)
      .text(({ value }) => d3.format(',')(value))
      .attr('style', `
        fill: ${values};
        font-size: 15px;
      `);

  svg.selectAll('.labels')
    .data(data)
    .enter()
    .append('text')
      .attr('class', 'labels')
      .attr('x', ({ step }) => x(step) + 5)
      .attr('y', 50)
      .text(({ language }) => language)
      .attr('style', `
          fill: ${labels};
          font-family: 'Lato-Bold';
          font-size: 12px;
      `);


  svg.selectAll('line')
    .data(d3.range(2, data.length + 1))
    .enter()
    .append('line')
      .attr('x1', value => x(value))
      .attr('y1', 10)
      .attr('x2', value => x(value))
      .attr('y2', height - 30)
      .style('stroke-width', 1)
      .style('stroke', percentages)
      .style('fill', 'none');

  return svg.node();
}


function _2(md){return(
md`# Funnel Chart

A D3 clone of [FunnelGraph.js](https://github.com/greghub/funnel-graph-js)`
)}

function _background(colorPicker,pickrOptions){return(
colorPicker('white', undefined, pickrOptions)
)}

function _gradient1(colorPicker,pickrOptions){return(
colorPicker('#d9d3d0', undefined, pickrOptions)
)}

function _gradient2(colorPicker,pickrOptions){return(
colorPicker('#8864b0', undefined, pickrOptions)
)}

function _labels(colorPicker,pickrOptions){return(
colorPicker('#7c54cc', undefined, pickrOptions)
)}

function _values(colorPicker,pickrOptions){return(
colorPicker('black', undefined, pickrOptions)
)}

function _percentages(colorPicker,pickrOptions){return(
colorPicker('#8f73c7', undefined, pickrOptions)
)}

function _ledge(html){return(
html `<input type="range" min="0", max="0.2" step="0.01" value="0"/>`
)}

function _curve(d3){return(
d3.curveCatmullRom.alpha(0.999999999)
)}

function _data2(data,ledge)
{
  const result = [];
  data.forEach((point, index) => {
    const { step, value } = point;
    if (index !== 0) {
      result.push({ step: step - ledge, value });
    }
    result.push(point);
    if (index !== data.length - 1) {
      result.push({ step: step + ledge, value });
    } else {
      result.push({ step: step + 1, value });
    }
  })
  return result;
}


function _height(){return(
800
)}

function _margin(){return(
{top: 20, right: 20, bottom: 30, left: 30}
)}

function _x(d3,data2,margin,width){return(
d3.scaleUtc()
    .domain(d3.extent(data2, ({step}) => step))
    .range([margin.left, width - margin.right])
)}

function _y(d3,data,height,margin){return(
d3.scaleLinear()
    .domain([-d3.max(data, ({value}) => value), d3.max(data, ({value}) => value)]).nice()
    .range([height - margin.bottom, margin.top])
)}

function _area(d3,curve,x,y){return(
d3.area()
    .curve(curve)
    .x(({step}) => x(step))
    .y0(y(0))
    .y1(({value}) => y(value))
)}

function _areaMirror(d3,curve,x,y){return(
d3.area()
    .curve(curve)
    .x(({step}) => x(step))
    .y0(y(0))
    .y1(({value}) => y(-value))
)}

async function _data(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("job_listings_results.csv").text(), d3.autoType)
)}

function _d3(require){return(
require('d3@^5.9')
)}

function _pickrOptions(){return(
{ components: { preview: false, opacity: true, hue: true, interaction: { input: true, save: true }}}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["job_listings_results.csv", {url: new URL("https://raw.githubusercontent.com/aggarwalc/le-data-2.0-DATA/main/Indeed-LinkedIn/job_listings_results_6_30.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("chart")).define("chart", ["d3","width","height","addWebFont","background","x","gradient1","gradient2","data2","area","areaMirror","data","values","labels","percentages"], _chart);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof background")).define("viewof background", ["colorPicker","pickrOptions"], _background);
  main.variable(observer("background")).define("background", ["Generators", "viewof background"], (G, _) => G.input(_));
  main.variable(observer("viewof gradient1")).define("viewof gradient1", ["colorPicker","pickrOptions"], _gradient1);
  main.variable(observer("gradient1")).define("gradient1", ["Generators", "viewof gradient1"], (G, _) => G.input(_));
  main.variable(observer("viewof gradient2")).define("viewof gradient2", ["colorPicker","pickrOptions"], _gradient2);
  main.variable(observer("gradient2")).define("gradient2", ["Generators", "viewof gradient2"], (G, _) => G.input(_));
  main.variable(observer("viewof labels")).define("viewof labels", ["colorPicker","pickrOptions"], _labels);
  main.variable(observer("labels")).define("labels", ["Generators", "viewof labels"], (G, _) => G.input(_));
  main.variable(observer("viewof values")).define("viewof values", ["colorPicker","pickrOptions"], _values);
  main.variable(observer("values")).define("values", ["Generators", "viewof values"], (G, _) => G.input(_));
  main.variable(observer("viewof percentages")).define("viewof percentages", ["colorPicker","pickrOptions"], _percentages);
  main.variable(observer("percentages")).define("percentages", ["Generators", "viewof percentages"], (G, _) => G.input(_));
  main.variable(observer("viewof ledge")).define("viewof ledge", ["html"], _ledge);
  main.variable(observer("ledge")).define("ledge", ["Generators", "viewof ledge"], (G, _) => G.input(_));
  main.variable(observer("curve")).define("curve", ["d3"], _curve);
  main.variable(observer("data2")).define("data2", ["data","ledge"], _data2);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("x")).define("x", ["d3","data2","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], _y);
  main.variable(observer("area")).define("area", ["d3","curve","x","y"], _area);
  main.variable(observer("areaMirror")).define("areaMirror", ["d3","curve","x","y"], _areaMirror);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], _data);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("addWebFont", child1);
  main.variable(observer("pickrOptions")).define("pickrOptions", _pickrOptions);
  const child2 = runtime.module(define2);
  main.import("colorPicker", child2);
  return main;
}
