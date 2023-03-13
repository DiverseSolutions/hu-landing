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

// Generated by https://quicktype.io

export interface ArdArtBalance {
    id: number;
    createdAt: string;
    updatedAt: string;
    accountId: number;
    amount: number;
    isActive: boolean;
    lockedAmount: number;
    type: string;
    account: null;
}

export type ArdArtBalanceResponse = ArdArtResponse<ArdArtBalance[]>

// Generated by https://quicktype.io

export interface ArdArtOtpResult {
    id: number;
}
