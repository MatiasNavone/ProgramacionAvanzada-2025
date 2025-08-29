
//let nombre = "Tito";
//let edad = 18;
//let profesion = "Developer";

//console.log ("Nombre = " + nombre)
//console.log ("Edad = " + edad)
//console.log ("Profesion = " + profesion)


function pick(obj, keys) {
  const out = {};
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      out[k] = obj[k];
    }
  }
  return out;
}