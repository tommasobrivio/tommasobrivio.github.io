<?php
    class Utente{
        public $user;
        public $psw;

        function __construct($user, $psw){
            $this->user=$user;
            $this->psw=$psw;
        }

        function getUser(){
            return $this->user;
        }

        function setUser($user){
            $this->user=$user;
        }

        function getPsw(){
            return $this->psw;
        }

        function setPsw($psw){
            $this->psw=$psw;
        }
    }
?>