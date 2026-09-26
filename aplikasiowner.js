"use strict";

/* =========================================================
   OWNERHUB
   Rental PS + Mini Cinema + Food
   Data tersimpan di LocalStorage
========================================================= */

const STORAGE_KEY = "ownerhub_rental_ps_v1";

const defaultData = {

    settings: {
        businessName: "OwnerHub Rental PS & Mini Cinema",
        targetRevenue: 15000000,
        targetProfit: 5000000
    },

    transactions: [
        {
            id: crypto.randomUUID(),
            date: new Date().toISOString().slice(0,10),
            type: "income",
            category: "Rental PS",
            description: "Rental PS4",
            source: "Usaha",
            amount: 150000
        },
        {
            id: crypto.randomUUID(),
            date: new Date().toISOString().slice(0,10),
            type: "income",
            category: "Makanan",
            description: "Penjualan makanan",
            source: "Usaha",
            amount: 85000
        },
        {
            id: crypto.randomUUID(),
            date: new Date().toISOString().slice(0,10),
            type: "expense",
            category: "Operasional",
            description: "Listrik",
            source: "Usaha",
            amount: 100000
        }
    ],

    employees: [
        {
            id: crypto.randomUUID(),
            name: "Andi",
            role: "Operator",
            shift: "Siang",
            salary: 3000000,
            attendance: "Hadir",
            task: "Kasir & pelayanan"
        },
        {
            id: crypto.randomUUID(),
            name: "Budi",
            role: "Teknisi",
            shift: "Malam",
            salary: 3500000,
            attendance: "Hadir",
            task: "Cek PS, TV dan jaringan"
        }
    ],

    equipment: [
        {
            id: crypto.randomUUID(),
            name: "PS3 #1",
            category: "PlayStation",
            status: "Baik"
        },
        {
            id: crypto.randomUUID(),
            name: "PS4 #1",
            category: "PlayStation",
            status: "Baik"
        },
        {
            id: crypto.randomUUID(),
            name: "PS4 #2",
            category: "PlayStation",
            status: "Perbaikan"
        },
        {
            id: crypto.randomUUID(),
            name: "TV 32 Inch #1",
            category: "Televisi",
            status: "Baik"
        },
        {
            id: crypto.randomUUID(),
            name: "TV Bioskop #1",
            category: "Bioskop",
            status: "Baik"
        },
        {
            id: crypto.randomUUID(),
            name: "Stik PS4 #1",
            category: "Controller",
            status: "Baik"
        },
        {
            id: crypto.randomUUID(),
            name: "Stik PS4 #2",
            category: "Controller",
            status: "Rusak"
        },
        {
            id: crypto.randomUUID(),
            name: "AC Ruang PS",
            category: "Fasilitas",
            status: "Baik"
        },
        {
            id: crypto.randomUUID(),
            name: "Router Internet",
            category: "Internet",
            status: "Baik"
        },
        {
            id: crypto.randomUUID(),
            name: "Freezer Minuman",
            category: "Makanan",
            status: "Baik"
        }
    ],

    maintenance: [
        {
            id: crypto.randomUUID(),
            date: new Date().toISOString().slice(0,10),
            equipment: "PS4 #2",
            problem: "Tidak membaca disc",
            technician: "Teknisi Internal",
            cost: 150000,
            status: "Proses"
        },
        {
            id: crypto.randomUUID(),
            date: new Date().toISOString().slice(0,10),
            equipment: "Stik PS4 #2",
            problem: "Analog drift",
            technician: "Teknisi Internal",
            cost: 75000,
            status: "Selesai"
        }
    ],

    rooms: [
        { id: "PS3-01", name: "PS3 #1", type: "PS3" },
        { id: "PS3-02", name: "PS3 #2", type: "PS3" },
        { id: "PS4-01", name: "PS4 #1", type: "PS4" },
        { id: "PS4-02", name: "PS4 #2", type: "PS4" },
        { id: "PS5-01", name: "PS5 #1", type: "PS5" },
        { id: "CINEMA-01", name: "Studio Cinema #1", type: "Cinema" },
        { id: "CINEMA-02", name: "Studio Cinema #2", type: "Cinema" }
    ],

    bookings: [
        {
            id: crypto.randomUUID(),
            date: new Date().toISOString().slice(0,10),
            customer: "Pelanggan Demo",
            place: "PS4 #1",
            start: "19:00",
            duration: 2,
            total: 100000,
            payment: "Lunas",
            game: "FC 26"
        }
    ],

    menu: [
        { id: 1, name: "Indomie Goreng", price: 12000, emoji: "🍜" },
        { id: 2, name: "Indomie Rebus", price: 12000, emoji: "🍜" },
        { id: 3, name: "Kentang Goreng", price: 15000, emoji: "🍟" },
        { id: 4, name: "Nugget", price: 15000, emoji: "🍗" },
        { id: 5, name: "Sosis", price: 12000, emoji: "🌭" },
        { id: 6, name: "Roti Bakar", price: 15000, emoji: "🍞" },
        { id: 7, name: "Es Teh", price: 6000, emoji: "🥤" },
        { id: 8, name: "Es Jeruk", price: 8000, emoji: "🍊" },
        { id: 9, name: "Kopi Hitam", price: 10000, emoji: "☕" },
        { id: 10, name: "Kopi Susu", price: 14000, emoji: "☕" }
    ],

    orders: [],

    games: [
        "FC 26",
        "eFootball",
        "GTA V",
        "Tekken 8",
        "Mortal Kombat",
        "PES",
        "NBA 2K",
        "Minecraft"
    ]
};

