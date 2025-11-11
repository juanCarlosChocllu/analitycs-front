import type { AsesorSinUsuario } from "../interfaces/usuario.interface";
import * as ExcelJs from "exceljs";
export function extraerNombre(nombre: string) {
  const nombreSplict = nombre.split(" ");
  let nombreAsesor = "";
  let contador = 0;
  if (nombreSplict.length <= 3) {
    for (const da of nombreSplict) {
      contador++;
      nombreAsesor += " " + da;
      if (contador == 1) {
        break;
      }
    }
  }
  if (nombreSplict.length > 3) {
    for (const da of nombreSplict) {
      contador++;
      nombreAsesor += " " + da;
      if (contador == 2) {
        break;
      }
    }
  }
  return nombreAsesor.trim();
}

export function extraerApellido(nombre: string) {
  const nombreSplict = nombre.split(" ");
  let apellidos = "";
  if (nombreSplict.length <= 3) {
    for (let i = 1; i < nombreSplict.length; i++) {
      apellidos += " " + nombreSplict[i];
    }
  }
  if (nombreSplict.length > 3) {
    for (let i = 2; i < nombreSplict.length; i++) {
      apellidos += " " + nombreSplict[i];
    }
  }

  return apellidos.trim();
}

export function generarUsuaurio(nombres: string, apellidos: string) {
  const nombresS = nombres.split("");
  const apellidosS = apellidos.split(" ");
  return `${nombresS[0]}.${apellidosS[0].toLowerCase()}`;
}

export async function generarExcelUsuario(data: AsesorSinUsuario[]) {
  const libro = new ExcelJs.Workbook();
  const hoja = libro.addWorksheet("Hoja 1");

  hoja.columns = [
    {
      header: "id",
      key: "id",
    },
    {
      header: "nombre",
      key: "nombre",
    },
    {
      header: "apellidos",
      key: "apellidos",
    },
    {
      header: "username",
      key: "username",
    },
    {
      header: "password",
      key: "password",
    },
    {
      header: "id sucursal",
      key: "idSucursal",
    },
    {
      header: "sucursal",
      key: "sucursal",
    },
    {
      header: "rol",
      key: "rol",
    },
  ];

  for (const item of data) {
    const nombre = extraerNombre(item.nombre);
    const apellidos = extraerApellido(item.nombre);
    for (const value of item.sucursal) {
      hoja.addRows([
        {
          id: item._id,
          nombre: nombre,
          apellidos: apellidos,
          username: generarUsuaurio(nombre, apellidos),
          password: `${generarUsuaurio(nombre, apellidos)}2025`,
          idSucursal: value.idDetalle,
          sucursal: value.nombre,
        },
      ]);
    }
  }
  const buffer = await libro.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Asesores.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
