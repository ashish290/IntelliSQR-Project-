"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Express_1 = __importDefault(require("./services/Express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Database_1 = require("./services/Database");
dotenv_1.default.config();
try {
    const StartServer = () => __awaiter(void 0, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = process.env.PORT;
        app.use((0, cookie_parser_1.default)());
        app.use((0, cors_1.default)());
        yield (0, Database_1.connectDB)();
        yield (0, Express_1.default)(app);
        app.listen(PORT, () => {
            console.log(`Server is running on : ${PORT}`);
        });
    });
    StartServer();
}
catch (error) {
    console.log("Server Error :", error);
}
//# sourceMappingURL=index.js.map