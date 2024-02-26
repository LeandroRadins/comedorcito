// Importaciones de @prisma/client
import { PrismaClient, Prisma } from "@prisma/client";

// Creación de una instancia de PrismaClient
const createPrismaClient = (): PrismaClient => {
  return new PrismaClient();
};

// Se declara la variable global para prisma (opcional)
declare global {
  var prisma: undefined | PrismaClient;
}

// Se inicializa la instancia de PrismaClient con la configuración global o local creando una instancia nueva
const prisma = globalThis.prisma ?? createPrismaClient();

// Se exporta la instancia de PrismaClient por defecto
export default prisma;

// Se exporta el namespace Prisma para poder utilizar los tipos de datos de Prisma
export type { Prisma };

// Se exporta la variable global prisma (opcional) para poder utilizarla en desarrollo
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
