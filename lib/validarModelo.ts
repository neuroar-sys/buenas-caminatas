type TipoEsperado = "string" | "number" | "array" | "boolean";

interface EsquemaModelo {
  [campo: string]: TipoEsperado;
}

export function validarModelo(objeto: any, esquema: EsquemaModelo): string[] {
  const errores: string[] = [];

  for (const campo in esquema) {
    const tipo = esquema[campo];
    const valor = objeto[campo];

    if (valor === undefined || valor === null) {
      errores.push(`Falta el campo '${campo}'`);
      continue;
    }

    switch (tipo) {
      case "string":
        if (typeof valor !== "string") errores.push(`'${campo}' debe ser string`);
        break;
      case "number":
        if (typeof valor !== "number") errores.push(`'${campo}' debe ser number`);
        break;
      case "array":
        if (!Array.isArray(valor)) errores.push(`'${campo}' debe ser array`);
        break;
      case "boolean":
        if (typeof valor !== "boolean") errores.push(`'${campo}' debe ser boolean`);
        break;
      default:
        errores.push(`Tipo desconocido para '${campo}'`);
    }
  }

  return errores;
}
