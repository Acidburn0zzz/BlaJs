#Introduzione

Blajs nasce dall'esigenza di ottenere una gestione fluida e snella delle traduzioni nelle applicazioni web.
Online si possono trovare altre librerie che fanno +/- la stessa cosa ma non rientrano nella visione che ho nella gestione delle lingue, ovvero :

- Essere semplice da utilizzare
- Traduzioni facili da modificare ed implementare
- Lavorare offline
- Compatibile con la maggior parte dei browser
- Disponibile al momento giusto gestendo il caricamento delle traduzioni/librerie

I commenti ed alcuni riferimenti sono scritti in Italiano perché non padroneggio bene l'inglese e alcuni concetti potrebbero essere spiegati male e/o fraintesi, se ti piace questa libreria e vuoi collaborare potresti iniziare con il tradurre questo file XD

La comprensione di questa libreria è elementare, alcuni concetti sono sottointesi.

#Come funziona

Blajs espone diverse funzioni/metodi/oggetti pubblici e privati, vediamo quali sono, più avanti faremo degli esempi :

| Nome                     | Descrizione                                                                           |
| --------                 | --------------                                                                        |
| Bla.Bla( {} )            | Caricare un nuovo dizionario/lingua manualmente                                       |
| Bla.Debug()              | Attiva/Disattiva il debug della libreria                                              |
| Bla.Sniff()              | Recupera la lingua secondo un ordine di priorità, dall'url; dal tag <HTML> dal cookie |
| Bla.Load( [] )           | Istalla una lista di js che possono essere dizionari ma anche altre librerie          |
| Bla.Dictionarys()        | Restituisce un array con tutte le lingue installate                                   |
| Bla.i18n( "" )           | Dopo essere instanziata restituisce un oggetto con 2 elementi **.Bla( args )** per la traduzione e **.dictionary** che rappresenta la lingua corrente come oggetto |



Inseriamo Blajs nella nostra pagina, versione minificata : 

``` html

<!DOCTYPE html>
<html>
    <head>
        
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
    
    </body>
</html>

```

Attiviamo il Debug e nella console del nostro browser possiamo visualizzare i messaggi che Blajs offre :

``` html

<!DOCTYPE html>
<html>
    <head>       
        
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
    
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
        </script>
    
    </body>
</html>

```

A questo punto una domanda nasce spontanea, come faccio a caricare le lingue ? abbiamo due strade, prima però dobbiamo sapere che la lingua e in formato .js ovvero uno script vero e proprio ed è gestito in questo modo, ad esempio nella cartella "dicts" inseriamo un nuovo file che rinominiamo ad esempio "dict.it-IT.js" e al suo interno inseriamo quanto segue :

``` javascript

Bla.Bla(

    {
    
        "bla" : "it-IT",                                            // Identificativo del dizionario
        "how many people" : {                                       // Chiave per la traduzione

                "one"  : "Sono solo io !",                          // Traduzione singolare
                "more" : "Noi siamo %n oppure %2$n o %1$n"          // Traduzione plurale

        },
        "have a question" : {                                       // Chiave per la traduzione

                "one"  : "Ho una domanda",                          // Traduzione singolare
                "more" : "Siamo in %n con %n domande"               // Traduzione plurale

        }

    }

);

```

Prima che lo chiediate rispondo si, si puo omettere il pluarale se non serve, se invocato restituirà una stringa vuota, tornando a noi, spiegato come è strutturata una lingua vediamo quali sono le due strade per implementarle al nostro progetto:

``` html

<!DOCTYPE html>
<html>
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
        <script src="dicts/dict.it-IT.js" ></script>
    
    </head>    
    <body>    
    
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
        </script>
    
    </body>
</html>

```

La prima strada è la più semplice, inserirla subito dopo la libreria anche se io non la preferisco, la seconda è la migliore perché offre il controllo del caricamento della pagina che nel prcedente esempio non abbiamo, vediamo come :

``` html
<!DOCTYPE html>
<html>
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
    
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
            // Carichiamo le lingue che ci occorrono
            Bla.Load( [
            
                "dicts/dict.it-IT.js"
            
            ], function(){ // Callback eseguita alla fine del caricamento dei file passati
            
                console.log( "Dizionario it-IT caricato con successo !" );
            
            } );
            
        </script>
    
    </body>
</html>

```

Capito perché preferisco questo metodo ? quando sono sicuro che tutte le lingue sono state caricate posso operare tranquillamente, ma non è tutto, posso caricare anche altre librerie ed essere sicuro che queste siano accessibili :

