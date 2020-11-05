"use strict";

var player = require('play-sound');
var schedule = require('node-schedule');

const soundFileName = 'bell.mp3'
const times = [
    '08:00',
    '08:50',
    '09:40',
    '10:30',
    '10:45',
    '11:35',
    '12:25',
    '13:15',
    '14:00',
    '14:45',
    '14:50',
    '15:35',
    '16:20'
];

(function main() {
    logStart();
    registerScheduleHandler();
})();

function registerScheduleHandler() {
    times.forEach((time) => {
        const hour = time.split(':')[0];
        const minute = time.split(':')[1];

        schedule.scheduleJob({ hour: hour, minute: minute, dayOfWeek: [0, 1, 2, 3, 4, 5, 6] }, function () {
            playBell(time);
        });
    });
    logInit();
}

function playBell(time) {
    logPlayed(soundFileName, time);
    player().play(soundFileName, function (err) {
        if (err) return logError(soundFileName, time);
    });
}

function logStart() {
    console.log('Starting DistanceLearning-Bell...')
}

function logInit() {
    console.log('DistanceLearning-Bell started successfully...');
}

function logPlayed(soundFileName, time) {
    console.log(time + ': Playing sound file \'' + soundFileName + '\'');
}

function logError(soundFileName, time) {
    console.error(time + ': Failed to play sound file \'' + soundFileName + '\'');
}