img = "";
status = "";
objets = [];

function preload() {
    audio = loadSound("alert_alarm.mp3");
}
function setup() {
    canvas = creatCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "person") {
        r = random(200);
        g = random(200);
        b = random(200);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Person Found" + objects.length;
            audio.stop();

            fill(r, g, b);
            percent = floor(pbjects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objets[i].x + 15, ojects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    else {
        document.getElementById("status").innerHTML = "Status : Object detected";
        document.getElementById("number_of_objects").innerHTML = "Person not found" + objects.length;
        audio.play();
    }
}