``` html

<!DOCTYPE html>
<html>
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
    
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
            // Carichiamo le lingue che ci occorrono e altre librerie
            Bla.Load( [
            
                "dicts/dict.it-IT.js",
                "https://code.jquery.com/jquery-2.1.4.min.js"
            
            ], function(){ // Callback eseguita alla fine del caricamento dei file passati
            
                console.log( "Dizionario it-IT caricato con successo e jQuery pronto !" );
            
            } );
            
        </script>
    
    </body>
</html>

```

Adesso che abbiamo visto come è strutturata una lingua e come renderla disponibile, vediamo come accedervi :

``` html

<!DOCTYPE html>
<html>
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
    
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
            // Carichiamo le lingue che ci occorrono
            Bla.Load( [
            
                "dicts/dict.it-IT.js",
                "dicts/dict.en-EN.js"
            
            ], function(){ // Callback eseguita alla fine del caricamento dei file passati
                
                // Prelevo tutte le lingue [ {},{},{},.... ]
                var dicts = Bla.Dictionarys();
                
                console.log( "Blajs ha " + dicts.length + " lingue !" );
            
            } );
            
        </script>
    
    </body>
</html>

```

La variabile "dicts" contiene un array di oggetti una per ogni lingua caricata, avrete notato che ho inserito una nuova lingua "en-EN", questo non è necessario ma potrebbe risultare comodo avere a disposizione le lingue per diversi motivi che non elencheremo, quindi procediamo con il tradurre un testo entrando nel vivo della libreria, altrimenti che l'abbiamo fatta a fare ?

``` html

<!DOCTYPE html>
<html>
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
    
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
            // Carichiamo le lingue che ci occorrono
            Bla.Load( [
            
                "dicts/dict.it-IT.js",
                "dicts/dict.en-EN.js"
            
            ], function(){ // Callback eseguita alla fine del caricamento dei file passati
                
                // Instanzio un traduttore per l'Italiano
                var i18nIT = new Bla.i18n( "it-IT" );
                
                // Instanzio un traduttore per l'Inglese
                var i18nEN = new Bla.i18n( "en-EN" );
                
                console.log( "Questo è un messaggio singolare in Italiano : '" + i18nIT.Bla( "how many people" ) + "'" );
                console.log( "Stesso messaggio in Inglese : '" + i18nEN.Bla( "how many people" ) + "'" );
            
            } );
            
        </script>
    
    </body>
</html>

```

Semplicissimo, dopo aver instanziato Bla.i18n() accediamo alla funzione .Bla() per la traduzione, se volessi lavorare con la specifica lingua posso accedere, seguendo l'esempio, all'oggetto .dictionary ovvero i18nIT.dictionary; per lavorare all'occorrenza con la lingua Italiana.

Fin qui tutto ok, ma se devo pluralizzare ? vediamo come fare :

``` html

<!DOCTYPE html>
<html>
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
    
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
            // Carichiamo le lingue che ci occorrono
            Bla.Load( [
            
                "dicts/dict.it-IT.js",
                "dicts/dict.en-EN.js"
            
            ], function(){ // Callback eseguita alla fine del caricamento dei file passati
                
                // Instanzio un traduttore per l'Italiano
                var i18nIT = new Bla.i18n( "it-IT" );
                
                // Instanzio un traduttore per l'Inglese
                var i18nEN = new Bla.i18n( "en-EN" );
                
                console.log( "Questo è un messaggio plurale in Italiano : '" + i18nIT.Bla( "how many people", true ) + "'" );
                console.log( "Stesso messaggio in Inglese : '" + i18nEN.Bla( "how many people", true ) + "'" );
            
            } );
            
        </script>
    
    </body>
</html>

```

Più facile di così, basta aggiungere un "true" e il gioco è fatto, vi sarete accorti che nel messaggio plurale ci sono dei caratteri strani, non vi preoccupate quelli servono per le wildcard ovvero sostituire quei segnaposti con valori variabili %n; %1$n; %2$n; ... se nel testo tradotto si dovresse inserire proprio un segnaposto come testo allora basterà inserire %%n al posto di %n e il risultato sarà %n

Gli argomenti passati possono essere sia stringhe che numeri, in quantità tale da sostituire tutti i segnaposti, alcuni sono con il numero al suo interno questo perché serve per invertire l'ordine d'inserimento per facilitare la traduzione in linguaggi che invertono la posizione dei numeri, se non passiamo nessun valore saranno sostituiti con un bel "undefined" ovvero non definito, facciamo un esempio e tutto sarà più chiaro :


