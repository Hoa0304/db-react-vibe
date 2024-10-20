"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_server_1 = __importDefault(require("json-server"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const server = json_server_1.default.create();
const filePath = path_1.default.join(__dirname, 'db.json');
const data = fs_1.default.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);
const router = json_server_1.default.router(db);
const middlewares = json_server_1.default.defaults();
server.use(middlewares);
server.use(json_server_1.default.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id',
}));
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});
exports.default = server;
