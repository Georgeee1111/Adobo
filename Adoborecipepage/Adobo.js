function revealWithDelay() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(reveal => {
        // Get the distance of the element from the top of the viewport
        const revealTop = reveal.getBoundingClientRect().top;
        // Get the height of the viewport
        const windowHeight = window.innerHeight;
        // Set the reveal point (how far from the bottom of the viewport the element should be revealed)
        const revealPoint = 150;

        // If the top of the element is less than the height of the viewport minus the reveal point
        if (revealTop < windowHeight - revealPoint) {
            // Add a delay of 500 milliseconds before adding the 'active' class to reveal the element
            setTimeout(() => {
                reveal.classList.add('active');
            }, 400); // Adjust the delay time (in milliseconds) as needed
        } else {
            // Otherwise, remove the 'active' class to hide the element
            reveal.classList.remove('active');
        }
    });
}


window.addEventListener('scroll', revealWithDelay);

function handleNavClick() {
    const navLinks = document.querySelectorAll(".navbar ul li a");

    navLinks.forEach(navLink => {
        navLink.addEventListener("click", function() {
            navLinks.forEach(link => {
                link.classList.remove("active");
            });
            this.classList.add("active");
        });
    });
}

document.addEventListener("DOMContentLoaded", handleNavClick);