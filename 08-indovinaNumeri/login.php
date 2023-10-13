<?php


include("gestioneUtenti.php");

$gu=new GestioneUtenti("credenziali.txt");

function checkCredenziali($user, $psw)
{
    $vettSplit = [];
    //apro il file in lettura
    $file = "credenziali.txt";
    $fr = fopen($file, 'r');
    //per ogni riga leggo splitto e controllo
    $row = fgets($fr);
    echo $row;
    while ($row != false) {
        $vettSplit = explode(";", $row);
        echo $user;
        echo $psw;
        if ($vettSplit[0] == $user && $vettSplit[1] == $psw)
            return true;
        $row = fgets($fr);
    }
    return false;
}

if(!isset($_SESSION))
    session_start();

//controlla se esiste già le sessioni con queste key
if (isset($_SESSION["user"]) && isset($_SESSION["psw"])){
    if (isset($_GET["logout"])) {
        if ($_GET["logout"] == "esci"){
            //session_unset();  // cancella solo le variabili dalla sessione ma continua a esistere
            session_destroy();  //cancella le variabili e il token della sessione 
            stampaPagina();
        }
    }
    else{
        header("location: registra.php");
    }
}
else{
    //se i campi non sono settati finisce qua
    if(isset($_GET["user"])&& isset($_GET["psw"])){
        if ($_GET["user"] === "" && $_GET["psw"] === "") {
            echo "compilare i campi username e password";
            stampaPagina();
        } else {
            //controllo che le credenziali siano presenti nel file
            if (checkCredenziali($_GET["user"], $_GET["psw"]) == true) {
                
                $_SESSION["user"]=$_GET["user"];
                $_SESSION["psw"]=$_GET["psw"];
                header("location: registra.php");

            } else {
                //messagio
                echo "credenziali non corrette";
                stampaPagina();
            }
        }
    }
}


function stampaPagina(){
    ?>
    <html>

    <body>
        <form method="get" action="login.php">
            <h2>Login utente</h2>
            Username:<input type="text" name="user"><br>
            Password:<input type="password" name="psw"><br>
            <input type="submit" value="login">
        </form>
    </body>

    </html>
    <?php
}

?>
