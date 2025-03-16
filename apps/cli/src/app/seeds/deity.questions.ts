import { type Database, InjectKysely } from "@unteris/server/kysely";
import type { ServerLocationService } from "@unteris/server/location";
import type { Location } from "@unteris/shared/types";
import type { Kysely } from "kysely";
import { ChoicesFor, Question, QuestionSet, WhenFor } from "nest-commander";

@QuestionSet({
	name: "deity",
})
export class DeityQuestions {
	private askLocation = false;
	constructor(
		private readonly locationsService: ServerLocationService,
		@InjectKysely() private readonly db: Kysely<Database>,
	) {}
	@Question({
		message: "What is the name of the deity?",
		name: "name",
	})
	parseName(name: string): string {
		return name;
	}

	@Question({
		message: "What is the description of the deity?",
		name: "description",
	})
	parseDescription(desc: string): string {
		return desc;
	}

	@Question({
		message: "Where can the image for this deity be found?",
		name: "imageUrl",
	})
	parseImageUrl(imageUrl: string): string {
		return imageUrl;
	}

	@Question({
		message: "What category does this deity belong to?",
		name: "category",
		type: "list",
	})
	parseCategory(category: string): string {
		return category;
	}

	@Question({
		message: "Do you want to add a location right now?",
		name: "askLocation",
		type: "list",
		choices: ["y", "n"],
	})
	parseAskLocation(confirmation: string): string {
		this.askLocation = confirmation === "y";
		return confirmation;
	}

	@Question({
		message: "Where can this deity be found?",
		name: "location",
		type: "list",
	})
	parseLocation(location: Location): Location {
		return location;
	}

	@WhenFor({ name: "location" })
	shouldAskLocation(): boolean {
		return this.askLocation;
	}

	@ChoicesFor({ name: "location" })
	async getLocationOptions(): Promise<Array<{ name: string; value: string }>> {
		const locations = await this.locationsService.getByType("plane");
		return locations.map((location) => ({
			name: location.name,
			value: location.id,
		}));
	}

	@ChoicesFor({ name: "category" })
	async getDeityCategories(): Promise<Array<{ name: string; value: string }>> {
		return (
			await this.db.selectFrom("deityCategory").select(["id", "name"]).execute()
		).map((category) => ({
			name: category.name,
			value: category.id,
		}));
	}
}
