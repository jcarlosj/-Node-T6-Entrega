/** Importa librerias de Node */
const http = require( 'http' ),
      fs = require( 'fs' ),
      path = require( 'path' );
/** Objeto Routing */
const ROUTING = [
        { path: '', file: './index.html' },                     // > http://www.midominio.co/
        { path: 'acerca', file: './acercade.html' },            // > http://www.midominio.co/acerca
        { path: 'contacto', file: './contacto.html' },          // > http://www.midominio.co/contacto
        { path: 'elisa-maria', file: './elisa-maria.html' }     // > http://www.midominio.co/elisa-maria
    ],
    people = [
        {
            slug: 'elisa-maria',
            info: { firstName: 'Elisa María', lastName: 'Giraldo', gender: 'female', age: 41, born: 'Medellin', profession: 'Industrial Designer' }
        },
        {
            slug: 'luisa-maria',
            info: { firstName: 'Luisa María', lastName: 'Bazalar', gender: 'female', age: 28, born: 'Medellin', profession: 'Business Administrator' }
        },
        {
            slug: 'ana-maria',
            info: { firstName: 'Ana María', lastName: 'Castro', gender: 'female', age: 24, born: 'Bogotá D.C.', profession: 'Social Communicator and Journalist' }
        }
    ];

/** Crea Servidor */
http. createServer( ( request, response ) => {
    let route = path .basename( request .url );

    console .log( ` > Running Node Server...` );
    console .log( ' > Route', route );
    //console .log( ' > Data (people): ', people );

    /** Itera las rutas disponibles */
    ROUTING .forEach( page => {
        
        console .log( ' > path/route: ', page .path + '/' + route );

        if( page .path === route ) {
            console .log( ' > Existe PATH', ( route === '' ) ? '/' : route );
            
            /** Lee fichero dinamicamente si existe, de forma Asincrona */
            fs .readFile( page .file, ( error, dataFile ) => {
                
                if( error ) {
                    console .error( ' > Error: ', error );
                    return;
                }

                console .info( ' > Lee:', page .file );
                //console .log( ' > Data (people): ', people );
                
                let html = dataFile .toString(),
                    fields = html .match( /[^\{\}]+(?=\})/g ),
                    person = {
                        firstName: 'Fulanita',
                        lastName: 'de Tal',
                    };

                    people .forEach( data => {
                        console .log( ' > slug: ', data .slug );
                        if( page .path === data .slug ) {
                            console .log( ' > info: ', data .info );
                            person[ 'firstName' ] = data .info .firstName;
                            person[ 'lastName' ] = data .info .lastName;
                        }
                    });

                /** Valida si existen interpolaciones en el archivo */
                if( fields ) {
                    console .log( ' > Interpolations: ', fields );

                    /** Itera los campos interpolados */
                    for( const field of fields ) {
                        let value = eval( field );          // Convierte un String en Código valido de JavaScript

                        //console .log( ' - ', field, ':' , value );
                        html = html .replace( `{${ field }}`, value );
                        //html = html .replace( '{' + field + '}', value );
                    }

                    // response .writeHead( 200, { 'Content-Type': 'text/html' } );
                    //response .write( html );

                } 
                else {
                    console .info( ' > No hay interpolaciones en el archivo' );
                }

                response .writeHead( 200, { 'Content-Type': 'text/html' } );
                response .write( html );
                response .end();
            });
        }

    });

    if( !response .finished ) {
        fs .readFile( '404.html', ( error, data ) => {
            response .writeHead( 404, { 'Content-Type': 'text/html' } );     // Escribe el estado en la cabecera
            response .end( data );
        });
    }

    
}) .listen( 8081 );