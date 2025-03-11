"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

const ClientLayout = ({children} : {children : ReactNode}) => {
    const queryClient = new QueryClient()
return (
    <QueryClientProvider client={queryClient}>
        <Toaster/>
        {children}
    </QueryClientProvider>
)
}
export default ClientLayout

