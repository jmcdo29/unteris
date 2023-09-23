import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'seed-type' })
export class SeedTypeQuestions {
	@Question({
		message: 'What entity do you want to seed?',
		name: 'type',
		choices: ['deity', 'domain', 'deityCategory', 'deityDomain', 'location'],
		type: 'list',
	})
	parseSeedType(type: string): string {
		return type;
	}
}
