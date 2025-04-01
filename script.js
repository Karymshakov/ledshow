document.addEventListener("DOMContentLoaded", () => {
    // Получаем элементы бургер-меню и навигации
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Добавляем обработчик событий для бургер-меню
menuToggle.addEventListener('click', () => {
    // Переключаем класс 'active' у меню
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

    // Закрытие меню при клике на ссылку
    document.querySelectorAll(".nav__link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
        });
    });

    // Закрытие меню при клике вне бургер-меню
    document.addEventListener("click", (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
        }
    });

    // === Модальное окно для изображений ===
    document.querySelectorAll(".portfolio__image").forEach(img => {
        img.addEventListener("click", () => {
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.innerHTML = `
                <div class='modal-content'>
                    <img src='${img.src}' alt="Modal Image">
                    <span class='close'>&times;</span>
                </div>`;
            document.body.appendChild(modal);

            modal.querySelector(".close").addEventListener("click", () => modal.remove());
            modal.addEventListener("click", (e) => {
                if (e.target === modal) modal.remove();
            });
        });
    });

    // === Кнопка прокрутки вверх ===
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.innerText = "↑";
    scrollTopBtn.classList.add("scroll-top");
    document.body.appendChild(scrollTopBtn);

    window.addEventListener("scroll", () => {
        scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // === Логика показа карточек "Наш ассортимент" ===
    const assortmentItems = document.querySelectorAll(".assortment__grid .card");
    const showMoreBtn = document.querySelector(".button-container .show-more");
    const hideItemsBtn = document.querySelector(".button-container .hide-items");
    let itemsToShow = 3;

    function updateVisibility() {
        assortmentItems.forEach((item, index) => {
            item.style.display = index < itemsToShow ? "block" : "none";
            if (index < itemsToShow) {
                item.style.opacity = "0";
                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "translateY(0)";
                }, 200 * index);
            }
        });

        showMoreBtn.style.display = itemsToShow >= assortmentItems.length ? "none" : "block";
        hideItemsBtn.style.display = itemsToShow >= assortmentItems.length ? "block" : "none";
    }

    updateVisibility();

    showMoreBtn.addEventListener("click", () => {
        itemsToShow += 3;
        updateVisibility();
    });

    hideItemsBtn.addEventListener("click", () => {
        itemsToShow = 3;
        updateVisibility();
    });
});
