// Open Popup
function openPopup() {
    document.getElementById("popupForm").style.display = "flex";
}

// Close Popup
function closePopup() {
    document.getElementById("popupForm").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const emailInput = document.getElementById("contactEmail");
    const numberInput = document.getElementById("contactNumber");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const number = numberInput.value.trim();

        if (!email || !number) {
            alert("Please fill out all fields.");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!/^\d{10}$/.test(number)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // ✅ Google Form Submission (Replace with your actual form entry IDs)
        const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfyg65bfwFxItdYlRszVeL1EHj6PEexKhm3OKEf2azj8nFzcg/formResponse";
        const formData = new FormData();
        formData.append("entry.1568488406", email);  // Email field
        formData.append("entry.137893444", number);
        formData.append("entry.536247614", "Brochure Downloaded"); // Name field (Auto-filled)
        formData.append("entry.630305868", "Brochure Downloaded");  // Mobile Number field

        fetch(googleFormURL, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        })
            .then(() => {
                successMessage.style.display = "block";
                form.reset();

                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 3000);

                // ✅ Trigger PDF Download
                const brochureURL = "./pdf/Crown Kolshet - Lodha.pdf"; // Replace with actual brochure link
                const link = document.createElement("a");
                link.href = brochureURL;
                link.download = "Brochure.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(() => {
                alert("Form submitted, but there was an issue downloading the brochure.");
            });
    });
});