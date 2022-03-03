Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){

    Webcam.snap(function(data_uri){

        document.getElementById("captured_img").innerHTML='<img id="result" src="'+data_uri+'"/>';
    });
}

console.log("the version is : ", ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/rBUHkvJV6/model.json', modelloaded);

function modelloaded() {
    console.log("model is loaded");
}

prediction_1 = "";
prediction_2 = "";


function speak() {
    var synth=window.speechSynthesis;
    speak_data_1 = "The first prediction is "+prediction_1;
    speak_data_2 = "And the second prediction is "+prediction_2;
    var UtterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(UtterThis);
}

function Captured_picture() {
    img = document.getElementById("result");
    classifier.classify(img, gotResult);

}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion1").innerHTML=results[0].label;
        document.getElementById("emotion2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if(results[0].label == "happy"){
            document.getElementById("emoji1").innerHTML="&#128522";
        }
        if(results[0].label == "sad"){
            document.getElementById("emoji1").innerHTML="&#128532";
        }
        if(results[0].label == "angry"){
            document.getElementById("emoji1").innerHTML="&#128548";
        }


        if(results[1].label == "happy"){
            document.getElementById("emoji2").innerHTML="&#128522";
        }
        if(results[1].label == "sad"){
            document.getElementById("emoji2").innerHTML="&#128532";
        }
        if(results[1].label == "angry"){
            document.getElementById("emoji2").innerHTML="&#128548";
        }
    }
}