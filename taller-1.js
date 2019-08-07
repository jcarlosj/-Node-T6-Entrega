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
            firstName = 'Elisa Maria',
            lastName = 'Giraldo';

        /** Valida si existen interpolaciones en el archivo */
        if( fields ) {
            console .log( ' > Interpolations: ', fields );

            /** Itera los campos interpolados */
            for( const field of fields ) {
                let value = eval( field );          // Convierte un String en Código valido de JavaScript

                console .log( ' - ', field, ':' , value );
                html = html .replace( `{${ field }}`, value );
                //html = html .replace( '{' + field + '}', value );
            }

            response .writeHead( 200, { 'Content-Type': 'text/html' } );
            response .write( html );

        } 
        else {
            console .info( ' > No hay interpolaciones en el archivo' );
        }

        response .end();
    });

    
}) .listen( 8081 );