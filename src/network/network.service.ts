import { Injectable, Logger } from "@nestjs/common";
import { networkInterfaces } from "os";

@Injectable()
export class NetworkService {
    private readonly logger = new Logger(NetworkService.name);

    async getNetwork(): Promise<string> {
        this.logger.log('getNetwork');

        const interfaces = networkInterfaces();
        return Object.values(interfaces)
          .flat()
          .filter((iface) => iface.family === "IPv4" && !iface.internal)
          .map((iface) => `${iface.address} (${iface.mac})`)
          .join(", ");
    }
}