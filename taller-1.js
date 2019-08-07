/** Importa librerias de Node */
const http = require( 'http' ),
      fs = require( 'fs' );

/** Crea Servidor */
http. createServer( ( request, response ) => {
    console .log( ` > Running Node Server...` );

    /** Lee fichero index.html de forma Asincrona */
    fs .readFile( 'index.html', ( error, dataFile ) => {
        console .log( dataFile .toString() );
    });

    response .writeHead( 200, { 'Content-Type': 'text/plain' } );
    response .end( 'Running Node Server...' );
}) .listen( 8081 );