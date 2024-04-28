const geometry = require("./util/geometryutil.js")
const clipper = require("./util/clipper.js")
const d3poly = require("./util/d3-polygon.js")
const parallel = require("./util/parallel.js")
const background = require("./background.js")	
const Deepnest = require("./deepnest.js")
const EventEmitter = require('node:events');
const ipcrenderer = new EventEmitter();

const d = new Deepnest(ipcrenderer);
console.log(d)

let test_dir = "/home/arendjan/Deepnest/test/"
const fs = require('fs')
const path = require('path')    

function addFile(filename) {
    let data = fs.readFileSync(filename, 'utf-8');
    let folder = path.dirname(filename);
    let name = path.basename(filename);
    d.importsvg(name, folder, data, 1, null);
}

function addSheet() {
    var width = 2000;
				var height = 1000;
				
				if(Number(width.value) <= 0){
					width.className = 'error';
					return false;
				}
				width.className = '';
				if(Number(height.value) <= 0){
					height.className = 'error';
					return false;
				}
				
				var units = 'mm';
				var conversion = 1;// config.getSync('scale');
				
				// remember, scale is stored in units/inch
				if(units == 'mm'){
					conversion /= 25.4;
				}
				
				// var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				// var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				// rect.setAttribute('x',0);
				// rect.setAttribute('y',0);
				// rect.setAttribute('width',width.value*conversion);
				// rect.setAttribute('height',height.value*conversion);
				// rect.setAttribute('class', 'sheet');
				// svg.appendChild(rect);
				const sheet = d.importsvg(null, null, '<svg xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="1000" height="1000" class="sheet"/></svg>')[0];
				sheet.sheet = true;            console.log(sheet)

}

addFile(test_dir + "attachments_blank.dxf.SVG")
addFile(test_dir + "wedge_Body.dxf.SVG")
addSheet();// d.importsvg(`attachments_blank.svg`, test_dir,  fs.)
ipcrenderer.on("background-start", (data)=>console.log(data))
if(true) {
console.log(background.onload(ipcrenderer))
d.start(null, null);
console.log(background)
}
// console.log(background.start())