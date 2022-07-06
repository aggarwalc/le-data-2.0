// https://observablehq.com/@leonelgalan/embedding-fonts-into-an-svg@163
import define1 from "./576f8943dbfbd395@114.js";
import define2 from "./51d2d5aac86ca4c0@171.js";
import define3 from "./55bed46f68a80641@366.js";

function _1(md){return(
md`
# Embedding Fonts Into An SVG

Helper function written on top of [@mootari/embedding-fonts-into-an-svg](https://observablehq.com/@mootari/embedding-fonts-into-an-svg) with Google Fonts in mind:

## Signature

\`\`\`javascript
async function addWebFont(selection, fontName, fontURL, fontType = 'woff2')
\`\`\`

## Example:

\`\`\`javascript
// From https://fonts.googleapis.com/css?family=Pacifico, pick the url under /* latin */
selection.call(addWebFont, 'Pacifico', 'https://fonts.gstatic.com/s/pacifico/v13/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2');
\`\`\`
`
)}

function _addWebFont(toDataURL){return(
async function addWebFont(selection, fontName, fontURL, fontType = 'woff2') {
  const fontData = await toDataURL(fontURL);
  return selection.append('style').text(`
    @font-face {
      font-family: '${fontName}';
      src: url(${fontData}) format('${fontType}');
    }
  `);
}
)}

function _3(DOM,rasterize,chart){return(
DOM.download(() => rasterize(chart), undefined, "Save as PNG")
)}

function _chart(d3,DOM,addWebFont)
{
  const width = 600;
  const height = 400;
  const svg = d3.select(DOM.svg(width, height));
  
  svg.append('text')
    // From https://fonts.googleapis.com/css?family=Pacifico, pick the url under `/* latin */`
    .call(addWebFont, 'Pacifico', 'https://fonts.gstatic.com/s/pacifico/v13/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2')
    .attr('style', "font-size: 175px; font-family: 'Pacifico';")
    .text('Pacifico')
    .attr('x', width / 2)
    .attr('y', height / 2)
    .attr('dominant-baseline', 'middle')
    .attr('text-anchor', 'middle');
  
  return svg.node();
}


function _5(md){return(
md`
## Setup
`
)}

function _d3(require){return(
require('https://d3js.org/d3.v5.min.js')
)}

function _10(md){return(
md `
## "Backup"
`
)}

async function _latestVersion(getMetadata)
{
  const metaData = await getMetadata('@mootari/embedding-fonts-into-an-svg')
  return +metaData.version;
}


function _12(md){return(
md`
### \`toDataURL\` source as of **@171**

\`\`\`javascript
async function toDataURL(url) {
  return new Promise(async(resolve, reject) => {
    const res = await fetch(url);
    if(!res.ok) return reject(\`Error: \${res.status} \${res.statusText}\`);
    const blob = await res.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result);
  });
}
\`\`\`
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("addWebFont")).define("addWebFont", ["toDataURL"], _addWebFont);
  main.variable(observer()).define(["DOM","rasterize","chart"], _3);
  main.variable(observer("chart")).define("chart", ["d3","DOM","addWebFont"], _chart);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("rasterize", child1);
  const child2 = runtime.module(define2);
  main.import("toDataURL", child2);
  const child3 = runtime.module(define3);
  main.import("getMetadata", child3);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("latestVersion")).define("latestVersion", ["getMetadata"], _latestVersion);
  main.variable(observer()).define(["md"], _12);
  return main;
}
