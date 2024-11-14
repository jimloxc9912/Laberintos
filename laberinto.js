// Configuración del laberinto
const canvas = document.getElementById("laberinto");
const ctx = canvas.getContext("2d");

const TAM_CELDA = 20; // Tamaño de cada celda del laberinto
const FILAS = 25; // Número de filas
const COLUMNAS = 25; // Número de columnas

// Dirección de los movimientos: [arriba, abajo, izquierda, derecha]
const DIRECCIONES = [
  [-1, 0], // Arriba
  [1, 0],  // Abajo
  [0, -1], // Izquierda
  [0, 1]   // Derecha
];

// Inicialización de las celdas del laberinto
let laberinto = [];

// Inicializar la estructura de celdas (0 es camino, 1 es pared)
function inicializarLaberinto() {
    laberinto = [];
    for (let y = 0; y < FILAS; y++) {
        let fila = [];
        for (let x = 0; x < COLUMNAS; x++) {
            fila.push(1); // Todos son paredes al inicio
        }
        laberinto.push(fila);
    }
}

// Dibujar el laberinto en el canvas
function dibujarLaberinto() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo

    for (let y = 0; y < FILAS; y++) {
        for (let x = 0; x < COLUMNAS; x++) {
            if (laberinto[y][x] === 1) {
                ctx.fillStyle = 'black'; // Pared
            } else {
                ctx.fillStyle = 'white'; // Camino
            }
            ctx.fillRect(x * TAM_CELDA, y * TAM_CELDA, TAM_CELDA, TAM_CELDA);
        }
    }
}

// Función de backtracking para generar el laberinto
function backtracking(x, y) {
    laberinto[y][x] = 0; // Marca la celda actual como camino (0)

    // Barajar direcciones aleatorias para hacer el laberinto impredecible
    let direccionesAleatorias = [...DIRECCIONES];
    direccionesAleatorias.sort(() => Math.random() - 0.5);

    // Intentar moverse en cada dirección
    for (let [dx, dy] of direccionesAleatorias) {
        let nx = x + dx * 2; // Dos celdas de distancia para mantener la separación de las paredes
        let ny = y + dy * 2;

        if (esValido(nx, ny)) {
            // Romper la pared entre las celdas adyacentes
            laberinto[y + dy][x + dx] = 0; // Esta es la pared que rompemos

            // Recursión para seguir cavando el laberinto
            backtracking(nx, ny);
        }
    }
}

// Comprobar si la celda es válida (dentro de los límites y no visitada)
function esValido(x, y) {
    return x >= 0 && x < COLUMNAS && y >= 0 && y < FILAS && laberinto[y][x] === 1;
}

// Función para generar el laberinto
function generarLaberinto() {
    inicializarLaberinto(); // Inicializa el laberinto como un conjunto de paredes
    let inicioX = 1; // Punto de inicio
    let inicioY = 1;
    laberinto[inicioY][inicioX] = 0; // Marca el punto de inicio como camino

    backtracking(inicioX, inicioY); // Genera el laberinto usando backtracking
    dibujarLaberinto(); // Dibuja el laberinto en el lienzo
}

// Inicializar y generar el laberinto al cargar la página
generarLaberinto();