let data = loadData();
let currentPage = "dashboard";
let qrStream = null;


/* =========================================================
   UTILITIES
========================================================= */

function loadData() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return structuredClone(defaultData);
        }

        const parsed = JSON.parse(saved);

        return {
            ...structuredClone(defaultData),
            ...parsed
        };

    } catch (error) {

        console.error(error);
        return structuredClone(defaultData);
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function money(value) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);
}

function today() {
    return new Date().toISOString().slice(0,10);
}

function uid() {
    return crypto.randomUUID();
}

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function toast(message) {

    const container = document.getElementById("toastContainer");

    const element = document.createElement("div");

    element.className = "toast";
    element.textContent = message;

    container.appendChild(element);

    setTimeout(() => {
        element.remove();
    }, 3000);
}

function statusBadge(status) {

    let cls = "blue";

    if (
        ["Baik", "Hadir", "Lunas", "Selesai", "Tersedia"].includes(status)
    ) cls = "green";

    if (
        ["Rusak", "Tidak Hadir", "Belum Bayar", "Gagal"].includes(status)
    ) cls = "red";

    if (
        ["Perbaikan", "Proses", "Booking", "Menunggu"].includes(status)
    ) cls = "orange";

    return `<span class="badge ${cls}">${escapeHTML(status)}</span>`;
}


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const date = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    document.getElementById("liveClock").textContent = time;
    document.getElementById("liveDate").textContent = date;

    document.getElementById("toolClock").textContent = time;
    document.getElementById("toolDate").textContent = date;
}

setInterval(updateClock, 1000);
updateClock();


/* =========================================================
   NAVIGATION
========================================================= */

const pageTitles = {

    dashboard: ["Dashboard Owner", "Pantau seluruh kegiatan usaha."],
    finance: ["Keuangan", "Kelola pemasukan, pengeluaran dan laba."],
    employees: ["Karyawan", "Kelola kehadiran, shift dan gaji."],
    inventory: ["Alat & Inventaris", "Pantau kondisi seluruh peralatan."],
    maintenance: ["Perbaikan", "Kelola kerusakan dan biaya maintenance."],
    booking: ["Booking", "Kelola jadwal rental PS dan bioskop."],
    food: ["Makanan & Minuman", "Kelola penjualan makanan dan minuman."],
    analytics: ["Analitik", "Pantau performa usaha berdasarkan data."],
    tools: ["Aplikasi", "Kalkulator, cuaca, kiblat dan QR scanner."],
    settings: ["Pengaturan", "Atur identitas dan target usaha."]
};

document.querySelectorAll(".menu-item").forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.page;

        showPage(page);

        document.getElementById("sidebar").classList.remove("open");
    });
});

function showPage(page) {

    currentPage = page;

    document.querySelectorAll(".page").forEach(element => {
        element.classList.remove("active");
    });

    document.getElementById(page).classList.add("active");

    document.querySelectorAll(".menu-item").forEach(element => {
        element.classList.toggle(
            "active",
            element.dataset.page === page
        );
    });

    const title = pageTitles[page];

    document.getElementById("pageTitle").textContent = title[0];
    document.getElementById("pageSubtitle").textContent = title[1];

    renderAll();
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const currentDate = today();

    const todayTransactions = data.transactions.filter(
        item => item.date === currentDate
    );

    const income = todayTransactions
        .filter(item => item.type === "income")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    const expense = todayTransactions
        .filter(item => item.type === "expense")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    const customers = data.bookings.filter(
        item => item.date === currentDate
    ).length;

    const bookings = customers;

    document.getElementById("todayIncome").textContent = money(income);
    document.getElementById("todayExpense").textContent = money(expense);
    document.getElementById("todayCustomers").textContent = customers;
    document.getElementById("todayBookings").textContent = bookings;

    const monthlyIncome = getMonthTransactions()
        .filter(item => item.type === "income")
        .reduce((sum,item) => sum + Number(item.amount),0);

    const target = Number(data.settings.targetRevenue) || 0;

    const percent = target > 0
        ? Math.min(100, Math.round((monthlyIncome / target) * 100))
        : 0;

    document.getElementById("targetPercent").textContent = `${percent}%`;
    document.getElementById("targetProgress").style.width = `${percent}%`;
    document.getElementById("targetCurrent").textContent = money(monthlyIncome);
    document.getElementById("targetValue").textContent = `Target ${money(target)}`;

    const good = data.equipment.filter(x => x.status === "Baik").length;
    const repair = data.equipment.filter(x => x.status === "Perbaikan").length;
    const broken = data.equipment.filter(x => x.status === "Rusak").length;

    document.getElementById("goodEquipment").textContent = good;
    document.getElementById("repairEquipment").textContent = repair;
    document.getElementById("brokenEquipment").textContent = broken;

    renderBusyHours();
    renderRecentActivity();
}

function getMonthTransactions() {

    const now = new Date();

    const month = now.getMonth();
    const year = now.getFullYear();

    return data.transactions.filter(item => {

        const d = new Date(item.date);

        return d.getMonth() === month &&
               d.getFullYear() === year;
    });
}

function renderBusyHours() {

    const container = document.getElementById("busyHours");

    const hours = {};

    data.bookings.forEach(booking => {

        const hour = booking.start?.split(":")[0];

        if (!hour) return;

        hours[hour] = (hours[hour] || 0) + 1;
    });

    const entries = Object.entries(hours)
        .sort((a,b) => b[1] - a[1])
        .slice(0,6);

    if (!entries.length) {

        container.innerHTML =
            `<div class="tool-result">Belum ada data booking.</div>`;

        return;
    }

    const max = Math.max(...entries.map(x => x[1]));

    container.innerHTML = entries.map(([hour,count]) => {

        const width = Math.round((count / max) * 100);

        return `
            <div class="hour-row">
                <span>${hour}:00</span>
                <div class="hour-progress">
                    <div style="width:${width}%"></div>
                </div>
                <strong>${count}</strong>
            </div>
        `;

    }).join("");
}

