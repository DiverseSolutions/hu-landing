import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const nextjsApi = createApi({
  reducerPath: 'nextjs',
  baseQuery: fetchBaseQuery({  }),
  endpoints: (builder) => ({
    
  }),
})

export const {} = nextjsApi;