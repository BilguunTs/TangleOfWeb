import "./style.css";

import { Graph } from "./CustomList";
import { getDistance } from "./utils";
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = "13px serif";
let nodes = [];

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 4;
    this.velocityX = Math.random() * 0.2 - 0.1;
    this.velocityY = Math.random() * 0.2 - 0.1;
  }

  draw() {
    let xt = parseFloat(this.x).toPrecision(5);
    let yt = parseFloat(this.y).toPrecision(5);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.fillStyle = "orange";
    ctx.fillText(`${(xt, yt)}`, this.x - 20, this.y - 10);
  }
  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    this.setBoundary();
  }
  setBoundary() {
    if (this.x <= this.radius || this.x >= window.innerWidth - this.radius) {
      this.velocityX *= -1;
    }
    if (this.y <= this.radius || this.y >= window.innerHeight - this.radius) {
      this.velocityY *= -1;
    }
  }
}

const init = () => {
  let graph = new Graph(Graph.UNDIRECTED);
  const [first] = graph.addEdge(1, 2);
  graph.addEdge(1, 3);
  graph.addEdge(1, 4);
  graph.addEdge(5, 2);
  graph.addEdge(6, 3);
  graph.addEdge(7, 3);
  graph.addEdge(8, 4);
  graph.addEdge(9, 5);
  graph.addEdge(10, 6);

  let bfsFromFirst = graph.bfs(first);
  let dfsFromFirst = graph.dfs(first);
  let visitedOrder = Array.from(dfsFromFirst);
  const values = visitedOrder.map((node) => console.log(node.value));
  // bfsFromFirst.next().value.value; // 1
  // bfsFromFirst.next().value.value; // 2
  // bfsFromFirst.next().value.value; // 3
  // bfsFromFirst.next().value.value;
};

const animate = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "white";
  for (let i = 0; i < nodes.length; i++) {
    const circle1 = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const circle2 = nodes[j];
      const dist = getDistance(circle1.x, circle2.x, circle1.y, circle2.y);

      if (dist < window.innerWidth * 0.08) {
        ctx.lineWidth = 0.04 - dist / 0.04;
        ctx.beginPath();
        ctx.moveTo(circle1.x, circle1.y);
        ctx.lineTo(circle2.x, circle2.y);
        ctx.stroke();
      }
    }
  }

  nodes.forEach((e) => {
    //e.draw();
    //e.move();
  });

  requestAnimationFrame(animate);
};
init();
animate();
