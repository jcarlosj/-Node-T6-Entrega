/** Importa librerias de Node */
const http = require( 'http' ),
      fs = require( 'fs' );

/** Crea Servidor */
http. createServer( ( request, response ) => {
    console .log( ` > Running Node Server...` );

    /** Lee fichero index.html de forma Asincrona */
    fs .readFile( 'index.html', ( error, dataFile ) => {
        let html = dataFile .toString(),
            fields = html .match( /[^\{\}]+(?=\})/g ),
            name = 'Elisa Maria';

        /** Valida si existen interpolaciones en el archivo */
        if( fields ) {
            console .log( ' > Interpolations: ', fields );
        } 
        else {
            console .info( ' > No hay interpolaciones en el archivo' );
        }

    });

    response .writeHead( 200, { 'Content-Type': 'text/plain' } );
    response .end( 'Running Node Server...' );
}) .listen( 8081 );