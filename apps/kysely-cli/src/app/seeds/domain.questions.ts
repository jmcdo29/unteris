import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({
	name: 'domain',
})
export class DomainQuestions {
	@Question({
		message: 'What is the name of the domain?',
		name: 'name',
	})
	parseName(name: string): string {
		return name;
	}
}
