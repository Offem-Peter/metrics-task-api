"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("config"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes"));
var db_1 = __importDefault(require("./db"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: config_1.default.get('origin') }));
app.use((0, morgan_1.default)('tiny'));
var PORT = config_1.default.get('port');
app.listen(PORT, function () {
    console.log("Service listening at " + PORT);
    (0, db_1.default)();
    (0, routes_1.default)(app);
});
