import { IChoices } from "./IChoices";

export interface IQuestion {
    question: string;
    choices: IChoices[];
    id?: number;
    status?: boolean;
}