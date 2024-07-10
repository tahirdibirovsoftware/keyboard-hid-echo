import { SerialPort } from "serialport"

// Define the correct type for the serial device information
type SerialInfo = Awaited<ReturnType<typeof SerialPort.list>>[number];

class SerialService {
    // This method returns a list of serial devices
    getSerialDevices = async (): Promise<SerialInfo[]> => {
        return await SerialPort.list();
    }

    // This method returns a specific serial device by its name
    getSerialDevice = async (deviceName: string): Promise<SerialInfo | undefined> => {
        return (await this.getSerialDevices()).find(device => device?.manufacturer?.toLowerCase().includes(deviceName.toLowerCase()));
    }
}

export default new SerialService();
