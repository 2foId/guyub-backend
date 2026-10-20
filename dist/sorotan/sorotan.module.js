"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SorotanModule = void 0;
const common_1 = require("@nestjs/common");
const sorotan_service_1 = require("./sorotan.service");
const sorotan_controller_1 = require("./sorotan.controller");
const sorotan_controller_2 = require("./sorotan.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let SorotanModule = class SorotanModule {
};
exports.SorotanModule = SorotanModule;
exports.SorotanModule = SorotanModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [sorotan_controller_1.IklanController, sorotan_controller_2.AdminIklanController],
        providers: [sorotan_service_1.SorotanService],
        exports: [sorotan_service_1.SorotanService],
    })
], SorotanModule);
//# sourceMappingURL=sorotan.module.js.map