``` html

<!DOCTYPE html>
<html>
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
    
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
            // Carichiamo le lingue che ci occorrono
            Bla.Load( [
            
                "dicts/dict.it-IT.js",
                "dicts/dict.en-EN.js"
            
            ], function(){ // Callback eseguita alla fine del caricamento dei file passati
                
                // Instanzio un traduttore per l'Italiano
                var i18nIT = new Bla.i18n( "it-IT" );
                
                // Instanzio un traduttore per l'Inglese
                var i18nEN = new Bla.i18n( "en-EN" );
                
                console.log( "Questo è un messaggio plurale in Italiano : '" + i18nIT.Bla( "how many people", true, 100, 200, 300 ) + "'" );
                console.log( "Stesso messaggio in Inglese : '" + i18nEN.Bla( "how many people", true, 100, 200, 300 ) + "'" );
            
            } );
            
        </script>
    
    </body>
</html>

```

Fantastico vero ? ma vi starete chiedendo, perché ha invertito il 300 con il 200 se io li ho passati in ordine ? la risposta è semplice, perché nel dizionario della lingua ho inserito un segnaposto numerico per invertire l'ordine dei parametri, ricordi ?

``` javascript

Bla.Bla(

    {
    
        "bla" : "it-IT", 
        "how many people" : {

                "one"  : "Sono solo io !",
                "more" : "Noi siamo %n oppure %2$n o %1$n"          // <--- Li vedi i segnaposti invertiti ? %2$n o %1$n

        },
        "have a question" : {

                "one"  : "Ho una domanda",
                "more" : "Siamo in %n con %n domande"               // <--- Li vedi i segnaposti invertiti ? %2$n o %1$n

        }

    }

);

```

In fine vediamo a che serve .Sniff(), poniamo l'esempio che vogliamo caricare dinamicamente la lingua senza preoccuparci di inserire quella giusta, come fare ?

``` html

<!DOCTYPE html>
<html lang="it-IT">
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
    
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
            // Rintracciamo la lingua
            var mylang = Bla.Sniff();
            
            // Carichiamo le lingue che ci occorrono
            Bla.Load( [
            
                "dicts/dict." + mylang + ".js"
            
            ], function(){ // Callback eseguita alla fine del caricamento dei file passati
                
                // Instanzio un traduttore per la lingua che non conosco
                var i18n = new Bla.i18n( mylang );
                
                console.log( "Questo è un messaggio plurale in " + mylang + " : '" + i18n.Bla( "how many people", true, 100, 200, 300 ) + "'" );
            
            } );
            
        </script>
    
    </body>
</html>

```

Ovviamente sul server devo avere le lingue necessarie per gestire l'applicazione, ma credo che il messaggio sia chiaro, alcune precisazioni, se effettuate dei test su Chrome il cookie non lo legge se in offline mode ( file:///... ) in oltre .Sniff() rintraccia la lingua secondo un ordine ben preciso, questo è l'ordine di ricerca :


- Nell' url della pagina  <code>..**/it-IT/**index.php</code>
- Nell' url nei parametri  <code>../miacartella/index.php?**lang=it-IT**</code>
- Nella proprietà del tag HTML <code>&lt;html **lang="it-IT"**&gt;</code>
- In fine nei cookie <code>**lang=it-IT**;</code>


Per chiudere voglio proporre un esempio un po più avanzato, estendere jQuery con Blajs per tradurre alcuni contenuti nella pagina, in questo esempio sarà possibile tradurre solo al singolare senza wildcard :

``` html

<!DOCTYPE html>
<html>
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
        
        <div i18n="how many people"></div>
        <div i18n="have a question"></div>
        
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
            // Rintraccio la lingua se non la trovo seleziono l'Italiano
            var mylang = Bla.Sniff() || "it-IT";
            
            // Carichiamo le lingue che ci occorrono e le librerie
            Bla.Load( [
            
                "dicts/dict." + mylang + ".js",
                "https://code.jquery.com/jquery-2.1.4.min.js"
            
            ], function(){ // Callback eseguita alla fine del caricamento dei file passati
            
                // Estendiamo jQuery con la funzione .Bla();
                $.fn.extend( {
                    
                    Bla: function(){
                        
                        var i18n = new Bla.i18n( mylang );
                        
                        return this.each( function(){
                            
                            var a = $( this ).attr( "i18n" );
                            
                            if( a && a.length > 0 )$( this ).html( i18n.Bla( a ) );

                        } );
                                         
                    }
                    
                } );
                
                // Traduciamo tutti gli elemnti nella pagina in un colpo solo
                $( "div[i18n]" ).Bla();
                
            } );
            
        </script>
    
    </body>
</html>

```

