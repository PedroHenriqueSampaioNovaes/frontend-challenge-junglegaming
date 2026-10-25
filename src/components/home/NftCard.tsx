import type { Nft } from '@/features/nfts/types';

export default function NftCard({ nft }: { nft: Nft }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex aspect-208/241 items-center justify-center rounded-sm bg-surface-card p-0.75">
        <img
          src={nft.image}
          alt={`Arte do NFT ${nft.name}`}
          className="aspect-square w-full rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="leading-4.5 text-text-primary">{nft.name}</h3>
        <p className="flex items-baseline gap-3 leading-5">
          <span className="font-bold text-text-accent">{nft.price} ETH</span>
          {nft.previousPrice && (
            <span className="text-text-secondary/70">
              <span className="sr-only">Preço anterior: </span>
              {nft.previousPrice} ETH
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