function renderRecentActivity() {

    const container = document.getElementById("recentActivity");

    const list = [...data.transactions]
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .slice(0,5);

    if (!list.length) {

        container.innerHTML =
            `<div class="tool-result">Belum ada transaksi.</div>`;

        return;
    }

    container.innerHTML = list.map(item => {

        const color = item.type === "income"
            ? "green"
            : "red";

        const sign = item.type === "income"
            ? "+"
            : "-";

        return `
            <div class="peak-card">
                <span>${escapeHTML(item.description)}</span>
                <strong class="${color}">
                    ${sign}${money(item.amount)}
                </strong>
            </div>
        `;

    }).join("");
}


/* =========================================================
   FINANCE
========================================================= */

function renderFinance() {

    const period =
        document.getElementById("financePeriod").value;

    const type =
        document.getElementById("financeType").value;

    const filtered = data.transactions.filter(item => {

        const date = new Date(item.date);
        const now = new Date();

        let periodMatch = true;

        if (period === "day") {
            periodMatch = item.date === today();
        }

        if (period === "month") {
            periodMatch =
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear();
        }

        if (period === "year") {
            periodMatch =
                date.getFullYear() === now.getFullYear();
        }

        const typeMatch =
            type === "all" ||
            item.type === type;

        return periodMatch && typeMatch;
    });

    const income = filtered
        .filter(x => x.type === "income")
        .reduce((s,x) => s + Number(x.amount),0);

    const expense = filtered
        .filter(x => x.type === "expense")
        .reduce((s,x) => s + Number(x.amount),0);

    document.getElementById("financeIncome").textContent = money(income);
    document.getElementById("financeExpense").textContent = money(expense);
    document.getElementById("financeProfit").textContent = money(income - expense);

    const table = document.getElementById("transactionTable");

    table.innerHTML = filtered
        .slice()
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .map(item => {

            return `
                <tr>

                    <td>${escapeHTML(item.date)}</td>

                    <td>
                        ${item.type === "income"
                            ? statusBadge("Pemasukan")
                            : statusBadge("Pengeluaran")}
                    </td>

                    <td>${escapeHTML(item.category)}</td>

                    <td>${escapeHTML(item.description)}</td>

                    <td>${escapeHTML(item.source)}</td>

                    <td>
                        <strong>${money(item.amount)}</strong>
                    </td>

                    <td>
                        <button class="table-action"
                            onclick="deleteTransaction('${item.id}')">
                            🗑
                        </button>
                    </td>

                </tr>
            `;

        }).join("");
}

document.getElementById("financePeriod")
    .addEventListener("change", renderFinance);

document.getElementById("financeType")
    .addEventListener("change", renderFinance);

function deleteTransaction(id) {

    if (!confirm("Hapus transaksi ini?")) return;

    data.transactions =
        data.transactions.filter(x => x.id !== id);

    saveData();
    renderAll();
    toast("Transaksi dihapus.");
}


/* =========================================================
   EMPLOYEES
========================================================= */

function renderEmployees() {

    const present = data.employees.filter(
        x => x.attendance === "Hadir"
    ).length;

    const absent = data.employees.length - present;

    const salary = data.employees.reduce(
        (sum,x) => sum + Number(x.salary),0
    );

    document.getElementById("employeeTotal").textContent =
        data.employees.length;

    document.getElementById("employeePresent").textContent =
        present;

    document.getElementById("employeeAbsent").textContent =
        absent;

    document.getElementById("totalSalary").textContent =
        money(salary);

    document.getElementById("employeeTable").innerHTML =
        data.employees.map(employee => {

            return `
                <tr>

                    <td>
                        <strong>${escapeHTML(employee.name)}</strong>
                    </td>

                    <td>${escapeHTML(employee.role)}</td>

                    <td>${escapeHTML(employee.shift)}</td>

                    <td>${money(employee.salary)}</td>

                    <td>
                        <button class="table-action"
                            onclick="toggleAttendance('${employee.id}')">
                            ${statusBadge(employee.attendance)}
                        </button>
                    </td>

                    <td>${escapeHTML(employee.task)}</td>

                    <td>
                        <button class="table-action"
                            onclick="deleteEmployee('${employee.id}')">
                            🗑
                        </button>
                    </td>

                </tr>
            `;

        }).join("");
}

function toggleAttendance(id) {

    const employee =
        data.employees.find(x => x.id === id);

    if (!employee) return;

    employee.attendance =
        employee.attendance === "Hadir"
            ? "Tidak Hadir"
            : "Hadir";

    saveData();
    renderAll();
    toast(`Kehadiran ${employee.name} diperbarui.`);
}

function deleteEmployee(id) {

    if (!confirm("Hapus data karyawan?")) return;

    data.employees =
        data.employees.filter(x => x.id !== id);

    saveData();
    renderAll();
}


/* =========================================================
   INVENTORY
========================================================= */

