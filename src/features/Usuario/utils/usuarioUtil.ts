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


export function generarUsuaurio(nombres:string, apellidos:string){
    const nombresS = nombres.split("")
        const apellidosS = apellidos.split(" ")
        return `${nombresS[0]}.${apellidosS[0].toLowerCase()}`
    
}