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
            return false;
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
        this.selected = true;
        this.UpdateUi();
    }
    isreserve() {
        return this.reserved;
    }
}
class Cinema {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    render(container) {
        this.items.forEach((item) => {
            if (item.getElement)
                container.appendChild(item.getElement());
        });
    }
}
const cinemaDiv = document.getElementById('cinema');
const cinema = new Cinema;
for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 8; j++) {
        const seat = new Seat(i, j);
        cinema.add(seat);
    }
}
cinema.render(cinemaDiv);
