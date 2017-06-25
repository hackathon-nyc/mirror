import getUserMedia from 'getusermedia';
import Peer from 'simple-peer';
import keys from './keys.js';

let resultArr = [];

// azure
const makeblob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}
// opens camera
getUserMedia({ video: true, audio: false }, function (err, stream) {
  if (err) return console.error(err)
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })
  peer.on('error', function (err) { console.error(err)});
  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
    console.log(JSON.stringify(data))
  })
  const connect = document.getElementById('connect');
  if(connect){
    connect.addEventListener('click', function () {
      var otherId = JSON.parse(document.getElementById('otherId').value)
      console.log(otherId)
      peer.signal(otherId)
    })
  }
  const send = document.getElementById('send');
  if(send){
    send.addEventListener('click', function () {
      var yourMessage = document.getElementById('yourMessage').value
      peer.send(yourMessage)
    })
  }
  peer.on('data', function (data) {
    document.getElementById('messages').textContent += data + '\n'
  })

  peer.on('stream', function (stream) {
    var video = document.createElement('video')
    video.setAttribute("id", "video");
    document.body.appendChild(video)

    video.src = window.URL.createObjectURL(stream)
    video.play()
  })
})

var video, $output;
var scale = 0.25;
$output = $("#output");

const captureImage = function() {
  video = document.getElementById('video')
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvas.getContext('2d')
          .drawImage(video, 0, 0, canvas.width, canvas.height);

    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    // $output.prepend(img);
    // Request parameters.
    var settings = {
      "url": "https://eastus2.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion",
      "method": "POST",
      "headers": {
        "ocp-apim-subscription-key": keys.subKey,
        "content-type": "application/octet-stream"

      },
      "processData": false,
      "data": makeblob(img.src)
    }
    let date = new Date();
    $.ajax(settings).done(function (response) {
      if(response[0]){
        response[0].date = new Date(date.getTime());
        resultArr.push(response[0])

        console.log('RESULT: ',JSON.stringify(response[0]))
        // sendDummy();
        dispData(resultArr)
      }
      
    });
    function sendDummy(){
      var dat = [0.1, 0.05, 0.05, 0.02, 0.2, 0.3, 0.45];
var time = 8;
var lineCon = document.getElementById('Personality').getContext('2d');
var barCon = document.getElementById('Values').getContext('2d');
var personalityChart = new Chart(lineCon, {
    // The type of chart we want to create
    type: 'line',
    // The data for our e.sldataset
    data: {
        labels: [time - 7, time - 6, time - 5, time - 4, time - 3, time -2, time -1],
        datasets: [{
            fill: false,
            label: "Agreeableness",
            backgroundColor: 'rgb(255,99,71)',
            borderColor: 'rgb(255,99,71)',
            data: dat,
        },{
            fill: false,
            label: "Conscieniousness",
            backgroundColor: 'rgb(255,215,0)',
            borderColor: 'rgb(255,215,0)',
            data: [0.1, 0.52, 0.51, 0.22, 0.2, 0.31, 0.03],
        },{
            fill: false,
            label: "Openness",
            backgroundColor: 'rgb(205,133,63)',
            borderColor: 'rgb(205,133,63)',
            data: [0.43, 0.2, 0.51, 0.34, 0.76, 0.32, 0.3],
        },{
            fill: false,
            label: "Introversion/Extraversion",
            backgroundColor: 'rgb(154,205,50)',
            borderColor: 'rgb(154,205,50)',
            data: [0.14, 0.56, 0.51, 0.22, 0.17, 0.38, 0.79],
        },{
            fill: false,
            label: "Emotional range",
            backgroundColor: 'rgb(128,0,128)',
            borderColor: 'rgb(128,0,128)',
            data: [0.01, 0.52, 0.71, 0.28, 0.7, 0.21, 0.83],
        }]
    },
});
    
var valuesChart = new Chart(barCon, {
// The type of chart we want to create
type: 'radar',
// The data for our dataset
data: {
    labels: ["Tradition", "Stimulation", "Helping Others", "Achievement", "Taking Pleasure in Life"],
    datasets: [{
        backgroundColor: 'rgb(255,99,71)',
        borderColor: 'rgb(255,100,80)',
        pointBackgroundColor: 'rgb(255,100,80)',
        data: [0.14, 0.56, 0.35, 0.52, 0.2]
    }]
    },
});
    }

    function dispData(arry) {
    var lineCon = document.getElementById('Personality').getContext('2d');
    var barCon = document.getElementById('Values').getContext('2d');
        
    var totalAnger, totalContempt, totalDisgust, totalHappiness, totalNeutral, totalSadness, totalSurprise;
        
    var personalityChart = new Chart(lineCon, {
        // The type of chart we want to create
        type: 'line',
        animation:false,

        // The data for our dataset
        data: {
            labels: arry.map(obj => obj.date.getMinutes()),
            datasets: [{
                fill: false,
                label: "Anger",
                backgroundColor: 'rgb(255,99,71)',
                borderColor: 'rgb(255,99,71)',
                data: arry.map(obj => obj.faceAttributes.emotion.anger),
            },{
                fill: false,
                label: "Contempt",
                backgroundColor: 'rgb(255,215,0)',
                borderColor: 'rgb(255,215,0)',
                data: arry.map(obj => obj.faceAttributes.emotion.contempt),
            },{
                fill: false,
                label: "Disgust",
                backgroundColor: 'rgb(154,205,30)',
                borderColor: 'rgb(154,205,30)',
                data: arry.map(obj => obj.faceAttributes.emotion.disgust),
            },{
                fill: false,
                label: "Happiness",
                backgroundColor: 'rgb(6,248,255)',
                borderColor: 'rgb(6,248,255)',
                data: arry.map(obj => obj.faceAttributes.emotion.happiness),
            },{
                fill: false,
                label: "Neutral",
                backgroundColor: 'rgb(205,133,63)',
                borderColor: 'rgb(205,133,63)',
                data: arry.map(obj => obj.faceAttributes.emotion.neutral),
            },{
                fill: false,
                label: "Sadness",
                backgroundColor: 'rgb(0,0,255)',
                borderColor: 'rgb(0,0,255)',
                data: arry.map(obj => obj.faceAttributes.emotion.sadness),
            },{
                fill: false,
                label: "Surprise",
                backgroundColor: 'rgb(128,0,128)',
                borderColor: 'rgb(128,0,128)',
                data: arry.map(obj => obj.faceAttributes.emotion.suprise),
            }]
        },
    });
        
        
        
        totalAnger = arry.reduce((acc, val) => {
          return acc += val.faceAttributes.emotion.anger
        }, 0);
        totalContempt = arry.reduce((acc, val) => {
          return acc += val.faceAttributes.emotion.contempt
        }, 0);
        totalDisgust = arry.reduce((acc, val) => {
          return acc += val.faceAttributes.emotion.disgust;
        }, 0);
        totalNeutral = arry.reduce((acc, val) => {
          return acc += val.faceAttributes.emotion.neutral
        }, 0);
        totalSadness = arry.reduce((acc, val) => {
          return acc += val.faceAttributes.emotion.sadness
        }, 0);
        totalSurprise = arry.reduce((acc, val) => {
          return acc += val.faceAttributes.emotion.surprise
        }, 0);

    var valuesChart = new Chart(barCon, {
    // The type of chart we want to create
    type: 'radar',
    // The data for our dataset
    data: {
        labels: ["Anger", "Contempt", "Disgust", "Happiness", "Neutral", "Sadness", "Surprise"],
        datasets: [{
            backgroundColor: 'rgb(255,99,71)',
            borderColor: 'rgb(255,100,80)',
            pointBackgroundColor: 'rgb(255,100,80)',
            data: [totalAnger, totalContempt, totalDisgust, totalHappiness, totalNeutral, totalSadness, totalSurprise]
        }]
        },
    });
        
    }
};
//https://[location].api.cognitive.microsoft.com/face/v1.0/detect[?returnFaceId][&returnFaceLandmarks][&returnFaceAttributes]
setInterval(function(){
    if(document.getElementById('video') && location.hash === '#init'){
      captureImage()
    } else if(location.hash === '#init'){
      console.log("Loading video")
    }
  },1500);
