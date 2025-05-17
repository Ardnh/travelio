export interface ResponseError {
    data: any
    error: Error
}

export interface Error {
    status: number
    name: string
    message: string
    details: Details
}

export interface Details {
    errors: DetailErrors[]
}

export interface DetailErrors {
    path: string[]
    message: string
    name: string
}
