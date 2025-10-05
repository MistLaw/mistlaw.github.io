const tesseract_canvas = document.getElementById('tesseractCanvas');
const tesseract_ctx = tesseract_canvas.getContext('2d');
tesseract_canvas.width = document.documentElement.clientWidth;
tesseract_canvas.height = document.documentElement.clientHeight;

class Tesseract{
  constructor(x, y , size){
    this.position = {
      x: x,
      y: y,
      z: 1,
      w: 1,
    }
    this.startAnimation = false;
    this.animationSpeed = 4;
    this.tempSize = 0;
    this.animationDone = false;
    this.size = size;
    this.vertices = [];
    this.color = "#00b7ffff";
    for (let x of [-1,1])
    for (let y of [-1,1])
    for (let z of [-1,1])
    for (let w of [-1,1])
        this.vertices.push([x,y,z,w]);
    this.edges = this.connectVertices(this.vertices);
  }

  rotate4D(point, angles) {
    let [x, y, z, w] = point;
    const { xy = 0, xz = 0, xw = 0, yz = 0, yw = 0, zw = 0 } = angles;

    // XY plane
    let tempX = x * Math.cos(xy) - y * Math.sin(xy);
    let tempY = x * Math.sin(xy) + y * Math.cos(xy);
    x = tempX; y = tempY;

    // XZ plane
    tempX = x * Math.cos(xz) - z * Math.sin(xz);
    let tempZ = x * Math.sin(xz) + z * Math.cos(xz);
    x = tempX; z = tempZ;

    // XW plane
    tempX = x * Math.cos(xw) - w * Math.sin(xw);
    let tempW = x * Math.sin(xw) + w * Math.cos(xw);
    x = tempX; w = tempW;

    // YZ plane
    tempY = y * Math.cos(yz) - z * Math.sin(yz);
    tempZ = y * Math.sin(yz) + z * Math.cos(yz);
    y = tempY; z = tempZ;

    // YW plane
    tempY = y * Math.cos(yw) - w * Math.sin(yw);
    tempW = y * Math.sin(yw) + w * Math.cos(yw);
    y = tempY; w = tempW;

    // ZW plane
    tempZ = z * Math.cos(zw) - w * Math.sin(zw);
    tempW = z * Math.sin(zw) + w * Math.cos(zw);
    z = tempZ; w = tempW;

    return [x, y, z, w];
  }

  connectVertices(vertices) {
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
            // count number of coordinates that differ
            let diff = 0;
            for (let k = 0; k < 4; k++) {
                if (vertices[i][k] !== vertices[j][k]) diff++;
            }
            if (diff === 1) edges.push([i, j]); // connect if differ in exactly one coordinate
        }
    }
    return edges;
  }

  update() {
    // rotation speeds for each plane
    const time = Date.now() * 0.001;
    if(this.startAnimation){
      this.tempSize += this.animationSpeed;
      if(this.tempSize >= this.size){
        this.tempSize = this.size;
        this.startAnimation = false;
        this.animationDone = true;
      }
    }

    const angles = {
        xy: Math.sin(time) * 0.02,
        xz: Math.cos(time * 1.3) * 0.015,
        xw: Math.sin(time * 0.7) * 0.025,
        yz: Math.cos(time * 1.1) * 0.01,
        yw: Math.sin(time * 1.5) * 0.02,
        zw: Math.cos(time * 0.9) * 0.018
    };


    // rotate all vertices
    for (let i = 0; i < this.vertices.length; i++) {
        this.vertices[i] = this.rotate4D(this.vertices[i], angles);
    }
  } 

  draw(ctx){
    ctx.beginPath();
    for(let edge of this.edges){
      let p1 = this.project4Dto2D(this.vertices[edge[0]], this.size, this.size)
      let p2 = this.project4Dto2D(this.vertices[edge[1]], this.size, this.size)
      ctx.moveTo((this.position.x) + (p1.x * this.tempSize), (this.position.y) - (p1.y * this.tempSize));
      ctx.lineTo((this.position.x)+ (p2.x * this.tempSize), (this.position.y) - (p2.y  * this.tempSize));
    }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  project4Dto2D(point4D, d4, d3) {
    const [x, y, z, w] = point4D;

    // 4D → 3D
    const f4 = d4 / (d4 - w);
    const x3 = x * f4;
    const y3 = y * f4;
    const z3 = z * f4;

    // 3D → 2D
    const f3 = d3 / (d3 - z3);
    const x2 = x3 * f3;
    const y2 = y3 * f3;

    return {x: x2, y: y2};
  }
}

let tess = new Tesseract(tesseract_canvas.width - 250,250, 100);