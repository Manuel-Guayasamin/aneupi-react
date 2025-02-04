import { z } from "zod";

export const inscripcionSchema = z.object({
  nombres: z
    .string({
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .min(3, {
      message: "El nombre es requerido",
    })
    .max(35, {
      message: "El nombre debe tener menos de 35 caracteres",
    }),
  apellidos: z
    .string()
    .min(3, {
      message: "El apellido es requerido",
    })
    .max(35, {
      message: "El apellido debe tener menos de 35 caracteres",
    }),
  direccion: z
    .string()
    .min(5, {
      message: "La dirección es requerida",
    })
    .max(50, {
      message: "La dirección debe tener menos de 50 caracteres",
    }),
  edad: z.string().min(1, {
    message: "La edad es requerida",
  }),
  profesion: z
    .string()
    .min(3, {
      message: "La profesión es requerida",
    })
    .max(50, {
      message: "La profesión debe tener menos de 50 caracteres",
    }),
  id_modalidad: z.string().min(1, {
    message: "La modalidad es requerida",
  }),
  costo: z.string().min(1, {
    message: "El costo es requerido",
  }),
  cedula: z.string().length(10, {
    message: "La cédula debe tener exactamente 10 caracteres",
  }),
});

export const ponenteSchema = z.object({
  nombres: z
    .string({
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .min(3, {
      message: "El nombre es requerido",
    })
    .max(35, {
      message: "El nombre debe tener menos de 35 caracteres",
    }),
  cedula: z.string().length(10, {
    message: "La cédula debe tener exactamente 10 caracteres",
  }),
  email: z.string().email({
    message: "El correo electrónico debe ser válido",
  }),
  edad: z.string({
    message: "La edad es requerida",
  }),

  direccion: z
    .string()
    .min(5, {
      message: "La dirección es requerida",
    })
    .max(50, {
      message: "La dirección debe tener menos de 50 caracteres",
    }),
  profesion: z
    .string()
    .min(3, {
      message: "La profesión es requerida",
    })
    .max(50, {
      message: "La profesión debe tener menos de 50 caracteres",
    }),
  telefono: z.string().length(10, {
    message: "El teléfono debe tener exactamente 10 caracteres",
  }),
  tematica: z
    .string()
    .min(5, {
      message: "La temática es requerida",
    })
    .max(50, {
      message: "La temática debe tener menos de 50 caracteres",
    }),
});

export const ofertaLaboralSchema = z.object({
  profesion: z
    .string()
    .min(3, {
      message: "La profesión es requerida",
    })
    .max(50, {
      message: "La profesión debe tener menos de 50 caracteres",
    }),
  area: z
    .string()
    .min(3, {
      message: "El área es requerida",
    })
    .max(50, {
      message: "El área debe tener menos de 50 caracteres",
    }),
  descripcion: z
    .string()
    .min(10, {
      message: "La descripción es requerida",
    })
    .max(200, {
      message: "La descripción debe tener menos de 200 caracteres",
    }),
  salario: z.string().min(1, {
    message: "El salario es requerido",
  }),
});

export const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(5000000), // Tamaño máximo de 5MB
  type: z
    .string()
    .refine(
      (type) => ["image/jpeg", "image/png", "application/pdf"].includes(type),
      {
        message: "El tipo de archivo debe ser JPEG, PNG o PDF",
      }
    ),
});

export const ContactoSchema = z.object({
  nombres: z.coerce.string(),
  apellidos: z.coerce.string(),
  telefono: z.coerce.string(),
  email: z.coerce.string().email(),
  mensaje: z.coerce.string(),
  pais_id: z.coerce.number().positive(),
  ciudad: z.coerce.string(),
});
