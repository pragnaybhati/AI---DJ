song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scorerw = 0;
scorelw = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modal_loaded);
    posenet.on("pose", got_poses);
}

function modal_loaded() {
    console.log(" PoseNet is Initialized");
}



function got_poses(results) {
    if (results.length > 0) {
        console.log(results);
        scorerw = results[0].pose.keypoints[10].score;
        scorelw = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X =  " + leftWristX + "  Left Wrist Y =  " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 400, 400);

    fill("#FF0000");

    if (scorerw > 0.2) {
        circle(rightWristX, rightWristY, 25);
        //This is for speed by right wrist moving left to right .
        if (rightWristX > 0 && rightWristX <= 100) {
            document.getElementById("speed").innerHTML = "Speed : 0.5x";
            song.rate(0.5);
        }
        if (rightWristX > 100 && rightWristX <= 200) {
            document.getElementById("speed").innerHTML = "Speed : 1x";
            song.rate(1);
        }
        if (rightWristX > 200 && rightWristX <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        if (rightWristX > 300 && rightWristX <= 400) {
            document.getElementById("speed").innerHTML = "Speed : 2x";
            song.rate(2);
        }
        //This is for volume by right wrist moving up to down.

        initial_volume = Number(rightWristY);
        removed_decimal = floor(initial_volume);
        volume = removed_decimal / 400;
        document.getElementById("volume").innerHTML = "Volume : " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}