function renderInventory() {

    const container =
        document.getElementById("inventoryGrid");

    container.innerHTML =
        data.equipment.map(item => {

            return `
                <div class="inventory-card">

                    <h3>🎮 ${escapeHTML(item.name)}</h3>

                    <p>${escapeHTML(item.category)}</p>

                    <div class="inventory-status">

                        <span>Status</span>

                        ${statusBadge(item.status)}

                    </div>

                    <div class="inventory-actions">

                        <button
                            class="secondary-btn"
                            onclick="changeEquipmentStatus('${item.id}')">
                            Ubah Status
                        </button>

                        <button
                            class="danger-btn"
                            onclick="deleteEquipment('${item.id}')">
                            Hapus
                        </button>

                    </div>

                </div>
            `;

        }).join("");
}

function changeEquipmentStatus(id) {

    const item =
        data.equipment.find(x => x.id === id);

    if (!item) return;

    const statuses = ["Baik", "Perbaikan", "Rusak"];

    const current = statuses.indexOf(item.status);

    item.status =
        statuses[(current + 1) % statuses.length];

    saveData();
    renderAll();

    toast(`${item.name}: ${item.status}`);
}

function deleteEquipment(id) {

    if (!confirm("Hapus alat ini?")) return;

    data.equipment =
        data.equipment.filter(x => x.id !== id);

    saveData();
    renderAll();
}


/* =========================================================
   MAINTENANCE
========================================================= */

function renderMaintenance() {

    const open =
        data.maintenance.filter(
            x => x.status !== "Selesai"
        ).length;

    const cost =
        data.maintenance.reduce(
            (sum,x) => sum + Number(x.cost),0
        );

    document.getElementById("openMaintenance").textContent =
        open;

    document.getElementById("maintenanceCost").textContent =
        money(cost);

    document.getElementById("maintenanceTable").innerHTML =
        data.maintenance.map(item => {

            return `
                <tr>

                    <td>${escapeHTML(item.date)}</td>

                    <td>${escapeHTML(item.equipment)}</td>

                    <td>${escapeHTML(item.problem)}</td>

                    <td>${escapeHTML(item.technician)}</td>

                    <td>${money(item.cost)}</td>

                    <td>
                        ${statusBadge(item.status)}
                    </td>

                    <td>

                        <button
                            class="table-action"
                            onclick="toggleMaintenance('${item.id}')">
                            ✓
                        </button>

                        <button
                            class="table-action"
                            onclick="deleteMaintenance('${item.id}')">
                            🗑
                        </button>

                    </td>

                </tr>
            `;

        }).join("");
}

function toggleMaintenance(id) {

    const item =
        data.maintenance.find(x => x.id === id);

    if (!item) return;

    item.status =
        item.status === "Selesai"
            ? "Proses"
            : "Selesai";

    saveData();
    renderAll();
}

function deleteMaintenance(id) {

    data.maintenance =
        data.maintenance.filter(x => x.id !== id);

    saveData();
    renderAll();
}


/* =========================================================
   BOOKING
========================================================= */

function renderBooking() {

    const todayBookings =
        data.bookings.filter(x => x.date === today());

    const container =
        document.getElementById("roomStatusGrid");

    container.innerHTML =
        data.rooms.map(room => {

            const booking =
                todayBookings.find(
                    x => x.place === room.name
                );

            const isBooked = Boolean(booking);

            return `
                <div class="room-card ${isBooked ? "booked" : "available"}">

                    <h3>
                        ${isBooked ? "🔴" : "🟢"}
                        ${escapeHTML(room.name)}
                    </h3>

                    <p>
                        ${isBooked
                            ? `Booking ${booking.start}`
                            : "Tersedia"}
                    </p>

                </div>
            `;

        }).join("");

    document.getElementById("bookingTable").innerHTML =
        data.bookings
        .slice()
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .map(booking => {

            return `
                <tr>

                    <td>${escapeHTML(booking.date)}</td>

                    <td>${escapeHTML(booking.customer)}</td>

                    <td>${escapeHTML(booking.place)}</td>

                    <td>${escapeHTML(booking.start)}</td>

                    <td>${booking.duration} jam</td>

                    <td>${money(booking.total)}</td>

                    <td>${statusBadge(booking.payment)}</td>

                    <td>
                        <button
                            class="table-action"
                            onclick="deleteBooking('${booking.id}')">
                            🗑
                        </button>
                    </td>

                </tr>
            `;

        }).join("");
}

function deleteBooking(id) {

    if (!confirm("Hapus booking?")) return;

    data.bookings =
        data.bookings.filter(x => x.id !== id);

    saveData();
    renderAll();
}


/* =========================================================
   FOOD
========================================================= */

function renderFood() {

    document.getElementById("foodMenuGrid").innerHTML =
        data.menu.map(item => {

            return `
                <div class="food-item">

                    <div class="emoji">${item.emoji}</div>

                    <strong>${escapeHTML(item.name)}</strong>

                    <small>Menu makanan/minuman</small>

                    <div class="food-price">
                        ${money(item.price)}
                    </div>

                </div>
            `;

        }).join("");

    document.getElementById("foodOrderTable").innerHTML =
        data.orders
        .slice()
        .reverse()
        .map(order => {

            return `
                <tr>

                    <td>${escapeHTML(order.customer)}</td>

                    <td>${escapeHTML(order.location)}</td>

                    <td>${escapeHTML(order.menu)}</td>

                    <td>${order.qty}</td>

                    <td>${money(order.total)}</td>

                    <td>${statusBadge(order.status)}</td>

                    <td>
                        <button
                            class="table-action"
                            onclick="deleteOrder('${order.id}')">
                            🗑
                        </button>
                    </td>

                </tr>
            `;

        }).join("");
}

function deleteOrder(id) {

    data.orders =
        data.orders.filter(x => x.id !== id);

    saveData();
    renderAll();
}


