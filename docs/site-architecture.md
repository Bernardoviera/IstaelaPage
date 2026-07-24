# Site Architecture — IstaelaPage (Reconexão e Sexualidade)

**Site type:** Small business / single-offer service page (1 nível, sem blog/docs).
**Status:** Novo site. Preço e fluxo de conversão (WhatsApp vs. checkout) ainda pendentes — arquitetura usa placeholder de contato até definição.

## 1. Page Hierarchy

```
Homepage (/)
├── Política de Privacidade (/politica-de-privacidade)
├── Termos de Compra (/termos-de-compra)
└── Obrigado (/obrigado)          [pós-conversão, sem link em nav]
```

Landing única (`index.html`) concentra toda a oferta — hero, dor/transformação, benefícios sensoriais,
desconstrução do "roteiro", processo, objeções, CTA. Sem necessidade de páginas separadas por seção:
site raso (1 nível) é o correto pra oferta única de serviço.

## 2. URL Map

| Page | URL | Parent | Nav Location | Priority |
|------|-----|--------|--------------|----------|
| Homepage (oferta) | `/` | — | — | High |
| Política de Privacidade | `/politica-de-privacidade` | Homepage | Footer | Low |
| Termos de Compra | `/termos-de-compra` | Homepage | Footer | Low |
| Obrigado | `/obrigado` | Homepage | — (pós-CTA only) | Medium |

## 3. Navigation Spec

**Header:** nenhum (landing page única — sem nav que tire foco da conversão). Logo/nome no topo, sem links de saída.

**CTA (âncora fixa/flutuante):** "Fale comigo" → placeholder WhatsApp até confirmar canal real com a profissional (ver `.agents/product-marketing.md`, Goals pendente).

**Footer:** Política de Privacidade · Termos de Compra · contato.

**Breadcrumbs:** não aplicável (site de 1 nível).

## 4. Internal Linking Plan

- CTA principal repetido em 2-3 pontos da página (hero, meio, fechamento) — todos apontam pro mesmo destino de conversão.
- Footer linka política/termos em todas as páginas (obrigatório por serem páginas legais).
- `/obrigado` não recebe link de nav — só é alcançada após conversão (redirect pós-CTA).

## Pendências
- Definir CTA final (WhatsApp / formulário / checkout) — impacta se `/obrigado` precisa existir como página real ou é só uma mensagem de confirmação no WhatsApp.
- Se virar checkout direto (modelo IlanPage), replicar padrão `checkout/`, `obrigado/` com integração de pagamento.
