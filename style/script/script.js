// Unified Data for All Modals (Projects, Experience, Skills)
const modalData = {
    // ---- PROJECTS ----
    velodiva: {
        icon: 'fas fa-music',
        title: 'Velodiva Music Player',
        description: `
            <p>Velodiva is Indonesia's first officially licensed commercial music player platform providing professional background music solutions for business environments.</p>
            <p><strong>My Role:</strong> I managed the end-to-end quality assurance process by implementing automated testing using <strong>Cypress</strong> to validate critical playback flows and licensing modules.</p>
            <p><strong>Impact:</strong> Ensured the platform's stability and seamless integration of licensed content, maintaining the high standards required for commercial deployment.</p>
            <div class="modal-tags">
                <span>Cypress</span><span>Automated E2E</span><span>Commercial License</span>
            </div>
        `
    },
    hrms: {
        icon: 'fas fa-users-cog',
        title: 'Portal Kerja HRMS',
        description: `
            <p>Portal Kerja HRMS is a digital HR platform that provides an integrated solution for companies to manage human resources efficiently.</p>
            <p><strong>My Role:</strong> As a Manual QA, I rigorously tested the integrity of key modules like employee data, attendance, and leave management.</p>
            <p><strong>Impact:</strong> My focused testing on data validation led to the identification of critical issues, directly enhancing the security of sensitive employee data.</p>
            <div class="modal-tags">
                <span>Manual QA</span><span>Data Validation</span><span>HR Workflows</span>
            </div>
        `
    },
    sekolah: {
        icon: 'fas fa-graduation-cap',
        title: 'Portal Sekolah',
        description: `
            <p>Portal Sekolah is an integrated digital platform combining a Learning Management System (LMS) and School Administration System (SMS).</p>
            <p><strong>My Role:</strong> Systematically designed test cases, executed functional tests, and meticulously documented bugs for the New Student Admission (SPMB) and Counseling features.</p>
            <p><strong>Impact:</strong> Successfully identified critical issues, instrumental in ensuring the stability and smooth launch of these key features.</p>
            <div class="modal-tags">
                <span>Test Cases</span><span>Bug Documentation</span><span>LMS/SMS</span>
            </div>
        `
    },

    // ---- EXPERIENCE ----
    vnt: {
        icon: 'fas fa-building',
        title: 'QA Engineer @ VNT Network',
        description: `
            <p><strong>Dec 2025 - Feb 2026 | Jakarta, Indonesia</strong></p>
            <ul>
                <li>Perform manual and automated testing using Cypress to validate critical business flows.</li>
                <li>Collaborate closely with PM, BA, SA, UI/UX Designers, and Developers to deliver high-quality features.</li>
                <li>Contribute to improving QA processes, documentation, and cross-team communication to enhance product quality.</li>
            </ul>
        `
    },
    visi: {
        icon: 'fas fa-mobile-alt',
        title: 'QA Engineer @ Visi Prima Nusantara',
        description: `
            <p><strong>Apr 2024 - Sep 2025 | Jakarta, Indonesia</strong></p>
            <ul>
                <li>Testing web & mobile devices to ensure their configuration work efficiency.</li>
                <li>Providing feedback to development teams on technical, troubleshooting, or operational issues.</li>
                <li>Working with product managers, and development teams to test and optimize mobile products.</li>
            </ul>
        `
    },
    sekawan: {
        icon: 'fas fa-laptop-code',
        title: 'QA Intern @ Sekawan Media',
        description: `
            <p><strong>Oct 2023 - Jan 2024</strong></p>
            <ul>
                <li>Created Script for Automation Testing in Cypress.</li>
                <li>Created and Reviewed Test Cases for Manual and Automation Testing.</li>
                <li>Collaborated closely with the Project Administrator to ensure project workflows met quality standards.</li>
            </ul>
        `
    },

    // ---- SKILLS ----
    cypress: {
        icon: 'fas fa-robot',
        title: 'Cypress Automation',
        description: `
            <p>Extensively used Cypress for creating reliable end-to-end (E2E) automated testing scripts for modern web applications. My focus is on validating critical business flows and ensuring smooth deployments.</p>
            <div class="modal-tags"><span>Automation</span><span>E2E Testing</span><span>JavaScript</span></div>
        `
    },
    selenium: {
        icon: 'fas fa-code',
        title: 'Selenium WebDriver',
        description: `
            <p>Proficient in utilizing Selenium for web automation testing, integrated with Java, to handle complex cross-browser testing scenarios and UI validations.</p>
            <div class="modal-tags"><span>Java</span><span>UI Validation</span><span>Cross-browser</span></div>
        `
    },
    restassured: {
        icon: 'fas fa-network-wired',
        title: 'REST-Assured (API)',
        description: `
            <p>Experienced in API testing and validation using REST-Assured. Ensuring backend services, endpoints, and data payloads function securely and accurately before frontend integration.</p>
            <div class="modal-tags"><span>API Testing</span><span>Backend</span><span>Data Payload</span></div>
        `
    },
    bdd: {
        icon: 'fas fa-comments',
        title: 'Cucumber & Serenity BDD',
        description: `
            <p>Highly skilled in implementing Behavior-Driven Development (BDD) concepts. I write tests in Gherkin syntax to ensure seamless alignment with business requirements and generate comprehensive test reporting.</p>
            <div class="modal-tags"><span>BDD</span><span>Gherkin</span><span>Test Reporting</span></div>
        `
    },
    java_js: {
        icon: 'fab fa-java',
        title: 'Java & JavaScript',
        description: `
            <p>Core programming languages utilized to build, maintain, and troubleshoot automation frameworks. Capable of diving into source code to identify root causes of regressions.</p>
        `
    },
    php: {
        icon: 'fab fa-php',
        title: 'PHP',
        description: `
            <p>Understanding of PHP architectures which aids in validating APIs and backend structures for systems built on PHP frameworks like CodeIgniter.</p>
        `
    },
    jira: {
        icon: 'fab fa-jira',
        title: 'JIRA & Postman',
        description: `
            <p>Expert in test management, bug tracking, and Agile methodology using JIRA. Proficient with Postman for manual API testing and endpoint exploration.</p>
            <div class="modal-tags"><span>Agile/Scrum</span><span>Bug Tracking</span><span>API Exploration</span></div>
        `
    }
};

// Modal Logic
const modal = document.getElementById('projectModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function openModal(id) {
    const data = modalData[id];
    if (!data) return; // safety check
    
    modalIcon.className = data.icon;
    modalTitle.innerText = data.title;
    modalBody.innerHTML = data.description;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside the content box
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Intersection Observer for Bento Cards fading in
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px"
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
});