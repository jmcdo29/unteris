import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({
  name: 'deity',
})
export class DeityQuestions {
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
    message: 'Where can the image for this dedity be found?',
    name: 'imageUrl',
  })
  parseImageUrl(imageUrl: string) {
    return imageUrl;
  }

  @Question({
    message: 'What category does this deity belong to?',
    name: 'category',
  })
  parseCategory(category: string) {
    return category;
  }
}
