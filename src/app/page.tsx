import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getDashboardUrl = (role?: string | null) => {
  switch ((role || "").toLowerCase()) {
    case "admin":
      return "/a/dashboard";
    case "educator":
      return "/e/dashboard";
    case "student":
      return "/s/dashboard";
    default:
      return "/login";
  }
};

export default async function RootPage() {
  const cookieStore = await cookies();
  const isUserLoggedIn =
    cookieStore.get("isUserLoggedIn")?.value === "true" ||
    Boolean(cookieStore.get("jwtToken")?.value);
  const userRole = cookieStore.get("userRole")?.value;

  redirect(isUserLoggedIn ? getDashboardUrl(userRole) : "/login");
}
