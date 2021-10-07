"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datesToDue = void 0;
const moment_1 = __importDefault(require("moment"));
const datesToDue = (date) => {
    const today = (0, moment_1.default)();
    // momentが解釈できる形に変換
    if (date.match(/\d{4}[\/\.]\d+[\/\.]\d+/)) { // yyyy/mm/dd or yyyy.mm.dd
        date = date.replace(/[\/\.]/g, "-");
    }
    else if (date.match(/\d+[\/\.]\d+/)) { // mm/dd or mm.dd
        date = today.year() + "-" + date; // 年を追加
        date = date.replace(/[\/\.]/g, "-");
    }
    else {
        return null;
    }
    const eventDate = (0, moment_1.default)(date);
    return eventDate.diff(today, 'days');
};
exports.datesToDue = datesToDue;
