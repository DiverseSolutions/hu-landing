type ArdArtResponseStatus = 'ERROR' | 'BAD_REQUEST' | 'SUCCESS' | 'UNAUTHORIZED' | 'UNKNOWN'
// Generated by https://quicktype.io

export interface ArdArtResponse<T> {
    code: number;
    status: ArdArtResponseStatus;
    message: string;
    result: T;
}

// Generated by https://quicktype.io

export type ArdArtMetalandLoginResponse = ArdArtResponse<{
    jwtToken: string;
    accountId: number;
}>

export type ArdArtBalanceResponse = ArdArtResponse<any[]>


// Generated by https://quicktype.io

export type ArdArtTicketResponse = ArdArtResponse<ArtArtTicketResult>;

export interface ArtArtTicketResult {
    count: number;
    records: {
        id: number;
        createdAt: string;
        updatedAt: string;
        isOutOfStock: boolean;
        name: string;
        description: string;
        assetId: number;
        link: string;
        imageUrl: string;
        objectUrl: string;
        category: number;
        price: number;
    }[];
}

export type ArdArtBundleResponse = ArdArtResponse<ArdArtBundleResult>;
// Generated by https://quicktype.io

export interface ArdArtBundleResult {
    count: number;
    records: ArdArtBundleRecord[];
}

export interface ArdArtBundleRecord {
    id: number;
    name: string;
    description: string;
    price: number;
    items: ArdArtBundleItem[];
}

export interface ArdArtBundleItem {
    id: number;
    name: string;
    description: string;
    link: string;
    imageUrl: string;
    objectUrl: string;
    category: number;
}

// Generated by https://quicktype.io

export interface ArdArtCreateInvoiceResult {
    invoiceId: number;
}

export type ArdArtCheckInvoiceResponse = ArdArtResponse<ArdArtCheckInvoiceResult>;

// Generated by https://quicktype.io

export interface ArdArtCheckInvoiceResult {
    invoice: Invoice;
    product: Product;
}

export interface Invoice {
    id: number;
    createdAt: string;
    updatedAt: string;
    accountId: number;
    price: number;
    assetId: number;
    type: number;
    amount: number;
    status: string;
    ardArtInvoiceId: string;
    description: string;
}

export interface Product {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isOutOfStock: boolean;
    name: string;
    type: string;
    description: string;
    assetId: number;
    link: string;
    imageUrl: string;
    objectUrl: string;
    category: number;
    ownerAmount: null;
    price: number;
}


export type ArdArtBundleInvoiceResponse = ArdArtResponse<ArdArtCreateInvoiceResult>;
export type ArdArtSingleInvoiceResponse = ArdArtResponse<ArdArtCreateInvoiceResult>;

// Generated by https://quicktype.io

export interface ArdArtTicketOrAssetRecord {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isOutOfStock: boolean;
    name: string;
    type: string;
    description: string;
    assetId: number;
    link: string;
    imageUrl: string;
    objectUrl: string;
    category: number;
    ownerAmount: null;
    price: number;
    finishDate: string;
    tag: string;
}

export type ArdArtTicketOrAssetResponse = ArdArtResponse<{
    count: number;
    records: ArdArtTicketOrAssetRecord[]
}>

// Generated by https://quicktype.io

export interface ArdArtMyOwnedNftResult {
    count: number;
    records: ArdArtMyOwnedNftRecord[];
}

export interface ArdArtMyOwnedNftRecord {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isOutOfStock: boolean;
    name: string;
    type: string;
    description: string;
    assetId: number;
    link: string;
    imageUrl: string;
    objectUrl: string;
    category: number;
    ownerAmount: number;
    price: number;
}

export type ArdArtMyOwnedNftResponse = ArdArtResponse<ArdArtMyOwnedNftResult>