/* =========================================================
   ANALYTICS
========================================================= */

function renderAnalytics() {

    const now = new Date();

    const revenue = [];

    for (let i = 6; i >= 0; i--) {

        const date = new Date();

        date.setDate(now.getDate() - i);

        const iso =
            date.toISOString().slice(0,10);

        const value =
            data.transactions
            .filter(x =>
                x.date === iso &&
                x.type === "income"
            )
            .reduce((sum,x) =>
                sum + Number(x.amount),0);

        revenue.push({
            date,
            value
        });
    }

    const max =
        Math.max(...revenue.map(x => x.value), 1);

    document.getElementById("revenueChart").innerHTML =
        revenue.map(item => {

            const height =
                Math.max(5, (item.value / max) * 100);

            const day =
                item.date.toLocaleDateString("id-ID", {
                    weekday: "short"
                });

            return `
                <div class="bar-item">

                    <span class="bar-value">
                        ${item.value > 0 ? money(item.value) : "-"}
                    </span>

                    <div
                        class="bar"
                        style="height:${height}%">
                    </div>

                    <span class="bar-label">${day}</span>

                </div>
            `;

        }).join("");

    const hourCounts = {};

    data.bookings.forEach(booking => {

        const hour = booking.start?.split(":")[0];

        if (!hour) return;

        hourCounts[hour] =
            (hourCounts[hour] || 0) + 1;
    });

    const sortedHours =
        Object.entries(hourCounts)
        .sort((a,b) => b[1] - a[1]);

    document.getElementById("peakHour").textContent =
        sortedHours.length
            ? `${sortedHours[0][0]}:00`
            : "-";

    document.getElementById("quietHour").textContent =
        sortedHours.length
            ? `${sortedHours[sortedHours.length - 1][0]}:00`
            : "-";

    const gameCounts = {};

    data.bookings.forEach(booking => {

        if (!booking.game) return;

        gameCounts[booking.game] =
            (gameCounts[booking.game] || 0) + 1;
    });

    const games =
        Object.entries(gameCounts)
        .sort((a,b) => b[1] - a[1])
        .slice(0,8);

    document.getElementById("popularGames").innerHTML =
        games.length
            ? games.map(([game,count]) => `
                <div class="peak-card">
                    <span>🎮 ${escapeHTML(game)}</span>
                    <strong>${count}x</strong>
                </div>
            `).join("")
            : `<div class="tool-result">Belum ada data game.</div>`;

    const income =
        data.transactions
        .filter(x => x.type === "income")
        .reduce((s,x) => s + Number(x.amount),0);

    const expense =
        data.transactions
        .filter(x => x.type === "expense")
        .reduce((s,x) => s + Number(x.amount),0);

    document.getElementById("analyticsCustomers").textContent =
        data.bookings.length;

    document.getElementById("analyticsBookings").textContent =
        data.bookings.length;

    document.getElementById("analyticsRevenue").textContent =
        money(income);

    document.getElementById("analyticsExpense").textContent =
        money(expense);
}


/* =========================================================
   SETTINGS
========================================================= */

function renderSettings() {

    document.getElementById("businessName").value =
        data.settings.businessName;

    document.getElementById("targetRevenue").value =
        data.settings.targetRevenue;

    document.getElementById("targetProfit").value =
        data.settings.targetProfit;
}

document.getElementById("saveSettings")
    .addEventListener("click", () => {

        data.settings.businessName =
            document.getElementById("businessName").value.trim();

        data.settings.targetRevenue =
            Number(document.getElementById("targetRevenue").value) || 0;

        data.settings.targetProfit =
            Number(document.getElementById("targetProfit").value) || 0;

        saveData();

        renderAll();

        toast("Pengaturan berhasil disimpan.");
    });


/* =========================================================
   MODAL SYSTEM
========================================================= */

const modalOverlay =
    document.getElementById("modalOverlay");

const modalTitle =
    document.getElementById("modalTitle");

const modalForm =
    document.getElementById("modalForm");

function openModal(title, fields, callback) {

    modalTitle.textContent = title;

    modalForm.innerHTML = `
        <div class="modal-form">

            ${fields.map(field => {

                let input = "";

                if (field.type === "select") {

                    input = `
                        <select
                            id="field_${field.name}"
                            ${field.required ? "required" : ""}>
                            ${field.options.map(option =>
                                `<option value="${escapeHTML(option)}">
                                    ${escapeHTML(option)}
                                </option>`
                            ).join("")}
                        </select>
                    `;

                } else if (field.type === "textarea") {

                    input = `
                        <textarea
                            id="field_${field.name}"
                            rows="3"
                            ${field.required ? "required" : ""}>
                        </textarea>
                    `;

                } else {

                    input = `
                        <input
                            id="field_${field.name}"
                            type="${field.type || "text"}"
                            placeholder="${escapeHTML(field.placeholder || "")}"
                            ${field.required ? "required" : ""}>
                    `;
                }

                return `
                    <label>
                        ${escapeHTML(field.label)}
                        ${input}
                    </label>
                `;

            }).join("")}

            <button class="primary-btn modal-submit">
                Simpan Data
            </button>

        </div>
    `;

    modalOverlay.classList.add("active");

    modalForm.querySelector("form");

    modalForm.onsubmit = null;

    modalForm.querySelector("button")
        .addEventListener("click", (event) => {

            event.preventDefault();

            const result = {};

            fields.forEach(field => {

                result[field.name] =
                    document.getElementById(
                        `field_${field.name}`
                    ).value;

            });

            callback(result);

            closeModal();
        });
}

