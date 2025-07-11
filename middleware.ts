import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isPublicRoute = createRouteMatcher([
  "/", // Homepage
  "/sign-in(.*)", // Sign-in
  "/sign-up(.*)", // Sign-up
  "/pricing", // Pricing section
  "/about", // About section
  "/api/public(.*)", // If any public API endpoints
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    "/(api|trpc)(.*)",
  ],
};
