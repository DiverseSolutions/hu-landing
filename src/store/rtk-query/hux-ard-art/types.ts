type ArdArtResponseStatus = 'ERROR' | 'BAD_REQUEST' | 'SUCCESS' | 'UNAUTHORIZED' | 'UNKNOWN'
// Generated by https://quicktype.io

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
// Generated by https://quicktype.io

export interface ArdArtBundleRecord {
    id: number;
    tag: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    coverUrl: string;
    depositAmount: number;
    items: ArdArtBundleItem[];
}

export interface ArdArtBundleItem {
    id: number;
    bundleId: number;
    productId: number;
    amount: number;
    isOutOfStock: boolean;
    name: string;
    type: string;
    description: string;
    link: string;
    imageUrl: string;
    objectUrl: string;
    category: string;
    price: number;
}

// Generated by https://quicktype.io

export interface ArdArtCreateInvoiceResult {
    invoiceId: number;
}

// Generated by https://quicktype.io

export type ArdArtBundleInvoiceResponse = ArdArtResponse<ArdArtCreateInvoiceResult>;
export type ArdArtSingleInvoiceResponse = ArdArtResponse<ArdArtCreateInvoiceResult>;

// Generated by https://quicktype.io

export type ArdArtTicketOrAssetRecord = {
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
    scheduleDate: string;
    scheduleDateCustom: string;
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

// Generated by https://quicktype.io

export interface ArdArtAssetDetailByIDResult {
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
    finishDate: string;
    medias: any[];
    price: number;
}

// Generated by https://quicktype.io

export interface ArdArtCreateQposInvoiceResult {
    invoiceId: number;
    response: {
        qpayAccountId: string;
        qrCode: string;
        qrLink: string;
        responseCode: number;
        responseDesc: string;
    };
}

// Generated by https://quicktype.io

export interface ArdArtCreateQpayInvoiceResult {
    invoiceId: number;
    response: {
        invoice_id: string;
        qPay_shortUrl: string;
        qr_image: string;
        qr_text: string;
        urls: {
            description: string;
            link: string;
            name: string;
        }[];
    }
}

// Generated by https://quicktype.io

export interface ArdArtCreateSocialpayInvoiceResult {
    invoiceId: number;
    response: {
        checksum: string;
        invoice: string;
        transactionId: string;
    };
}


// Generated by https://quicktype.io

export interface ArdArtGetInvoiceByIdResult {
    id: number;
    createdAt: string;
    updatedAt: string;
    accountId: number;
    idaxAccountId: null;
    price: number;
    productId: number;
    type: number;
    amount: number;
    method: number;
    paymentMethod: string;
    status: string;
    invoiceCode: null;
    idaxInvoiceUrl: null;
    product?: Product;
    ardArtInvoiceId: string;
    description: string;
    successResponse: string;
    errorResponse: null;
    bundle?: {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        coverUrl: string;
        finishDate: string;
        paymentToken: string;
        depositAmount: number;
        category: string;
        tag: string;
    }
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
    finishDate: string;
    scheduleDate: string;
    price: number;
}

// Generated by https://quicktype.io

export interface ArdArtCheckInvoiceResult {
    invoice: Invoice;
}

export interface Invoice {
    id: number;
    createdAt: string;
    updatedAt: string;
    accountId: number;
    idaxAccountId: null;
    price: number;
    productId: number;
    type: number;
    amount: number;
    method: number;
    paymentMethod: string;
    status: string;
    invoiceCode: null;
    idaxInvoiceUrl: null;
    ardArtInvoiceId: string;
    description: string;
    successResponse: string;
    errorResponse: null;
}

// Generated by https://quicktype.io

export interface ArdArtAssetDetailEarlyResult {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isOutOfStock: boolean;
    name: string;
    type: string;
    description: string;
    link: string;
    imageUrl: string;
    objectUrl: string;
    category: number;
    tag: string;
    finishDate: string;
    scheduleDate: string;
    medias: Media[];
    price: number;
}

export interface Media {
    id: number;
    productId: number;
    url: string;
    order: number;
}

// Generated by https://quicktype.io

export interface ArdArtCognitoUserDetailResult {
    Response: {
        Users: {
            Attributes: {
                Name: string;
                Value: string;
            }[];
            Enabled: boolean;
            UserCreateDate: string;
            UserLastModifiedDate: string;
            UserStatus: string;
            Username: string;
        }[];
    };
}

// Generated by https://quicktype.io

export interface ArdArtMyNftCountResult {
    nftCount: number;
}

// Generated by https://quicktype.io

export interface ArdArtArdxUsdRateResult {
    buy: number;
    high: string;
    last: string;
    low: string;
    open: string;
    rose: string;
    sell: number;
    time: number;
    vol: string;
}

// Generated by https://quicktype.io

export interface ArdArtIdaxInvoiceResult {
    invoiceId: number;
    response: {
        userId: number;
        message: string;
        url: string;
        timestamp: string;
    };
}

// Generated by https://quicktype.io

export interface ArdArtBundleDetailResult {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    coverUrl: string;
    finishDate: string;
    paymentToken: string;
    depositAmount: number;
    category: string;
    tag: string;
    items: ArdArtBundleDetailItem[];
}

export type ArdArtBundleDetailItem = {
    id: number;
    bundleId: number;
    productId: number;
    product: {
        id: number;
        createdAt: string;
        updatedAt: string;
        isActive: boolean;
        isOutOfStock: boolean;
        name: string;
        type: string;
        description: string;
        link: string;
        imageUrl: string;
        coverUrl?: string;
        objectUrl: string;
        category: string;
        tag?: string;
        finishDate: string;
        scheduleDate: string;
        scheduleDateCustom: string;
        price: number;
        paymentToken: string;
        assetId?: number;
    };
    amount: number;
    assetId?: number;
}

// Generated by https://quicktype.io

export interface ArdArtAssetDetailResult {
    id: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isOutOfStock: boolean;
    name: string;
    type: string;
    description: string;
    link: string;
    imageUrl: string;
    coverUrl: string;
    objectUrl: string;
    category: string;
    tag: string;
    finishDate: string;
    scheduleDate: string;
    scheduleDateCustom: string;
    medias: {
        id: number;
        productId: number;
        url: string;
        order: number;
    }[];
    price: number;
    paymentToken: string;
}