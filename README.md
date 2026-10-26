# NFT Marketplace — Desafio Frontend

| Item | Link |
| --- | --- |
| Repositório | https://github.com/PedroHenriqueSampaioNovaes/frontend-challenge-junglegaming |
| Aplicação publicada | **Pendente** — o deploy ainda não foi feito (ver [Deploy](#deploy)) |
| Layout (Figma) | https://www.figma.com/design/Ff0SksUi7UFtPWUO8kyNtw/Frontend-Challenge?node-id=0-1 |

## Estado da entrega

Este README descreve o que **existe hoje** e marca com **(planejado)** o que ainda não foi implementado, para que nada aqui seja lido como funcionalidade pronta sem estar.

| Área | Estado |
| --- | --- |
| Início: catálogo, busca, filtros, ordenação, estado na URL | Implementado (versão desktop e mobile) |
| Início: destaques, paginação | Destaque (hero) implementado; paginação **planejada** (a API já aceita `page` e `pageSize`) |
| Detalhe do NFT, carrinho, pagamento, confirmação | Planejado |
| Login, cadastro, sessão, perfil, carteiras, favoritos | Planejado |
| Socket.IO (`nft.updated`, `order.updated`) | Planejado |
| MSW: `GET /api/nfts` com busca, filtros, ordenação e paginação | Implementado |
| MSW: cenários de falha, latência variável, persistência e reset | Planejado (hoje há um único cenário, com latência fixa de 300 ms) |
| Testes Playwright (E2E e regressão visual) | Planejado |
| Auditoria Lighthouse | Planejado |
| Deploy público | Planejado |

### Instalação e execução

```bash
git clone https://github.com/PedroHenriqueSampaioNovaes/frontend-challenge-junglegaming.git
cd frontend-challenge-junglegaming
npm i
npm run dev
```

Abra o endereço exibido pelo Vite (por padrão `http://localhost:5173`).

O Service Worker do MSW ([public/mockServiceWorker.js](public/mockServiceWorker.js)) é versionado e já está configurado em `package.json` (`msw.workerDirectory`). Não é preciso rodar `msw init`.

Fontes (Localizadas em [public/fonts/](public/fonts/)) e imagens ([src/assets/](src/assets/)) estão no repositório, então a aplicação roda sem rede externa.


## Mock
### Como o mock funciona hoje

- Os handlers ficam em [src/mocks/handlers.ts](src/mocks/handlers.ts) e o worker em [src/mocks/browser.ts](src/mocks/browser.ts). Componentes, hooks e o cliente Axios não contêm respostas fictícias: só chamam `/api`.
- O catálogo vem de [src/mocks/fixtures/nfts.ts](src/mocks/fixtures/nfts.ts): **72 NFTs** gerados por um PRNG com semente fixa (`mulberry32(42)`), em 9 coleções, 3 redes (Ethereum, Polygon, Solana) e preços de 0.10 a 15.09 ETH. O catálogo é idêntico a cada carregamento, o que sustenta filtros, paginação e testes determinísticos.
- Preços trafegam como **string decimal**, e o handler compara valores como `bigint` com 18 casas, sem `float`.
- Há um único cenário (sucesso, com `delay(300)`). O resultado vazio já é alcançável com qualquer busca ou filtro sem correspondência.

## Contratos REST

Erros usam o corpo `{ "code": string, "message": string }` com o status HTTP correspondente. Valores em ETH são sempre strings decimais; quantidades são inteiros.

### Implementados

#### `GET /api/health`

Sonda usada por [src/mocks/enableMocking.ts](src/mocks/enableMocking.ts) para detectar que o Service Worker parou de interceptar (navegadores limitam timers em abas em segundo plano) e reiniciá-lo.

Resposta `200`: `{ "status": "ok" }`

#### `GET /api/nfts`

| Query | Tipo | Observação |
| --- | --- | --- |
| `search` | string | Contém, sem diferenciar maiúsculas, no nome |
| `collection` | string | Igualdade exata |
| `networks` | string | Lista separada por vírgula (`Ethereum,Solana`); o cliente faz o `join` |
| `minPrice` / `maxPrice` | string decimal | Limites inclusivos, comparados com precisão de 18 casas |
| `sort` | `recent` \| `price-asc` \| `price-desc` | Padrão `recent` |

Resposta `200` (tipo `NftListResponse` em [src/features/nfts/types.ts](src/features/nfts/types.ts), validado por Zod em [src/features/nfts/schemas.ts](src/features/nfts/schemas.ts)):

```json
{
  "items": [
    {
      "id": "emerald-ape-042-0",
      "name": "Emerald Ape #042",
      "price": "1.19",
      "previousPrice": "1.37",
      "image": "/assets/...",
      "collection": "Arte digital",
      "network": "Ethereum",
      "listedAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "total": 72,
  "pageSize": 12,
}
```

## Deploy

[JungleGaming](https://frontend-challenge-junglegaming-pi.vercel.app/)
