class Campo {
    constructor(righeColonne, numMine) {
        this.grandezza = righeColonne;
        this.nMine = numMine;
        this.campo = [];
        this.mineTrovate = 0;
        this.isGioco = true;
        this.flag = 0;
        this.celleAperte = 0;
        $("#feedback").text("stai giocando");
    }

    //creo il campo 
    creaCampo() {
        //inserisco il numero di mine presenti
        $("#mine").text("mine presenti: " + this.nMine);

        for (let i = 0; i < this.grandezza; i++) {
            //per ogni riga inserisce un vettore per creare le colonne
            this.campo[i] = [];
            this.aggiungiColonna(i);
        }

        this.generaRandomMine();
    }

    //posiziona le mine casualmente
    generaRandomMine() {
        let c, r;
        
        for (let i = 0; i < this.nMine; i++) {
            //se in quella casella c'è già una mina si rigenera
            do{
                c = this.generaRandom(this.grandezza);
                r = this.generaRandom(this.grandezza);
            }while (this.campo[r][c].isMina == true);
            
            this.campo[r][c].isMina = true;
            //nella caselle adiacenti aumento il contatore delle mine nelle vicinanze
            for (let tempR = -1; tempR <= 1; tempR++) {
                for (let tempC = -1; tempC <= 1; tempC++) {
                        let rAdiacente = r + tempR;
                        let cAdiacente = c + tempC;
                        //se non ci si trova fuori dal campo aumenta il contatore
                        if (rAdiacente >= 0 && rAdiacente < this.grandezza && cAdiacente >= 0 && cAdiacente < this.grandezza){
                            this.campo[rAdiacente][cAdiacente].mineIntorno++;
                        }
                }
            }
        }
    }

    //ricomincia il gioco
    reset() {
        location.reload();
    }

    pulisciSchermo(){
        $("#celle").html("");
    }

    //genera un numero casale
    generaRandom(max) {
        return Math.floor(Math.random() * max);
    }


    //aggiunge le colonne alla riga
    aggiungiColonna(riga) {
        for (let c = 0; c < this.grandezza; c++) {
            this.campo[riga][c] = new Casella();
            //aggiungo graficamente la cella
            $("#celle").append("<div class='celleChiuse' data-row=" + riga + " data-coloumn=" + c + "></div>");
        }
    }

    controlloClick(riga, colonna) {
        //se il gioco non è terminato
        if (this.isGioco) {

            //se click su cella aperta
            if (this.campo[riga][colonna].stato == "aperta")
                return 0;

            //se hai preso un mina
            if (this.campo[riga][colonna].isMina == true) {
                $('.celleChiuse[data-row=' + riga + '][data-coloumn=' + colonna + ']').addClass("cellaMina");
                $("#feedback").text("hai perso");
                this.isGioco = false;
                this.visualizzaMine();
                return 0;
            }

            //altrimenti hai preso una cella normale
            $('.celleChiuse[data-row=' + riga + '][data-coloumn=' + colonna + ']').removeClass("celleBandierina");
            $('.celleChiuse[data-row=' + riga + '][data-coloumn=' + colonna + ']').addClass("cellaBianca");
            if(this.campo[riga][colonna].mineIntorno != 0)
                $('.celleChiuse[data-row=' + riga + '][data-coloumn=' + colonna + ']').html(this.campo[riga][colonna].mineIntorno);

            this.campo[riga][colonna].stato = "aperta";

            this.celleAperte++;

            //se hai preso una cella vuota
            if (this.campo[riga][colonna].mineIntorno == 0) {
                $('.celleChiuse[data-row=' + riga + '][data-coloumn=' + colonna + ']').removeClass("celleBandierina");
                $('.celleChiuse[data-row=' + riga + '][data-coloumn=' + colonna + ']').addClass("cellaBianca");
                for(var contR = riga-1; contR <=riga + 1; contR++){
                    for (let contC = colonna-1; contC <= colonna+1; contC++) {
                        if (contR >= 0 && contR < this.grandezza && contC >= 0 && contC < this.grandezza)
                            this.controlloClick(contR, contC);
                    }
                }
            }

            if(this.celleAperte == (this.grandezza*this.grandezza) - this.nMine){
                $("#feedback").text("hai vinto!!");
                this.visualizzaMine();
                this.isGioco = false;
                alert("hai vinto");
            }
        }
        else
            alert("gioco finito");
    }

    visualizzaMine() {
        for (let r = 0; r < this.grandezza; r++){
            for (let c = 0; c < this.grandezza; c++){
                if (this.campo[r][c].isMina) {
                    this.campo[r][c].stato = "aperta";
                    $('.celleChiuse[data-row=' + r + '][data-coloumn=' + c + ']').addClass("cellaMina");
                }
            }
        }
    }

    posizionaFlag(rCella, cCella) {
        if (this.isGioco) {
            //se hai preso una cella chiusa 
            if (this.campo[rCella][cCella].stato == "chiusa"){
                $('.celleChiuse[data-row=' + rCella + '][data-coloumn=' + cCella + ']').addClass("celleBandierina");
                //se hai preso un mina
                if (this.campo[rCella][cCella].isMina == true){
                    this.mineTrovate++;
                }
                this.flag++;
                this.campo[rCella][cCella].stato = "flag";
                this.aggiornaNumeroMineNelCampo();
            }

            //se click su una cella con la bandierina torna ad essere una cella chiusa
            else if (this.campo[rCella][cCella].stato == "flag"){
                $('.celleChiuse[data-row=' + rCella + '][data-coloumn=' + cCella + ']').removeClass("celleBandierina");
                $('.celleChiuse[data-row=' + rCella + '][data-coloumn=' + cCella + ']').addClass("cellaChiusa");
                this.campo[rCella][cCella].stato = "chiusa";
                //se hai preso un mina
                if (this.campo[rCella][cCella].isMina == true){
                    this.mineTrovate--;
                }
                this.flag--;
                this.aggiornaNumeroMineNelCampo();
            }

            if(this.mineTrovate == this.nMine){
                this.visualizzaMine();
                $("#feedback").text("hai vinto!!");
                this.isGioco = false;
            }
                
        }
        else
            alert("gioco finito");
    }

    aggiornaNumeroMineNelCampo(){
        //aggiorna il numero di mine nel campo
        //se il numero di mine è negativo esce un alert
        if(this.nMine - this.flag < 0){
            alert("hai messo troppe bandierine");
            return 0;
        }
        $("#mine").text("mine presenti: " + (this.nMine - this.flag));
    }
}
