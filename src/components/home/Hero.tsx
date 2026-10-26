import nftImage from '@/assets/nfts/nft-image-1.png';
import nftImageDesktop from '@/assets/nfts/nft-image-1-desktop.png';
import ArrowExplorerSvg from '@/assets/icons/ArrowExplorerSvg';

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden rounded-4xl max-md:bg-linear-to-br from-primary/20 to-primary/10 mt-4 md:mt-8"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-20%] top-[55%] w-[64%] aspect-square -translate-y-1/2 rounded-full bg-linear-to-r from-[#DD9A5F]/43 to-primary/4 md:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute left-[20%] top-[55%] w-[64%] aspect-square -translate-y-1/2 rounded-full bg-linear-to-r from-[#DD9A5F]/37 to-primary/0 md:hidden"
      />

      <div className="relative flex md:items-center gap-1.5 md:gap-27.5 px-4 py-2 pb-6 md:h-112.5">
        <div className="flex w-[55%] flex-col gap-2 md:gap-1 md:pl-6">
          <p className="text-xs font-medium text-foreground">
            Bem-vindo à Kurio
          </p>
          <h1
            id="hero-title"
            className="text-lg font-bold uppercase leading-7.5 text-foreground md:hidden"
          >
            Seja dono da cultura digital
          </h1>

          <h1
            id="hero-title"
            className="hidden md:block text-lg md:text-[42px] md:leading-17.5 font-bold uppercase leading-7.5 text-foreground"
          >
            SEJA DONO DO FUTURO DA ARTE DIGITAL
          </h1>

          <p className="md:hidden text-xs text-text-secondary leading-4.5">
            Descubra NFTs selecionados de criadores do mundo todo.
          </p>

          <p className="hidden md:block text-xs text-text-secondary leading-6">
            Descubra NFTs selecionados de criadores emergentes e consagrados.
            Colecione arte digital rara, apoie artistas e tenha uma parte da
            cultura da internet.
          </p>

          <a
            href="#catalogo"
            className="flex w-fit items-center gap-2 text-xs font-bold uppercase text-text-accent md:text-lnk outline-offset-4 focus-visible:outline-2 focus-visible:outline-text-primary md:bg-primary md:w-35 md:h-10 md:justify-center md:rounded-sm md:mt-7 md:hover:bg-primary-light transition"
          >
            Explorar
            <ArrowExplorerSvg className="size-3 md:hidden" aria-hidden="true" />
          </a>
        </div>

        <div className="relative mt-1 aspect-square flex-1">
          <picture>
            <source media="(min-width: 768px)" srcSet={nftImageDesktop} />
            <img
              src={nftImage}
              alt="Macaco de óculos escuros e jaqueta verde"
              className="size-full rounded-3xl object-cover"
            />
          </picture>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Destaques"
        className="absolute inset-x-0 bottom-2 md:bottom-13 flex justify-center gap-2"
      >
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === 0}
            aria-label={`Destaque ${index + 1}`}
            className="size-2 rounded-full bg-primary outline-offset-2 focus-visible:outline-2 focus-visible:outline-text-primary cursor-pointer"
          />
        ))}
      </div>
    </section>
  );
}
