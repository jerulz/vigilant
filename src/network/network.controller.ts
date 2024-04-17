import { Controller, Get } from "@nestjs/common";
import { NetworkService } from "./network.service";

@Controller('network')
export class NetworkController {
    constructor(private readonly networkService: NetworkService) {}

    @Get('getNetwork')
    async getNetwork(): Promise<string> {
        return this.networkService.getNetwork();
    }
}