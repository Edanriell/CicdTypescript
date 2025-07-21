import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns null if authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null if header does not start with ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer abc123",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null if header is malformed (no key part)", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns API key if header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc123",
    };
    expect(getAPIKey(headers)).toBe("abc123");
  });
});
