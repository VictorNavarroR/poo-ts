/** Crear interfaces y clases para definir esta situación:

Tenemos una ciudad con varias CASAS , estas pueden ser compradas por distintas PERSONAS.
 De las casas necesitamos guardar la información de su superficie, precio, número de habitaciones, número de baños, tipo de casa (chalet, piso o duplex),
 si la casa está en venta, y su propietario/s en caso de que los tenga.
 De las personas necesitamos conocer su nombre, su edad, el dinero del que disponen, su DNI y su estado civil,
 en caso de que las personas estén casadas además necesitamos conocer su pareja.

Habrá 2 acciones que sea posible realizar: 

- Comprar una casa: En caso de que una casa sea adquirida deberá dejar de estar en venta y se deberá registrar su propietario o propietarios.
- Casarse: 2 personas podrán casarse si no están ya casados con otra persona. Se deberá registrar su nueva pareja y cambiar su estado civil.

Se deberán crear las clases e interfaces necesarias para poder definir las distintas personas y casas.
Además las clases deberán contener los métodos necesarios para que se puedan realizar las acciones descritas.
Se deberá intentar utilizar tipos personalizados y herencia de clases. */

/** Enumeración con los tipos de casa, completar */
enum TipoCasa {
    CHALET = 'chalet',
    PISO = 'piso',
    DUPLEX = 'duplex',
    ESTUDIO = 'estudio',
    UNIFAMILIAR = 'unifamiliar',
    PLURIFAMILIAR = 'plurifamiliar'
}

/** Enumeración con los tipos de estado civil, completar */
enum EstadoCivil {
    CASADO = 'casado',
    SOLTERO = 'soltero',
    UNIONLIBRE = 'unionlibre',
    DIVORCIADO = 'divorciado',
    SEPARADO = 'separado',
    VIUDO = 'viudo'
}

/** Interfaz Casa, completar con el resto de información necesaria */
interface CasaInterface {
    precio: number;
    tipoCasa: TipoCasa;
    /** Lista con los propietario/s */
    propietarios: Persona[];
    enVenta: boolean;
}

/** Interfaz persona completar con el resto de información necesaria */
interface PersonaInterface {
    nombre: string;
    estadoCivil: EstadoCivil;
}

/** Clase casa, completar con atributos que faltan */
class Casa implements CasaInterface {
    metros: number;
    precio: number;
    habitaciones:number;
    lavabos:number;
    tipoCasa: TipoCasa;
    propietarios: Persona[];
    enVenta: boolean;

    constructor(metros:number, precio: number, habitaciones:number, lavabos:number, tipoCasa: TipoCasa, enVenta:boolean = true) {
        this.metros = metros;
        this.precio = precio;
        this.habitaciones = habitaciones;
        this.lavabos = lavabos;
        this.tipoCasa = tipoCasa;
        // La casa empieza sin propietarios
        this.propietarios = [];
        // La casa al principio está en venta
        this.enVenta = enVenta;
    }

    /** Función para comprar una casa, añadir lógica para que no se compre una casa si los compradores no disponen del dinero suficiente */
    comprar(compradores: Persona[]) {
        // Si está en venta se permite comprarla (añadir condición para que los compradores tengan el dinero)
        // y restar de su dinero el precio de la casa si la compran.
        if (this.enVenta) {
            //comprobamos que los compradores tengan dinero suficiente
            const dineroCompradores = compradores.reduce( (acc, comprador) => comprador.dinero + acc, 0);
            if(dineroCompradores < this.precio) {
                console.log('ERROR: los compradores no tienen dinero suficiente para comprar esta casa')
                return
            }
            // Se actualizan propietarios
            this.propietarios = compradores;
            const cobrarAcadaComprador = this.precio / 2;
            //actualizar precio a compradores
            compradores.forEach( comprador => comprador.dinero = comprador.dinero - cobrarAcadaComprador)
            // La casa deja de estar en venta.
            this.enVenta = false;
            console.log('Casa comprada exitosamente')
        } else {
            console.log('ERROR: La casa no está en venta')
        }
    }
}

/** Clase persona, completar con atributos y constructor */
class Persona implements PersonaInterface {  //necesitamos nombre, edad, dinero, dni y estado civil
    public nombre: string;
    public edad:number;
    public dinero:number;
    private dni:string;
    public estadoCivil: EstadoCivil;
    
    /** Opcional porque no se rellena a menos que la persona esté casada */
    private pareja?: Persona;

    constructor(nombre: string, edad:number, dinero:number, dni:string, estadoCivil: EstadoCivil) {
        this.nombre = nombre;
        this.edad = edad;
        this.dinero = dinero;
        this.dni = dni;
        this.estadoCivil = estadoCivil;
    }

