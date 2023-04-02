import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    reducerPath: 'adminApi',
    tagTypes: ['User', 'Products', 'Customers', 'Transactions', 'Sales', 'Admins', 'Performance'],
    endpoints: build => ({
        getUser: build.query({
            query: id => `general/user/${id}`,
            providesTags: ['User']
        }),
        getProducts: build.query({
            query: () => 'clients/products',
            providesTags: ['Products']
        }),
        getCustomers: build.query({
            query: () => 'clients/customers',
            providesTags: ['Customers']
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, search, sort }) => ({
                url: 'clients/transactions',
                method: 'GET',
                params: { page, pageSize, search, sort }
            }),
            providesTags: ['Transactions']
        }),
        getSales: build.query({
            query: () => 'sales/sales',
            providesTags: ['Sales']
        }),
        getAdmins: build.query({
            query: () => 'management/admins',
            providesTags: ['Admins']
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ['Performance']
        })
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery
} = api;