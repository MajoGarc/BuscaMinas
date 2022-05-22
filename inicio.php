<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="./statics/css/inicio.css" rel="stylesheet">
            <title>Buscaminas</title>
            <link rel="icon" href="./statics/img/icono.ico" type="image/icon">
        </head>
    <body>

        <?php
            echo'
            <img src="./statics/img/buscaminas.png" alt="Título del buscaminas">
            <div class="main">
                <span id="boton1" class="divs">
                    <button id="puntajes"> Ver Puntajes</button>
                    <div id="rankings">

                    </div>
                </span>
                <span id="contenedor" >
                    <input type="button" class="niveles" id="nivel1" value="Facil"></input>
                    <input type="button" class="niveles" id="nivel2" value="Medio"></input>
                    <input type="button" class="niveles" id="nivel3" value="Dificil"></input>
                </span>
                <div id="div-juego">
                    <div class="contenedor-juego hidden">
                        <h2>Banderas colocadas: <span id="num-banderas"></span> (faltan <span id="banderas-restantes"></span>)</h2>
                        <div class="juego">

                        </div>
                        <div class="resultado-juego">

                        </div>
                    </div>
                </div>
            </div>
            ';
            include ("./dynamics/php/config_base.php");
            //$usuario = (isset($_POST["usuario"]) && $_POST["usuario"] != "") ?$_POST["usuario"] : false;
                   
        ?>
        <script src="./dynamics/js/index.js"></script>
    </body>
</html>