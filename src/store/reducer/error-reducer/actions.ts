import { createAction } from "@reduxjs/toolkit";

export const pageError = createAction<{
    message: string,
    description?: string,
}>("PAGE_ERROR")