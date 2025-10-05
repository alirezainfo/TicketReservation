"use strict";
class Reservable {
}
class Seat extends Reservable {
    constructor(row, number) {
        super();
        this.row = row;
        this.number = number;
        this.reserved = false;
        this.selected = false;
        this.element = document.createElement('div');
        this.element.classList.add('seat');
        this.element.addEventListener('click', () => this.toggleSelect());
        this.UpdateUi();
    }
    toggleSelect() {
        if (this.reserved)
            return;
        this.selected = !this.selected;
        this.UpdateUi();
    }
    isSelected() {
        return this.selected;
    }
    getElement() {
        return this.element;
    }
    UpdateUi() {
        this.element.classList.remove('reserved', 'selected');
        if (this.reserved) {
            this.element.classList.add('reserved');
        }
        else if (this.selected) {
            this.element.classList.add('selected');
        }
    }
    reserve() {
        this.reserved = true;
        this.selected = false;
        this.UpdateUi();
    }
    isreserve() {
        return this.reserved;
    }
    saveToStorage() {
        const key = `seat-${this.row}-${this.number}`;
        localStorage.setItem(key, 'reserved');
    }
    loadReservedFromStorage() {
        const key = `seat-${this.row}-${this.number}`;
        if (localStorage.getItem(key) === 'reserved') {
            this.reserve();
        }
    }
    getInfo() {
        return { row: this.row, number: this.number };
    }
}
class Cinema {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getSelectedSeats() {
        return this.items.filter((item) => {
            return typeof item.isSelected === 'function' && item.isSelected();
        });
    }
    render(container) {
        this.items.forEach((item) => {
            if (item.loadReservedFromStorage)
                item.loadReservedFromStorage();
            if (item.getElement)
                container.appendChild(item.getElement());
        });
    }
}
const cinemaDiv = document.getElementById('cinema');
const cinema = new Cinema;
const Ticket_price = 10000;
for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 8; j++) {
        const seat = new Seat(i, j);
        cinema.add(seat);
    }
}
cinema.render(cinemaDiv);
const buyButton = document.getElementById('buyButton');
buyButton.addEventListener("click", () => {
    const selected = cinema.getSelectedSeats();
    console.log('alireza');
    if (selected.length === 0) {
        alert('لطفا حداقل یک صندلی انتخاب کنید.');
        return false;
    }
    const total = selected.length * Ticket_price;
    const confirmed = confirm(`شما ${selected.length} انتخاب کرده اید. 
        مبلغ قابل پرداخت ${total.toLocaleString()} است 
        آیا میخواهید ادامه بدهید؟`);
    if (confirmed) {
        selected.forEach((seat) => {
            seat.reserve();
            seat.saveToStorage();
        });
    }
    const invoice = document.getElementById('invoice');
    const invoiceDetails = document.getElementById('invoice-details');
    invoiceDetails.innerHTML = `<p>مبلغ نهایی  <b>${total.toLocaleString()}</b></p>
    <p>:صندلی های رزرو شده</p>
    <ul style = "width : inherit">
    ${selected.map(s => `<li>ردیف ${s.getInfo().row} - شماره ${s.getInfo().number}</li>`).join('')}
    </ul>`;
    invoice.style.display = 'block';
});
