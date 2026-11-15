/* ============================================================
   Copy dictionary (EN / ID)
   English is the source of truth; Indonesian mirrors it.
   Proper nouns, tool names and codes stay in English by design.
   ============================================================ */

(function () {
  "use strict";

  var STRINGS = {
    en: {
      "form.deliveryNote": "Your message will be sent directly from this form.",
      "form.send": "SEND MESSAGE",
      "contact.email.note":
        "Email opens in your email app. You can also reach me on LinkedIn.",
      "contact.title2": "TOGETHER.",
      "contact.title1": "LET’S WORK",
      "tools.note":
        "Tools used across work, projects, and QA training. My project experience above shows where I applied them.",
      "approach.4.body":
        "Document the steps, expected behavior, and actual result so the team can investigate.",
      "approach.4.title": "Communicate the findings",
      "approach.3.body":
        "Check workflows manually and use automation for tasks suited to repeatable checks.",
      "approach.3.title": "Run the tests",
      "approach.2.body":
        "Create or review test cases for the assigned features and relevant data conditions.",
      "approach.2.title": "Prepare the checks",
      "approach.1.body":
        "Read the requirements and clarify the expected behavior with the team.",
      "approach.1.title": "Understand the feature",
      "approach.note":
        "Manual testing and automation both have a place. The approach depends on the feature and the task.",
      "approach.body":
        "My work starts with understanding how a feature should behave. I test the assigned flows, document issues clearly, and discuss findings with the team.",
      "approach.line2": "CHECK THE DETAILS.",
      "approach.line1": "FOLLOW THE FLOW.",
      "approach.kicker": "02 / HOW I WORK",
      "work.note":
        "Product screenshots show the applications I worked on. The descriptions explain my testing responsibilities.",
      "work.functional": "FUNCTIONAL TESTING",
      "work.manual": "MANUAL TESTING",
      "work.3.contribution":
        "Designed test cases, performed functional testing, and documented bugs in admission and counseling flows.",
      "work.3.scope": "SPMB admissions and counseling features.",
      "work.2.contribution":
        "Performed manual testing of data validation and HR workflows, and identified issues in the tested modules.",
      "work.2.scope": "Employee data, attendance, and leave management.",
      "work.1.contribution":
        "Created Cypress automation to check playback and licensing workflows, working with developers, designers, and product managers.",
      "work.1.scope": "Music playback and licensing modules.",
      "work.contribution": "MY CONTRIBUTION",
      "work.scope": "TESTING SCOPE",
      "work.intro":
        "Three products, different workflows. Here’s where I contributed and what I tested.",
      "hero.availability": "OPEN TO QA OPPORTUNITIES",
      skip: "Skip to content",
      "palette.home": "HOME",
      "nav.work": "PROJECTS",
      "nav.evidence": "APPROACH",
      "nav.experience": "EXPERIENCE",
      "nav.contact": "CONTACT",
      "nav.cta": "CONTACT ↗",

      "hero.kicker": "QUALITY ASSURANCE / INDONESIA",
      "hero.role": "QA ENGINEER · MANUAL & AUTOMATION",
      "hero.pitch":
        "I’m Aldan. I test web, mobile, and API workflows through manual testing and automation, and help teams understand what needs fixing.",
      "hero.primary": "VIEW QA PROJECTS",
      "hero.secondary": "DOWNLOAD CV",
      "hero.label.top": "MANUAL + AUTOMATION / JAKARTA",

      "work.kicker": "01 / SELECTED PROJECTS",
      "work.title": "PRODUCTS I’VE TESTED.",
      "work.meta": "WEB + MOBILE / MANUAL + AUTOMATION",
      "work.1.lot": "01 / MUSIC & LICENSING",
      "work.1.body":
        "A licensed background music platform for business environments.",
      "work.2.lot": "02 / HUMAN RESOURCES",
      "work.2.body":
        "An HR platform for managing employee data and everyday HR workflows.",
      "work.3.lot": "03 / SCHOOL MANAGEMENT",
      "work.3.body":
        "A school platform combining learning and administration features.",
      "work.result": "RESULT",
      "work.visit": "VIEW PRODUCT WEBSITE",
      "work.stat.1": "YEARS IN QA",
      "work.stat.2": "PRODUCTS TESTED",
      "work.stat.3": "CERTIFICATIONS",
      "work.stat.4": "AWARD",

      "record.kicker": "03 / EXPERIENCE",
      "record.title": "WHERE I’VE WORKED.",
      "record.meta": "2023–2026 / QUALITY ASSURANCE",
      "record.1.body":
        "Perform manual and automated testing using Cypress to validate critical business flows. Collaborate with PM, BA, SA, UI/UX and Developers. Improve QA processes, documentation and cross-team communication.",
      "record.1.role": "QA ENGINEER",
      "record.2.body":
        "Testing web and mobile devices for configuration and work efficiency. Provide feedback to development teams on technical and operational issues. Work with PM and dev teams to test and optimize mobile products.",
      "record.2.role": "QA ENGINEER",
      "record.3.body":
        "Create automation testing scripts in Cypress. Create and review test cases for both manual and automated testing.",
      "record.3.role": "QA ENGINEER INTERN",

      "training.kicker": "04 / EDUCATION",
      "training.title": "THE FOUNDATION.",
      "training.meta": "INFORMATICS + QUALITY ENGINEERING",
      "training.1.degree": "ASSOCIATE'S DEGREE · INFORMATICS",
      "training.1.note": "GPA 3.77 / 4.00",
      "training.2.degree": "IMMERSIVE PROGRAM · QUALITY ENGINEERING",
      "training.2.note": "SOFTWARE TESTING TRACK",
      "training.3.degree": "BACHELOR'S · INFORMATICS ENGINEERING",
      "training.3.note": "DEGREE TRANSFER D3 → S1",

      "credentials.kicker": "05 / CERTIFICATES & AWARD",
      "credentials.title": "ON PAPER",
      "credentials.meta": "2 CERTIFICATIONS / 1 AWARD",

      "tools.kicker": "06 / TOOLKIT",
      "tools.title": "TOOLS I WORK WITH.",
      "tools.meta": "TESTING / AUTOMATION / COLLABORATION",
      "tools.1": "End-to-end tests for web user flows.",
      "tools.2": "Browser automation across web apps.",
      "tools.3": "REST API checks and assertions.",
      "tools.4": "Readable scenarios in Given/When/Then.",
      "tools.5": "Test reports with traceable evidence.",
      "tools.6": "Load tests for response and scale.",
      "tools.7": "Explore APIs and validate responses.",
      "tools.8": "Track bugs, tasks and release work.",
      "tools.9": "Version changes and collaborate.",
      "tools.10": "Inspect UI specs and design flows.",
      "tools.11": "Build maintainable test automation.",
      "tools.12": "Script web tests and custom checks.",

      "contact.kicker": "07 / NEXT CONVERSATION",
      "contact.body":
        "Looking for a QA Engineer for your team? I’m open to discussing opportunities in manual testing and test automation.",
      "contact.primary": "EMAIL ME",
      "contact.secondary": "DOWNLOAD CV",
      "contact.email.label": "START A CONVERSATION",
      "contact.email.cta": "Draft an introduction",
      "contact.elsewhere": "ELSEWHERE",
      "contact.social.form": "DRAFT AN EMAIL ↗",
      "contact.privacy": "MANUAL + AUTOMATION / QA ENGINEER",
      "contact.foot": "JAKARTA, ID · AVAILABLE FOR WORK · 2026",
      "contact.top": "BACK TO TOP",

      "form.kicker": "CONTACT / ALDAN MAULANA FAJRI",
      "form.title": "LET’S CONNECT.",
      "form.name": "NAME",
      "form.email": "EMAIL",
      "form.message": "MESSAGE",
      "form.note":
        "This prepares a draft in your email app. Review it there and send when you’re ready.",
      "form.submit": "OPEN EMAIL APP",
      "form.cancel": "CANCEL",
      "form.required": "THIS FIELD IS REQUIRED.",
      "form.email.invalid": "ENTER A VALID EMAIL ADDRESS.",
      "form.sending": "SENDING…",
      "form.error": "CHECK INPUTS — MESSAGE NOT SENT.",
      "form.mailto":
        "CONTINUE IN YOUR EMAIL APP. THIS WEBSITE HAS NOT SENT YOUR MESSAGE.",
      "form.copied": "COPIED",
      "form.closed": "FORM CLOSED. NOTHING WAS SENT.",

      "ticker.pause": "PAUSE",
      "ticker.resume": "RESUME",
      "palette.placeholder": "Jump to section or link",
      "palette.empty": "No matches.",
      "palette.cv": "DOWNLOAD CV",
      "palette.contact": "DRAFT AN EMAIL",
      "palette.theme": "TOGGLE THEME",
      "theme.toLight": "Switch to light theme",
      "theme.toDark": "Switch to dark theme",
      "lang.toId": "Switch language to Indonesian",
      "lang.toEn": "Switch language to English",

      "a11y.primaryNav": "Primary",
      "a11y.paletteOpen": "Open command palette",
      "a11y.paletteSearch": "Search commands",
      "a11y.paletteList": "Commands",
      "a11y.contactClose": "Close contact form",
      "a11y.backTop": "Back to top",
      "a11y.inspectionLabel": "Inspection label",
      "a11y.tags": "Tags",
      "form.delivered": "MESSAGE LOGGED - DELIVERY CONFIRMED.",
      "form.noEndpoint": "Please contact me through LinkedIn instead.",
    },

    id: {
      "form.deliveryNote": "Pesan Anda akan dikirim langsung melalui form ini.",
      "form.send": "KIRIM PESAN",
      "contact.email.note":
        "Email akan dibuka di aplikasi email Anda. Anda juga bisa menghubungi saya lewat LinkedIn.",
      "contact.title2": "BERSAMA.",
      "contact.title1": "MARI BEKERJA",
      "tools.note":
        "Tools yang digunakan dalam pekerjaan, proyek, dan pelatihan QA. Pengalaman proyek di atas menjelaskan penerapannya.",
      "approach.4.body":
        "Catat langkah, hasil yang diharapkan, dan hasil aktual agar tim dapat menelusuri masalah.",
      "approach.4.title": "Sampaikan temuannya",
      "approach.3.body":
        "Periksa alur secara manual dan gunakan otomasi untuk tugas yang cocok diuji berulang.",
      "approach.3.title": "Jalankan pengujian",
      "approach.2.body":
        "Susun atau tinjau test case untuk fitur yang ditugaskan dan kondisi data yang relevan.",
      "approach.2.title": "Siapkan pengujiannya",
      "approach.1.body":
        "Baca requirement dan klarifikasi perilaku yang diharapkan bersama tim.",
      "approach.1.title": "Pahami fiturnya",
      "approach.note":
        "Pengujian manual dan otomasi saling melengkapi. Pendekatannya disesuaikan dengan fitur dan tugas yang dikerjakan.",
      "approach.body":
        "Saya mulai dengan memahami perilaku fitur yang diharapkan. Saya menguji alur yang ditugaskan, mencatat masalah dengan jelas, dan mendiskusikan temuan bersama tim.",
      "approach.line2": "PERIKSA DETAILNYA.",
      "approach.line1": "PAHAMI ALURNYA.",
      "approach.kicker": "02 / CARA SAYA BEKERJA",
      "work.note":
        "Screenshot menampilkan aplikasi yang pernah saya uji. Deskripsi menjelaskan tanggung jawab testing saya.",
      "work.functional": "PENGUJIAN FUNGSIONAL",
      "work.manual": "PENGUJIAN MANUAL",
      "work.3.contribution":
        "Menyusun test case, menjalankan pengujian fungsional, dan mendokumentasikan bug pada alur penerimaan siswa dan konseling.",
      "work.3.scope": "Fitur penerimaan siswa baru (SPMB) dan konseling.",
      "work.2.contribution":
        "Melakukan pengujian manual pada validasi data dan alur HR, serta menemukan masalah pada modul yang diuji.",
      "work.2.scope": "Data karyawan, absensi, dan pengajuan cuti.",
      "work.1.contribution":
        "Membuat otomasi Cypress untuk memeriksa alur playback dan lisensi, bersama developer, desainer, dan product manager.",
      "work.1.scope": "Pemutaran musik dan modul lisensi.",
      "work.contribution": "KONTRIBUSI SAYA",
      "work.scope": "CAKUPAN UJI",
      "work.intro":
        "Tiga produk dengan alur yang berbeda. Berikut bagian yang saya uji dan kontribusi saya.",
      "hero.availability": "TERBUKA UNTUK PELUANG QA",
      skip: "Langsung ke konten",
      "palette.home": "BERANDA",
      "nav.work": "PROYEK",
      "nav.evidence": "CARA KERJA",
      "nav.experience": "PENGALAMAN",
      "nav.contact": "KONTAK",
      "nav.cta": "KONTAK ↗",

      "hero.kicker": "QUALITY ASSURANCE / INDONESIA",
      "hero.role": "QA ENGINEER · MANUAL & OTOMASI",
      "hero.pitch":
        "Saya Aldan. Saya menguji alur web, mobile, dan API secara manual maupun dengan otomasi, serta membantu tim memahami masalah yang perlu diperbaiki.",
      "hero.primary": "LIHAT PROYEK QA",
      "hero.secondary": "UNDUH CV",
      "hero.label.top": "MANUAL + OTOMASI / JAKARTA",

      "work.kicker": "01 / PROYEK PILIHAN",
      "work.title": "PRODUK YANG SAYA UJI.",
      "work.meta": "WEB + MOBILE / MANUAL + OTOMASI",
      "work.1.lot": "01 / MUSIK & LISENSI",
      "work.1.body": "Platform musik latar berlisensi untuk kebutuhan bisnis.",
      "work.2.lot": "02 / SUMBER DAYA MANUSIA",
      "work.2.body":
        "Platform HR untuk mengelola data karyawan dan alur kerja HR sehari-hari.",
      "work.3.lot": "03 / MANAJEMEN SEKOLAH",
      "work.3.body":
        "Platform sekolah yang menggabungkan fitur pembelajaran dan administrasi.",
      "work.result": "HASIL",
      "work.visit": "LIHAT WEBSITE PRODUK",
      "work.stat.1": "TAHUN DI QA",
      "work.stat.2": "PRODUK YANG DIUJI",
      "work.stat.3": "SERTIFIKASI",
      "work.stat.4": "PENGHARGAAN",

      "record.kicker": "03 / PENGALAMAN",
      "record.title": "PENGALAMAN KERJA.",
      "record.meta": "2023–2026 / QUALITY ASSURANCE",
      "record.1.body":
        "Menjalankan pengujian manual dan otomasi dengan Cypress untuk memvalidasi alur bisnis kritis. Berkolaborasi dengan PM, BA, SA, UI/UX, dan Developer. Meningkatkan proses QA, dokumentasi, dan komunikasi lintas tim.",
      "record.1.role": "QA ENGINEER",
      "record.2.body":
        "Menguji perangkat web dan mobile untuk konfigurasi serta efisiensi kerja. Memberi masukan teknis dan operasional ke tim development. Bekerja dengan PM dan tim dev untuk menguji serta mengoptimalkan produk mobile.",
      "record.2.role": "QA ENGINEER",
      "record.3.body":
        "Membuat skrip otomasi pengujian dengan Cypress. Menyusun dan meninjau test case untuk pengujian manual maupun otomasi.",
      "record.3.role": "MAGANG QA ENGINEER",

      "training.kicker": "04 / PENDIDIKAN",
      "training.title": "PENDIDIKAN.",
      "training.meta": "INFORMATIKA + QUALITY ENGINEERING",
      "training.1.degree": "D3 · INFORMATIKA",
      "training.1.note": "IPK 3.77 / 4.00",
      "training.2.degree": "PROGRAM INTENSIF · QUALITY ENGINEERING",
      "training.2.note": "JALUR SOFTWARE TESTING",
      "training.3.degree": "S1 · TEKNIK INFORMATIKA",
      "training.3.note": "TRANSFER D3 → S1",

      "credentials.kicker": "05 / SERTIFIKAT & PENGHARGAAN",
      "credentials.title": "DI ATAS KERTAS",
      "credentials.meta": "2 SERTIFIKASI / 1 PENGHARGAAN",

      "tools.kicker": "06 / PERANGKAT KERJA",
      "tools.title": "TOOLS YANG SAYA GUNAKAN.",
      "tools.meta": "TESTING / OTOMASI / KOLABORASI",
      "tools.1": "Pengujian end-to-end untuk alur pengguna web.",
      "tools.2": "Otomasi browser lintas aplikasi web.",
      "tools.3": "Pemeriksaan dan assertion REST API.",
      "tools.4": "Skenario terbaca dalam Given/When/Then.",
      "tools.5": "Laporan uji dengan bukti yang bisa dilacak.",
      "tools.6": "Uji beban untuk respons dan skala.",
      "tools.7": "Eksplorasi API dan validasi respons.",
      "tools.8": "Lacak bug, tugas, dan pekerjaan rilis.",
      "tools.9": "Kelola versi dan kolaborasi.",
      "tools.10": "Tinjau spesifikasi UI dan alur desain.",
      "tools.11": "Bangun otomasi uji yang mudah dirawat.",
      "tools.12": "Tulis skrip uji web dan pemeriksaan khusus.",

      "contact.kicker": "07 / MARI TERHUBUNG",
      "contact.body":
        "Sedang mencari QA Engineer untuk tim Anda? Saya terbuka untuk berdiskusi tentang peluang di bidang pengujian manual dan otomasi.",
      "contact.primary": "KIRIM EMAIL",
      "contact.secondary": "UNDUH CV",
      "contact.email.label": "MULAI PERCAKAPAN",
      "contact.email.cta": "Siapkan pesan perkenalan",
      "contact.elsewhere": "LAINNYA",
      "contact.social.form": "SIAPKAN EMAIL ↗",
      "contact.privacy": "MANUAL + OTOMASI / QA ENGINEER",
      "contact.foot": "JAKARTA, ID · TERBUKA UNTUK KERJA · 2026",
      "contact.top": "KEMBALI KE ATAS",

      "form.kicker": "KONTAK / ALDAN MAULANA FAJRI",
      "form.title": "MARI TERHUBUNG.",
      "form.name": "NAMA",
      "form.email": "EMAIL",
      "form.message": "PESAN",
      "form.note":
        "Form ini menyiapkan draf di aplikasi email Anda. Periksa pesannya di sana, lalu kirim saat siap.",
      "form.submit": "BUKA APLIKASI EMAIL",
      "form.cancel": "BATAL",
      "form.required": "BAGIAN INI WAJIB DIISI.",
      "form.email.invalid": "MASUKKAN ALAMAT EMAIL YANG VALID.",
      "form.sending": "MENGIRIM…",
      "form.error": "PERIKSA ISIAN — PESAN BELUM TERKIRIM.",
      "form.mailto":
        "LANJUTKAN DI APLIKASI EMAIL. WEBSITE INI BELUM MENGIRIM PESANMU.",
      "form.copied": "TERSALIN",
      "form.closed": "FORM DITUTUP. TIDAK ADA YANG TERKIRIM.",

      "ticker.pause": "JEDA",
      "ticker.resume": "LANJUT",
      "palette.placeholder": "Lompat ke bagian atau tautan",
      "palette.empty": "Tidak ada hasil.",
      "palette.cv": "UNDUH CV",
      "palette.contact": "SIAPKAN EMAIL",
      "palette.theme": "GANTI TEMA",
      "theme.toLight": "Ganti ke tema terang",
      "theme.toDark": "Ganti ke tema gelap",
      "lang.toId": "Ganti bahasa ke Indonesia",
      "lang.toEn": "Ganti bahasa ke Inggris",

      "a11y.primaryNav": "Navigasi utama",
      "a11y.paletteOpen": "Buka palet perintah",
      "a11y.paletteSearch": "Cari perintah",
      "a11y.paletteList": "Perintah",
      "a11y.contactClose": "Tutup formulir kontak",
      "a11y.backTop": "Kembali ke atas",
      "a11y.inspectionLabel": "Label inspeksi",
      "a11y.tags": "Tag",
      "form.delivered": "PESAN TERCATAT - PENGIRIMAN TERKONFIRMASI.",
      "form.noEndpoint": "Silakan hubungi saya melalui LinkedIn.",
    },
  };

  var current = "en";

  function t(key) {
    var table = STRINGS[current] || STRINGS.en;
    return table[key] !== undefined ? table[key] : STRINGS.en[key] || key;
  }

  function apply(lang) {
    current = lang === "id" ? "id" : "en";
    document.documentElement.setAttribute("lang", current);
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      var value = t(key);
      if (value !== undefined) {
        node.textContent = value;
      }
    });
    document
      .querySelectorAll("[data-i18n-aria-label]")
      .forEach(function (node) {
        var value = t(node.getAttribute("data-i18n-aria-label"));
        if (value !== undefined) {
          node.setAttribute("aria-label", value);
        }
      });
    document
      .querySelectorAll("[data-i18n-placeholder]")
      .forEach(function (node) {
        var value = t(node.getAttribute("data-i18n-placeholder"));
        if (value !== undefined) {
          node.setAttribute("placeholder", value);
        }
      });
  }

  window.AMF_I18N = {
    t: t,
    apply: apply,
    get lang() {
      return current;
    },
  };
})();
