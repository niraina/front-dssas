// App.tsx
import { Routes, Route } from "react-router-dom";
import { PUBLIC_ROUTES, ROUTES } from "@shared/router/Routes";
import GlobalLayout from "./widgets/Layout";
import PublicLayout from "./widgets/LayoutPublic";
import { AuthProvider, useAuth } from "./widgets/Authcontext";
import "./shared/assets/style.scss";

interface RouteType {
  path: string;
  element: JSX.Element;
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <GlobalLayout>
      <Routes>
        {ROUTES.map((item: RouteType, index: number) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </GlobalLayout>
  ) : (
    <PublicLayout>
      <Routes>
        {PUBLIC_ROUTES.map((item: RouteType, index: number) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </PublicLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