function closeModal() {

    modalOverlay.classList.remove("active");
    modalForm.innerHTML = "";
}

document.getElementById("modalClose")
    .addEventListener("click", closeModal);

modalOverlay.addEventListener("click", event => {

    if (event.target === modalOverlay) {
        closeModal();
    }
});


/* =========================================================
   ADD TRANSACTION
========================================================= */

document.getElementById("addTransactionBtn")
    .addEventListener("click", () => {

        openModal(
            "Tambah Transaksi",
            [
                {
                    name: "date",
                    label: "Tanggal",
                    type: "date",
                    required: true
                },
                {
                    name: "type",
                    label: "Jenis",
                    type: "select",
                    options: [
                        "income",
                        "expense"
                    ]
                },
                {
                    name: "category",
                    label: "Kategori",
                    type: "select",
                    options: [
                        "Rental PS",
                        "Bioskop",
                        "Makanan",
                        "Minuman",
                        "Gaji",
                        "Listrik",
                        "Internet",
                        "Sewa Tempat",
                        "Maintenance",
                        "Kebersihan",
                        "Peralatan",
                        "Lainnya"
                    ]
                },
                {
                    name: "description",
                    label: "Keterangan",
                    required: true,
                    placeholder: "Contoh: Rental PS4 2 jam"
                },
                {
                    name: "source",
                    label: "Sumber",
                    type: "select",
                    options: [
                        "Usaha",
                        "Pribadi"
                    ]
                },
                {
                    name: "amount",
                    label: "Nominal",
                    type: "number",
                    required: true
                }
            ],
            result => {

                data.transactions.push({
                    id: uid(),
                    date: result.date,
                    type: result.type,
                    category: result.category,
                    description: result.description,
                    source: result.source,
                    amount: Number(result.amount)
                });

                saveData();
                renderAll();

                toast("Transaksi berhasil ditambahkan.");
            }
        );

        document.getElementById("field_date").value = today();
    });


/* =========================================================
   ADD EMPLOYEE
========================================================= */

document.getElementById("addEmployeeBtn")
    .addEventListener("click", () => {

        openModal(
            "Tambah Karyawan",
            [
                {
                    name: "name",
                    label: "Nama",
                    required: true
                },
                {
                    name: "role",
                    label: "Jabatan",
                    type: "select",
                    options: [
                        "Operator",
                        "Kasir",
                        "Teknisi",
                        "Pelayan",
                        "Admin",
                        "Supervisor"
                    ]
                },
                {
                    name: "shift",
                    label: "Shift",
                    type: "select",
                    options: [
                        "Pagi",
                        "Siang",
                        "Malam"
                    ]
                },
                {
                    name: "salary",
                    label: "Gaji Bulanan",
                    type: "number",
                    required: true
                },
                {
                    name: "task",
                    label: "Tugas",
                    required: true
                }
            ],
            result => {

                data.employees.push({
                    id: uid(),
                    name: result.name,
                    role: result.role,
                    shift: result.shift,
                    salary: Number(result.salary),
                    attendance: "Hadir",
                    task: result.task
                });

                saveData();
                renderAll();

                toast("Karyawan berhasil ditambahkan.");
            }
        );
    });


/* =========================================================
   ADD EQUIPMENT
========================================================= */

document.getElementById("addEquipmentBtn")
    .addEventListener("click", () => {

        openModal(
            "Tambah Alat",
            [
                {
                    name: "name",
                    label: "Nama Alat",
                    required: true,
                    placeholder: "Contoh: PS4 #3"
                },
                {
                    name: "category",
                    label: "Kategori",
                    type: "select",
                    options: [
                        "PlayStation",
                        "Controller",
                        "Televisi",
                        "Bioskop",
                        "Fasilitas",
                        "Internet",
                        "Makanan",
                        "Dapur",
                        "Lainnya"
                    ]
                },
                {
                    name: "status",
                    label: "Status",
                    type: "select",
                    options: [
                        "Baik",
                        "Perbaikan",
                        "Rusak"
                    ]
                }
            ],
            result => {

                data.equipment.push({
                    id: uid(),
                    name: result.name,
                    category: result.category,
                    status: result.status
                });

                saveData();
                renderAll();

                toast("Alat berhasil ditambahkan.");
            }
        );
    });


/* =========================================================
   ADD MAINTENANCE
========================================================= */

document.getElementById("addMaintenanceBtn")
    .addEventListener("click", () => {

        openModal(
            "Tambah Perbaikan",
            [
                {
                    name: "date",
                    label: "Tanggal",
                    type: "date",
                    required: true
                },
                {
                    name: "equipment",
                    label: "Alat",
                    required: true,
                    placeholder: "Contoh: Stik PS4 #2"
                },
                {
                    name: "problem",
                    label: "Masalah",
                    type: "textarea",
                    required: true
                },
                {
                    name: "technician",
                    label: "Teknisi"
                },
                {
                    name: "cost",
                    label: "Biaya",
                    type: "number"
                },
                {
                    name: "status",
                    label: "Status",
                    type: "select",
                    options: [
                        "Proses",
                        "Menunggu",
                        "Selesai"
                    ]
                }
            ],
            result => {

                data.maintenance.push({
                    id: uid(),
                    date: result.date,
                    equipment: result.equipment,
                    problem: result.problem,
                    technician: result.technician,
                    cost: Number(result.cost) || 0,
                    status: result.status
                });

                saveData();
                renderAll();

                toast("Data perbaikan ditambahkan.");
            }
        );

        document.getElementById("field_date").value = today();
    });


