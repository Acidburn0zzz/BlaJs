/*

    Se vuoi tradurre i commenti non cancellare i vecchi, ad esempio:
    
        // Questo è un commento
        // This is a comment
        // .....
        
    Grazie !

*/

( function(){
    
    "use strict";
    
     var __info = {

            author       : "Leonardo Ciaccio",
            contact      : "leonardo.ciaccio@gmail.com",   
            version      : "1.0.3",
            name 	     : "Blajs",
            description  : "Resource for multilanguage apps !",
            contributors : []

        },
         __glb  = {
             
             debug  : false,
             reTest : /[a-z]{2,3}\-[A-Z]{2,3}/g,
             rePath : /\/[a-z]{2,3}\-[A-Z]{2,3}\//g,
             rePara : /lang\=[a-z]{2,3}\-[A-Z]{2,3}/g
        
        },
        __slice = Array.prototype.slice,
        __langs = [];
         
    
    // Controlla la compatibilità del browser
    function __check(){
        
        // Dobbiamo controllare di avere tutti gli strumenti necessari
        try{
            
            // Controllo la funzione trim() che non tutti i browser posseggono
            var test = "test".trim();
            
            // Controllo se ho la console
            console.log( "[ " + __info.name +" ] Check Browser !" );
            
            // Eventuali se esteso ....
            
            __lol( "Browser is ok !" );
            
            return true;
        
        }catch( e ){
        
            return false;
        
        }
    
    };
        
    // Filtra un array
    function __grep( items, callback ){
        
        var filtered = [],
            len      = items.length,
            i = 0;
        
        for( i; i < len; i++ ){
                        
            if( callback( items[ i ] ) )filtered.push( items[ i ] );
        
        }

        return filtered;
    
    };
    
    // Restiruisce una stringa piena e pulita oppure null
    function __goodString( string ){
        
        return ( string && typeof string == "string" && string.trim().length > 0 ) ? string.trim() : null ;

    };
    
    // Restituisce dopo il controllo l'oggetto o null
    function __goodObject( obj ){
        
        return ( obj && typeof obj == "object" ) ? obj : null ;
        
    };
        
    // Gestisce il debug
    function __lol( mex ){
        
        if( __glb.debug )console.log( "[ " + __info.name + " ] " + mex );

        return false;

    };
    
    // Gestisce gli errori
    function __error( mex ){
        
        throw new Error( "[ " + __info.name + " ] " + mex );
        
    };
        
    // Sopprime un errore
    function __at( test ){
            
        try{

            if( typeof test === "function" )return test();

            return test || null;

        }catch( e ){
            
            __lol( "Error suppressed : " + e.message );
            
            return null;

        }
    
    };
            
    // Controlla il formato
    function __checkFormat( text ){
        
        text = __goodString( text );
        if( !text )return false;
                        
        var tText = text.replace( __glb.reTest, "" );
        
        return (tText === "" ) ;
    
    };
                         
    // Preleva una lingua
    function __getLang( langs, lang ){

        return __grep( langs, function( item, i ){

            return ( item.bla && item.bla === lang );

        } );

    };

    // Espongo una funzione per caricare manualmente il dizionario
    function __bla( lang ){
        
        __lol( "Prepare to load new dictionary ..." );
        
        lang = __goodObject( lang );
        if( !lang )return -1;

        lang = __at( function(){
            
            // Sopprimo perché lang.bla potrebbe non esistere, e poi faccio prima
            return ( __checkFormat( lang.bla ) ) ? lang : null;

        } ) || null;
                
        if( lang != null ){
            
            __lol( "Loading dictionary '" + lang.bla + "' manualy ..." );
            
            // Controllo se ho già caricato una lingua del genere
            var mylang = __getLang( __langs, lang.bla );
            if( !mylang || mylang.length < 1 ){

                __langs.push( lang );
                __lol( "Dictionary '" + lang.bla + "' loaded manualy !" );
                return 1;

            }   

            __lol( "Dictionary '" + lang.bla + "' exist, " + mylang.length + " time !" );
            return 100 + mylang.length;

        }

        return 0;

    }; 
    
    // Preleva un cookie
    function __getCookie( cname ){
        
        __lol( "Get cookie : len " + document.cookie.length );
        
        if( ( cname = __goodString( cname ) ) == null )return null;
        
        var name = cname + "=",
            ca   = document.cookie.split( ";" );
        
        for( var i = 0; i < ca.length; i++ ){
            
            var c = ca[ i ];
            
            while( c.charAt( 0 ) == " " )c = c.substring( 1 );
            
            if( c.indexOf( name ) != -1 )return __goodString( c.substring( name.length, c.length ) );
        
        }
        
        return null;
    
    };
    
    // Aggiunge un evento cross browser
    function __AddEvent( evnt, elem, func ){
        
        try{
          
            if( elem.addEventListener ){
                
                elem.addEventListener( evnt, func, false );
                return true;
              
            }else if( elem.attachEvent ){
            
                var r = elem.attachEvent( "on" + evnt, func );
                return true;
              
            }
            
            return false;
          
        }catch( e ){

            return false;
          
        }
        
    };
    
    // Recuera la lingua con le priorità
    function __sniff(){
    
        /*
        
            La priorità di riceca è la seguente :
                
                - Nell'url es. ../it-IT/index.php oppure nei parametri ../index.php?lang=it-IT
                - Nel tag HTML lang="it-IT"
                - Nel cookie lang=it-IT
                
                oppure null
        
        */
                
        // Prelevo l'url della pagina
        var url     = decodeURIComponent( document.location.href ),
            tmpLang = __glb.rePath.exec( url );
        
        // Riferimento nella path ?
        if( tmpLang )return __glb.reTest.exec( tmpLang ).toString();
        
        // Riferimento nei parametri ?
        tmpLang = __glb.rePara.exec( url ) || null; 
        if( tmpLang )return __glb.reTest.exec( tmpLang ).toString();
        
        // Nel tag HTML ?
        try{
            
            tmpLang = document.getElementsByTagName( "html" )[ 0 ].getAttribute( "lang" );
            if( tmpLang )return __glb.reTest.exec( tmpLang ).toString();
            
        }catch( e ){
        
            __lol( "Problem with HTML tag ..." );
        
        }
        
        // Nel cookie ?
        tmpLang = __getCookie( "lang" ) || null;
        if( tmpLang )return __glb.reTest.exec( tmpLang ).toString();
        
        return "";
    
    };    
    
    // Controllo il browser altrimenti non inizializzo nemmeno
    if( !__check() )return false;     
        
    // Namespace, il cuore della classe
    window.Bla = {
        
            Debug : function( how ){
            
                __glb.debug = how || false;
            
            },
            Sniff : function(){
            
                return __sniff();
            
            },
            Load  : function( dicts, callback ){
                
                callback = callback || function(){};
                
                // Controlliamo se il valore passato sia un array
                dicts = __goodObject( dicts );                
                if( !dicts )__error( "'Load' function require an array of string !" );
                
                var load = function( dicts, callback ){
                    
                    if( !dicts || dicts.length < 1 )return callback();
                    
                    var sDict = document.createElement( "script" );

                    sDict.setAttribute( "src", dicts[ 0 ] );
                    
                    dicts.shift();
                    
                    document.head.appendChild( sDict );
                    
                    __AddEvent( "load", sDict, function(){
                    
                        load( dicts, callback );
                    
                    } );                    
                
                };
                
                load( dicts, callback );
            
            },
            Bla   : function( newLang ){
                
                return __bla( newLang );
            
            },
            Dictionarys : function(){
                
                // Restituisco una copia della lista
                return __langs.slice();
            
            },
            i18n  : function i18n( dict ){
                /*
                
                    Ho accesso a this.dictionary e .Bla solo con una nuova instanza
                
                */ 
                
                // Controllo che il valore passato sia l'atteso
                dict = __goodString( dict );
                if( !dict )__error( "'i18n' function require a string !" );
                
                // Controllo che sia nel formato giusto
                if( !__checkFormat( dict ) )__error( "'i18n' function require a good format for language reference !" );
                
                // Prelevo il dizionario
                var testLang = __getLang( __langs, dict );
                if( !testLang || testLang.length < 1 )__error( "Please load new dictionary first for this language " + dict );
                if( testLang.length > 1 )__error( "Strange, i have more dictionary for this language " + testLang.length + " time !" );
                
                this.dictionary = __getLang( __langs, dict ).slice()[ 0 ];
                                
                // Abbiamo tutto l'occorrente, possiamo tradurre ...
                i18n.prototype.Bla = function( key ){                    
                    
                    var dictionary = this.dictionary;
                    
                    // Non ho nulla, restituisco un silenzio
                    if( !key )return "";
            
                    // Dobbiamo valutare se ho una stringa ho un array
                    
                    var mykey = __goodString( key ),
                        args  = [];
                    
                    // Controllo che sia una stringa
                    if( mykey != null ){
                    
                        // Ok è una stringa quindi mi aspetto dei parametri
                        args = __slice.call( arguments, 1 );
                    
                    }else{
                    
                        // Potrebbe essere un array
                        mykey = __goodObject( key );
                        
                        if( mykey != null ){
                            
                            // Ok è un array, dispongo i dati
                            
                            var tmpkey = mykey.shift();
                            
                            args = mykey.slice();
                            mykey = tmpkey;
                        
                        }
                    
                    }

                    // Dopo i controlli verifico che i dati siano uniformi
                    if( !mykey )return "";
                    
                    // Ho il flag ?
                    var flag = false;
                    
                    // Plurale ?
                    var plural = false;
                    
                    // Se ci sono altri parametri ne controllo lo stato
                    if( args.length > 0 ){
                    
                        flag   = ( typeof args[ 0 ] === "boolean" );
                        plural = ( flag && args[ 0 ] === true );
                    
                    }               
                    
                    // Traduco il testo, potrebbe non essere presente la voce, sopprimo l'errore
                    var myTrl = __at( function(){

                        return ( plural ) ? dictionary[ mykey ].more : dictionary[ mykey ].one ;

                    } ) || "";

                    // Tolgo il primo valore se boolean
                    if( flag )args.shift();

                    // A questo punto abbiamo eventuali parametri per la wildcard            
                    myTrl = myTrl.replace( /([^%]|^)%(?:(\d+)\$)?n/g, function( x0, x, offset ){

                        if( offset ){               

                            return x + args[ parseInt( offset ) - 1 ];

                        }

                        return x + args.shift();

                    } ).replace( /%%n/g, "%n" );

                    __lol( "Translated '" + myTrl + "'" );
                    
                    return myTrl;
                
                };
                            
            }  

    };     
    
} )();




















