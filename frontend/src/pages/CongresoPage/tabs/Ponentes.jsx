import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
  Tab,
  Tabs,
  AvatarGroup,
  Avatar,
} from "@nextui-org/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { Introduccion } from "./normas/introduccion";
import { Criterios } from "./normas/Criterios";
import { useEffect, useState } from "react";
import Subtitle from "../../../components/ui/Subtitle";
export const Ponentes = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const normas = [
    {
      title: (
        <div className="flex items-center justify-center">
          <span className="hidden md:block">
            Normas para la presentacion de ponencias
          </span>
          <span className="block md:hidden">Normas</span>
        </div>
      ),
      content: <Introduccion />,
    },
    {
      title: (
        <div className="flex items-center justify-center">
          <span className="hidden md:block">
            Experiencias y buenas prácticas
          </span>
          <span className="block md:hidden">Experiencias</span>
        </div>
      ),
      content: <Criterios />,
    },
  ];

  return (
    <div className="flex flex-col gap-5 md:gap-10 w-[92%] mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <section className="flex justify-center items-center">
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            setApi={setApi}
            className="rounded-xl overflow-hidden"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  className="flex items-center justify-center md:w-full py-5"
                  key={index}
                >
                  <Card isFooterBlurred className="border-none">
                    <CardHeader className="text-center">
                      <h4 className="text-lg font-semibold text-[#00335f]">
                        Hoy, 8:00 PM
                      </h4>
                    </CardHeader>
                    <CardBody className="relative flex items-center justify-center">
                      <picture className="w-full flex items-center justify-center">
                        <Image
                          removeWrapper
                          alt="Relaxing app background"
                          className="z-0 w-52 h-52 md:w-full md:h-full object-cover"
                          src="https://nextui.org/images/hero-card.jpeg"
                        />
                      </picture>
                    </CardBody>
                    <CardFooter className="flex flex-col gap-3">
                      <p className="text-sm font-semibold ">
                        Tematica:
                        <span className=" font-medium">
                          {" "}
                          Desarrollo de software
                        </span>
                      </p>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flex w-16 mx-auto absolute bottom-16">
            {Array.from({ length: 5 }).map((post, index) => (
              <div
                key={index}
                className={` h-[0.3rem]  mx-auto rounded-full transition-all ${
                  index === current - 1
                    ? "bg-[#f5a524] w-[0.8rem]"
                    : "bg-gray-300 w-[0.3rem]"
                }`}
              />
            ))}
          </div>
        </section>
        <section className=" py-10">
          <h3 className="text-2xl font-semibold text-[#00335f]">Ponentes</h3>
          <p className="text-justify text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            cumque? Magni ad provident in nihil? Voluptate, totam a explicabo
            corporis asperiores beatae aliquam labore quibusdam id minus?
            Facilis, ad dolorum!
          </p>
        </section>
      </div>
      {/* <div className="grid grid-cols-8">
        <div className="col-span-8 bg-[#e0e7ff] rounded-xl grid grid-cols-2 divide-[#b3b8cc] divide-x-2 py-5">
          <div className="h-52  px-6 py-3 flex flex-col justify-between">
            <h3 className="font-medium text-6xl text-[#00335f]">340+</h3>
            <p className="font-semibold">Asistentes</p>
          </div>
          <div className=" w-52  h-52  px-6 py-3 flex flex-col justify-between ">
            <h3 className="font-medium text-6xl text-[#00335f]">50+</h3>
            <p className="font-semibold">Ponentes</p>
          </div>
        </div>
      </div> */}
      <Tabs fullWidth aria-label="Options">
        {normas.map(({ title, content }, index) => (
          <Tab key={index} title={title}>
            <Card>
              <CardBody className="text-gray-500 text-justify">
                {content}
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
