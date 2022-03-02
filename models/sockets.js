const BandList = require("./band-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('cliente conectado');

            //* Emitir al cliente conectado todas las bandas actuales

            socket.emit('current-bands', this.bandList.getBands());

            socket.on('votar-banda',(id) => {
                this.bandList.increaseVotes(id);
                //? Toca volver a emitir para actaulizar los valores
                this.io.emit('current-bands', this.bandList.getBands());
            })

            socket.on('eliminar-banda',(id) => {
                // console.log('esto me llega', id)
                this.bandList.removeBand(id);
                //? Toca volver a emitir para actaulizar los valores
                this.io.emit('current-bands', this.bandList.getBands());
            })

            socket.on('cambiar-nombre',({id,nombre}) => {
                console.log('esto me llega', id)
                this.bandList.changeName(id, nombre);
                //? Toca volver a emitir para actaulizar los valores
                this.io.emit('current-bands', this.bandList.getBands());
            })
            
            socket.on('agregar-banda',(nombre) => {
                console.log('esto me llega', nombre)
                this.bandList.addBand(nombre);
                //? Toca volver a emitir para actaulizar los valores
                this.io.emit('current-bands', this.bandList.getBands());
            })
            
        
        });
    }


}


module.exports = Sockets;