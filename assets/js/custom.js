document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const resultsDiv = document.getElementById('formResults');
    const resultsDisplay = document.getElementById('resultsDisplay');
    const averageRatingDiv = document.getElementById('averageRating');

    // Update slider values in real-time
    const rating1 = document.getElementById('rating1');
    const rating2 = document.getElementById('rating2');
    const rating3 = document.getElementById('rating3');
    const rating1Value = document.getElementById('rating1Value');
    const rating2Value = document.getElementById('rating2Value');
    const rating3Value = document.getElementById('rating3Value');

    if (rating1) {
        rating1.addEventListener('input', function() {
            rating1Value.textContent = this.value;
        });
    }

    if (rating2) {
        rating2.addEventListener('input', function() {
            rating2Value.textContent = this.value;
        });
    }

    if (rating3) {
        rating3.addEventListener('input', function() {
            rating3Value.textContent = this.value;
        });
    }

    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                rating1: parseInt(document.getElementById('rating1').value),
                rating2: parseInt(document.getElementById('rating2').value),
                rating3: parseInt(document.getElementById('rating3').value)
            };

            // Print to console
            console.log('Form Data:', formData);

            // Display data below form
            displayFormData(formData);

            // Calculate and display average rating
            calculateAverageRating(formData);

            // Show success popup
            showSuccessPopup();

            // Show results section
            resultsDiv.style.display = 'block';

            // Scroll to results
            resultsDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Function to display form data
    function displayFormData(data) {
        resultsDisplay.innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Surname:</strong> ${data.surname}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone number:</strong> ${data.phone}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            <p><strong>Rating 1:</strong> ${data.rating1}</p>
            <p><strong>Rating 2:</strong> ${data.rating2}</p>
            <p><strong>Rating 3:</strong> ${data.rating3}</p>
        `;
    }

    // Function to calculate average rating
    function calculateAverageRating(data) {
        const average = ((data.rating1 + data.rating2 + data.rating3) / 3).toFixed(1);
        
        // Determine color based on average
        let color;
        if (average >= 0 && average <= 4) {
            color = 'red';
        } else if (average > 4 && average <= 7) {
            color = 'orange';
        } else if (average > 7 && average <= 10) {
            color = 'green';
        }

        averageRatingDiv.innerHTML = `
            ${data.name} ${data.surname}: average <span style="color: ${color};">${average}</span>
        `;
    }

    // Function to show success popup
    function showSuccessPopup() {
        // Create popup element
        const popup = document.createElement('div');
        popup.id = 'successPopup';
        popup.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px 50px;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                z-index: 10000;
                text-align: center;
                animation: popupFadeIn 0.3s ease-in-out;
            ">
                <h3 style="margin-bottom: 15px; font-size: 1.5rem;">✓ Success!</h3>
                <p style="margin: 0; font-size: 1.1rem;">Form submitted successfully!</p>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 9999;
            " onclick="this.parentElement.remove()"></div>
        `;

        document.body.appendChild(popup);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            popup.remove();
        }, 3000);
    }
});

// Add popup animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes popupFadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
`;
document.head.appendChild(style);