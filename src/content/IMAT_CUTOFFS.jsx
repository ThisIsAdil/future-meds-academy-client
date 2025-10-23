// ...existing code...
export const IMAT_CUTOFFS = [
    {
        year: 2024,
        universities: [
            {
                code: "sapienza",
                name: "Sapienza — University of Rome",
                eu: { seats: 45, finalCutoff: 65.1, rounds: [65.5, 65.1], seatsLeft: null },
                nonEu: { seats: 13, finalCutoff: 73.4 },
            },
            {
                code: "milano",
                name: "Università degli Studi di Milano (Statale)",
                eu: { seats: 55, finalCutoff: 67.8, rounds: [69.2, 68.6, 68.1], seatsLeft: null },
                nonEu: { seats: 15, finalCutoff: 75.7, pdf: "/assets/imat-cutoffs/2024/milano-non-eu-ranking.pdf" },
            },
            {
                code: "pavia",
                name: "University of Pavia",
                eu: { seats: 103, finalCutoff: 59.2, rounds: [61.8, 60.9, 60.7], seatsLeft: 2 },
                nonEu: { seats: 40, finalCutoff: 71.2 },
            },
            {
                code: "padova",
                name: "University of Padova",
                eu: { seats: 75, finalCutoff: 63.2, rounds: [64.6, 64.0, 63.3], seatsLeft: null },
                nonEu: { seats: 25, finalCutoff: 71.6 },
            },
        ],
    },
    {
        year: 2023,
        universities: [
            {
                code: "sapienza",
                name: "Sapienza — University of Rome",
                eu: { seats: 45, finalCutoff: 63.9, rounds: [64.4, 64.2, 63.9], seatsLeft: 1 },
                nonEu: { seats: 15, finalCutoff: 70.2 },
            },
            {
                code: "milano",
                name: "Università degli Studi di Milano (Statale)",
                eu: { seats: 55, finalCutoff: 65.7, rounds: [66.1, 65.9, 65.7], seatsLeft: null },
                nonEu: { seats: 18, finalCutoff: 72.4 },
            },
            {
                code: "pavia",
                name: "University of Pavia",
                eu: { seats: 100, finalCutoff: 58.5, rounds: [60.1, 59.4, 58.8, 58.5], seatsLeft: 3 },
                nonEu: { seats: 38, finalCutoff: 68.6 },
            },
            {
                code: "turin",
                name: "University of Turin",
                eu: { seats: 68, finalCutoff: 57.9, rounds: [59.3, 58.7, 58.2], seatsLeft: 2 },
                nonEu: { seats: 28, finalCutoff: 66.9 },
            },
            {
                code: "bologna",
                name: "University of Bologna",
                eu: { seats: 95, finalCutoff: 62.1, rounds: [63.0, 62.5, 62.1], seatsLeft: null },
                nonEu: { seats: 22, finalCutoff: 69.3 },
            },
        ],
    },
    {
        year: 2022,
        universities: [
            {
                code: "sapienza",
                name: "Sapienza — University of Rome",
                eu: { seats: 45, finalCutoff: 62.5, rounds: [63.0, 62.8, 62.5], seatsLeft: null },
                nonEu: { seats: 14, finalCutoff: 69.8 },
            },
            {
                code: "milano",
                name: "Università degli Studi di Milano (Statale)",
                eu: { seats: 55, finalCutoff: 64.9, rounds: [65.4, 65.1, 64.9], seatsLeft: null },
                nonEu: { seats: 17, finalCutoff: 71.3 },
            },
            {
                code: "pavia",
                name: "University of Pavia",
                eu: { seats: 102, finalCutoff: 57.2, rounds: [58.7, 57.9, 57.2], seatsLeft: 4 },
                nonEu: { seats: 39, finalCutoff: 67.2 },
            },
            {
                code: "padova",
                name: "University of Padova",
                eu: { seats: 73, finalCutoff: 60.1, rounds: [61.3, 60.8, 60.1], seatsLeft: 1 },
                nonEu: { seats: 24, finalCutoff: 68.4 },
            },
            {
                code: "bari",
                name: "University of Bari",
                eu: { seats: 70, finalCutoff: 55.8, rounds: [56.7, 56.2, 55.8], seatsLeft: 5 },
                nonEu: { seats: 10, finalCutoff: 63.1 },
            },
        ],
    },
    {
        year: 2021,
        universities: [
            {
                code: "sapienza",
                name: "Sapienza — University of Rome",
                eu: { seats: 45, finalCutoff: 61.8, rounds: [62.3, 62.0, 61.8], seatsLeft: 2 },
                nonEu: { seats: 13, finalCutoff: 67.5 },
            },
            {
                code: "milano",
                name: "Università degli Studi di Milano (Statale)",
                eu: { seats: 55, finalCutoff: 63.4, rounds: [64.0, 63.8, 63.4], seatsLeft: null },
                nonEu: { seats: 16, finalCutoff: 70.0 },
            },
            {
                code: "pavia",
                name: "University of Pavia",
                eu: { seats: 101, finalCutoff: 56.5, rounds: [57.4, 57.0, 56.5], seatsLeft: 3 },
                nonEu: { seats: 36, finalCutoff: 65.9 },
            },
            {
                code: "bologna",
                name: "University of Bologna",
                eu: { seats: 96, finalCutoff: 60.9, rounds: [61.7, 61.3, 60.9], seatsLeft: null },
                nonEu: { seats: 20, finalCutoff: 68.8 },
            },
            {
                code: "federico",
                name: "University of Naples Federico II",
                eu: { seats: 15, finalCutoff: 59.1, rounds: [59.9, 59.3, 59.1], seatsLeft: null },
                nonEu: { seats: 25, finalCutoff: 64.7 },
            },
        ],
    },
    {
        year: 2020,
        universities: [
            {
                code: "sapienza",
                name: "Sapienza — University of Rome",
                eu: { seats: 45, finalCutoff: 60.7, rounds: [61.2, 60.9, 60.7], seatsLeft: 1 },
                nonEu: { seats: 12, finalCutoff: 66.3 },
            },
            {
                code: "milano",
                name: "Università degli Studi di Milano (Statale)",
                eu: { seats: 55, finalCutoff: 62.2, rounds: [62.8, 62.5, 62.2], seatsLeft: null },
                nonEu: { seats: 15, finalCutoff: 68.4 },
            },
            {
                code: "pavia",
                name: "University of Pavia",
                eu: { seats: 100, finalCutoff: 55.9, rounds: [56.7, 56.3, 55.9], seatsLeft: 2 },
                nonEu: { seats: 35, finalCutoff: 64.8 },
            },
            {
                code: "padova",
                name: "University of Padova",
                eu: { seats: 74, finalCutoff: 58.8, rounds: [59.3, 59.1, 58.8], seatsLeft: null },
                nonEu: { seats: 22, finalCutoff: 66.1 },
            },
            {
                code: "turin",
                name: "University of Turin",
                eu: { seats: 68, finalCutoff: 54.7, rounds: [55.5, 55.1, 54.7], seatsLeft: 4 },
                nonEu: { seats: 30, finalCutoff: 63.5 },
            },
        ],
    },
];

export default IMAT_CUTOFFS;