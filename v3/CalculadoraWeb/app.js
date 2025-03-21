let pantalla = document.getElementById("pantalla");
        let memoria = 0;

        let puntoDisponible = true;
        let operadorDisponible = false;

        let auxPunto;
        let auxOperador;

        let numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let operadores = ["+", "*", "/"];




        function agregarCaracter(caracter) {

            if(operadores.includes(caracter)){
                if(operadorDisponible == false){
                    return;
                }
                auxPunto = puntoDisponible;
                puntoDisponible = true;
                auxOperador = operadorDisponible;
                operadorDisponible = false;
                
            } else if(numeros.includes(caracter)){
                auxOperador = operadorDisponible;
                operadorDisponible = true;
            } else if(caracter == "."){
                if(puntoDisponible == false){
                    return;
                }
                auxPunto = puntoDisponible;
                puntoDisponible = false;
            } else if(caracter == "-"){
                if(pantalla.value.substring(pantalla.value.length - 1) == "-"){
                    return;
                }
                auxOperador = operadorDisponible;
                operadorDisponible = false;
            }

            pantalla.value += caracter;
        }

        function calcular() {
            try {
                pantalla.value = eval(pantalla.value); 
            } catch {
                pantalla.value = "Error";
            }
        }

        function borrarEntrada() {
            pantalla.value = "";
            puntoDisponible = true;
            operadorDisponible = false;
        }

        function borrarUltimo() {
            pantalla.value = pantalla.value.slice(0, -1);
            puntoDisponible = auxPunto;
            operadorDisponible = auxOperador;
        }

        function borrarTodo() {
            pantalla.value = "";
            memoria = 0;
            puntoDisponible = true;
            operadorDisponible = false;
        }

        function calcularPorcentaje() {
            try {
                let expresion = pantalla.value + "%";
                let match = expresion.match(/(\d+(?:\.\d+)?)\s*([+\-*/])\s*(\d+(?:\.\d+)?)%/);
                if (match) {
                    let numeroBase = parseFloat(match[1]);
                    let operador = match[2];
                    let porcentaje = parseFloat(match[3]) / 100 * numeroBase;
                    let resultado;
                    switch (operador) {
                        case '+':
                            resultado = numeroBase + porcentaje;
                            break;
                        case '-':
                            resultado = numeroBase - porcentaje;
                            break;
                        case '*':
                            resultado = numeroBase * (porcentaje / numeroBase);
                            break;
                        case '/':
                            resultado = numeroBase / (porcentaje / numeroBase);
                            break;
                        default:
                            resultado = "Error";
                    }
                    pantalla.value = resultado;
                } else {
                    pantalla.value = parseFloat(pantalla.value) / 100;
                }
            } catch {
                pantalla.value = "Error";
            }
        }

        function memoriaSumar() {
            memoria += parseFloat(pantalla.value) || 0;
        }

        function memoriaRestar() {
            memoria -= parseFloat(pantalla.value) || 0;
        }

        function memoriaRecuperar() {
            pantalla.value = memoria;
        }