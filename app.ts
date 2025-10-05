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
    private items:T[] = []

    add(item:T):void{
        this.items.push(item)
    }


    getSelectedSeats():T[]{
        return this.items.filter((item:any)=>{
            return  typeof item.isSelected === 'function' && item.isSelected()
        })
    }


    render(container:HTMLDivElement):void{
        this.items.forEach((item:any)=>{
            if(item.getElement) container.appendChild(item.getElement())
        })
    }
}

const cinemaDiv = document.getElementById('cinema') as HTMLDivElement
const cinema = new Cinema<Seat>
const Ticket_price = 10000

for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 8; j++) {
        const seat = new Seat(i, j)
        cinema.add(seat)
    }
}


cinema.render(cinemaDiv)

const buyButton = document.getElementById('buyButton') as HTMLButtonElement;
buyButton.addEventListener("click",()=>{

    const selected = cinema.getSelectedSeats()
    console.log('alireza');
    
    if(selected.length === 0){
        alert('لطفا حداقل یک صندلی انتخاب کنید.')
        return false
    }  
    const total = selected.length * Ticket_price

    const confirmed = confirm(`شما ${selected.length} انتخاب کرده اید. \n 
        مبلغ قابل پرداخت ${total.toLocaleString()} است \n 
        آیا میخواهید ادامه بدهید؟`)

        if(confirmed){
            selected.forEach((seat)=>{
                seat.reserve()
            })
        }
})