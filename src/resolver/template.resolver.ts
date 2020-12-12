import { Logger } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Template } from 'src/domain'
import { TemplateDto } from 'src/dto/template.dto'
import { TemplateService } from 'src/service/template.service'

@Resolver(() => Template)
export class TemplateResolver {
  constructor(private readonly templateService: TemplateService) {}

  @Mutation(() => Template)
  async create(@Args() templateDto: TemplateDto): Promise<Template> {
    Logger.log(
      `Creating template with name=${templateDto.name} and author=${templateDto.author}`,
      TemplateResolver.name,
    )

    const template = await this.templateService.create(templateDto.author, templateDto.name)

    Logger.log(`Template=${template.name} created with id=${template._id}`)

    return template
  }

  @Mutation(() => Boolean)
  async delete(@Args('name', { type: () => String }) name: string): Promise<boolean> {
    try {
      await this.templateService.deleteByName(name)
      Logger.log(`Template=${name} deleted`, TemplateResolver.name)
      return true
    } catch (error) {
      Logger.error(`Failed to delete template=${name}`, error, TemplateResolver.name)
      return false
    }
  }

  @Query(() => [Template])
  findByName(@Args('name', { type: () => String }) name: string): Promise<Template[]> {
    Logger.log(`Searching template byName=${name}`)
    return this.templateService.findByName(name)
  }
}
