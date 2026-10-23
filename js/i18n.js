/* ============================================================
   Copy dictionary (EN / ID)
   English is the source of truth; Indonesian mirrors it.
   Proper nouns, tool names and codes stay in English by design.
   ============================================================ */

(function () {
  "use strict";

  var STRINGS = {
    en: {
      "skip": "Skip to content",
      "palette.home": "HOME",
      "nav.work": "WORK",
      "nav.evidence": "EVIDENCE",
      "nav.experience": "EXPERIENCE",
      "nav.contact": "CONTACT",
      "nav.cta": "CONTACT ↗",

      "hero.kicker": "INSPECTION REPORT NO. 004 / DEPT 04 / 2026",
      "hero.role": "QA ENGINEER · MANUAL & AUTOMATION",
      "hero.pitch":
        "Manual and automation testing for web, mobile and API. Test cases, traces, and reports your team can act on.",
      "hero.primary": "VIEW QA PROJECTS",
      "hero.secondary": "DOWNLOAD CV",
      "hero.label.top": "QUALITY CONTROL / JAKARTA · REV. C",

      "work.kicker": "01 / INSPECTION BAY",
      "work.title": "THE WORK",
      "work.meta": "3 LOTS / 2023—2026 / ALL CLEARED",
      "work.1.lot": "LOT-001 / FEATURED / VELODIVA.COM",
      "work.1.body":
        "Licensed background music for business. Playback and licensing flows automated in Cypress, from queue to entitlement.",
      "work.2.lot": "LOT-002 / PORTALKERJA.CO.ID",
      "work.2.body": "Employee, attendance and leave modules audited for validation gaps.",
      "work.3.lot": "LOT-003 / PORTALSEKOLAH.COM",
      "work.3.body": "SPMB admission and counseling flows tested end to end before launch.",
      "work.result": "RESULT",
      "work.visit": "VISIT PRODUCT",
      "work.stat.1": "YEARS IN QA",
      "work.stat.2": "PRODUCTS SHIPPED",
      "work.stat.3": "CERTIFICATIONS",
      "work.stat.4": "AWARD",

      "record.kicker": "02 / SERVICE RECORD",
      "record.title": "THE RECORD",
      "record.meta": "3 ENGAGEMENTS / QA ENGINEER / ALL VERIFIED",
      "record.1.body":
        "Perform manual and automated testing using Cypress to validate critical business flows. Collaborate with PM, BA, SA, UI/UX and Developers. Improve QA processes, documentation and cross-team communication.",
      "record.1.role": "QA ENGINEER",
      "record.2.body":
        "Testing web and mobile devices for configuration and work efficiency. Provide feedback to development teams on technical and operational issues. Work with PM and dev teams to test and optimize mobile products.",
      "record.2.role": "QA ENGINEER",
      "record.3.body":
        "Create automation testing scripts in Cypress. Create and review test cases for both manual and automated testing.",
      "record.3.role": "QA ENGINEER INTERN",

      "training.kicker": "03 / EDUCATION",
      "training.title": "TRAINING",
      "training.meta": "3 PROGRAMS / GPA 3.77 / VERIFIED",
      "training.1.degree": "ASSOCIATE'S DEGREE · INFORMATICS",
      "training.1.note": "GPA 3.77 / 4.00",
      "training.2.degree": "IMMERSIVE PROGRAM · QUALITY ENGINEERING",
      "training.2.note": "SOFTWARE TESTING TRACK",
      "training.3.degree": "BACHELOR'S · INFORMATICS ENGINEERING",
      "training.3.note": "DEGREE TRANSFER D3 → S1",

      "credentials.kicker": "04 / CREDENTIALS",
      "credentials.title": "ON PAPER",
      "credentials.meta": "2 CERTIFICATIONS / 1 AWARD",

      "tools.kicker": "05 / THE STACK",
      "tools.title": "TOOLS ON THE LINE",
      "tools.meta": "12 TOOLS / COMPLETE STACK",
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

      "papers.kicker": "06 / EVIDENCE STACK",
      "papers.title": "THE PAPER TRAIL.",
      "papers.meta": "TEST PLAN → EXECUTION → SIGN-OFF",
      "papers.1.title": "TEST PLAN",
      "papers.1.r1": "✓ SCOPE · playback, entitlement",
      "papers.1.r2": "✓ CASES · written before build",
      "papers.1.r3": "✓ DATA · seeded fixtures",
      "papers.1.r4": "✓ EXIT · criticals closed",
      "papers.1.link": "VIEW TEST PLAN",
      "papers.2.title": "EXECUTION REPORT",
      "papers.2.r1": "✓ RUNS · cypress suite",
      "papers.2.r2": "✓ APIS · rest-assured + serenity",
      "papers.2.r3": "✓ PERF · jmeter baseline",
      "papers.2.r4": "✓ TRACKED · jira board",
      "papers.2.link": "VIEW EXECUTION REPORT",
      "papers.3.title": "SIGN-OFF",
      "papers.3.r1": "✓ RELEASE · cleared for launch",
      "papers.3.r2": "✓ HANDOVER · report attached",
      "papers.3.r3": "✓ OWNER · aldan maulana fajri",
      "papers.3.r4": "✓ CONTACT · PRIVATE MESSAGE FORM",
      "papers.3.link": "VIEW SIGN-OFF",
      "papers.caption":
        "RELEASE EVIDENCE / Review the test scope, execution record, and sign-off separately.",

      "evidence.kicker": "07 / EVIDENCE",
      "evidence.caption": "EVERY CLAIM IN THIS PORTFOLIO HAS A TEST CASE BEHIND IT.",

      "process.kicker": "08 / PROCESS",
      "process.title": "THE PROCESS",
      "process.meta.stages": "4 STAGES",
      "process.meta.flow": "SPEC IN → EVIDENCE OUT",
      "process.lede":
        "EVERY STAGE ENDS IN A NAMED ARTIFACT. NOTHING MOVES ON A VERBAL YES.",
      "process.1.title": "SCOPE",
      "process.1.sub": "CONTRACT & RISK",
      "process.1.body":
        "Read the spec, list what must not break, and agree on what done actually means.",
      "process.1.out1": "RISK MAP",
      "process.1.out2": "ACCEPTANCE CRITERIA",
      "process.1.handoff": "HANDS OFF TO CASES",
      "process.2.title": "CASES",
      "process.2.sub": "WRITE BEFORE BUILD",
      "process.2.body":
        "Turn every risk into a case: one happy path, three ways it can fail.",
      "process.2.out1": "TEST PLAN",
      "process.2.out2": "SEEDED FIXTURES",
      "process.2.handoff": "HANDS OFF TO RUN",
      "process.3.title": "RUN",
      "process.3.sub": "PROVE IT TWICE",
      "process.3.body":
        "Cypress for regressions, JMeter for load, hands for what the scripts miss.",
      "process.3.out1": "EXECUTION LOG",
      "process.3.out2": "TRACE + SCREENSHOTS",
      "process.3.handoff": "HANDS OFF TO REPORT",
      "process.4.title": "REPORT",
      "process.4.sub": "EVIDENCE OUT",
      "process.4.body":
        "State what passed, what broke, and what ships anyway. Then sign it.",
      "process.4.out1": "SIGN-OFF SHEET",
      "process.4.out2": "DEFECT LIST",
      "process.4.handoff": "HANDS OFF TO SIGN-OFF",
      "process.band.label": "DELIVERABLE",
      "process.band.statement": "A SIGNED RELEASE, WITH THE RECEIPTS.",
      "process.band.meta": "PASS / FAIL PER CASE · TRACE PER RUN · DEFECT LIST ATTACHED",

      "contact.kicker": "09 / SIGN-OFF",
      "contact.body":
        "Tell me about your next release. I will send back the evidence — cases, traces, and a sign-off your team can trust.",
      "contact.primary": "LET'S TALK",
      "contact.secondary": "DOWNLOAD CV",
      "contact.email.label": "LET'S TALK QUALITY / PRIVATE INBOX",
      "contact.email.cta": "Send a private message",
      "contact.elsewhere": "ELSEWHERE",
      "contact.social.form": "CONTACT FORM ↗",
      "contact.privacy": "DIRECT DETAILS KEPT PRIVATE",
      "contact.foot": "JAKARTA, ID · AVAILABLE FOR WORK · 2026",
      "contact.top": "BACK TO TOP",

      "form.kicker": "PRIVATE INBOX / QC DEPT 04",
      "form.title": "LOG A REQUEST.",
      "form.name": "NAME",
      "form.email": "EMAIL",
      "form.message": "MESSAGE",
      "form.note": "DETAILS STAY PRIVATE. NO NEWSLETTER, NO RESALE.",
      "form.submit": "SEND PRIVATE MESSAGE",
      "form.cancel": "CANCEL",
      "form.required": "THIS FIELD IS REQUIRED.",
      "form.email.invalid": "ENTER A VALID EMAIL ADDRESS.",
      "form.sending": "SENDING…",
      "form.error": "CHECK INPUTS — MESSAGE NOT SENT.",
      "form.mailto": "CONTINUE IN YOUR EMAIL APP. THIS WEBSITE HAS NOT SENT YOUR MESSAGE.",
      "form.copied": "COPIED",
      "form.closed": "FORM CLOSED. NOTHING WAS SENT.",

      "ticker.pause": "PAUSE",
      "ticker.resume": "RESUME",
      "palette.placeholder": "Jump to section or link",
      "palette.empty": "No matches.",
      "palette.cv": "DOWNLOAD CV",
      "palette.contact": "OPEN CONTACT FORM",
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
      "form.noEndpoint": "DELIVERY NOT CONFIGURED - ADD AN ENDPOINT IN js/config.js"
    },

    id: {
      "skip": "Langsung ke konten",
      "palette.home": "BERANDA",
      "nav.work": "KARYA",
      "nav.evidence": "BUKTI",
      "nav.experience": "PENGALAMAN",
      "nav.contact": "KONTAK",
      "nav.cta": "KONTAK ↗",

      "hero.kicker": "LAPORAN INSPEKSI NO. 004 / DEPT 04 / 2026",
      "hero.role": "QA ENGINEER · MANUAL & OTOMASI",
      "hero.pitch":
        "Pengujian manual dan otomasi untuk web, mobile, dan API. Test case, trace, dan laporan yang bisa langsung dipakai tim Anda.",
      "hero.primary": "LIHAT PROYEK QA",
      "hero.secondary": "UNDUH CV",
      "hero.label.top": "QUALITY CONTROL / JAKARTA · REV. C",

      "work.kicker": "01 / BAY INSPEKSI",
      "work.title": "KARYA",
      "work.meta": "3 LOT / 2023—2026 / SEMUA LULUS",
      "work.1.lot": "LOT-001 / UNGGULAN / VELODIVA.COM",
      "work.1.body":
        "Musik latar berlisensi untuk bisnis. Alur playback dan lisensi diotomasi dengan Cypress, dari antrean sampai entitlement.",
      "work.2.lot": "LOT-002 / PORTALKERJA.CO.ID",
      "work.2.body": "Modul karyawan, absensi, dan cuti diaudit untuk menemukan celah validasi.",
      "work.3.lot": "LOT-003 / PORTALSEKOLAH.COM",
      "work.3.body": "Alur pendaftaran SPMB dan konseling diuji end to end sebelum rilis.",
      "work.result": "HASIL",
      "work.visit": "KUNJUNGI PRODUK",
      "work.stat.1": "TAHUN DI QA",
      "work.stat.2": "PRODUK DIRILIS",
      "work.stat.3": "SERTIFIKASI",
      "work.stat.4": "PENGHARGAAN",

      "record.kicker": "02 / REKAM JEJAK",
      "record.title": "REKAM JEJAK",
      "record.meta": "3 KETERLIBATAN / QA ENGINEER / SEMUA TERVERIFIKASI",
      "record.1.body":
        "Menjalankan pengujian manual dan otomasi dengan Cypress untuk memvalidasi alur bisnis kritis. Berkolaborasi dengan PM, BA, SA, UI/UX, dan Developer. Meningkatkan proses QA, dokumentasi, dan komunikasi lintas tim.",
      "record.1.role": "QA ENGINEER",
      "record.2.body":
        "Menguji perangkat web dan mobile untuk konfigurasi serta efisiensi kerja. Memberi masukan teknis dan operasional ke tim development. Bekerja dengan PM dan tim dev untuk menguji serta mengoptimalkan produk mobile.",
      "record.2.role": "QA ENGINEER",
      "record.3.body":
        "Membuat skrip otomasi pengujian dengan Cypress. Menyusun dan meninjau test case untuk pengujian manual maupun otomasi.",
      "record.3.role": "MAGANG QA ENGINEER",

      "training.kicker": "03 / PENDIDIKAN",
      "training.title": "PELATIHAN",
      "training.meta": "3 PROGRAM / IPK 3.77 / TERVERIFIKASI",
      "training.1.degree": "D3 · INFORMATIKA",
      "training.1.note": "IPK 3.77 / 4.00",
      "training.2.degree": "PROGRAM INTENSIF · QUALITY ENGINEERING",
      "training.2.note": "JALUR SOFTWARE TESTING",
      "training.3.degree": "S1 · TEKNIK INFORMATIKA",
      "training.3.note": "TRANSFER D3 → S1",

      "credentials.kicker": "04 / KREDENSIAL",
      "credentials.title": "DI ATAS KERTAS",
      "credentials.meta": "2 SERTIFIKASI / 1 PENGHARGAAN",

      "tools.kicker": "05 / STACK",
      "tools.title": "TOOLS DI GARIS DEPAN",
      "tools.meta": "12 TOOLS / STACK LENGKAP",
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

      "papers.kicker": "06 / TUMPUKAN BUKTI",
      "papers.title": "JEJAK DOKUMEN.",
      "papers.meta": "RENCANA UJI → EKSEKUSI → SIGN-OFF",
      "papers.1.title": "RENCANA UJI",
      "papers.1.r1": "✓ CAKUPAN · playback, entitlement",
      "papers.1.r2": "✓ KASUS · ditulis sebelum build",
      "papers.1.r3": "✓ DATA · fixture siap pakai",
      "papers.1.r4": "✓ EXIT · criticals tertutup",
      "papers.1.link": "LIHAT RENCANA UJI",
      "papers.2.title": "LAPORAN EKSEKUSI",
      "papers.2.r1": "✓ RUN · suite cypress",
      "papers.2.r2": "✓ API · rest-assured + serenity",
      "papers.2.r3": "✓ PERF · baseline jmeter",
      "papers.2.r4": "✓ TERLACAK · board jira",
      "papers.2.link": "LIHAT LAPORAN EKSEKUSI",
      "papers.3.title": "SIGN-OFF",
      "papers.3.r1": "✓ RILIS · siap diluncurkan",
      "papers.3.r2": "✓ SERAH TERIMA · laporan terlampir",
      "papers.3.r3": "✓ PEMILIK · aldan maulana fajri",
      "papers.3.r4": "✓ KONTAK · FORM PESAN PRIVAT",
      "papers.3.link": "LIHAT SIGN-OFF",
      "papers.caption":
        "BUKTI RILIS / Tinjau cakupan uji, catatan eksekusi, dan sign-off secara terpisah.",

      "evidence.kicker": "07 / BUKTI",
      "evidence.caption": "SETIAP KLAIM DI PORTOFOLIO INI PUNYA TEST CASE DI BELAKANGNYA.",

      "process.kicker": "08 / PROSES",
      "process.title": "PROSES",
      "process.meta.stages": "4 TAHAP",
      "process.meta.flow": "SPEC MASUK → BUKTI KELUAR",
      "process.lede":
        "SETIAP TAHAP BERAKHIR DENGAN ARTIFACT BERNAMA. TIDAK ADA YANG MAJU HANYA KARENA 'IYA' LISAN.",
      "process.1.title": "CAKUPAN",
      "process.1.sub": "KONTRAK & RISIKO",
      "process.1.body":
        "Baca spesifikasi, catat apa yang tidak boleh rusak, dan sepakati arti selesai.",
      "process.1.out1": "PETA RISIKO",
      "process.1.out2": "KRITERIA PENERIMAAN",
      "process.1.handoff": "SERAH KE KASUS",
      "process.2.title": "KASUS",
      "process.2.sub": "TULIS SEBELUM BUILD",
      "process.2.body":
        "Ubah setiap risiko jadi kasus: satu happy path, tiga cara gagal.",
      "process.2.out1": "RENCANA UJI",
      "process.2.out2": "FIXTURE SIAP PAKAI",
      "process.2.handoff": "SERAH KE RUN",
      "process.3.title": "RUN",
      "process.3.sub": "BUKTIKAN DUA KALI",
      "process.3.body":
        "Cypress untuk regresi, JMeter untuk beban, tangan untuk yang terlewat skrip.",
      "process.3.out1": "LOG EKSEKUSI",
      "process.3.out2": "TRACE + SCREENSHOT",
      "process.3.handoff": "SERAH KE LAPORAN",
      "process.4.title": "LAPORAN",
      "process.4.sub": "BUKTI KELUAR",
      "process.4.body":
        "Nyatakan apa yang lulus, apa yang rusak, dan apa yang tetap rilis. Lalu tanda tangani.",
      "process.4.out1": "LEMBAR SIGN-OFF",
      "process.4.out2": "DAFTAR DEFECT",
      "process.4.handoff": "SERAH KE SIGN-OFF",
      "process.band.label": "SERAHAN",
      "process.band.statement": "RILIS BERTANDA TANGAN, LENGKAP DENGAN BUKTINYA.",
      "process.band.meta": "PASS / FAIL PER KASUS · TRACE PER RUN · DAFTAR DEFECT TERLAMPIR",

      "contact.kicker": "09 / SIGN-OFF",
      "contact.body":
        "Ceritakan rilis berikutnya. Saya akan kirim balik buktinya — kasus uji, trace, dan sign-off yang bisa tim Anda percaya.",
      "contact.primary": "MARI BICARA",
      "contact.secondary": "UNDUH CV",
      "contact.email.label": "BICARA KUALITAS / INBOX PRIVAT",
      "contact.email.cta": "Kirim pesan privat",
      "contact.elsewhere": "LAINNYA",
      "contact.social.form": "FORM KONTAK ↗",
      "contact.privacy": "DETAIL LANGSUNG TETAP PRIVAT",
      "contact.foot": "JAKARTA, ID · TERBUKA UNTUK KERJA · 2026",
      "contact.top": "KEMBALI KE ATAS",

      "form.kicker": "INBOX PRIVAT / QC DEPT 04",
      "form.title": "CATAT PERMINTAAN.",
      "form.name": "NAMA",
      "form.email": "EMAIL",
      "form.message": "PESAN",
      "form.note": "DETAIL TETAP PRIVAT. TANPA NEWSLETTER, TANPA JUAL DATA.",
      "form.submit": "KIRIM PESAN PRIVAT",
      "form.cancel": "BATAL",
      "form.required": "BAGIAN INI WAJIB DIISI.",
      "form.email.invalid": "MASUKKAN ALAMAT EMAIL YANG VALID.",
      "form.sending": "MENGIRIM…",
      "form.error": "PERIKSA ISIAN — PESAN BELUM TERKIRIM.",
      "form.mailto": "LANJUTKAN DI APLIKASI EMAIL. WEBSITE INI BELUM MENGIRIM PESANMU.",
      "form.copied": "TERSALIN",
      "form.closed": "FORM DITUTUP. TIDAK ADA YANG TERKIRIM.",

      "ticker.pause": "JEDA",
      "ticker.resume": "LANJUT",
      "palette.placeholder": "Lompat ke bagian atau tautan",
      "palette.empty": "Tidak ada hasil.",
      "palette.cv": "UNDUH CV",
      "palette.contact": "BUKA FORM KONTAK",
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
      "form.noEndpoint": "PENGIRIMAN BELUM DIKONFIGURASI - ISI ENDPOINT DI js/config.js"
    }
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
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (node) {
      var value = t(node.getAttribute("data-i18n-aria-label"));
      if (value !== undefined) {
        node.setAttribute("aria-label", value);
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
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
    }
  };
})();
