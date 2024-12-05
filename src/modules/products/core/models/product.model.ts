import { Pagination, Status } from "@/shared/common/core/models/global.model";

export type ProductModel = {
    status:     Status;
    data:       Product[];
    pagination: Pagination;
}

export type Product = {
    _id:         string;
    title:       string;
    price:       number;
    quantity:    number;
    category:    Category[];
    createdAt:   string;
    updatedAt:   string;
    __v:         number;
    attachement: Attachement[];
}

export type Attachement = {
    _id:      string;
    filename: string;
    path:     string;
}

export type Category = {
    _id:       string;
    label:     string;
    createdAt: string;
    updatedAt: string;
    __v:       number;
}

export type ProductRequest = {
    page: number;
    itemsPerPage: number;
}
