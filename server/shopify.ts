type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage?: { url: string; altText?: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  productType: string;
  tags: string[];
  variants: { nodes: Array<{ id: string }> };
};

const endpoint = () => {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  return domain ? `https://${domain}/api/2026-01/graphql.json` : null;
};

const query = `#graphql
  query StorefrontProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id
        handle
        title
        description
        availableForSale
        productType
        tags
        variants(first: 1) { nodes { id } }
        featuredImage { url altText }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
`;

export async function getStorefrontProducts() {
  const url = endpoint();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!url || !token) return { connected: false as const, products: [] as ShopifyProductNode[] };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({ query, variables: { first: 24 } }),
  });
  if (!response.ok) throw new Error(`Shopify Storefront API responded with ${response.status}`);
  const payload = await response.json() as { data?: { products?: { nodes: ShopifyProductNode[] } }; errors?: unknown[] };
  if (payload.errors?.length) throw new Error("Shopify Storefront API returned GraphQL errors");
  return { connected: true as const, products: payload.data?.products?.nodes ?? [] };
}

const productQuery = `#graphql
  query StorefrontProduct($handle: String!) {
    product(handle: $handle) {
      id handle title description availableForSale productType tags
      featuredImage { url altText }
      priceRange { minVariantPrice { amount currencyCode } }
      variants(first: 1) { nodes { id } }
    }
  }
`;

export async function getStorefrontProduct(handle: string) {
  const url = endpoint();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!url || !token) return { connected: false as const, product: null };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({ query: productQuery, variables: { handle } }),
  });
  if (!response.ok) throw new Error(`Shopify Storefront API responded with ${response.status}`);
  const payload = await response.json() as { data?: { product?: ShopifyProductNode | null }; errors?: unknown[] };
  if (payload.errors?.length) throw new Error("Shopify Storefront API returned GraphQL errors");
  return { connected: true as const, product: payload.data?.product ?? null };
}

const cartMutation = `#graphql
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { field message }
    }
  }
`;

export async function createStorefrontCheckout(lines: Array<{ merchandiseId: string; quantity: number }>) {
  const url = endpoint();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!url || !token) return { connected: false as const, checkoutUrl: null };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({ query: cartMutation, variables: { lines } }),
  });
  if (!response.ok) throw new Error(`Shopify cart responded with ${response.status}`);
  const payload = await response.json() as { data?: { cartCreate?: { cart?: { checkoutUrl?: string }; userErrors?: Array<{ message: string }> } }; errors?: unknown[] };
  const userErrors = payload.data?.cartCreate?.userErrors ?? [];
  if (payload.errors?.length || userErrors.length) throw new Error(userErrors[0]?.message || "Shopify cart creation failed");
  return { connected: true as const, checkoutUrl: payload.data?.cartCreate?.cart?.checkoutUrl ?? null };
}