/* =========================================================
   ADD BOOKING
========================================================= */

document.getElementById("addBookingBtn")
    .addEventListener("click", () => {

        openModal(
            "Tambah Booking",
            [
                {
                    name: "date",
                    label: "Tanggal",
                    type: "date",
                    required: true
                },
                {
                    name: "customer",
                    label: "Nama Pelanggan",
                    required: true
                },
                {
                    name: "place",
                    label: "Tempat",
                    type: "select",
                    options: data.rooms.map(x => x.name)
                },
                {
                    name: "start",
                    label: "Jam Mulai",
                    type: "time",
                    required: true
                },
                {
                    name: "duration",
                    label: "Durasi (jam)",
                    type: "number",
                    required: true
                },
                {
                    name: "total",
                    label: "Total Harga",
                    type: "number",
                    required: true
                },
                {
                    name: "payment",
                    label: "Pembayaran",
                    type: "select",
                    options: [
                        "Lunas",
                        "Belum Bayar"
                    ]
                },
                {
                    name: "game",
                    label: "Game / Film",
                    type: "select",
                    options: [
                        ...data.games,
                        "Film Bioskop"
                    ]
                }
            ],
            result => {

                const duplicate =
                    data.bookings.some(item =>
                        item.date === result.date &&
                        item.place === result.place &&
                        item.start === result.start
                    );

                if (duplicate) {

                    toast("Tempat dan jam tersebut sudah dibooking.");

                    return;
                }

                data.bookings.push({
                    id: uid(),
                    date: result.date,
                    customer: result.customer,
                    place: result.place,
                    start: result.start,
                    duration: Number(result.duration),
                    total: Number(result.total),
                    payment: result.payment,
                    game: result.game
                });

                if (result.payment === "Lunas") {

                    data.transactions.push({
                        id: uid(),
                        date: result.date,
                        type: "income",
                        category: result.place.includes("Cinema")
                            ? "Bioskop"
                            : "Rental PS",
                        description:
                            `Booking ${result.place} - ${result.customer}`,
                        source: "Usaha",
                        amount: Number(result.total)
                    });
                }

                saveData();
                renderAll();

                toast("Booking berhasil ditambahkan.");
            }
        );

        document.getElementById("field_date").value = today();
    });


/* =========================================================
   ADD FOOD ORDER
========================================================= */

document.getElementById("addFoodBtn")
    .addEventListener("click", () => {

        openModal(
            "Tambah Pesanan Makanan",
            [
                {
                    name: "customer",
                    label: "Nama Pelanggan",
                    required: true
                },
                {
                    name: "location",
                    label: "Lokasi",
                    required: true,
                    placeholder: "PS4 #1 / Studio #1"
                },
                {
                    name: "menu",
                    label: "Menu",
                    type: "select",
                    options: data.menu.map(x => x.name)
                },
                {
                    name: "qty",
                    label: "Jumlah",
                    type: "number",
                    required: true
                },
                {
                    name: "status",
                    label: "Status",
                    type: "select",
                    options: [
                        "Menunggu",
                        "Diproses",
                        "Selesai",
                        "Dibatalkan"
                    ]
                }
            ],
            result => {

                const menu =
                    data.menu.find(
                        x => x.name === result.menu
                    );

                const qty =
                    Number(result.qty) || 1;

                const total =
                    menu.price * qty;

                data.orders.push({
                    id: uid(),
                    customer: result.customer,
                    location: result.location,
                    menu: result.menu,
                    qty,
                    total,
                    status: result.status
                });

                if (result.status !== "Dibatalkan") {

                    data.transactions.push({
                        id: uid(),
                        date: today(),
                        type: "income",
                        category: "Makanan",
                        description:
                            `${result.menu} x${qty}`,
                        source: "Usaha",
                        amount: total
                    });
                }

                saveData();
                renderAll();

                toast("Pesanan berhasil ditambahkan.");
            }
        );
    });


/* =========================================================
   CALCULATOR
========================================================= */

let calcValue = "";

document.querySelectorAll("[data-calc]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const value = button.dataset.calc;

            if (value === "C") {
                calcValue = "";
            }

            else if (value === "DEL") {
                calcValue = calcValue.slice(0,-1);
            }

            else if (value === "=") {

                try {

                    if (!/^[0-9+\-*/%.() ]+$/.test(calcValue)) {
                        throw new Error("Invalid");
                    }

                    calcValue =
                        String(Function(
                            `"use strict"; return (${calcValue})`
                        )());

                } catch {
                    calcValue = "Error";
                }
            }

            else if (value === "%") {

                try {
                    calcValue =
                        String(parseFloat(calcValue) / 100);
                } catch {
                    calcValue = "Error";
                }

            }

            else {

                if (calcValue === "Error") {
                    calcValue = "";
                }

                calcValue += value;
            }

            document.getElementById("calcDisplay").value =
                calcValue || "0";
        });
    });


/* =========================================================
   WEATHER
========================================================= */

