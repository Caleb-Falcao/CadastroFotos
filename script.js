const video = document.querySelector("#videoElement");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const captureButton = document.querySelector("#capture");
const constraintVideo = {video:{facingMode: "environment", aspectRatio: 10/10}};

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia(constraintVideo)
    .then(function (stream) {
      video.srcObject = stream;
      video.onloadedmetadata = function() {
        // Ajusta o tamanho do canvas para corresponder ao tamanho do vídeo
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      };
    })
    .catch(function (error) {
      console.log("Algo deu errado!!");
    });
}

captureButton.addEventListener("click", function () {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
});

/**baixar imagem */
document.querySelector('#download').addEventListener('click', function () {
  let image = canvas.toDataURL('image/png');
  let link = document.createElement('a');
  link.href = image;
  link.download = 'imagem.png';
  link.click();
});