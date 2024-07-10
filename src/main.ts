import { ReadlineParser, SerialPort } from "serialport";
import SerialService from "./serialconfig/SerialService";
import HIDService from "./hidconfig/HIDService";
import HID from "node-hid";

const main = async () => {
    const port = new SerialPort({
        baudRate: 57600,
        path: (await SerialService.getSerialDevice("1a")).path
    });

    const parser = port.pipe(new ReadlineParser());

    const keyboardPath = (await HIDService.getHidDevice("sigma")).path;
    const keyboard = new HID.HID(keyboardPath);

    let keyPressed = false;
    let keyInterval;

    keyboard.on("data", (data) => {
        // Assuming data[2] represents the key state (change this as per your keyboard data structure)
        if (data[2] !== 0 && !keyPressed) { // Key press detected
            keyPressed = true;
            port.write(data); // Initial key press
            keyInterval = setInterval(() => {
                port.write(data); // Continuous key press
            }, 100); // Interval time in milliseconds
        } else if (data[2] === 0 && keyPressed) { // Key release detected
            keyPressed = false;
            clearInterval(keyInterval);
        }
    });

    parser.on("data", console.log);
};

main();
