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
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("@actions/github");
const constants_1 = require("../constants");
class Octokit {
    constructor(token) {
        this.client = (0, github_1.getOctokit)(token);
    }
    listAllOpenIssues(owner, repo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.client.issues.listForRepo({
                owner,
                repo,
                state: 'open',
            });
            return data;
        });
    }
    get(owner, repo, issueNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.client.issues.get({
                owner,
                repo,
                issue_number: issueNumber,
            });
            return data;
        });
    }
    addLabelToIssue(owner, repo, issueNumber, labels) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.client.issues.addLabels({
                owner,
                repo,
                issue_number: issueNumber,
                labels,
            });
            return data;
        });
    }
    removeLabelFromIssue(owner, repo, name, issue_number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.client.issues.removeLabel({
                    owner,
                    repo,
                    name,
                    issue_number,
                });
                return data;
            }
            catch (e) {
                // Do not throw error
                return [];
            }
        });
    }
    getIssuesWithDueDate(rawIssues) {
        return __awaiter(this, void 0, void 0, function* () {
            return rawIssues.filter(issue => {
                // タイトルに「期限:」が含まれる
                let due = issue.title.match(/\(期限\s*[:：](.+)\)/);
                if (due == null) {
                    // 本文に「完了予定日:」が含まれる
                    if (issue.body != null) {
                        due = issue.body.match(/[\n\r]完了予定日\s*[:：](.*)[\n\r]/);
                    }
                }
                if (due) {
                    return Object.assign(issue, { due: due[1].trim() });
                }
                // TODO: Move into utils
                //const meta: any = fm(issue.body);
                //const due = meta.attributes && (meta.attributes.due || meta.attributes.Due);
                //if (meta.attributes && due) {
                //  return Object.assign(issue, {due});
                //}
            });
        });
    }
    getOverdueIssues(rawIssues) {
        return __awaiter(this, void 0, void 0, function* () {
            return rawIssues.filter(issue => {
                const activeLabels = issue.labels.map(label => label.name);
                return activeLabels.includes(constants_1.OVERDUE_TAG_NAME);
            });
        });
    }
    createIssue(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.issues.create(options);
        });
    }
    updateIssue(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.issues.update(options);
        });
    }
}
exports.default = Octokit;
