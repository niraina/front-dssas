/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios"
import { ProductRequest } from "../models/product.model"
import { api } from "@/shared/api"

export const getProducts = (data: ProductRequest):Promise<any> => {
    return api.get("/products", {
        params:{...data}
    }).then((response: AxiosResponse<any>) => response).catch((error) => error)
}