class CList {
    constructor() {
        this.lista = new Array();
        this.size = 0;
    }

    //funzione per aggiungere un elemento di tipo evento all'interno del vettore lista
    add() {
        let data=document.getElementsByTagName("input")[0].value;
        let descrizione = document.getElementById("event");
        let date = new Date(data);
        let d=new Date();
        if(data=="" || descrizione.value==""){
            alert("manca o la data o l' attività");
            return false;
        }
         else if(date.getTime()-d.getTime()<=0){
            alert("data non consona perchè precedente a quella di ora");
            return false;
        }
         else{
            
            //evento con la data e l'attività
            let attivita = new CEvent(date.getTime(), descrizione.value);
            this.lista.push(attivita);
            this.ordinaPerData();
            this.rimuoviGrafica();
            this.size++;
            for (let i = 0; i < this.size; i++) {
                this.aggiungiTr(this.lista[i].attivita, i);
            }
            descrizione.value="";
        }
    }

    //aggiunge una riga all'interno della lista evento nella grafica, assegnandogli l'indice (num), e l'evento da visualizzare
    aggiungiTr(evento, indice) {
        let table = document.getElementById("lista")
        table.innerHTML += "<tr class='trLista' id='" + indice + "'><td class='Checkbox'><input type='checkbox' onchange='list.segnaAttività(" + indice + ")'></td><td class='Activity'>" + evento + "</td><td><button onclick='list.rimuoviAttivita(" + indice + ")'><img class='cestino' src='immagini/cestino.jpg' alt='elimina'></button></td></tr>";

    }

    //rimuove tutto all'interno della lista, e pulisce l'html
    rimuoviTutto() {
        for (let i = 0; i < this.size; i++) {
            this.lista.pop();
        }
        this.size = 0;
        this.rimuoviGrafica();
    }
    //pulisce solo l'html
    rimuoviGrafica(){
        let table = document.getElementById("lista")
        table.innerHTML = "";
    }

    //serve per segnare come completata o meno l'attività indicata dall'indice
    segnaAttività(i) {
        this.lista[i].setCompletamento();
        let doc = document.getElementsByClassName("Activity");
        if(this.lista[i].completata==true){
            doc[i].style.textDecoration="line-through";
        }
        else{
            doc[i].style.textDecoration="none";
        }
       
    }

    //serve per rimuovere un attività dato l'indice in cui si trova
    rimuoviAttivita(indice) {
        this.lista.splice(indice, 1);
        this.size--;
        this.rimuoviGrafica();
        for (let i = 0; i < this.size; i++) {
            if(this.lista[i].completata){
                this.lista[i].setCompletamento();
            }
            this.aggiungiTr(this.lista[i].attivita, i);
           
        }
    }

    //ordino gli eventi in base alla data
    ordinaPerData(){

        for (let i = 0; i <this.lista.length; i++) {
  
            for (let j = 0; j < (this.lista.length- 1); j++) {
    
                if (this.lista[j].data > this.lista[j + 1].data) {
    
                    let temp = this.lista[j]
                    this.lista[j] = this.lista[j + 1]
                    this.lista[j + 1] = temp
                }
            }
        }
     
       
    }
}