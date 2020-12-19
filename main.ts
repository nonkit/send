function sendCmd () {
    radio.sendString(line)
    cmd = line.charAt(0)
    time = parseFloat(line.substr(1, line.length - 1))
    if (cmd == "F") {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        basic.pause(time)
    } else if (cmd == "B") {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        basic.pause(time)
    } else if (cmd == "R") {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        basic.pause(time)
    } else if (cmd == "L") {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        basic.pause(time)
    } else {
        basic.pause(100)
    }
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    line = serial.readLine()
    sendCmd()
})
let time = 0
let cmd = ""
let line = ""
radio.setGroup(1)
let manual = 0
serial.redirectToUSB()
basic.forever(function () {
    if (input.rotation(Rotation.Pitch) < -20) {
        line = "F0"
        sendCmd()
    } else if (input.rotation(Rotation.Pitch) > 20) {
        line = "B0"
        sendCmd()
    } else if (input.rotation(Rotation.Roll) > 20) {
        line = "R0"
        sendCmd()
    } else if (input.rotation(Rotation.Roll) < -20) {
        line = "L0"
        sendCmd()
    } else {
        line = "S0"
        sendCmd()
    }
})
