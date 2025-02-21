// $(function() {

//     $("input,textarea").jqBootstrapValidation({
//         preventSubmit: true,
//         submitError: function($form, event, errors) {
//             // additional error messages or events
//         },
//         submitSuccess: function($form, event) {
//             event.preventDefault(); // prevent default submit behaviour
//             // get values from FORM
//             var name = $("input#name").val();
//             var email = $("input#email").val();
//             var message = $("textarea#message").val();
//             var firstName = name; // For Success/Failure Message
//             // Check for white space in name for Success/Fail message
//             if (firstName.indexOf(' ') >= 0) {
//                 firstName = name.split(' ').slice(0, -1).join(' ');
//             }
//             $.ajax({
//                 url: "././mail/contact_me.php",
//                 type: "POST",
//                 data: {
//                     name: name,
//                     email: email,
//                     message: message
//                 },
//                 cache: false,
//                 success: function() {
//                     // Success message
//                     $('#success').html("<div class='alert alert-success'>");
//                     $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//                         .append("</button>");
//                     $('#success > .alert-success')
//                         .append("<strong>Your message has been sent. </strong>");
//                     $('#success > .alert-success')
//                         .append('</div>');

//                     //clear all fields
//                     $('#contactForm').trigger("reset");
//                 },
//                 error: function() {
//                     // Fail message
//                     $('#success').html("<div class='alert alert-danger'>");
//                     $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//                         .append("</button>");
//                     $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
//                     $('#success > .alert-danger').append('</div>');
//                     //clear all fields
//                     $('#contactForm').trigger("reset");
//                 },
//             })
//         },
//         filter: function() {
//             return $(this).is(":visible");
//         },
//     });

//     $("a[data-toggle=\"tab\"]").click(function(e) {
//         e.preventDefault();
//         $(this).tab("show");
//     });
// });


// /*When clicking on Full hide fail/success boxes */
// $('#name').focus(function() {
//     $('#success').html('');
// });

function submitContactForm(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const number = document.getElementById("contactNumber").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const successMessage = document.getElementById("successMessage");

    // Basic validation
    if (!name || !email || !number || !message) {
        alert("Please fill out all fields.");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Google Form URL
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfyg65bfwFxItdYlRszVeL1EHj6PEexKhm3OKEf2azj8nFzcg/formResponse";

    // Form Data Mapping
    const formData = new FormData();
    formData.append("entry.536247614", name);
    formData.append("entry.1568488406", email);
    formData.append("entry.137893444", number);
    formData.append("entry.630305868", message);

    // Submit form
    fetch(googleFormURL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
    })
        .then(() => {
            // Show success message
            successMessage.classList.add("show");
            document.querySelector(".contact-form").reset();

            // Hide message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove("show");
            }, 3000);
        })
        .catch((error) => {
            console.warn("Form submission completed, but response is not accessible due to no-cors.");
        });
}

