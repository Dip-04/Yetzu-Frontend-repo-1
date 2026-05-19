const axios = require("axios");

const API_BASE_URL = (process.env.API_BASE_URL || "https://productionyetzuapi.yetzu.com").replace(/\/+$/, "");

const roles = [
  {
    name: "student",
    email: process.env.STUDENT_EMAIL || "student@yetzu.com",
    password: "SecurePass@123",
    endpoint: "/api/student/dashboard/notifications",
  },
  {
    name: "educator",
    email: process.env.EDUCATOR_EMAIL || "testeducator@yetzu.com",
    password: "SecurePass@123",
    endpoint: "/api/educator/notifications",
  },
  {
    name: "admin",
    email: process.env.ADMIN_EMAIL || "yetzuadmin@yetzu.com",
    password: "YetzuAdmin@123",
    endpoint: "/api/admin/notifications",
  },
];

const dataOf = (response) => response && response.data ? response.data : response;

const asArray = (value) => {
  if (Array.isArray(value)) return value;

  const candidates = [
    value?.data?.notifications,
    value?.data?.list,
    value?.data?.items,
    value?.data,
    value?.notifications,
    value?.list,
    value?.items,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  return [];
};

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

const redactError = (value) => {
  if (!value) return value;
  if (typeof value === "string") return value.slice(0, 500);
  return JSON.stringify(value).slice(0, 500);
};

const login = async ({ email, password }) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/identityapi/v1/auth/signin`,
    { email, password },
    { validateStatus: () => true, timeout: 30000 },
  );

  return {
    status: response.status,
    payload: dataOf(response),
  };
};

const testNotifications = async ({ endpoint, token, userId }) => {
  const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(userId ? { "x-user-id": userId, userid: userId } : {}),
    },
    validateStatus: () => true,
    timeout: 30000,
  });

  const payload = dataOf(response);
  const notifications = asArray(payload);

  return {
    status: response.status,
    success: response.status >= 200 && response.status < 300,
    count: notifications.length,
    payloadKeys: payload && typeof payload === "object" ? Object.keys(payload).slice(0, 12) : [],
    message: payload?.message || payload?.error || null,
    sampleKeys: notifications[0] && typeof notifications[0] === "object" ? Object.keys(notifications[0]).slice(0, 12) : [],
    rawFailure: response.status >= 200 && response.status < 300 ? null : redactError(payload),
  };
};

const run = async () => {
  const missing = roles.filter((role) => !role.password).map((role) => `${role.name.toUpperCase()}_PASSWORD`);
  if (missing.length) {
    console.error(`Missing required env vars: ${missing.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Notification API smoke test`);
  console.log(`Base URL: ${API_BASE_URL}`);

  const results = [];

  for (const role of roles) {
    const result = {
      role: role.name,
      email: role.email,
      endpoint: role.endpoint,
      loginStatus: null,
      notificationStatus: null,
      ok: false,
      count: 0,
      message: null,
      details: null,
    };

    try {
      const loginResult = await login(role);
      result.loginStatus = loginResult.status;

      const token = getAccessToken(loginResult.payload);
      if (loginResult.status < 200 || loginResult.status >= 300 || !token) {
        result.details = `Login failed or token missing: ${redactError(loginResult.payload)}`;
        results.push(result);
        continue;
      }

      const userId = getUserId(loginResult.payload, token);
      const notificationResult = await testNotifications({ endpoint: role.endpoint, token, userId });
      result.notificationStatus = notificationResult.status;
      result.ok = notificationResult.success;
      result.count = notificationResult.count;
      result.message = notificationResult.message;
      result.details = notificationResult.success
        ? `payloadKeys=${notificationResult.payloadKeys.join(",") || "none"}; sampleKeys=${notificationResult.sampleKeys.join(",") || "none"}`
        : notificationResult.rawFailure;
    } catch (error) {
      result.details = error.message;
    }

    results.push(result);
  }

  for (const result of results) {
    console.log("\n" + "-".repeat(72));
    console.log(`${result.ok ? "PASS" : "FAIL"} ${result.role.toUpperCase()} ${result.endpoint}`);
    console.log(`email=${result.email}`);
    console.log(`loginStatus=${result.loginStatus || "n/a"}; notificationStatus=${result.notificationStatus || "n/a"}; count=${result.count}`);
    if (result.message) console.log(`message=${result.message}`);
    if (result.details) console.log(`details=${result.details}`);
  }

  const failed = results.filter((result) => !result.ok);
  console.log("\n" + "=".repeat(72));
  console.log(`Summary: ${results.length - failed.length}/${results.length} notification endpoints passed`);
  if (failed.length) process.exitCode = 1;
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
