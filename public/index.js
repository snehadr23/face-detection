const video = document.getElementById('videoSource');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(showVideo);

function showVideo() {
    console.log('In showVideo - index.js');
    navigator.mediaDevices.getUserMedia(
        {
            video: true,
            audio: false
        })
        .then(function(stream) {
            console.log('In getUserMedia - index.js');
            video.srcObject = stream
        })
        .catch(function(err) {
            console.error(err);
        })
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = {
        width : video.width,
        height : video.height
    };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async() => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors();
        console.log(detections[0]);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        // faceapi.draw.drawDetections(canvas, resizedDetections); // draws a box around the faces
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100)
})
