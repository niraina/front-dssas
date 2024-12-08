import Services from "@/pages/services";
import Subscriptions from "@/pages/subscriptions";
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
    {
        path: "/subscriptions/*",
        element: <Subscriptions />
    },
]

export const PUBLIC_ROUTES = [
    {
        path: "/*",
        element: <Auth />
    },
]