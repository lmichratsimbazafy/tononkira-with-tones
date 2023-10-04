"use strict";
exports.__esModule = true;
exports.client = void 0;
var axios_1 = require("axios");
var react_native_config_1 = require("react-native-config");
console.log('Config.API_URL', react_native_config_1["default"].API_URL);
exports.client = axios_1["default"].create({
    baseURL: react_native_config_1["default"].API_URL
});
