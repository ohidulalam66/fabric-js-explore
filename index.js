const canvas = new fabric.Canvas("canvas", {
  width: 500,
  height: 500,
  backgroundColor: "#8585853f",
});

canvas.renderAll();

const imgAdd = (e) => {
  const inputElem = document.getElementById("img");
  const file = inputElem.files[0];
  render.readAsDataURL(file);
};

const render = new FileReader();

const imageFile = document.getElementById("img");
imageFile.addEventListener("change", imgAdd);
render.addEventListener("load", () => {
  fabric.Image.fromURL(render.result, (img) => {
    canvas.add(img);
    canvas.requestRenderAll();
  });
});

canvas.on("mouse:wheel", function (img) {
  let delta = img.e.deltaY;
  let zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 2) zoom = 2;
  if (zoom < 1) zoom = 1;
  canvas.zoomToPoint({ x: img.e.offsetX, y: img.e.offsetY }, zoom);
  img.e.preventDefault();
  img.e.stopPropagation();
  const vpt = this.viewportTransform;
  if (zoom < 400 / 1000) {
    vpt[4] = 200 - (1000 * zoom) / 2;
    vpt[5] = 200 - (1000 * zoom) / 2;
  } else {
    if (vpt[4] >= 0) {
      vpt[4] = 0;
    } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
      vpt[4] = canvas.getWidth() - 1000 * zoom;
    }
    if (vpt[5] >= 0) {
      vpt[5] = 0;
    } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
      vpt[5] = canvas.getHeight() - 1000 * zoom;
    }
  }
});

canvas.on("mouse:out", function () {
  canvas.style.transform = "translate(-50%, -50%) scale(1)";
});

// Clear button

const clearCanvas = (canvas) => {
  canvas.getObjects().forEach((clear) => {
    if (clear !== canvas.backgroundColor) {
      canvas.remove(clear);
    }
  });
};
