export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  // Routes accessible to unauthenticated users
  const publicRoutes = ["/login", "/confirm", "/about", "/docs"];

  // Check if the current route is public
  // We check if the path matches exactly or starts with valid public prefixes (e.g. /docs/guide)
  const isPublicRoute = publicRoutes.some(
    (route) => to.path === route || to.path.startsWith(`${route}/`),
  );

  // If user is not logged in and tries to access a restricted route
  if (!user.value && !isPublicRoute) {
    return navigateTo("/login");
  }
});
