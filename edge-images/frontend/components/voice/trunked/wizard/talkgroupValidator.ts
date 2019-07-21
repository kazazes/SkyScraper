import { camelCase, mapKeys } from "lodash";
import { ParseResult } from "papaparse";

export interface IInputtedTalkgroup {
    decimal: Number,
    hex: String,
    alphaTag: String,
    category: String,
    description: String,
    mode: String,
    tag: String,
    priority?: Number
}

export class TalkgroupValidator {
    results: ParseResult;
    requiredKeys = ["decimal", "alphaTag", "category", "description", "mode", "tag", "priority"];
    talkgroups: IInputtedTalkgroup[] = [];
    rowErrors: any[] = [];

    constructor(results: ParseResult) {
        this.results = results;
    }

    protected static instanceOfIInputtedTalkgroup(a: any): a is IInputtedTalkgroup {
        if (!("decimal" in a && typeof a["decimal"] === "number")) {
            return false;
        } else if (!("alphaTag" in a && typeof a["alphaTag"] === "string")) {
            return false;
        } else if (!("category" in a && typeof a["category"] === "string")) {
            return false;
        } else if (!("description" in a && typeof a["description"] === "string")) {
            return false;
        } else if (!("mode" in a && typeof a["mode"] === "string")) {
            return false;
        } else if (!("tag" in a && typeof a["tag"] === "string")) {
            return false;
        } else if ("priority" in a && typeof a["priority"] !== "number") {
            return false;
        }

        return true;
    }

    public mapToTalkgroups(): { talkgroups: IInputtedTalkgroup[], errors: any[] } {
        // camelcase headers
        this.results.data.map((row) => {
                return mapKeys(row, (value, key) => {
                    return camelCase(key);
                });
            })
            .map((row) => {
                // delete keys we don't want
                Object.keys(row).forEach((key) => {
                    if (row.hasOwnProperty(key)) {
                        if (!this.requiredKeys.includes(key)) {
                            delete row[key];
                        }
                    }
                });
                return row;
            })
            .forEach((row) => {
                if (TalkgroupValidator.instanceOfIInputtedTalkgroup(row)) {
                    this.talkgroups.push(row);
                } else {
                    this.rowErrors.push(row);
                }
            });

        return { talkgroups: this.talkgroups, errors: this.rowErrors };
    }

    public validateHeaders(): Error[] {
        const fatalErrors: Error[] = [];

        // convert uploaded headers to camelcase
        const camelHeaders = this.results.meta.fields.map((header) => camelCase(header));

        // make sure what's needed exists
        const missingKeys = this.requiredKeys.filter((required) => {
            return !camelHeaders.includes(required);
        });

        if (missingKeys.length > 0) {
            fatalErrors.push(...missingKeys.map((required) =>
                new Error(`The column ${ required } is required but could not be found`)));
        }

        return fatalErrors;
    }
}