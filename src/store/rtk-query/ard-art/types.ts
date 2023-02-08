type ArdArtResponseStatus = 'error' | 'bad_request' | 'success' | 'unauthorized' | 'unknown'
// Generated by https://quicktype.io

export interface ArdArtMetalandLogin {
    token: string;
}

export interface ArdArtResponse<T> {
    code: number;
    status: ArdArtResponseStatus;
    message: string;
    result?: T;
}

// Generated by https://quicktype.io

export type ArdArtMetalandLoginResponse = ArdArtResponse<{
    jwtToken: string;
    accountId: number;
}>

export type ArdArtBalanceResponse = ArdArtResponse<any[]>

// Generated by https://quicktype.io

export interface ArdArtCheckInvoiceResult {
    id: number;
    createdAt: string;
    updatedAt: string;
    accountId: number;
    toAccountId: null;
    amount: number;
    isTicket: null;
    prevAmount: number;
    tan: string;
    qrCode: string;
    desc: string;
    successResponse: string;
    errorResponse: null;
    type: string;
    swapType: string;
    method: string;
    transactionType: string;
    status: string;
    txInvoiceId: number;
    txHash: string;
    account: null;
    txRef: null;
    qpayInvoiceId: string;
    createdById: number;
    apiKey: string;
    webhook: string;
}
