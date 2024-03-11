e de dimport withAuth from "next-auth/middleware";
import { PERMISSIONS } from "./lib/permissions";
import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

/* export default withAuth(
    function middleware(req) {
      const token = req.nextauth.token as any;
      const collectPath = token? token.permissions.reduce(
            (acc: string[], curr: string) => [
              ...acc,
              ...(PERMISSIONS[curr]?.path || []),
            ],
            ['/', '/dashboard', '/profile', '/permission-denied']
          )
        : [];
  
      const result = matcher(req.nextUrl.pathname, collectPath);
  
      if (!result) {
        return NextResponse.redirect(
          new URL('/permission-denied', req.url)
        );
      }
    }
  );

function matcher(pathname: string, collectPath: any) {
    return collectPath.some((path: string) => {
        if (path.endsWith("*")) {
            const prefix = path.slice(0, -1);
            return pathname.startsWith(prefix);
        } else {
            return pathname === path;
        }
    });
} */
export const config = {
  matcher: [
    "/dashboard",
  ],
};

