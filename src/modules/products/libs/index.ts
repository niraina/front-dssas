import { useAppSelector } from "@/app/store"

export const useResponseDataProducts = () =>  useAppSelector((state) => state.products.response.data || [])
export const useResponseProductsPagination = () =>  useAppSelector((state) => state.products.response?.pagination)
export const useRequestProducts = () =>  useAppSelector((state) => state.products.request)
export const useLoadingProducts = (): boolean =>  useAppSelector((state) => state.products.isLoading)
export const useResponseProducts = () =>  useAppSelector((state) => state.products)