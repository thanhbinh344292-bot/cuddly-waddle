const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageInput = document.getElementById("imageInput");
const boostSlider = document.getElementById("boostSlider");
const presetSelect = document.getElementById("presetSelect");
const saveBtn = document.getElementById("saveBtn");
const autoFace = document.getElementById("autoFace");
const autoLight = document.getElementById("autoLight");

let img = new Image();

imageInput.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  img.src = URL.createObjectURL(file);
};

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  drawImage();
};

function drawImage() {
  let boost = +boostSlider.value;
  let b=0, c=0, s=0;

  switch(presetSelect.value){
    case "bright": b=10; c=10; s=5; break;
    case "warm": b=5; c=5; s=15; break;
    case "chill": b=0; c=-5; s=-10; break;
    case "fantasy": b=15; c=20; s=25; break;
  }

  const brightness = 100 + boost*0.18 + b;
  const contrast   = 100 + boost*0.28 + c;
  const saturate   = 100 + boost*0.22 + s;

  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  if (autoFace.checked) slimFace();
  if (autoLight.checked) lightBoost();
}

boostSlider.oninput = drawImage;
presetSelect.onchange = drawImage;

saveBtn.onclick = () => {
  const link = document.createElement("a");
  link.download = "ThanhBinh49.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};

function slimFace(){
  ctx.save();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.scale(0.95,0.95); 
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function lightBoost(){
  ctx.globalCompositeOperation = "lighter";
  ctx.drawImage(canvas,0,0);
  ctx.globalCompositeOperation = "source-over";
}