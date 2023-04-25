import { ServerDeitiesService } from '@unteris/server/deities';
import { LocationTable } from '@unteris/server/kysely';
import { ServerLocationService } from '@unteris/server/location';
import { ChoicesFor, Question, QuestionSet, WhenFor } from 'nest-commander';

@QuestionSet({
  name: 'deity',
})
export class DeityQuestions {
  private askLocation = false;
  constructor(
    private readonly deitiesService: ServerDeitiesService,
    private readonly locationsService: ServerLocationService
  ) {}
  @Question({
    message: 'What is the name of the deity?',
    name: 'name',
  })
  parseName(name: string) {
    return name;
  }

  @Question({
    message: 'What is the description of the deity?',
    name: 'description',
  })
  parseDedscription(desc: string) {
    return desc;
  }

  @Question({
    message: 'Where can the image for this deity be found?',
    name: 'imageUrl',
  })
  parseImageUrl(imageUrl: string) {
    return imageUrl;
  }

  @Question({
    message: 'What category does this deity belong to?',
    name: 'category',
    type: 'list',
  })
  parseCategory(category: string) {
    return category;
  }

  @Question({
    message: 'Do you want to add a location right now?',
    name: 'askLocation',
    type: 'list',
    choices: ['y', 'n'],
  })
  parseAskLocation(confirmation: string) {
    this.askLocation = confirmation === 'y';
    return confirmation;
  }

  @Question({
    message: 'Where can this deity be found?',
    name: 'location',
    type: 'list',
  })
  parseLocation(location: LocationTable) {
    console.log(location);
    return location;
  }

  @WhenFor({ name: 'location' })
  shouldAskLocation() {
    return this.askLocation;
  }

  @ChoicesFor({ name: 'location' })
  async getLocationOptions() {
    const locations = await this.locationsService.getLocations();
    return locations.map((location) => ({
      name: location.name,
      value: location.id,
    }));
  }

  @ChoicesFor({ name: 'category' })
  async getDeityCategories() {
    return this.deitiesService.getAllCategories();
  }
}
