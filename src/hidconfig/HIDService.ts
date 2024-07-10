import  HID  from "node-hid"

type HIDInfo = Awaited<ReturnType<typeof HID.devicesAsync>>[number];

class HIDService {

    getHidDevices = async ():Promise<Array<HIDInfo>> => {
        return await HID.devicesAsync()
    }


    getHidDevice  = async (deviceName: string): Promise<HIDInfo> => {
     return (await this.getHidDevices()).find(device => device?.manufacturer?.toLowerCase().includes(deviceName.toLowerCase()))
    }


}

export default new HIDService()