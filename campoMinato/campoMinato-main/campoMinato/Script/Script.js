function gestioneCampo() {

    $('#stato').text(" ");

    let mine = 0;
    let difficolta = document.getElementById("difficoltà").value;

    if (difficolta == 1) {
        dimCampo = 15;
        mine = 15;
    } else if (difficolta == 2) {
        dimCampo = 15;
        mine = 20;
    }
    else if (difficolta == 3) {
        dimCampo = 10;
        mine = 25;
    }
    else if (difficolta == 4) {
        dimCampo = 10;
        mine = 30;
    }
    else if(difficolta==''){
        alert('seleziona una difficoltà');
        window.location.reload();
    }

    grandezza = (dimCampo * 40);

    $('#griglia').css("width", + grandezza + "px");
    $('#griglia').css("height", $('#griglia').width() + "px");

    const campo = new Campo(dimCampo, mine);
    $('#griglia').html("");
    campo.creaCampo();
    campo.posizionaMine();
    $('#reset').click(function () {
        campo.reset();
    });

    //controlla la casella cliccata e possibilità di vittoria o sconfitta
    $('.casella').click(function () {

        if (campo.gioco) {

            let row = parseInt($(this).attr("data-row"));
            let col = parseInt($(this).attr("data-col"));

            if (!campo.controlla(row, col)) {
                // ha perso
                campo.gioco = false;
                $('#stato').append("Hai perso!");
                alert("Hai Perso!");

            } else if (campo.grandezza * campo.grandezza - campo.caselleAperte <= campo.mine) {
                // hai vinto
                campo.gioco = false;
                $('#stato').html("Hai vinto!");
                alert("Hai Vinto!");
            }

            if (!campo.gioco)
                campo.scopriMine();

        } else {
            alert("Gioco finito!");
        }
    });

    //mette la flag alla casella selezionata
    $("#griglia").on('contextmenu', function (e) {

        e.preventDefault();
        let clickedElement = $(e.target);

        //prendo riga e colonna
        let row = parseInt(clickedElement.attr("data-row"));
        let col = parseInt(clickedElement.attr("data-col"));

        campo.flag(row, col);

    });
}