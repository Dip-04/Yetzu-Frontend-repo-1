const axios = require("axios");

const API_BASE_URL = (process.env.API_BASE_URL || "https://productionyetzuapi.yetzu.com").replace(/\/+$/, "");

const roles = [
  {
    name: "student",
    email: process.env.STUDENT_EMAIL || "student@yetzu.com",
    password: process.env.STUDENT_PASSWORD,
  },
  {
    name: "educator",
    email: process.env.EDUCATOR_EMAIL || "testeducator@yetzu.com",
    password: process.env.EDUCATOR_PASSWORD,
  },
  {
    name: "admin",
    email: process.env.ADMIN_EMAIL || "yetzuadmin@yetzu.com",
    password: process.env.ADMIN_PASSWORD,
  },
];

const getAccessToken = (payload) =>
  payload?.userData?.jwtToken ||
  payload?.data?.accessToken ||
  payload?.data?.access_token ||
  payload?.accessToken ||
  payload?.access_token ||
  "";

const decodeJwtPayload = (token) => {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return null;
    return JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
};

const getUserId = (loginPayload, token) => {
  const jwtPayload = decodeJwtPayload(token) || {};
  return (
    jwtPayload.userId ||
    jwtPayload.id ||
    jwtPayload.sub ||
    loginPayload?.data?.user?.id ||
    loginPayload?.data?.user?._id ||
    loginPayload?.user?.id ||
    loginPayload?.userData?.user?.id ||
    ""
  );
};

const redact = (value) => {
  if (!value) return value;
  if (typeof value === "string") return value.slice(0, 500);
  return JSON.stringify(value).slice(0, 500);
};

const requestConfig = (token, userId) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    ...(userId ? { "x-user-id": userId, userid: userId } : {}),
  },
  validateStatus: () => true,
  timeout: 30000,
});

const login = async ({ email, password }) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/identityapi/v1/auth/signin`,
    { email, password },
    { validateStatus: () => true, timeout: 30000 },
  );

  return { status: response.status, payload: response.data };
};

const me = async (token, userId) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/identityapi/v1/auth/me`,
    requestConfig(token, userId),
  );

  return { status: response.status, payload: response.data };
};

const logout = async (token, userId) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/identityapi/v1/auth/signout`,
    { userId },
    requestConfig(token, userId),
  );

  return { status: response.status, payload: response.data };
};

const run = async () => {
  const missing = roles.filter((role) => !role.password).map((role) => `${role.name.toUpperCase()}_PASSWORD`);
  if (missing.length) {
    console.error(`Missing required env vars: ${missing.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  console.log("Logout API smoke test");
  console.log(`Base URL: ${API_BASE_URL}`);

  const results = [];

  for (const role of roles) {
    const result = {
      role: role.name,
      email: role.email,
      loginStatus: null,
      meBeforeStatus: null,
      logoutStatus: null,
      meAfterStatus: null,
      ok: false,
      details: "",
    };

    try {
      const loginResult = await login(role);
      result.loginStatus = loginResult.status;

      const token = getAccessToken(loginResult.payload);
      const userId = getUserId(loginResult.payload, token);

      if (loginResult.status < 200 || loginResult.status >= 300 || !token || !userId) {
        result.details = `Login failed or token/userId missing: ${redact(loginResult.payload)}`;
        results.push(result);
        continue;
      }

      const meBefore = await me(token, userId);
      result.meBeforeStatus = meBefore.status;

      const logoutResult = await logout(token, userId);
      result.logoutStatus = logoutResult.status;

      const meAfter = await me(token, userId);
      result.meAfterStatus = meAfter.status;

      const logoutOk = logoutResult.status >= 200 && logoutResult.status < 300 && logoutResult.payload?.success !== false;
      const tokenInvalidated = meAfter.status === 401 || meAfter.status === 403;
      result.ok = logoutOk && tokenInvalidated;

      result.details = [
        `logoutMessage=${logoutResult.payload?.message || "none"}`,
        `tokenInvalidated=${tokenInvalidated}`,
        tokenInvalidated ? "" : `meAfter=${redact(meAfter.payload)}`,
      ].filter(Boolean).join("; ");
    } catch (error) {
      result.details = error.message;
    }

    results.push(result);
  }

  for (const result of results) {
    console.log("\n" + "-".repeat(72));
    console.log(`${result.ok ? "PASS" : "FAIL"} ${result.role.toUpperCase()} logout`);
    console.log(`email=${result.email}`);
    console.log(`login=${result.loginStatus || "n/a"}; meBefore=${result.meBeforeStatus || "n/a"}; logout=${result.logoutStatus || "n/a"}; meAfter=${result.meAfterStatus || "n/a"}`);
    if (result.details) console.log(`details=${result.details}`);
  }

  const failed = results.filter((result) => !result.ok);
  console.log("\n" + "=".repeat(72));
  console.log(`Summary: ${results.length - failed.length}/${results.length} logout flows passed`);
  if (failed.length) process.exitCode = 1;
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
