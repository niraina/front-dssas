import Services from "@/pages/services";
import Auth from "@pages/auth";
import DashBoard from "@pages/dashboard";

export const ROUTES = [
    {
        path: "/dashboard/*",
        element: <DashBoard />
    },
    {
        path: "/services/*",
        element: <Services />
    },
]

export const PUBLIC_ROUTES = [
    {
        path: "/*",
        element: <Auth />
    },
]