import {
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GoStar } from "react-icons/go";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export const Sugerencias = () => {
  const { register, handleSubmit } = useForm();
  const [value, setValue] = useState(1); // Inicializa como número

  const onSubmit = (data) => {
    console.log(data);
  };

  const suggestions = [
    {
      id: 1,
      label: "Temática a tratar",
      placeholder:
        "Me gustaría que traten el tema de la accesibilidad de las personas indígenas con discapacidad",
    },
    {
      id: 2,
      label: "Sugerencia de ponentes",
      placeholder:
        "Yo propongo como ponente a los docentes de la universidad LECENI",
    },
    {
      id: 3,
      label: "Propuestas para mejorar",
      placeholder:
        "Propongo que las personas con discapacidad cuenten sus historias y experiencias que han tenido en la universidad",
    },
    {
      id: 4,
      label: "Propuesta de avales",
      placeholder:
        "Soy el rector de la academia ANEUPI y solicito que me contacten para otorgar un aval, etc.",
    },
    {
      id: 5,
      label: "Observaciones",
      placeholder: "Escribe tus observaciones",
    },
  ];

  const handlePlaceholder = (id) => {
    const suggestion = suggestions.find((s) => s.id === id);
    return suggestion ? suggestion.placeholder : "Placeholder no encontrado";
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className=" lg:col-span-2 space-y-3 ">
        <h3 className="text-2xl font-semibold">Sugerencias</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-3 "
        >
          <Autocomplete
            defaultItems={suggestions}
            className="lg:col-span-2"
            label="Escoga el tipo de sugerencia"
            selectedKey={value.toString()} // Convertir el valor a string
            onSelectionChange={(key) => setValue(Number(key))} // Convertir el valor a número
          >
            {(suggestion) => (
              <AutocompleteItem variant="faded" key={suggestion.id}>
                {suggestion.label}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            placeholder="Dr. Henry Ricardo Erraez"
            {...register("nombres")}
            label="Nombres y apellidos"
          />
          <Input
            placeholder="Soy docente de la academia ANEUPI"
            {...register("universidad")}
            label="Universidad/Institución"
          />

          <Textarea
            {...register("sugerencia")}
            className="lg:col-span-2"
            label={suggestions.find((s) => s.id === value)?.label}
            placeholder={handlePlaceholder(value)} // Utiliza el placeholder dinámico
          />
          <div className="lg:col-span-2 flex items-center justify-center gap-2">
            <Button
              className="w-full lg:w-auto"
              type="submit"
              variant="flat"
              color="primary"
            >
              Enviar
            </Button>
            <Button
              as="a"
              target="_blank"
              href="https://whatsapp.com/channel/0029Vaf4il905MUazhwZ5M17"
              type="submit"
              variant="solid"
              className=" text-white"
              color="success"
            >
              Contactanos <FaWhatsapp />
            </Button>
          </div>
        </form>
      </div>

      <Card shadow="none" className="lg:col-span-1 border-2 border-[#00335f]">
        <CardHeader className="flex flex-col items-start">
          <GoStar className="text-warning" size={30} />
          <h3 className="text-lg font-semibold">Nos interesa tu opinión</h3>
        </CardHeader>
        <CardBody className="text-gray-500 ">
          En ANEUPI, creemos que las mejores ideas surgen cuando escuchamos a
          quienes más nos importan: nuestros usuarios. Tu opinión no solo nos
          ayuda a mejorar, sino que también nos guía para crear soluciones que
          realmente hagan la diferencia. Queremos que te sientas parte de esta
          evolución, porque cada sugerencia que compartes es un paso hacia un
          futuro más adaptado a tus necesidades. Puedes hacer una o varias
          sugerencias, ¡todas son bienvenidas!
        </CardBody>
      </Card>
      <div className="grid lg:grid-cols-3  lg:col-span-3 gap-5">
        <Card shadow="none" className="col-span-1 border-2 border-[#00335f]">
          <CardHeader className="flex flex-col items-start">
            <GoStar className="text-warning" size={30} />
            <h3 className="text-lg font-semibold">
              Soy docente de la Universidad Central del Ecuador
            </h3>
          </CardHeader>
          <CardBody className="text-gray-500 ">
            Les propongo que el gran evento sea en la Universidad Central,
            porque es una institución de prestigio y con una larga trayectoria
            en la educación inclusiva. Además, contamos con las instalaciones
            necesarias para llevar a cabo un evento de esta magnitud.
          </CardBody>
        </Card>
        <Card shadow="none" className="col-span-1 border-2 border-[#00335f]">
          <CardHeader className="flex flex-col items-start">
            <GoStar className="text-warning" size={30} />
            <h3 className="text-lg font-semibold">
              Soy estudiante de la UNAM - México
            </h3>
          </CardHeader>
          <CardBody className="text-gray-500 ">
            Creo que sería una excelente idea invitar a la UNAM a participar en
            este congreso, ya que es una de las universidades más importantes de
            América Latina y cuenta con una amplia experiencia en educación
            inclusiva y discapacidad.
          </CardBody>
        </Card>
        <Card shadow="none" className="col-span-1 border-2 border-[#00335f]">
          <CardHeader className="flex flex-col items-start">
            <GoStar className="text-warning" size={30} />
            <h3 className="text-lg font-semibold">
              Soy estudiante de la univesidad UNMSM - Perú
            </h3>
          </CardHeader>
          <CardBody className="text-gray-500 ">
            Somos estudiantes de la UNMSM y nos gustaría que se incluyan en el
            voluntariado a estudiantes de nuestra universidad en el III Congreso
            Internacional.
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
