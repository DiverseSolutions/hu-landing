
export const storeProduct = (d: {
    productId: number;
    region?: string;
}) => {
    if (!d.region) {
        localStorage.removeItem('idax:region')
    } else {
        localStorage.setItem('idax:region', d.region)
    }
    localStorage.setItem('idax:productId', d.productId.toString())
}

export const retrieveProduct = () => {
    const productId = localStorage.getItem('idax:productId')
    const region = localStorage.getItem('idax:region')
    if (!productId || !parseInt(productId)) {
        return null
    }
    return {
        productId: parseInt(productId),
        region
    }
}

export const storeBundle = (d: {
    bundleId: number;
    region: string;
}) => {
    localStorage.setItem('idax:region', d.region)
    localStorage.setItem('idax:bundleId', d.bundleId.toString())
}

export const retrieveBundle = () => {
    const bundleId = localStorage.getItem('idax:bundleId')
    const region = localStorage.getItem('idax:region')
    if (!bundleId || !parseInt(bundleId) || !region) {
        return null
    }
    return {
        bundleId: parseInt(bundleId),
        region
    }
}