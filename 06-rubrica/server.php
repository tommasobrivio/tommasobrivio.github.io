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

    public function toString() {
        return $this->telefono.";".$this->nome.";".$this->cognome.";".$this->data.";".$this->mail.";";
    }

    public function getTelefono(){
        return $this->telefono;
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

    function controllaKeyDoppia($rubrica,$contact,$file){
        $fileContent = file_get_contents($file);
        if (str_contains($fileContent, $contact->getTelefono())) {
            die("non puoi aggiungere perchè questo numero di telefono esiste gia");
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

    if ($_POST["operazione"]!="") {
        $operazione = $_POST["operazione"];

        // controllo se il comando è "set"
        if ($operazione == "set") {
            
            if ($_POST["telefono"]=="" || $_POST["nome"]=="" || $_POST["cognome"]==""$_POST["data"]=="" ||$_POST["mail"]=="" ) {
                echo "Mancano dei dati";
                return;
            }

            $contatto=new Contatto($_POST["telefono"],$_POST["nome"],$_POST["cognome"],$_POST["data"],$_POST["mail"]);
            $rubrica=new Rubrica();

            controllaKeyDoppia($rubrica, $contatto, $fileName);

            file_put_contents($fileName, $contatto->toString()."\n", FILE_APPEND);
        }        
        else if ($operazione == "get") {
            $fileContent = file_get_contents($fileName);
            $contatti = explode("\n", $fileContent);
            // controllo se esiste il file; se dentro al file c'è scritto qualcosa; e se la posizione della chiave esiste
            if (!file_exists($fileName) || $fileContent === "") {
                echo "Il file è vuoto.";
            }
            else {
                echo "<table><th>Numero di telefono</th><th>Nome</th><th>Cognome</th><th>Data</th><th>Email</th>";
                for ($i=0; $i < count($contatti); $i++) {
                    $dati=$contatti[$i].str_split(";");
                    echo "<tr>";
                    for($k=0;$k<count($dati);$k++){
                        echo "<td>".$dati[$k]."</td>";
                    }
                    echo "</tr>";
                }
                echo "</table>";
            }
        }
        else if($operazione == "cerca"){
            if ($_POST["telefono"]=="" || $_POST["cognome"]=="") {
                echo "Manca o il numero di telefono o il cognome";
                return;
            }
            $fileContent = file_get_contents($fileName);
            $contatti = explode("\n", $fileContent);
            // controllo se esiste il file; se dentro al file c'è scritto qualcosa; e se la posizione della chiave esiste
            if (!file_exists($fileName) || $fileContent === "") {
                echo "Il file è vuoto.";
            }
            if (!str_contains($fileContent, $_POST["telefono"])) {
                echo "Non esiste questo numero di telefono tra i contatti";
                return;
            }
            else{
                for ($i=0; $i < count($contatti); $i++) {
                    if(str_starts_with($contatti[$i], $_POST["telefono"])){
                        echo "<table><th>Numero di telefono</th><th>Nome</th><th>Cognome</th><th>Data</th><th>Email</th><tr>";
                        $dati=$contatti[$i].str_split(";");
                        for($k=0;$k<count($dati);$k++){
                            echo "<td>".$dati[$k]."</td>";
                        }
                        echo "</tr></table>";
                    }
                }
            }
        }
        else if($operazione=="rimuovi"){
            if ($_POST["telefono"]=="" || $_POST["cognome"]=="") {
                echo "Manca o il numero di telefono o il cognome";
                return;
            }
            $fileContent = file_get_contents($fileName);
            $contatti = explode("\n", $fileContent);
            // controllo se esiste il file; se dentro al file c'è scritto qualcosa; e se la posizione della chiave esiste
            if (!file_exists($fileName) || $fileContent === "") {
                echo "Il file è vuoto.";
            }
            if (!str_contains($fileContent, $_POST["telefono"])) {
                echo "Non esiste questo numero di telefono tra i contatti";
                return;
            }
            else{
                $str="";
                for ($i=0; $i < count($contatti); $i++) {
                    if(!str_starts_with($contatti[$i], $_POST["telefono"])){
                        $str.=$contatti[$i]."\n";
                    }
                }
                file_put_contents($fileName, $str);
                echo "Contatto eliminato";

            }
        }

    }
    else {
        echo "Devi scegliere un' operazione";
    }
?>
