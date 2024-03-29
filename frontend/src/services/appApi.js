import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// define a service user a base url;
const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://chat-app-mern-blond.vercel.app'
    }),

    endpoints: (builder)=>({
        //creating the user
        signupUser: builder.mutation({
            query: (user)=>({
                url: "/users",
                method: "POST",
                body: user,
            }),
        }),
        // login
        loginUser: builder.mutation({
            query: (user)=>({
                url: '/users/login',
                method: "POST",
                body: user,
            }),
        }),
        logoutUser: builder.mutation({
            query: (payload)=>({
                url: '/logout',
                method: "DELETE",
                body: payload,
            }),
        })
    })
})

export const {useSignupUserMutation,useLoginUserMutation,useLogoutUserMutation} = appApi;

export default appApi;
