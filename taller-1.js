const http = require( 'http' );

/** Crea Servidor */
http. createServer( ( request, response ) => {
    console .log( ` > Running Node Server...` );

    response .writeHead( 200, { 'Content-Type': 'text/plain' } );
    response .end( 'Running Node Server...' );
}) .listen( 8081 );