document.getElementById("weatherBtn")
    .addEventListener("click", async () => {

        const city =
            document.getElementById("weatherCity").value.trim();

        const result =
            document.getElementById("weatherResult");

        if (!city) {

            result.textContent =
                "Masukkan nama kota terlebih dahulu.";

            return;
        }

        result.textContent = "Mencari informasi cuaca...";

        try {

            const geoResponse =
                await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=id&format=json`
                );

            const geo =
                await geoResponse.json();

            if (!geo.results?.length) {

                result.textContent =
                    "Kota tidak ditemukan.";

                return;
            }

            const location = geo.results[0];

            const weatherResponse =
                await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
                );

            const weather =
                await weatherResponse.json();

            const current =
                weather.current;

            result.innerHTML = `
                <strong>${escapeHTML(location.name)}</strong><br>
                🌡️ Suhu: ${current.temperature_2m}°C<br>
                💧 Kelembapan: ${current.relative_humidity_2m}%<br>
                💨 Angin: ${current.wind_speed_10m} km/jam
            `;

        } catch(error) {

            console.error(error);

            result.textContent =
                "Gagal mengambil data cuaca. Periksa koneksi internet.";
        }
    });


/* =========================================================
   QIBLA
========================================================= */

function calculateQibla(latitude, longitude) {

    const kaabaLat =
        21.422487 * Math.PI / 180;

    const kaabaLon =
        39.826206 * Math.PI / 180;

    const lat =
        latitude * Math.PI / 180;

    const lon =
        longitude * Math.PI / 180;

    const delta =
        kaabaLon - lon;

    const y =
        Math.sin(delta);

    const x =
        Math.cos(lat) * Math.tan(kaabaLat)
        -
        Math.sin(lat) * Math.cos(delta);

    let bearing =
        Math.atan2(y,x) * 180 / Math.PI;

    bearing =
        (bearing + 360) % 360;

    return bearing;
}

document.getElementById("qiblaBtn")
    .addEventListener("click", () => {

        const result =
            document.getElementById("qiblaDegree");

        if (!navigator.geolocation) {

            result.textContent =
                "Browser tidak mendukung GPS.";

            return;
        }

        result.textContent =
            "Meminta lokasi...";

        navigator.geolocation.getCurrentPosition(

            position => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                const degree =
                    calculateQibla(
                        latitude,
                        longitude
                    );

                document.getElementById(
                    "qiblaNeedle"
                ).style.transform =
                    `rotate(${degree}deg)`;

                result.textContent =
                    `Arah kiblat: ${degree.toFixed(1)}° dari Utara`;

                toast("Arah kiblat berhasil dihitung.");

            },

            () => {

                result.textContent =
                    "Lokasi tidak dapat diperoleh. Izinkan akses lokasi.";

            }
        );
    });


/* =========================================================
   QR SCANNER
========================================================= */

const qrVideo =
    document.getElementById("qrVideo");

const qrCanvas =
    document.getElementById("qrCanvas");

const qrContext =
    qrCanvas.getContext("2d");

async function scanQRCode() {

    if (!qrStream) return;

    if (qrVideo.readyState >= 2) {

        qrCanvas.width =
            qrVideo.videoWidth;

        qrCanvas.height =
            qrVideo.videoHeight;

        qrContext.drawImage(
            qrVideo,
            0,
            0,
            qrCanvas.width,
            qrCanvas.height
        );

        if ("BarcodeDetector" in window) {

            try {

                const detector =
                    new BarcodeDetector({
                        formats: ["qr_code"]
                    });

                const codes =
                    await detector.detect(qrCanvas);

                if (codes.length) {

                    document.getElementById(
                        "qrResult"
                    ).textContent =
                        `QR terbaca: ${codes[0].rawValue}`;

                    toast("QR Code berhasil dibaca.");

                    stopQR();

                    return;
                }

            } catch(error) {

                console.error(error);
            }
        }
    }

    requestAnimationFrame(scanQRCode);
}

async function startQR() {

    const result =
        document.getElementById("qrResult");

    if (!navigator.mediaDevices?.getUserMedia) {

        result.textContent =
            "Browser tidak mendukung kamera.";

        return;
    }

    try {

        qrStream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: {
                        ideal: "environment"
                    }
                },
                audio: false
            });

        qrVideo.srcObject =
            qrStream;

        result.textContent =
            "Arahkan kamera ke QR Code.";

        scanQRCode();

    } catch(error) {

        console.error(error);

        result.textContent =
            "Kamera tidak dapat digunakan. Pastikan izin kamera diberikan.";
    }
}

function stopQR() {

    if (qrStream) {

        qrStream.getTracks().forEach(
            track => track.stop()
        );

        qrStream = null;
    }

    qrVideo.srcObject = null;
}

document.getElementById("startQR")
    .addEventListener("click", startQR);

document.getElementById("stopQR")
    .addEventListener("click", stopQR);


/* =========================================================
   EXPORT
========================================================= */

document.getElementById("exportDataBtn")
    .addEventListener("click", () => {

        const json =
            JSON.stringify(data,null,2);

        const blob =
            new Blob(
                [json],
                { type: "application/json" }
            );

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;

        a.download =
            `backup-ownerhub-${today()}.json`;

        a.click();

        URL.revokeObjectURL(url);

        toast("Backup data berhasil dibuat.");
    });


/* =========================================================
   RESET
========================================================= */

document.getElementById("resetDataBtn")
    .addEventListener("click", () => {

        const confirmation =
            confirm(
                "Semua data lokal akan dikembalikan ke data demo. Lanjutkan?"
            );

        if (!confirmation) return;

        data =
            structuredClone(defaultData);

        saveData();

        renderAll();

        toast("Data berhasil direset.");
    });


/* =========================================================
   MOBILE MENU
========================================================= */

document.getElementById("mobileMenuBtn")
    .addEventListener("click", () => {

        document
            .getElementById("sidebar")
            .classList.toggle("open");
    });


/* =========================================================
   RENDER ALL
========================================================= */

function renderAll() {

    renderDashboard();
    renderFinance();
    renderEmployees();
    renderInventory();
    renderMaintenance();
    renderBooking();
    renderFood();
    renderAnalytics();
    renderSettings();
}

renderAll();