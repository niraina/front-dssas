/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../requests/_get_requests";
import { ProductRequest } from "../models/product.model";

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (data: ProductRequest) => {
    try {
      const response = await getProducts(data)
      return response.data;
    } catch (error: any) {
      //throw new Error(error.message);
      return {
        data: { products: [] as any[], totalItems: 10 },
        page: 1,
        isLoading: false,
        error: error.message || "erreur de serveur",
      }
    }
  }
);