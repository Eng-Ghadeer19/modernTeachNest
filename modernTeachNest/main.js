

// الخطوة الأهم: تفعيل ScrollTrigger داخل GSAP
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);

// تحديد جميع أزرار القوائم المنسدلة
const dropdownBtns = document.querySelectorAll('.dropdown-btn');
console.log(dropdownBtns);

dropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // إيقاف إغلاق الصفحة
        e.stopPropagation();


        // الوصول للقائمة الفرعية التابعة للزر الملموس
        const currentSubMenu = btn.nextElementSibling;

        // إغلاق أي قائمة فرعية أخرى مفتوحة
        document.querySelectorAll('.sub-menu').forEach(menu => {
            if (menu !== currentSubMenu) {
                menu.classList.remove('active');
            }
        });

        // تبديل حالة القائمة الحالية (فتح / إغلاق)
        currentSubMenu.classList.toggle('active');
    });
});

// إغلاق القوائم المنسدلة عند الضغط في أي مكان فارغ بالصفحة
document.addEventListener('click', () => {
    document.querySelectorAll('.sub-menu').forEach(menu => {
        menu.classList.remove('active');
    });
});



// ==========================================
// 1. تحريك ظهور الهيدر عند تحميل الصفحة (GSAP)
// ==========================================
gsap.from(".navbar", {
    duration: 1,
    y: -80,              // ينزل الهيدر من الأعلى
    opacity: 0,
    ease: "power3.out"
});


gsap.from("#Courses .card", {
    x: 80,
    stagger: 0.5,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#Courses",
        start: "top top",
        duration: 1.5
    }
});
gsap.from("#books .container .item", {
    x: 20,
    opacity: 0,
    stagger: {
        each: 0.5
    },
    ease: "power3.out",

    scrollTrigger: {
        trigger: ".item",
        start: "top top",
        fastEnd: true
    }
});
gsap.from("#projects-section .projects-grid", {
    x: 20,
    opacity: 0,
    stagger: {
        each: 0.5
    },
    ease: "power3.out",

    scrollTrigger: {
        trigger: ".projects-grid",
        start: "top top",
    }
});

// تحريك عناصر القائمة بالتدريج (Stagger)
gsap.from(".navbar ul li", {
    duration: 0.8,
    y: -20,
    opacity: 0,
    stagger: 0.1,        // يظهر كل عنصر بعد الثاني بـ 0.1 ثانية
    delay: 0.3,
    ease: "power2.out"
});

const tl = gsap.timeline();
tl.from(" .hero  h1", {
    scale: 2,
    opacity: 0,
    duration: 2,
    delay: 1.5
})
tl.from(' .hero p', {
    opacity: 0,
    duration: 1
})
tl.from(" .hero .btn", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "elastic"
})
tl.from(".instructor-card", {
    scrollTrigger: {
        y: 20,
        duration: 2
        // scrup: true
    }
})
// tl.from(" .hero .btn", {
//     y: 100,
//     opacity: 0,
//     duration: 1.5,
//     ease: "elastic"
// }, '<') // عشان تبدا مع الي قبلها

// tl.from(" .hero .btn", {
//     y: 100,
//     opacity: 0,
//     duration: 1.5,
//     ease: "elastic"
// } , 2 ) // تبدا مع الي قبلها والي قبلها
// GSDevTools.create()
// tl.from(" .hero .btn", {
//     y: 100,
//     opacity: 0,
//     duration: 1.5,
//     ease: "elastic",
//     onStart: () => { console.log("start") },// لما تبدا
//     onComplete: () => { console.log("Complete") }, // لما تخلص
//     onApdate: () => { console.log("Apdate")} // بتشتغل طول م الانيميشن شغال
// })
tl.from(".red", {
    opacity: 0,
    immediateRender: false,
    duration: 2,
    repeate: Infinity
})
tl.from(".yello", {
    opacity: 0,
    immediateRender: false,
    duration: 2,
    repeate: Infinity
})
tl.from(".blue", {
    opacity: 0,
    immediateRender: false,
    duration: 2,
    repeate: Infinity
})
tl.from(".red", {
    opacity: 0,
    immediateRender: false,
    duration: 2,
    repeate: Infinity
})

