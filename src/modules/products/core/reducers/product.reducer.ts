import { DataModel, Pagination } from "@/shared/common/core/models/global.model";
import { ProductModel, ProductRequest } from "../models/product.model";
import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../actions";

const initialState: DataModel<ProductModel, ProductRequest> = {
    request: {
        page: 1,
        itemsPerPage: 10,
    },
    response: {
        status: {
            code: 200,
            success: true,
            message: "",
            errorCode: ""
        },
        data: [],
        pagination: {} as Pagination
    },
    isLoading: false,
    error: null,
}

const reducer = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
      setProductsReset: (state:Draft<typeof initialState>) => {
        state.request = initialState.request
        state.response = initialState.response
        state.error = initialState.error
        state.isLoading = initialState.isLoading
      },
      setProductsRequest: (state:Draft<typeof initialState>, action: PayloadAction<typeof initialState.request>) => {
        state.request = {...action.payload}
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.response = action.payload ?? initialState.response
          state.error = null;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
          state.response =  {
            status: {
                code: 200,
                success: true,
                message: "",
                errorCode: ""
            },
            data: [] ,
            pagination: {} as Pagination
          };
        })
    },
  });
  
  export const {
    setProductsRequest,
    setProductsReset,
  } = reducer.actions;
  
  export const ProductsReducer = reducer.reducer;