'use client';

import { z } from "zod";

const customErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.too_small) {
        if (issue.type === "string") {
            return { message: `The ${issue.path[0]} must be ${issue.inclusive ? "at least" : "over"} ${issue.minimum} characters long.` };
        }
    }
    if (issue.code === z.ZodIssueCode.too_big) {
        if (issue.type === "string") {
            return { message: `The ${issue.path[0]} must be ${issue.inclusive ? "maximum" : "less than"} ${issue.maximum} characters long.` };
        }
    }
    return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export function ZodCustomErrors()
{
    return <></>
}
