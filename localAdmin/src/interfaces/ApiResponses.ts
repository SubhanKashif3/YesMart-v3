export interface ApiResponse{
    message : string;
    data : Object | null | undefined
};

export interface ErrorApiResponse{
    errorMessageLog : string;
    error : string;
}