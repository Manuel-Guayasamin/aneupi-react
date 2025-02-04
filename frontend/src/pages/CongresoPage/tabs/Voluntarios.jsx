import {
  Avatar,
  AvatarGroup,
  Image,
  Select,
  SelectItem,
  Button,
  Card,
} from "@nextui-org/react";

export const Voluntarios = () => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 relative py-10 gap-4">
      <section className="flex items-center justify-center flex-col md:relative  md:left-[8.5rem] ml-4">
        <div className="bg-[#00335f] rounded-lg text-4xl text-white w-36 flex items-center justify-center flex-col gap-3 h-44 md:relative bottom-16 right-10">
          8k
          <AvatarGroup size="sm" isBordered>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          </AvatarGroup>
        </div>
        <h1 className="hidden md:block text-5xl relative z-[100] w-96">
          Easy Way To F<span className="md:text-white">ind</span> your Dream
          House
        </h1>
      </section>
      <section className="flex items-center justify-center">
        <Image
          removeWrapper
          radius="full"
          isZoomed
          name="Irving "
          sizes="lg"
          className="md:w-96 md:h-[32rem] z-0"
          src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        />
      </section>
      <section className="hidden md:flex flex-col justify-between items-center">
        <p className="text-sm font-semibold text-center w-64">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
          ab eum consequuntur eveniet, expedita impedit? Tempora repellendus
          perspiciatis laboriosam porro.
        </p>
        <Image
          isZoomed
          removeWrapper
          name="Irving "
          className="w-64 h-72 rounded-full rounded-ee-none"
          src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        />
      </section>
      <section className="hidden md:block relative  left-24 ml-4">
        <Image
          removeWrapper
          name="Irving "
          className="w-64 h-72 rounded-full rounded-b-none"
          src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
        />
      </section>
      <section className="col-span-3 md:col-span-2 flex flex-col justify-around my-4 md:my-0 gap-3 md:gap-0">
        <h4 className="text-center md:text-end text-2xl md:text-4xl text-wrap">
          Experience A New Way of Living
        </h4>
        <Card
          radius="none"
          className="flex flex-col  md:flex-row p-4 items-center gap-5"
        >
          <Select
            radius="none"
            classNames={{
              trigger: "bg-white hover:bg-white shadow-none",
            }}
            className="col-span-3 "
            label={
              <div className="flex justify-start flex-col">
                <h4 className="text-start">Ubicación</h4>
                <p className="text-xs text-gray-500 font-normal">
                  Selecciona tu ciudad
                </p>
              </div>
            }
          >
            <SelectItem>Option 1</SelectItem>
            <SelectItem>Option 2</SelectItem>
            <SelectItem>Option 3</SelectItem>
          </Select>
          <Select
            radius="none"
            classNames={{
              trigger: "bg-white hover:bg-white shadow-none",
            }}
            className="col-span-3"
            label={
              <div className="flex justify-start flex-col">
                <h4 className="text-start">Rango de precio</h4>
                <p className="text-xs text-gray-500 font-normal">
                  Selecciona tu rango de precio
                </p>
              </div>
            }
          >
            <SelectItem>Option 1</SelectItem>
            <SelectItem>Option 2</SelectItem>
            <SelectItem>Option 3</SelectItem>
          </Select>
          <Button radius="none" className="w-full" color="primary">
            Buscar
          </Button>
        </Card>
      </section>
      <section className="col-span-3 bg-[#e7ecf1] grid md:grid-cols-3 md:px-32 py-5 space-y-2 md:py-10">
        <article className="flex items-center gap-3 px-5">
          <h3 className="text-2xl md:text-4xl font-bold text-[#00335f]">
            $20,4M
          </h3>
          <p className="text-gray-500 text-xs md:text-sm">
            Owner from properties transaction
          </p>
        </article>
        <article className="flex items-center gap-3 px-5">
          <h3 className="text-2xl md:text-4xl font-bold text-[#00335f]">
            150+
          </h3>
          <p className="text-gray-500 text-xs md:text-sm">
            Properties for buy and sell
          </p>
        </article>
        <article className="flex items-center gap-3 px-5">
          <h3 className="text-2xl md:text-4xl font-bold text-[#00335f]">120</h3>
          <p className="text-gray-500 text-xs md:text-sm">Winning awards</p>
        </article>
      </section>
    </div>
  );
};
