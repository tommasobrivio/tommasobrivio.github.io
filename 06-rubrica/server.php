<?php

    class Contatto{
        private $nome;
        private $cognome;
        private $data;
        private $telefono;
        private $mail;
    }

    public function __construct() {
        $this->nome = "";
        $this->cognome = "";
        $this->data = "";
        $this->telefono = "";
        $this->mail = "";
    }

    public function __construct($nome,$cognome,$data,$telefono,$mail) {
        $this->nome = $nome
        $this->cognome = $cognome;
        $this->data = $data;
        $this->telefono = $telefono;
        $this->mail = $mail;
    }

    class Rubrica{
        private $rubrica;
    }

    public function __construct() {
        $this->rubrica=array();
    }

    public function aggiungi($contatto){
        array_push($this->rubrica; $contatto);
    }



    $fileName = "rubrica.txt";

    function controllaKey($rubrica,$contact,$file){
        $fileContent = file_get_contents($file);
        $rows = explode("\n", $fileContent);
        if (str_contains($fileContent, $newKey.";")) {
            die("questo numero di telefono esiste gia")
        }
        else{
            $rubrica->aggiungi($contact);
        }
    }

    // salva su file
    function salva($dati,$file) {
        $str = "";
        foreach ($dati as $key => $value) {
            $str.=$dati.";".$value;
        }
        file_put_contents($file, $str);
    }

    if (isset($_GET["cmd"])) {
        $cmd = $_GET["cmd"];
        if (!isset($_GET["key"]) || $_GET["key"] === "") {
            echo "E' necessario passare la chiave.
            Comando key=&ltchiave&gt.";
            return;
        }
        $key = $_GET["key"];
        // controllo se il comando è "set"
        if ($cmd == "set") {
            // controllo che non siano stati passati dei parametri in più
            if (count($_GET) > 3) {
                echo "Sono stati passati dei parametri non consentiti.";
                return;
            }

            if (isset($_GET["messaggioSet"]) && $_GET["messaggioSet"] !== "") {
                $messaggioSet = $_GET["messaggioSet"];
                // controllo se è già presente un messaggio con la stessa chiave, nel caso sostituisco il messaggio
                $fileContent = file_get_contents($fileName);
                $rows = explode("\n", $fileContent);

                $tmp="";
                if (str_contains($fileContent, $key.";")) {
                    // ciclo per cercare la chaive e sostituire il messaggio nuovo
                    for ($i=0; $i < count($rows); $i++) {
                        // controllo in quale riga Ã¨ presente la chiave
                        if (str_starts_with($rows[$i], $key.";")) {
                            // una volta ottenuto il messaggio
                            $message = substr($rows[$i], strlen($key) + 1);
                            // echo $message." ".$set." ".$fileContent." ";
                            $tmp.=$key.";".$set."\n";
                        }
                        else
                            $tmp.=$rows[$i]."\n";
                    }
                    // infine riscrivo tutto all'interno del file sovrascrivendolo
                    file_put_contents($fileName, $tmp);
                }
                else {
                    file_put_contents($fileName, $key.";".$set."\n", FILE_APPEND);
                }

                echo "Il messaggio ".$messaggioSet." salvato correttamente.";
            }
            else
            {
                echo "Parametro \"set\" non passato.
                Sintassi corretta: cmd=&ltcomando&gt&set=&ltmessaggio&gt"; // '&lt' = "<" , '&gt' = ">"
            }
        }
        else if ($cmd == "get") {
            // controllo che non siano stati passati dei parametri in più
            if (count($_GET) > 2) {
                echo "Sono stati passati dei parametri non consentiti.";
                return;
            }
            $fileContent = file_get_contents($fileName);
            $rows = explode("\n", $fileContent);
            // controllo se esiste il file; se dentro al file c'è scritto qualcosa; e se la posizione della chiave esiste
            if (!file_exists($fileName) || $fileContent === "" || !str_contains($fileContent, $key.";")) {
                echo "Non è stato trovato nessun messaggio.";
            }
            else {
                $message = "";
                for ($i=0; $i < count($rows); $i++) {
                    if (str_starts_with($rows[$i], $key)) {
                        $message = substr($rows[$i], strlen($key) + 1);
                    }
                }
                echo "Messaggio settato precedentemente = ".$message;
            }
        }
        else {
        echo "Comando non riconosciuto.";
        }
    }
    else {
        echo "Parametro da passare \"cmd\".
        Sintassi: cmd=&ltset/get&gt";
    }
?>