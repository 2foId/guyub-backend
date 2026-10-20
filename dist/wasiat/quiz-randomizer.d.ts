export interface QuizQuestionWithAnswer {
    pertanyaan: string;
    opsi: string[];
    jawabanBenar: number;
}
export declare function acakKuis<T extends QuizQuestionWithAnswer>(kuis: T[]): T[];
