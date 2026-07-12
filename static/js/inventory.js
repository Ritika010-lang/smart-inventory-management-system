// ==========================================
// StockFlow Inventory Management
// inventory.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // SEARCH INVENTORY
    // ==========================================

    const searchInput = document.querySelector(".search-filter input");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            const rows = document.querySelectorAll("tbody tr");

            rows.forEach(row => {

                const text = row.innerText.toLowerCase();

                if (text.includes(value)) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        });

    }

    // ==========================================
    // CARD HOVER EFFECT
    // ==========================================

    const cards = document.querySelectorAll(".card, .mini-card, .card-box");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-6px)";

            card.style.transition = ".3s";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });

    // ==========================================
    // BUTTON ACTIONS
    // ==========================================

    const exportBtn = document.querySelector(".export-btn");

    if (exportBtn) {

        exportBtn.addEventListener("click", () => {

            alert("Export feature will be connected with backend.");

        });

    }

    const addBtn = document.querySelector(".add-btn");

    if (addBtn) {

        addBtn.addEventListener("click", () => {

            window.location.href = "/add-product";

        });

    }

    // ==========================================
    // TABLE ACTIONS
    // ==========================================

    const editIcons = document.querySelectorAll(".fa-pen-to-square");

    editIcons.forEach(icon => {

        icon.addEventListener("click", () => {

            alert("Edit Product page will open here.");

        });

    });

    const deleteIcons = document.querySelectorAll(".fa-trash-can");

    deleteIcons.forEach(icon => {

        icon.addEventListener("click", () => {

            const confirmDelete = confirm("Delete this inventory item?");

            if (confirmDelete) {

                icon.closest("tr").remove();

            }

        });

    });

    // ==========================================
    // PAGINATION BUTTONS
    // ==========================================

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {

        page.addEventListener("click", () => {

            pages.forEach(btn => btn.classList.remove("active"));

            page.classList.add("active");

        });

    });

    // ==========================================
    // PROGRESS BAR ANIMATION
    // ==========================================

    const fills = document.querySelectorAll(".fill");

    fills.forEach(fill => {

        const finalWidth = fill.style.width;

        fill.style.width = "0";

        setTimeout(() => {

            fill.style.transition = "1s";

            fill.style.width = finalWidth;

        }, 300);

    });

    // ==========================================
    // REFRESH BUTTON
    // ==========================================

    const refreshBtn = document.querySelectorAll(".icon-btn")[1];

    if (refreshBtn) {

        refreshBtn.addEventListener("click", () => {

            location.reload();

        });

    }

    // ==========================================
    // NOTIFICATION BUTTON
    // ==========================================

    const notificationBtn = document.querySelectorAll(".icon-btn")[0];

    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            alert("No new inventory notifications.");

        });

    }

});