import {
  Avatar,
  ScrollShadow,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableColumn,
  Button,
} from "@nextui-org/react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
export const Asistentes = () => {
  const data = [
    {
      nombre: "Dr. Tony Reichert",
      cargo: "Presidente de la Corte Nacional de Justicia",
      titulo: "Ph.D",
    },
    {
      nombre: "Dr. Zoey Lang",
      cargo: "Corte Constitucional del Ecuador",
      titulo: "Ph.D",
    },
    {
      nombre: "Dr. Jane Fisher",
      cargo: "Presidente de la Corte Provincial",
      titulo: "Ph.D",
    },
    {
      nombre: "Dr. William Howard",
      cargo: "Presidente del Consejo de Educación Superior(CES)",
      titulo: "Ph.D",
    },
    {
      nombre: "Dr. Andrés Cobeña",
      cargo: "Rector de la Universidad Central del Ecuador",
      titulo: "Ph.D",
    },
    {
      nombre: "Dr. William Howard",
      cargo: "Presidente de la Senescyt",
      titulo: "Ph.D",
    },
    {
      nombre: "Dr. Andrés Gushmer",
      cargo: "Presidente del CONADIS del Perú",
      titulo: "Ph.D",
    },
    {
      nombre: "Dr. José Villacreses",
      cargo: "Presidente del CONADIS del Argentina",
      titulo: "Ph.D",
    },
    {
      nombre: "Dr. Angel Cedeño",
      cargo: "Presidente del CONADIS del Colombia",
      titulo: "Ph.D",
    },
    {
      nombre: "Dr. Juan Carlos Vera",
      cargo: "Rector de la Universidad Técnica de Manabí",
      titulo: "Ph.D",
    },
    {
      nombre: "Dra. Gabriela Macias",
      cargo: "Rectora de la Universidad ESPAM",
      titulo: "Ph.D",
    },
  ];

  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollWidth > clientWidth + scrollLeft);
    }
  };

  useEffect(() => {
    checkScroll();
  }, [scrollRef.current]);

  return (
    <section className="space-y-10 flex flex-col justify-center items-center">
      <h3 className="text-3xl font-bold text-[#00335f]">
        Asistentes destacados
      </h3>
      <div className="flex justify-between items-center w-full border-3 border-[#00335f] rounded-xl">
        <Button
          onPress={scrollRight}
          size="lg"
          isIconOnly
          variant="light"
          color="primary"
        >
          <HiOutlineChevronLeft size={20} />
        </Button>
        <ScrollShadow
          orientation="horizontal"
          hideScrollBar
          ref={scrollRef}
          className="flex items-center justify-between  w-full col-span-10 gap-3 py-4"
        >
          <div className="grid grid-rows-2 grid-flow-col gap-3">
            {data.map(({ cargo, nombre, titulo }, index) => (
              <article className="flex flex-col items-center gap-3">
                <Avatar key={index} className="w-32 h-32" />
                <p className="text-center text-sm text-[#00335f] font-semibold  w-52">
                  {cargo}
                </p>
              </article>
            ))}
          </div>
        </ScrollShadow>
        <Button
          onPress={scrollLeft}
          size="lg"
          isIconOnly
          variant="light"
          color="primary"
        >
          <HiOutlineChevronRight size={20} />
        </Button>
      </div>
      <article className="grid md:grid-cols-2 gap-5">
        <div className="space-y-5 p-5">
          <h4 className="text-xl font-semibold text-[#00335f]">
            Destacadas autoridades
          </h4>
          <p>
            ANEUPI invitará a destacadas autoridades a nivel Nacional e
            Internacional para la inauguración y desarrollo del III Congreso
            Internacional de Educación Inclusiva y Discapacidad desde las
            praxis, que se llevará a cabo en la ciudad de Quito - Ecuador, en
            modalidad virtual y presencial, donde se escucharán conferencias
            magistrales, conversatorios, paneles, talleres y exposiciones sobre
            la temática de la Educación Inclusiva Superior a favor de los
            derechos de las Personas con Discapacidad.
          </p>
        </div>
        <Table
          removeWrapper
          className="border-3 border-[#00335f] rounded-2xl"
          classNames={{
            th: "bg-[#00335f] text-white sticky top-0 z-10",

            base: "max-h-80 overflow-auto",
          }}
          aria-label="Example static collection table"
          isStriped
        >
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Cargo</TableColumn>
            <TableColumn>Título</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map(({ cargo, nombre, titulo }, index) => (
              <TableRow key={index}>
                <TableCell>{nombre}</TableCell>
                <TableCell>{cargo}</TableCell>
                <TableCell>{titulo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </article>
    </section>
  );
};
