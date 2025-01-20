const hamburger1 = document.getElementById('hamburger');
        const menu1 = document.getElementById('menu');

        hamburger1.addEventListener('click', () => {
            menu1.classList.toggle('open');
            hamburger1.classList.toggle('active');
        });

        window.addEventListener('click', (e) => {
            if (!menu1.contains(e.target) && !hamburger1.contains(e.target)) {
                menu1.classList.remove('open');
            }
        });

        // Contact Form Submission
        document.getElementById('contactForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            
            // Validate email format
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                emailInput.classList.add('invalid');
                emailError.textContent = 'Email is invalid.';
            } else {
                emailInput.classList.remove('invalid');
                emailError.textContent = '';

                const name = document.getElementById('name').value;
                const email = emailInput.value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;

                try {
                    const response = await fetch("https://portfolio-oesh.onrender.com/send", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, email, subject, message }),
                    });

                    if (response.ok) {
                        alert("Message sent successfully!");
                    } else {
                        alert("Failed to send message.");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("An error occurred.");
                }
            }
        });

        ScrollReveal({
            reset: true,
            distance: '60px',
            duration: 2500,
            delay: 400
        });

        ScrollReveal().reveal('#head1-name', {delay: 500});
        ScrollReveal().reveal('#head3-name', {delay: 1400});
        ScrollReveal().reveal('#head2-name', {delay: 1000});
        ScrollReveal().reveal('#About-title', {delay: 400, origin: 'top'});
        ScrollReveal().reveal('.img2', {delay: 100, origin: 'right'});
        ScrollReveal().reveal('#Contact-box p', {delay: 100, origin: 'top'});
