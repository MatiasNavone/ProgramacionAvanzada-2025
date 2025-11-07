function isBalanced(s) {
  // Creamos una pila vacia
  const stack = [];

  // Mapa de cierres y aperturas
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  // Recorremos cada caracter del string
  for (const char of s) {
    // Si es un caracter de apertura, lo metemos a la pila
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    }
    // Si es un caracter de cierre
    else if (char === ')' || char === ']' || char === '}') {
      // Sacamos el último elemento de la pila
      const last = stack.pop();

      // Si la pila está vacia o no coincide con el tipo correcto, no esta balanceado
      if (last !== pairs[char]) {
        return false;
      }
    }
  }

  // Si la pila quedo vacia, esta todo balanceado
  return stack.length === 0;
}

// Ejemplos 
console.log(isBalanced("([]{})")); 
console.log(isBalanced("(]"));     
console.log(isBalanced("([)]"));  
console.log(isBalanced("()[]{}"));
console.log(isBalanced("((())"));  
