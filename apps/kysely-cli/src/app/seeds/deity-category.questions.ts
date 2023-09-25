import { Question, QuestionSet } from "nest-commander";

@QuestionSet({
	name: "deityCategory",
})
export class DeityCategoryQuestions {
	@Question({
		message: "What is the name of the deity category?",
		name: "name",
	})
	parseName(name: string) {
		return name;
	}
}
