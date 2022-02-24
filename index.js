const canvas = new fabric.Canvas("canvas", {
  width: 550,
  height: 550,
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

canvas.on("mouse:wheel", function (imgFile) {
  let delta = imgFile.e.deltaY;
  let zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 1) zoom = 1;
  canvas.zoomToPoint({ x: imgFile.e.offsetX, y: imgFile.e.offsetY }, zoom);
  imgFile.e.preventDefault();
  imgFile.e.stopPropagation();
  const vpt = this.viewportTransform;
  if (zoom < 400 / 550) {
    vpt[4] = 200 - (550 * zoom) / 2;
    vpt[5] = 200 - (550 * zoom) / 2;
  } else {
    if (vpt[4] >= 0) {
      vpt[4] = 0;
    } else if (vpt[4] < canvas.getWidth() - 550 * zoom) {
      vpt[4] = canvas.getWidth() - 550 * zoom;
    }
    if (vpt[5] >= 0) {
      vpt[5] = 0;
    } else if (vpt[5] < canvas.getHeight() - 550 * zoom) {
      vpt[5] = canvas.getHeight() - 550 * zoom;
    }
  }
});

// Clear button
const clearCanvas = (canvas) => {
  canvas.getObjects().forEach((clear) => {
    if (clear !== canvas.backgroundColor) {
      canvas.remove(clear);
    }
  });
};
