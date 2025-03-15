"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNetworkDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_network_dto_1 = require("./create-network.dto");
class UpdateNetworkDto extends (0, swagger_1.PartialType)(create_network_dto_1.CreateNetworkDto) {
}
exports.UpdateNetworkDto = UpdateNetworkDto;
//# sourceMappingURL=update-network.dto.js.map