import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { TemplateDto } from 'src/dto'
import { TemplateService } from 'src/service'

@Processor('template')
export class TemplateProcessor {
  constructor(private readonly templateService: TemplateService) {}

  @Process()
  async onMessage(job: Job<TemplateDto>): Promise<void> {
    const template = await this.templateService.create(job.data.author, job.data.name)

    Logger.log(`Template=${template.name} created with id=${template._id}`, TemplateProcessor.name)
  }
}
