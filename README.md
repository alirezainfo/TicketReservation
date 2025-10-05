
![Cinema Seat Reservation Screenshot](screenshot.png)

# 🎬 Cinema Seat Reservation System

A simple and interactive web application for managing **cinema seat reservations** using **TypeScript**, **HTML**, **CSS**, and **LocalStorage**.  
Users can select, reserve seats, view invoices, and track total sales.

---

## 🚀 Features

- Select and reserve seats with a click  
- Persistent reservations using **LocalStorage** (data remains after browser reload)  
- Display invoice with total amount and reserved seat details  
- View total sales (number of tickets sold and total revenue)  
- Clear all saved data with a single button  

---

## 🧱 Classes & Architecture

### 🔹 `Seat`
Represents a single seat that can:  
- Be **selected** by the user  
- Be **reserved**  
- Be saved and loaded from **LocalStorage**  

### 🔹 `Cinema<T extends Reservable>`
Manages a collection of seats:  
- Add seats dynamically  
- Render seats in the container  
- Retrieve all selected seats  

---

## 💾 How It Works

1. Seats are created using the `Seat` class.  
2. Users click on seats to **select** them.  
3. On clicking the **Buy** button:
   - Selected seats are **reserved**  
   - Reservations are saved in **LocalStorage**  
   - An **invoice** is displayed with total amount and seat details  
4. Additional buttons:
   - **Clear Storage** → deletes all reservation data  
   - **Show Sales** → shows total revenue and number of tickets sold  

---

## 🧩 Technologies Used

- **TypeScript**  
- **HTML / CSS**  
- **LocalStorage API**  
- **DOM Manipulation**  

---

## ⚙️ How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/<repository>.git
