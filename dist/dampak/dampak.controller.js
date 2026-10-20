"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DampakController = void 0;
const common_1 = require("@nestjs/common");
const dampak_service_1 = require("./dampak.service");
let DampakController = class DampakController {
    constructor(dampakService) {
        this.dampakService = dampakService;
    }
    getRingkasan() {
        return this.dampakService.getRingkasan();
    }
    getKabupaten() {
        return this.dampakService.getKabupaten();
    }
};
exports.DampakController = DampakController;
__decorate([
    (0, common_1.Get)('ringkasan'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DampakController.prototype, "getRingkasan", null);
__decorate([
    (0, common_1.Get)('kabupaten'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DampakController.prototype, "getKabupaten", null);
exports.DampakController = DampakController = __decorate([
    (0, common_1.Controller)('dampak'),
    __metadata("design:paramtypes", [dampak_service_1.DampakService])
], DampakController);
//# sourceMappingURL=dampak.controller.js.map