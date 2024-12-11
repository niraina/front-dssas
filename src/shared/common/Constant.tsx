import { CustomerServiceOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';

export const MenuConstant = [
    {
        key: 1,
        parent: "Dashboard",
        icon: <DashboardOutlined />,
        link: "/dashboard",
        childs: []
    },
    {
        key: 2,
        parent: "Services",
        icon: <CustomerServiceOutlined />,
        link: "/services",
        childs: []
    },
    // {
    //     key: 3,
    //     parent: "Abonnements",
    //     icon: <UsergroupAddOutlined />,
    //     link: "/subscriptions",
    //     childs: []
    // },
    {
        key: 4,
        parent: "Profile",
        icon: <UserOutlined />,
        link: "/users",
        childs: []
    },
]