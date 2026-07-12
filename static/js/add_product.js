// ======================================
// IMAGE PREVIEW
// ======================================

const imageInput = document.getElementById("productImage");
const imagePreview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");

if (imageInput) {

    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.src = e.target.result;

            imagePreview.style.display = "flex";

        };

        reader.readAsDataURL(file);

    });

}

// ======================================
// FORM VALIDATION
// ======================================

// const form = document.querySelector("form");

// if (form) {

//     form.addEventListener("submit", function (e) {

//         //e.preventDefault();

//         const requiredFields = form.querySelectorAll("input[type='text'], input[type='number'], select");

//         let valid = true;

//         requiredFields.forEach(field => {

//             if (field.value.trim() === "") {

//                 field.classList.remove("success");

//                 field.classList.add("error");

//                 valid = false;

//             } else {

//                 field.classList.remove("error");

//                 field.classList.add("success");

//             }

//         });

//         if (!valid) {

//             alert("Please fill all required fields.");

//             return;

//         }

//         alert("Product information validated successfully!");

//     });

// }

// ======================================
// CLOSE BUTTON
// ======================================

const closeBtn = document.querySelector(".close-btn");

if (closeBtn) {

    closeBtn.addEventListener("click", function () {

        window.location.href = "/products";

    });

}

// ======================================
// CANCEL BUTTON
// ======================================

const cancelBtn = document.querySelector(".cancel-btn");

if (cancelBtn) {

    cancelBtn.addEventListener("click", function () {

        window.location.href = "/products";

    });

}

// ======================================
// DRAG & DROP
// ======================================

const uploadBox = document.querySelector(".upload-box");

if (uploadBox) {

    uploadBox.addEventListener("dragover", function (e) {

        e.preventDefault();

        uploadBox.style.borderColor = "#4F46E5";

    });

    uploadBox.addEventListener("dragleave", function () {

        uploadBox.style.borderColor = "#D1D5DB";

    });

    uploadBox.addEventListener("drop", function (e) {

        e.preventDefault();

        uploadBox.style.borderColor = "#D1D5DB";

        const files = e.dataTransfer.files;

        if (files.length > 0) {

            imageInput.files = files;

            imageInput.dispatchEvent(new Event("change"));

        }

    });

}

// ======================================
// QUANTITY CHECK
// ======================================

const quantityInput = document.querySelector("input[type='number']");

if (quantityInput) {

    quantityInput.addEventListener("input", function () {

        if (this.value < 0) {

            this.value = 0;

        }

    });

}

// ======================================
// DESCRIPTION COUNTER
// ======================================

const textarea = document.querySelector("textarea");

if (textarea) {

    const counter = document.createElement("small");

    counter.style.display = "block";

    counter.style.marginTop = "8px";

    counter.style.color = "#64748B";

    textarea.parentNode.appendChild(counter);

    textarea.addEventListener("input", function () {

        counter.textContent = `${this.value.length}/500 Characters`;

    });

}

// ======================================
// SAVE BUTTON LOADING EFFECT
// ======================================

const saveBtn = document.querySelector(".save-btn");

if (saveBtn) {

    saveBtn.addEventListener("click", function () {

        saveBtn.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> Saving...";

    });

}