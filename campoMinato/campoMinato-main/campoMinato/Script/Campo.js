class Campo {
    constructor(grandezza, mine) {
        this.grandezza = grandezza;
        this.mine = mine;
        this.campo = [];
        this.caselleAperte = 0;
        this.gioco = true;
        this.mineScoperte = 0;
        this.contatoreMine = mine;

    }

    //ricarica la pagina
    reset() {
        location.reload();
    }

    //crea il campo
    creaCampo() {

        $('#numMine').text("mine: " + this.mine);
        //crea la tabella
        $('#griglia').css("height", $('#griglia').width() + "px");

        for (let r = 0; r < this.grandezza; r++) {
            this.campo[r] = [];
            for (let c = 0; c < this.grandezza; c++) {
                this.campo[r][c] = new Casella();
                $('#griglia').append('<div class="casella" data-row="' + r + '" data-col="' + c + '">&nbsp;</div>');
            }
        }
        $('.casella').css("line-height", $('.casella').width() + "px");
        $('.casella').css("font-size", (32 / 50) * $('.casella').width() + "px");

    }

    //mette le mine in posizioni casuali
    posizionaMine() {

        let m = 0;
        while (m < this.mine) {
            let pr = Math.round((this.grandezza - 1) * Math.random());
            let pc = Math.round((this.grandezza - 1) * Math.random());
            if (!this.campo[pr][pc].mina) {
                this.campo[pr][pc].mina = true;
                for (let i = -1; i <= 1; i++)
                    for (let j = -1; j <= 1; j++) {
                        let dr = pr + i;
                        let dc = pc + j;
                        if (dr >= 0 && dc >= 0 && dr < this.grandezza && dc < this.grandezza) {
                            this.campo[dr][dc].cont++;
                        }
                    }
                m++;
            }
        }
    }

    //controlla se c'è una mina sulla casella scelta ed eventualmente su quelle vicine
    controlla(row, col) {

        if (this.campo[row][col].aperta)
            return true;

        if (this.campo[row][col].flag == true) {
            this.campo[row][col].flag = false;
            $('.casella[data-row=' + row + '][data-col=' + col + ']').removeClass("bandiera");
            this.contatoreMine++;
            this.aggiornaDisplayMine();
        }
        this.campo[row][col].aperta = true;
        this.caselleAperte++;

        $('.casella[data-row=' + row + '][data-col=' + col + ']').html(this.campo[row][col].cont ? this.campo[row][col].cont : "&nbsp;");
        $('.casella[data-row=' + row + '][data-col=' + col + ']').addClass("aperta");

        if (this.campo[row][col].cont) {
            $('.casella[data-row=' + row + '][data-col=' + col + ']').addClass("colore-" + (this.campo[row][col].cont < 4 ? this.campo[row][col].cont : 4));
        }

        if (!this.campo[row][col].mina && !this.campo[row][col].cont) {

            //controlla le zone vicino
            for (var dr = row - 1; dr <= row + 1; dr++)
                for (var dc = col - 1; dc <= col + 1; dc++)
                    if (dc >= 0 && dr >= 0 && dc < this.grandezza && dr < this.grandezza)
                        this.controlla(dr, dc);

        } else if (this.campo[row][col].mina) {
            // qui mettiamo la mina
            $('.casella[data-row=' + row + '][data-col=' + col + ']').html('<i class="fa fa-bomb"></i>');
            $('.casella[data-row=' + row + '][data-col=' + col + ']').addClass("mina");
            return false;
        }

        return true;

    }

    //serve per far vedere tutte le mine una volta che si ha perso
    scopriMine() {
        for (let r = 0; r < this.grandezza; r++)
            for (let c = 0; c < this.grandezza; c++)
                if (this.campo[r][c].mina) {
                    this.campo[r][c].aperta = true;
                    if (this.campo[r][c].flag == true) {
                        $('.casella[data-row=' + r + '][data-col=' + c + ']').removeClass("bandiera");
                    }
                    $('.casella[data-row=' + r + '][data-col=' + c + ']').html('<i class="fa fa-bomb"></i>');
                    $('.casella[data-row=' + r + '][data-col=' + c + ']').addClass("mina");
                }
    }

    //setta il flag sulla casella selezionata
    flag(row, col) {

        if (this.gioco == true) {

            if (this.campo[row][col].aperta)
                return true;

            this.campo[row][col].flag = !this.campo[row][col].flag;

            if (this.contatoreMine > 0) {
                if (this.campo[row][col].flag == true) {
                    $('.casella[data-row=' + row + '][data-col=' + col + ']').addClass("bandiera");
                    this.contatoreMine--;

                }
                if (this.campo[row][col].mina && this.campo[row][col].flag) {
                    this.mineScoperte++;
                }

            }
            if (this.campo[row][col].flag == false) {
                $('.casella[data-row=' + row + '][data-col=' + col + ']').removeClass("bandiera");
                this.contatoreMine++;
                this.mineScoperte--;
            }

            if (this.mine == this.mineScoperte) {
                $('#stato').text("Hai vinto!");
                alert("Hai Vinto!");
                this.scopriMine();
                this.gioco = false;
            }
            this.aggiornaDisplayMine();
        }
    }

    //aggiorna il contatore delle mine
    aggiornaDisplayMine() {
        $('#numMine').text("mine: " + this.contatoreMine);
    }
}


