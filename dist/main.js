"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
const express = require("express");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.use(cookieParser());
    app.use('/uploads', express.static((0, path_1.join)(process.cwd(), 'uploads')));
    app.enableCors({
        origin: config.get('FRONTEND_URL') ?? 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api');
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Guyub Ngapak API')
        .setDescription('API untuk aplikasi warga saling bantu Guyub Ngapak')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = config.get('PORT') ?? 3001;
    await app.listen(port);
    console.log(`Guyub Ngapak API berjalan di http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map