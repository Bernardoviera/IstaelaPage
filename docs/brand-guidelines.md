# Brand Guidelines v1.0 — Reconexão e Sexualidade

> Last updated: 2026-07-24
> Status: Draft

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #B5563D |
| Secondary Color | #7A5C61 |
| Primary Font | Fraunces (headings) / Inter (body) |
| Voice | Acolhedora, íntima, segura, sem julgamento |

---

## 1. Color Palette

Paleta quente e terrosa — evita azul clínico/corporativo e evita vermelho/rosa explícito. Tom de "final de tarde", pele, terracota, vinho suave.

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Terracota | #B5563D | rgb(181,86,61) | CTAs, headers, destaques |
| Terracota Escuro | #8F4230 | rgb(143,66,48) | Hover, ênfase |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Vinho Suave | #7A5C61 | rgb(122,92,97) | Acentos, títulos secundários |
| Dourado Terra | #C9A15E | rgb(201,161,94) | Detalhes, ícones, divisores |

### Neutral Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Fundo | #FBF6F1 | rgb(251,246,241) | Fundo de página (bege quente, não branco frio) |
| Superfície | #F3E9DF | rgb(243,233,223) | Cards, seções |
| Texto Primário | #2C2220 | rgb(44,34,32) | Títulos, corpo de texto |
| Texto Secundário | #6E5B56 | rgb(110,91,86) | Legendas, texto de apoio |
| Borda | #E4D5C8 | rgb(228,213,200) | Divisores, bordas |

### Semantic Colors

| State | Hex | Usage |
|-------|-----|-------|
| Sucesso | #6B8F5A | Confirmações |
| Aviso | #C9A15E | Estados pendentes |
| Erro | #B5563D | Erros de formulário (reaproveita terracota, evita vermelho vivo alarmante) |

### Accessibility

- Texto primário sobre fundo: contraste mínimo 4.5:1 (AA) — validar `#2C2220` sobre `#FBF6F1`.
- Botão primário (`#B5563D` sobre branco/texto claro): validar 4.5:1 antes de publicar.
- Não usar apenas cor pra indicar erro em formulário — sempre acompanhar de texto.

---

## 2. Typography

### Font Stack

```css
--font-heading: 'Fraunces', Georgia, serif;
--font-body: 'Inter', system-ui, -apple-system, sans-serif;
```

Serifada (Fraunces) nos títulos passa acolhimento/humanidade sem soar clínica; Inter no corpo garante legibilidade.

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| H1 | 44px | 30px | 600 | 1.2 |
| H2 | 32px | 26px | 600 | 1.25 |
| H3 | 24px | 20px | 600 | 1.3 |
| Body | 17px | 16px | 400 | 1.6 |
| Body Large | 19px | 18px | 400 | 1.65 |
| Small | 14px | 14px | 400 | 1.5 |

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 3. Logo Usage

Sem logo definido ainda — usar wordmark simples (nome da profissional/marca em Fraunces 600) até um logo ser criado.

---

## 4. Voice & Tone

### Brand Personality

| Trait | Description |
|-------|--------------|
| **Acolhedora** | Recebe sem julgamento, nunca performática |
| **Íntima** | Fala de perto, sem distância clínica |
| **Segura** | Transmite sigilo e cuidado, nunca expõe |
| **Sensível** | Reconhece a dor sem dramatizar |

### Voice Chart

| Trait | Somos | Não somos |
|-------|-------|-----------|
| Acolhedora | Próxima, calorosa | Piegas, invasiva |
| Íntima | Direta, pessoal | Explícita, apelativa |
| Segura | Confiável, sigilosa | Fria, clínica |
| Sensível | Empática | Dramática, sensacionalista |

### Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| Landing page | Acolhedora, direta | "Sua sexualidade pode voltar a ser sua." |
| Objeções/FAQ | Calma, validante | "Não existe pressa nem julgamento aqui." |
| CTA | Convidativa, sem pressão | "Fale comigo" (não "Compre agora") |

### Prohibited Terms

| Avoid | Reason |
|-------|--------|
| Desempenho / performance | Reforça o "roteiro" que a oferta desconstrói |
| Cura rápida / milagre | Promessa irreal, quebra confiança |
| Linguagem clínica fria (ex: "disfunção") | Soa a diagnóstico, não a acolhimento |
| Linguagem explícita/erótica | Foge do posicionamento (reconexão emocional/sensorial, não conteúdo adulto) |

---

## 5. Imagery Guidelines

### Photography Style

- **Lighting:** luz natural suave, tons quentes (fim de tarde, luz de vela)
- **Subjects:** texturas e detalhes sensoriais (água, tecido, pele, plantas) em vez de pessoas em poses sexualizadas
- **Color treatment:** manter paleta terracota/bege quente
- **Composição:** simples, com espaço negativo, nunca explícita

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Imagens explícitas ou sexualizadas | Foge do posicionamento acolhedor/terapêutico |
| Estética clínica (branco frio, ícones médicos) | Contradiz voz acolhedora |
| Estoque genérico de "casal feliz" | Clichê, não reflete processo individual/interno |

---

## 6. Design Components

### Buttons

| Type | Background | Text | Border Radius |
|------|------------|------|----------------|
| Primary | #B5563D | #FBF6F1 | 999px (pill, acolhedor) |
| Secondary | Transparent, borda #B5563D | #B5563D | 999px |

### Spacing Scale

| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |

### Border Radius

| Element | Radius |
|---------|--------|
| Botões | 999px |
| Cards | 20px |
| Inputs | 12px |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-07-24 | Guia inicial — paleta terracota/bege quente, tipografia Fraunces+Inter, voz acolhedora sem julgamento. |
