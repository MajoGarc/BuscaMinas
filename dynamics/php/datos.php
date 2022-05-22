<?php
    include ("./dynamics/php/config_base.php"); 

    $usuario = (isset($_POST["usuario"]) && $_POST["usuario"] != "") ?$_POST["usuario"] : false;
    $fecha = (isset($_GET["fecha"])&& $_GET["fecha"] != "") ?$_GET["fecha"] : false;


?>