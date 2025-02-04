import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { enviarDatosALink } from "../../redux/slices/paymentsSlice";
import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

const storeID = import.meta.env.VITE_STORE_ID;

const generarIdUnica = () => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const prefijo = "CL";
  let id = prefijo;
  for (let i = 0; i < 8; i++) {
    id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return id;
};

const PayPhonePayment = () => {
  const dispatch = useDispatch();
  const { data, error, status } = useSelector((state) => state.payments);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [enlaceGenerado, setEnlaceGenerado] = useState(false);

  const onSubmit = (data) => {
    try {
      const amount = parseFloat(data.cantidad) * 100;
      const linkdata = {
        amount: amount,
        amountWithoutTax: amount,
        currency: "USD",
        reference: "Donacion",
        clientTransactionId: generarIdUnica(),
        storeId: storeID,
        oneTime: true,
        expireIn: 1,
      };

      dispatch(enviarDatosALink(linkdata)).then(() => {
        if (!error) {
          setEnlaceGenerado(true);
          reset();
          toast.success("¡Enlace Generado!", { theme: "colored" });
        }
      });

      // Simula la generación del enlace
    } catch (error) {
      // Manejo de errores
      console.error("Error al enviar datos al enlace:", error);
      toast.error("Error al enviar datos al enlace");
    }
  };

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 p-4 md:mx-auto shadow-xl colorcito text-white rounded-xl"
    >
      <fieldset>
        <h3 className=" text-3xl font-bold text-center text-white">PayPhone</h3>
      </fieldset>
      <fieldset className="grid max-w-sm gap-4 mx-auto">
        <div>
          <Input
            type="number"
            step="1"
            endContent={<span className="text-black">$</span>}
            {...register("cantidad", {
              required: "Por favor, ingrese un valor.",
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message: "Por favor, ingrese un valor válido.",
              },
            })}
            classNames={{
              input: "ml-1",
            }}
            disabled={isLoading}
            min={1}
            label="Valor (USD):"
            placeholder="9.99"
          />
          {errors.cantidad && (
            <span className="block mt-2 text-xs text-white badge badge-error">
              Ingrese un valor válido
            </span>
          )}
        </div>
        <Button type="submit" color="warning" disabled={isLoading}>
          Generar Enlace
        </Button>
      </fieldset>
      {enlaceGenerado && data && !isLoading && (
        <fieldset className="flex flex-col items-center justify-center">
          <p className="mb-1 text-sm font-semibold text-white">
            ¡Haz click aquí!
          </p>
          <Button
            as={Link}
            to={data}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white no-underline btn btn-info animate__animated animate__heartBeat"
          >
            Pagar con PayPhone
          </Button>
        </fieldset>
      )}
    </form>
  );
};

export default PayPhonePayment;
