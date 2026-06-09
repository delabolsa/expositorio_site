import { defineCollection, z } from 'astro:content';

const artistas = defineCollection({
  schema: z.object({
    nombre: z.string(),
    foto: z.string().optional(),                // /artistas/nombre.jpg
    fechaNacimiento: z.string().optional(),
    medio: z.string().optional(),
    instagram: z.string().optional(),
    email: z.string().email().optional(),
    biografia: z.string().optional(),           // resumen corto
    premios: z.array(z.string()).optional(),
    participaciones: z.array(z.string()).optional(),
    experienciaExtra: z.array(z.string()).optional(),
    entrevistaDisponible: z.boolean().optional(),
    fechaAgregado: z.date().optional(),         // para ordenar los recientes
  }),
});

const obras = defineCollection({
  schema: z.object({
    titulo: z.string(),
    artista: z.string(),        // slug del artista (relación)
    ano: z.number().optional(),
    tecnica: z.string().optional(),
    imagen: z.string().optional(),
    descripcion: z.string().optional(),
  }),
});

export const collections = { artistas, obras };
