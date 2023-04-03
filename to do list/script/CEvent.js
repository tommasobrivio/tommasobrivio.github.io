class CEvent{
    constructor(d, at){
        this.data=d;
        this.attivita=at;
        this.completata=false;
    }


    setCompletamento(){
       this.completata=!this.completata;
    }


}