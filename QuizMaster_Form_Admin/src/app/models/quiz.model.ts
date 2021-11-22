import { Question } from './question.model';

export interface Quiz {
  name: string
  quiz_level: number
  time:number
  pass_mark: number
  total_questions: number
  questions : Question[]

}