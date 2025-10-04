interface SeatInfo{
    row:number,
    number:number
}

abstract class Reservable {
  abstract reserve():void;
  abstract isreserve():boolean;
}


class Seat extends Reservable{

    private element:HTMLDivElement;
    private reserved:boolean = false
    private selected:boolean = false

    constructor(public row:number,public number:number){
        super()
        this.element = document.createElement('div')
        this.element.classList.add('seat')
        this.element.addEventListener('click', () => this.toggleSelect())
        this.UpdateUi()
    }

    toggleSelect(){
        if(this.reserved) return false;
        this.selected = !this.selected
        this.UpdateUi()
    }


    isSelected():boolean{
        return this.selected;
    }

    getElement(){
        return this.element;
    }
    

    UpdateUi():void{
        this.element.classList.remove('reserved','selected')
        if(this.reserved){
            this.element.classList.add('reserved')
        }else if(this.selected){
            this.element.classList.add('selected')
        }
    }

    reserve(): void {
        this.reserved = true
        this.selected = true
        this.UpdateUi()
    }
    isreserve(): boolean {
        return this.reserved
    }
}

class Cinema <T extends Reservable>{
    private item:T[] = []

    add(item:T):void{
        this.item.push(item)
    }
}

const cinemaDiv = document.getElementById('cinema')
const cinema = new Cinema<Seat>

for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 8; j++) {
        const seat = new Seat(i, j)
        cinema.add(seat)
    }
}