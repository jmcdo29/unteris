import { ServerDeitiesService } from '@unteris/server/deities';
import { ChoicesFor, Question, QuestionSet } from 'nest-commander';

@QuestionSet({
  name: 'deity',
})
export class DeityQuestions {
  constructor(private readonly deitiesService: ServerDeitiesService) {}
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

  @ChoicesFor({ name: 'category' })
  async getDeityCategories() {
    return this.deitiesService.getAllCategories();
  }
}
