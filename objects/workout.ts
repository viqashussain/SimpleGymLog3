import { guid } from "../helper";
import { Exercise } from "./exercise";

export class Workout
{
    id: string = guid();
    description: string = '';
    exercises: Exercise[] = [new Exercise()];
    date: Date = new Date();
    notes: string = '';
}