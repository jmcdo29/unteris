import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({
  name: 'repeat',
})
export class RepeatQuestions {
  @Question({
    message: 'Do you want to load another entity?',
    name: 'doItAgain',
    choices: ['y', 'n'],
    default: 'y',
    type: 'list',
  })
  parseDoItAgain(doItAgain: 'y' | 'n') {
    return doItAgain.toLowerCase() === 'y';
  }
}
