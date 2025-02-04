import { Avatar, AvatarGroup, Image } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const Artistas = () => {
  const artistas = [
    {
      nombre: "Banda de los Irvings",
      descripcion:
        "Esta banda musical nos estará acompañando en el III Congreso Internacional. Esta banda se formó en el 2010 y ha tenido un gran éxito en la escena musical. Surgió a partir de la idea de un grupo de amigos que querían hacer música juntos.",
      integrantes: [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026302d",
        "https://i.pravatar.cc/150?u=a04258114e29026702d",
        "https://i.pravatar.cc/150?u=a04258114e29026708c",
      ],
    },
    {
      nombre: "Coro de Personas con Discapacidad Quito",
      descripcion:
        "Este coro está conformado por personas con discapacidad auditiva y visual. A pesar de sus limitaciones, han logrado superarlas y han demostrado que la música no tiene barreras. Han tenido presentaciones en diferentes partes del mundo.",
      integrantes: [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026302d",
        "https://i.pravatar.cc/150?u=a04258114e29026702d",
        "https://i.pravatar.cc/150?u=a04258114e29026708c",
      ],
    },
    {
      nombre: "Coro de Personas con Discapacidad Guayaquil",
      descripcion:
        "Este coro está conformado por personas con discapacidad auditiva y visual. A pesar de sus limitaciones, han logrado superarlas y han demostrado que la música no tiene barreras. Han tenido presentaciones en diferentes partes del mundo.",
      integrantes: [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026302d",
        "https://i.pravatar.cc/150?u=a04258114e29026702d",
        "https://i.pravatar.cc/150?u=a04258114e29026708c",
      ],
    },
    {
      nombre: "Banda musical sobre la inclusión Lima",
      descripcion:
        "Esta banda musical nos estará acompañando en el III Congreso Internacional. Esta banda se formó en el 2010 y ha tenido un gran éxito en la escena musical. Surgió a partir de la idea de un grupo de amigos que querían hacer música juntos.",
      integrantes: [
        "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "https://i.pravatar.cc/150?u=a04258114e29026302d",
        "https://i.pravatar.cc/150?u=a04258114e29026702d",
        "https://i.pravatar.cc/150?u=a04258114e29026708c",
      ],
    },
  ];

  return (
    <div>
      <Swiper
        spaceBetween={0}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop
        modules={[Autoplay, Pagination, Navigation]}
      >
        {artistas.map(({ descripcion, integrantes, nombre }, i) => (
          <SwiperSlide key={i}>
            <article className="grid lg:grid-cols-2 gap-5 lg:gap-0 py-10">
              <section className=" flex items-center justify-center">
                <Image
                  src="https://image.europafm.com/clipping/cmsimages02/2023/12/05/C0CCA971-0A49-4767-A037-4D2383510053/todos-artistas-que-admiran-rosalia-han-pedido-colaboracion_98.jpg?crop=1250,703,x0,y0&width=1900&height=1069&optimize=low&format=webply"
                  className="w-96 h-96  object-cover"
                />
              </section>
              <section className="flex flex-col gap-4 justify-center">
                <h3 className="text-xl md:text-4xl text-[#004785] text-center lg:text-start">
                  {nombre}
                </h3>
                <div className="border-t-2 py-6">
                  <p>
                    <span className="font-semibold">Descripción: </span>
                    {descripcion}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-[#00335f]">
                    Integrantes:{" "}
                  </h4>
                  <AvatarGroup isBordered>
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                  </AvatarGroup>
                </div>
              </section>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
