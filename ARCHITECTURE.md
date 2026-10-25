# Arquitetura

## Política de cache, retries e sincronização

Configurada no `QueryClient` em [src/main.tsx](src/main.tsx).

### `staleTime: 30_000` (30 s)

- O padrão do TanStack Query é `0`, o que marca todo dado como velho ao chegar e dispara refetch a cada remount ou refocus da janela.
- Com 30 s, voltar a uma consulta já feita (por exemplo, mudar um filtro e depois desfazer) reaproveita o cache sem nova requisição. Cada combinação de parâmetros tem sua própria chave (`['nfts', 'list', params]`).
- Preço e disponibilidade mudam, mas a atualização em tempo real não depende só desse intervalo: o evento `nft.updated` (Socket.IO) deve atualizar ou invalidar o cache, e a reconexão reconcilia os recursos ativos com a API REST.
- O valor é um equilíbrio: curto o bastante para a lista não ficar velha por muito tempo, longo o bastante para evitar requisições redundantes durante a navegação.

### `retry: 1`

- O padrão são 3 tentativas com tempo exponencial, o que mantém a interface em carregamento por vários segundos antes de exibir o erro.
- Com 1 tentativa extra, uma falha transitória de rede ainda é absorvida, e uma falha real chega rápido ao estado de erro, onde o usuário pode usar "Tentar novamente".

### Outras decisões de consulta

- `placeholderData: keepPreviousData` em `useNfts`: ao mudar filtros, a lista anterior permanece visível (com `aria-busy`) até a nova resposta chegar, evitando que a tela pisque vazia.
- O `AbortSignal` do TanStack Query é repassado ao Axios, então requisições obsoletas são canceladas quando os parâmetros mudam.

## Estado do catálogo na URL

Os filtros **aplicados** do catálogo vivem nos search params da rota `/`, então sobrevivem a refresh, compartilhamento de link e navegação pelo histórico. O schema está em [src/features/nfts/catalogSearch.ts](src/features/nfts/catalogSearch.ts) e é ligado à rota por `validateSearch`.

| Parâmetro | Valores | Padrão (omitido da URL) |
| --- | --- | --- |
| `collection` | rótulo de uma coleção | nenhuma |
| `networks` | lista de redes | vazia |
| `minPrice` / `maxPrice` | ETH, entre `0.01` e `16` | `0.01` / `16` |
| `sort` | `recent`, `price-asc`, `price-desc` | `recent` |

- **Fonte da verdade:** `CatalogFiltersProvider` ([src/contexts/CatalogFiltersContext.tsx](src/contexts/CatalogFiltersContext.tsx)) lê a URL com `useSearch` e escreve com `navigate`. Não há cópia do estado aplicado em `useState`.
- **Slider:** o valor em edição fica só em memória. Apenas "Aplicar" grava `minPrice`/`maxPrice` (arredondados a 2 casas, pois o slider emite ruído de float32). Ao voltar/avançar no histórico, o rascunho é reposto com o valor da URL.
- **Histórico:** cada mudança faz *push*, então o botão voltar restaura o filtro anterior.
- **URL limpa:** valores iguais ao padrão são removidos com `stripSearchParams`.
- **Links editados à mão:** valores inválidos (`?collection=xyz`, `?minPrice=abc`, `?sort=foo`) caem no padrão, e uma faixa invertida (`min > max`) volta a `0.01–16`, sem quebrar a página.
- **Limitação:** `networks` usa a serialização padrão do router, que gera `networks=["Ethereum","Solana"]` (codificado na URL). Funciona, mas é menos legível que uma lista separada por vírgula.
- **Pendente:** a paginação ainda não existe na UI e entra na URL quando for implementada.
