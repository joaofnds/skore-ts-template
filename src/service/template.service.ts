import { Injectable } from '@nestjs/common'
import { TemplateDocument } from 'src/document'
import { Template } from 'src/domain'

@Injectable()
export class TemplateService {
  constructor(private readonly templateDocument: TemplateDocument) {}

  create(author: string, name: string): Promise<Template> {
    const template = new Template(author, name)

    return this.templateDocument.create(template)
  }

  findByName(name: string): Promise<Template[]> {
    return this.templateDocument.findByName(name)
  }

  deleteByName(name: string): Promise<void> {
    return this.templateDocument.deleteByName(name)
  }
}
