import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'deityDomain' })
export class DeityDomainQuestions {
  @Question({
    message: 'What is the name of the deity?',
    name: 'deityName',
  })
  parseDeityName(name: string) {
    return name;
  }

  @Question({
    message: 'What is the name of the domain?',
    name: 'domainName',
  })
  parseDomainName(name: string) {
    return name;
  }
}