Semplice vero ? se state facendo dei test provate ad aggiungere alla fine della pagina ?lang=en-EN e se avete la lingua inglese questa verrà utilizzata altrimenti selezionerà it-IT poiché l'ho settato come default.

Si vabbè ma se volessi passare degli argomenti ? come faccio ? niente paura ecco un esempio :

``` html

<!DOCTYPE html>
<html>
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
        
        <div i18n="how many people" i18n-args="true,100,200,300"></div>
        <div i18n="have a question" i18n-args="true,100,200,300"></div>
        
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
            // Rintraccio la lingua se non la trovo seleziono l'Italiano
            var mylang = Bla.Sniff() || "it-IT";
            
            // Carichiamo le lingue che ci occorrono e le librerie
            Bla.Load( [
            
                "dicts/dict." + mylang + ".js",
                "https://code.jquery.com/jquery-2.1.4.min.js"
            
            ], function(){ // Callback eseguita alla fine del caricamento dei file passati
            
                // Estendiamo jQuery con la funzione .Bla();
                $.fn.extend( {
                    
                    Bla: function(){
                        
                        var i18n = new Bla.i18n( mylang );
                        
                        return this.each( function(){
                            
                            // Tento di prelevare i 2 attributi
                            var a = $( this ).attr( "i18n" ),
                                b = $( this ).attr( "i18n-args" );
                            
                            // Se ho i parametri li passo, comunque un array
                            b = ( b && b.length > 0 ) ? b.split( "," ) : [] ;       
                            
                            // Controllo se ho la key che è richiesta
                            if( a && a.length > 0 ){
                                
                                // Se ho gli argomenti e se il primo è il flag lo cambio con un valore booleano
                                if( b.length > 0 ){
                                    
                                    switch( b[ 0 ].toLowerCase() ){
                                    
                                        case "true":
                                            
                                            b[ 0 ] = true;
                                            break;
                                            
                                        case "false":
                                            
                                            b[ 0 ] = false;
                                            break;
                                    
                                    }
                                    
                                    
                                }
                                
                                // Aggiungo al primo posto la key per la traduzione
                                b.unshift( a );
                                
                                // In fine traduco passando l'array                                
                                $( this ).html( i18n.Bla( b ) );
                            
                            }

                        } );
                                         
                    }
                    
                } );
                
                // Traduciamo tutti gli elemnti nella pagina in un colpo solo
                $( "div[i18n]" ).Bla();
                
            } );
            
        </script>
    
    </body>
</html>

```

Visto ? solo alla fine si capisce che posso tradurre anche passando semplicemente un array nei parametri, quindi se riproviamo con un esempio vecchio vedremo che non cambia nulla :

``` html

<!DOCTYPE html>
<html>
    <head>
    
        <meta charset="utf-8" >
        
        <title>Blajs</title>
        <script src="bla.min.js"></script>
    
    </head>    
    <body>    
    
        <script>
            
            // Attiviamo il debug
            Bla.Debug( true );
            
            // Carichiamo le lingue che ci occorrono
            Bla.Load( [
            
                "dicts/dict.it-IT.js",
                "dicts/dict.en-EN.js"
            
            ], function(){ // Callback eseguita alla fine del caricamento dei file passati
                
                // Instanzio un traduttore per l'Italiano
                var i18nIT = new Bla.i18n( "it-IT" );
                
                // Instanzio un traduttore per l'Inglese
                var i18nEN = new Bla.i18n( "en-EN" );
                
                // Passiamo un array come argomenti
                console.log( "Questo è un messaggio plurale in Italiano passando un array : '" + i18nIT.Bla( [ "how many people", true, 100, 200, 300 ] ) + "'" );
                console.log( "Stesso messaggio in Inglese : '" + i18nEN.Bla( [ "how many people", true, 100, 200, 300 ] ) + "'" );
            
            } );
            
        </script>
    
    </body>
</html>

```

#Conclusioni

Questa libreria si presenta semplice, intuitiva, leggera, fluida e si presta ad altre librerie, spero che questo lavoro possa servire a qualcuno, spero che altri arricchiscano Blajs di nuove idee e/o perfezionino questa versione.
Per chi volesse semplicemente tradurre potrebbe tradurre questo file e/o i commenti nella libreria, sarebbe fantastico, non usate Google Translate perché l'avrei fatto io.

#Licenza [MIT](https://github.com/LeonardoCiaccio/BlaJs/blob/master/LICENSE)

**Leonardo Ciaccio**
*leonardo.ciaccio@gmail.com*



