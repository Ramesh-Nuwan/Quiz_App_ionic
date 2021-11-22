import { Answer } from './answer.model';

export interface Question {
  id:number
  name: string
  marks: number
  answers : Answer[]
}