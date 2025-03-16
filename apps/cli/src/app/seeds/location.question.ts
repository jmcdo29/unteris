import { Question, QuestionSet, WhenFor } from "nest-commander";

@QuestionSet({ name: "location" })
export class LocationQuestions {
	private addDescription = false;

	@Question({
		name: "name",
		message: "What is the name of the plane?",
	})
	parseLocationName(name: string): string {
		return name;
	}

	@Question({
		name: "addDescription",
		message: "Do you want to add a description?",
		type: "list",
		choices: ["y", "n"],
	})
	parseAddDescription(choice: "y" | "n"): "y" | "n" {
		this.addDescription = choice === "y";
		return choice;
	}

	@Question({
		name: "description",
		message: "What is the description of the plane?",
	})
	parseDescription(description: string): string {
		return description;
	}

	@WhenFor({ name: "description" })
	shouldAskDescription(): boolean {
		return this.addDescription;
	}
}