// ==========================================
// 2. التحكم بالقوائم المنسدلة (Dropdowns)
// ==========================================
// const dropdownBtns = document.querySelectorAll('.dropdown-btn');
dropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // إغلاق أي قائمة أخرى مفتوحة
        dropdownBtns.forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.classList.remove('active');
                const otherMenu = otherBtn.nextElementSibling;
                if (otherMenu) otherMenu.classList.remove('show');
            }
        });

        // فتح أو إغلاق القائمة الحالية
        btn.classList.toggle('active');
        const subMenu = btn.nextElementSibling;

        if (subMenu) {
            subMenu.classList.toggle('show');

            // تحريك احترافي لعناصر القائمة الفرعية باستخدام GSAP عند الفتح
            if (subMenu.classList.contains('show')) {
                gsap.fromTo(subMenu.querySelectorAll('li'),
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power1.out" }
                );
            }
        }
    });
});

// إغلاق القوائم عند الضغط في أي مكان خارج الهيدر
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.sub-menu').forEach(menu => menu.classList.remove('show'));
    }
});




// ==========================================
// 3. تفعيل الـ Dark Mode
// ==========================================
const darkModeBtn = document.querySelector('.dark');

darkModeBtn.addEventListener('click', () => {
    // تبديل الكلاس على الـ body
    document.body.classList.toggle('dark-theme');

    // تغيير نص وأيقونة الزر
    if (document.body.classList.contains('dark-theme')) {
        darkModeBtn.innerHTML = '☀️ Light Mode';
    } else {
        darkModeBtn.innerHTML = '🌙 Dark Mode';
    }
});

// Search Box


const Search = document.querySelector("#courseSearchBox");
const cards = document.querySelectorAll("#Courses .card");

Search.addEventListener("input", () => {
    const query = Search.value.trim().toLowerCase();

    cards.forEach(card => {
        const titelElement = card.querySelector(".titel");
        const titel = titelElement.textContent.trim().toLowerCase();

        if (titel.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

const searchOfBoks = document.querySelector("#bookSearchBox");
const books = document.querySelectorAll(".item");
searchOfBoks.addEventListener("input", () => {
    const valueOfBooks = searchOfBoks.value.trim().toLowerCase();
    books.forEach(book => {
        const titelElement = book.querySelector(".head");
        const titel = titelElement.textContent.trim().toLowerCase();
        if (titel.includes(valueOfBooks)) {
            book.style.display = "block";
        } else {
            book.style.display = "none";
        }
    });
})

// بحث المشاريع الجاهزة (Ready-to-Deploy Projects)
const searchOfProjects = document.querySelector("#projectSearchBox");
const projects = document.querySelectorAll(".project-card");
searchOfProjects.addEventListener("input", () => {
    const valueOfProjects = searchOfProjects.value.trim().toLowerCase();
    projects.forEach(project => {
        const titelElement = project.querySelector(".card-content h3");
        const titel = titelElement.textContent.trim().toLowerCase();
        if (titel.includes(valueOfProjects)) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
})

// بحث المدربين (Instructors)
const searchOfInstructors = document.querySelector("#instructorSearchBox");
const instructors = document.querySelectorAll(".instructor-card");
searchOfInstructors.addEventListener("input", () => {
    const valueOfInstructors = searchOfInstructors.value.trim().toLowerCase();
    instructors.forEach(instructor => {
        const titelElement = instructor.querySelector(".instructor-info h3");
        const titel = titelElement.textContent.trim().toLowerCase();
        if (titel.includes(valueOfInstructors)) {
            instructor.style.display = "block";
        } else {
            instructor.style.display = "none";
        }
    });
})


document.querySelectorAll('.btn-details, .details-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const parentCard = this.closest('.project-card');
        if (!parentCard) return;

        const detailCard = parentCard.querySelector('.detail-card');
        // حماية: إذا لم يجد detailCard لا ينفذ بقية الكود منعاً للخطأ
        if (!detailCard) return;

        // حالة العودة (زر Back)
        if (this.closest('.detail-card')) {
            detailCard.style.display = 'none';
            parentCard.querySelectorAll(':scope > *:not(.detail-card)').forEach(el => {
                el.style.display = '';
            });
            return;
        }

        // حالة إظهار التفاصيل (زر View Details)
        parentCard.querySelectorAll(':scope > *:not(.detail-card)').forEach(el => {
            el.style.display = 'none';
        });
        detailCard.style.display = 'block';
    });
});



    








// ===== Hamburger Menu Toggle =====
const hamburgerBtn = document.querySelector('#hamburgerBtn');
const navbarEl = document.querySelector('.navbar');

hamburgerBtn.addEventListener('click', () => {
    navbarEl.classList.toggle('nav-open');

    const icon = hamburgerBtn.querySelector('i');
    if (navbarEl.classList.contains('nav-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});