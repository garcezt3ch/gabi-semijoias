import { ArrowLeft, ArrowRight, Check, Heart, Minus, Plus, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRoute } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const fallback = {
  "brinco-aurora": { title: "Brinco Aurora", type: "Brincos", description: "Argola orgânica com banho dourado e presença leve. Uma peça para acompanhar todos os dias.", price: 129.9, image: "/assets/brinco-aurora.webp" },
  "colar-orbita": { title: "Colar Órbita", type: "Colares", description: "Pingente oval delicado para usar sozinho ou em camadas. Um brilho essencial para todos os dias.", price: 159.9, image: "/assets/colar-orbita.webp" },
};

export default function Product() {
  const [, params] = useRoute("/produto/:handle");
  const handle = params?.handle || "brinco-aurora";
  const query = trpc.storefront.product.useQuery({ handle });
  const item = query.data?.product;
  const local = fallback[handle as keyof typeof fallback] || fallback["brinco-aurora"];
  const [quantity, setQuantity] = useState(1);
  const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const product = item ? { title: item.title, type: item.productType || "Semijoias", description: item.description, price: Number(item.priceRange.minVariantPrice.amount), image: item.featuredImage?.url || local.image, available: item.availableForSale, variantId: item.variants.nodes[0]?.id } : { ...local, available: true, variantId: undefined };

  return <div className="product-page"><header className="product-page-header"><a className="text-link" href="/"><ArrowLeft size={15} /> Voltar para a curadoria</a><a className="wordmark" href="/"><span className="wordmark-mark">⌒</span><span>gabi</span><small>SEMIJOIAS</small></a><span className="product-header-note">Compra segura via Shopify</span></header><main className="product-detail container"><div className="product-detail-image"><img src={product.image} alt={product.title} /><span className="product-detail-stamp"><Sparkles size={14} /> Curadoria Gabi</span></div><div className="product-detail-copy"><p className="eyebrow">{product.type} · Coleção essência</p><h1>{product.title}</h1><p className="product-detail-price">{money(product.price)}</p><p className="product-detail-description">{product.description}</p><div className="detail-divider" /><div className="detail-row"><span>Quantidade</span><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Diminuir quantidade"><Minus size={14} /></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)} aria-label="Aumentar quantidade"><Plus size={14} /></button></div></div><button className="button button-dark detail-add" onClick={() => toast.success(product.variantId ? "Peça pronta para ir para a sacola." : "A curadoria demo está pronta para o seu catálogo Shopify.")} disabled={!product.available}>{product.available ? "Adicionar à sacola" : "Esgotado"}<ArrowRight size={16} /></button><button className="detail-favorite"><Heart size={16} /> Guardar nos favoritos</button><div className="detail-benefits"><div><ShieldCheck size={17} /><span><strong>Banho premium</strong><small>Brilho pensado para durar</small></span></div><div><Check size={17} /><span><strong>Troca fácil</strong><small>Até 7 dias após receber</small></span></div></div></div></main></div>;
}
