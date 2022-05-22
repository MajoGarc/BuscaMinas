<?php
    define("DBHOST", "localhost");
    define("DBUSER", "root");
    define("PASSWORD", "");
    define("DB", "buscaMinas");
    
    function connect()
    {
        $conexion = mysqli_connect(DBHOST,DBUSER,PASSWORD,DB);
        // var_dump($conexion);
        // if(!$conexion){
        //     mysqli_error();
        //     echo "No se ha encotrado la base de datos";
        // }else{
        //     echo"se logró";
        // }

        return $conexion;
    }
    $conexion= connect();

?>