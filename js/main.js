
// DARK MODE

const darkModeBtn = document.getElementById("darkModeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

// NAVBAR

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});

// BOUTON DE RETOUR EN HAUT

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// COMPTEURS ANIMÉS

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const updateCounter = () => {
        const increment = target / 100;

        if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target;
        }
    };

    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ANIMATIONS FADE-IN

const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// FILTRAGE DES FREELANCES

const filterButtons = document.querySelectorAll(".filter-btn");
const freelancerCards = document.querySelectorAll(".freelancer-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const category = button.dataset.filter;

        freelancerCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });
    });
});

// VALIDATION FORMULAIRE CONTACT

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let valid = true;

        const nom = document.getElementById("nom");
        const prenom = document.getElementById("prenom");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nom.value.trim() === "") {
            valid = false;
            document.getElementById("nomError").textContent =
                "Le nom est obligatoire";
        } else {
            document.getElementById("nomError").textContent = "";
        }

        if (prenom.value.trim() === "") {
            valid = false;
            document.getElementById("prenomError").textContent =
                "Le prénom est obligatoire";
        } else {
            document.getElementById("prenomError").textContent = "";
        }

        if (!emailRegex.test(email.value)) {
            valid = false;
            document.getElementById("emailError").textContent =
                "Email invalide";
        } else {
            document.getElementById("emailError").textContent = "";
        }

        if (message.value.trim().length < 20) {
            valid = false;
            document.getElementById("messageError").textContent =
                "Le message doit contenir au moins 20 caractères";
        } else {
            document.getElementById("messageError").textContent = "";
        }

        if (valid) {

            document.getElementById("successMessage").innerHTML =
                "<div class='alert alert-success'>Message envoyé avec succès !</div>";

            form.reset();
        }

    });

}

// ANNÉE AUTOMATIQUE FOOTER


const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}