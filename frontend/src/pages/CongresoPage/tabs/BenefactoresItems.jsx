import { Image, ScrollShadow } from "@nextui-org/react";

export const BenefactoresItems = () => {
  return (
    <section className="flex gap-2 overflow-x-auto">
      <ScrollShadow
        orientation="horizontal"
        hideScrollBar
        className="max-w-full flex gap-5"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <article className="space-y-1 min-w-48">
            <Image
              isZoomed
              width={240}
              src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
            />
            <h3 className="font-semibold text-sm">Patrocinadores</h3>
            <p className="text-xs text-gray-500 font-medium">
              asodgoasdgoisadg
            </p>
          </article>
        ))}
      </ScrollShadow>
    </section>
  );
};
