"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WasiatModule = void 0;
const common_1 = require("@nestjs/common");
const wasiat_service_1 = require("./wasiat.service");
const wasiat_controller_1 = require("./wasiat.controller");
let WasiatModule = class WasiatModule {
};
exports.WasiatModule = WasiatModule;
exports.WasiatModule = WasiatModule = __decorate([
    (0, common_1.Module)({
        controllers: [wasiat_controller_1.WasiatController],
        providers: [wasiat_service_1.WasiatService],
    })
], WasiatModule);
//# sourceMappingURL=wasiat.module.js.map