    /** Implementar lógica para actualizar el estado civil de ambas personas y su pareja
     * Se deberá comprobar que las 2 personas estén solteras antes de casarlos.
     */
    public casarse(persona: Persona) {
        //si la persona no tiene pareja le asignamos una
        if(persona.estadoCivil !== EstadoCivil.CASADO && this.estadoCivil !== EstadoCivil.CASADO) {
            this.pareja = persona;  //puede besar a la novia
            //cambiamos el estado civil de la persona a casado
            persona.estadoCivil = EstadoCivil.CASADO;
            this.estadoCivil = EstadoCivil.CASADO
            const textSacerdote:string = 'Los declaro casados, puede besar a su pareja!' 
            console.log(textSacerdote)
            return  textSacerdote
        }        
        const error = new Error(`${persona.estadoCivil === EstadoCivil.CASADO ? persona.nombre : this.nombre} ya esta casado!`)
        console.log(error)
        return error
    }
}

//CREAMOS VARIAS CASAS
const chalet1: Casa = new Casa(152, 160000, 3, 2, TipoCasa.CHALET, true);
const piso1: Casa = new Casa(68, 60000, 2, 1, TipoCasa.PISO);
const dupex: Casa = new Casa(70, 130000, 4, 2, TipoCasa.DUPLEX, false);
const estudio: Casa = new Casa(40, 550000, 1, 1, TipoCasa.ESTUDIO);
const plurifamiliar: Casa = new Casa(120, 2500000, 6, 3, TipoCasa.PLURIFAMILIAR, false);

//CREAMOSS ALGUNAS PERSONAS
const juan: Persona = new Persona('Juan', 32, 80000, '54672398L', EstadoCivil.SOLTERO);
const maria: Persona = new Persona('María', 34, 125000, '34568910T', EstadoCivil.SOLTERO);
const paula: Persona = new Persona('Paula', 27, 195000, '34589921D', EstadoCivil.SOLTERO);

const manolo: Persona = new Persona('Manolo', 45, 50000, '54672398L', EstadoCivil.SOLTERO);
const pepe: Persona = new Persona('Pepe', 64, 125000, '34568910T', EstadoCivil.CASADO);
const raluca: Persona = new Persona('Raluca', 25, 990000, '34589921D', EstadoCivil.DIVORCIADO);

//PRUEBAS FUNCIONES CASARSE 

maria.casarse(juan) // Debería funcionar correctamente. ✔
console.log(maria)
/*
maria.casarse(paula) // Debería imprimir en consola el error "ERROR: La persona ya está casada". ✔
console.log(maria)
*/

//PRUEBAS FUNCIONES COMPRAR CASA

chalet1.comprar([juan, maria]); // Debería comprar el chalet correctamente al tener entre los dos suficiente dinero ✔
console.log(juan, maria)
/*
piso1.comprar([juan]); // ERROR: Los compradores no tienen suficiente dinero para adquirir esta casa. ✔
*/

//PRUEBAS ESTADOS CIVILES Y CASAS EN VENTA
/*
 console.log(juan.estadoCivil); // casado ✔
 console.log(paula.estadoCivil); // soltero ✔
 console.log(chalet1.enVenta); // false ✔
 console.log(piso1.enVenta); //true ✔
*/

/** Crear las personas y casas que se desee y hacer pruebas (se valorará que se creen nuevas pruebas inventadas) */
/**
 * Este es un ejemplo de como debería funcionar el programa una vez haya sido terminado, los comentarios a la derecha de cada línea de código describen el resultado que se debe
 * mostrar al usuario por consola:
 * 
  * const juan: Persona = new Persona('Juan', 32, 50000, '54672398L', EstadoCivil.SOLTERO); ✔
  * const maria: Persona = new Persona('María', 34, 125000, '34568910T', EstadoCivil.SOLTERO); ✔
  * const paula: Persona = new Persona('Paula', 27, 195000, '34589921D', EstadoCivil.SOLTERO); ✔
  * const chalet1: Casa = new Casa(152, 160000, 3, 2, TipoCasa.CHALET); ✔
  * const piso1: Casa = new Casa(68, 60000, 2, 1, TipoCasa.PISO); ✔
 * 
 * maria.casarse(juan); // Debería funcionar correctamente. ✔
 * maria.casarse(paula); // Debería imprimir en consola el error "ERROR: La persona ya está casada". ✔
 * chalet1.comprar([juan, maria]); // Debería comprar el chalet correctamente al tener entre los dos suficiente dinero ✔
 * piso1.comprar([juan]); // ERROR: Los compradores no tienen suficiente dinero para adquirir esta casa. ✔
 * 
 * console.log(juan.estadoCivil); // casado ✔
 * console.log(paula.estadoCivil); // soltero ✔
 * console.log(chalet1.enVenta); // false ✔
 * console.log(piso1.enVenta); //true ✔
 * 
 */
