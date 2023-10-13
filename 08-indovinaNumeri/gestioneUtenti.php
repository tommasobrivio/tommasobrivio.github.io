<?php
class GestioneUtenti{
    public $fileName;
    public $utenti;

    public function __construct($file){
        $this->fileName=$file;
        $this->utenti=array();
    }


    public function addUtente($utente) {
        array_push($this->utenti, $utente);
    }

    public function serializeAll(){
        $data=serialize($this->utenti);

        file_put_contents($this->fileName, $data);
    }

    public function unserializeAll(){
        $data=file_get_contents($this->fileName);
        $this->utenti=unserialize($data);
    }
}


?>