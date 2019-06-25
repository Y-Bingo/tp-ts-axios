export type Method =
    "get" | "GET" |
    "delete" | "DELETE" |
    "head" | "HEAD" |
    "post" | "POST" |
    "options" | "OPTIONS" |
    "put" | "PUT";
export interface AxiosRequestConfig
{
    url: string;
    method?: Method;
    data?: any;
    params?: any;
}