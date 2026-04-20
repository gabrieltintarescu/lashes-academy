export interface Lesson {
    id: string;
    number: number | null;
    title: string;
    videoFile: string;
    pdfFile: string | null;
    section: "intro" | "theory" | "practice" | "outro";
}

const suffix = " – Lashes Design Academy";

// Map of lesson numbers to their PDF filenames (when different from video filenames)
const pdfOverrides: Record<number, string> = {
    6: `L6 – Distanța față de pleoapă, baza lipită${suffix}.pdf`,
    13: `L13 – Lipiturile, o greșeală frecventă${suffix}.pdf`,
    17: `L17 – Igienă, sterilizare și dezinfectare${suffix}.pdf`,
};

const videoNames: Record<number, string> = {
    1: "Reguli de îngrijire",
    2: "Când nu se aplică extensii de gene",
    3: "Faza de creștere",
    4: "Grosimea genelor",
    5: "Aplicarea pe straturi",
    6: "Distanța față de pleoapă baza lipită",
    7: "Direcția de aplicare",
    8: "Reguli de aplicare relative",
    9: "Structura genelor naturale",
    10: "Riscurile extensiilor de gene",
    11: "Cum se lucrează cu adezivul",
    12: "Întreținerea și înlăturarea extensiilor de gene",
    13: "Lipiturile o greșeală frecventă",
    14: "Clasificarea ochilor",
    15: "Scheme și efecte",
    16: "Produse necesare",
    17: "Igienă sterilizare și dezinfectare",
    18: "Cum se stabilesc prețurile",
    19: "PH-ul genelor naturale",
    20: "Pregătirea tehnicianului și a clientei",
    21: "Curățarea ochilor – partea I",
    22: "Curățarea ochilor – partea II",
    23: "Procesul de întreținere",
    24: "Înlăturarea extensiilor de gene",
    25: "Curățarea ochilor – partea III",
    26: "Analiza clientei",
    27: "Poziționarea eyepatch-urilor. Separarea genelor de jos.",
    28: "Notarea schemei pe eyepatch. Lucru colț interior.",
    29: "Reguli de aplicare – Partea I",
    30: "Reguli de aplicare – Partea II",
    31: "Greșeli frecvente",
    32: "Cum se manevrează corect penseta și extensia falsă",
    33: "Aplicarea genelor pe clientă",
    34: "Pași de exersare pe suportul de plastic și înlăturarea extensiilor de gene",
};

// Lessons with PDFs (by lesson number)
const lessonsWithPdf = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);

function getSection(num: number): "theory" | "practice" {
    return num <= 17 ? "theory" : "practice";
}

function buildLessons(): Lesson[] {
    const lessons: Lesson[] = [];

    // Intro
    lessons.push({
        id: "introducere",
        number: null,
        title: "Introducere",
        videoFile: `Introducere${suffix}.mp4`,
        pdfFile: null,
        section: "intro",
    });

    // Numbered lessons
    for (let i = 1; i <= 34; i++) {
        const name = videoNames[i];
        const videoFile = `L${i} – ${name}${suffix}.mp4`;
        let pdfFile: string | null = null;
        if (lessonsWithPdf.has(i)) {
            pdfFile = pdfOverrides[i] ?? `L${i} – ${name}${suffix}.pdf`;
        }
        lessons.push({
            id: `l${i}`,
            number: i,
            title: name,
            videoFile,
            pdfFile,
            section: getSection(i),
        });
    }

    // Outro
    lessons.push({
        id: "nota-de-final",
        number: null,
        title: "Notă de final",
        videoFile: `Notă de final${suffix}.mp4`,
        pdfFile: null,
        section: "outro",
    });

    return lessons;
}

export const lessons = buildLessons();

export const sections = [
    { key: "intro" as const, label: "Introducere" },
    { key: "theory" as const, label: "Lecții Teoretice (L1–L17)" },
    { key: "practice" as const, label: "Lecții Practice (L18–L34)" },
    { key: "outro" as const, label: "Final" },
];
