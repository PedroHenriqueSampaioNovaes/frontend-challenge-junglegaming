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
