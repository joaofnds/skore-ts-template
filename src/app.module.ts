import { DynamicModule, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { BullModule } from '@skore-io/bull'
import { MongoModule } from '@skore-io/mongo'
import { GraphQLError } from 'graphql'
import { TemplateDocument } from 'src/document'
import { TemplateResolver } from 'src/resolver'
import { TemplateService } from 'src/service'
import { TemplateProcessor } from './processor'

export class AppModule {
  static register(enableProcessors: boolean): DynamicModule {
    const providers: Provider[] = [TemplateResolver, TemplateDocument, TemplateService]

    if (enableProcessors) providers.push(TemplateProcessor)

    return {
      module: AppModule,
      global: true,
      imports: [
        GraphQLModule.forRoot({
          autoSchemaFile: true,
          formatError: ({ message }: GraphQLError) => ({ message }),
        }),
        ConfigModule.forRoot({ envFilePath: `config/.${process.env.NODE_ENV}.env` }),
        BullModule.forRoot({ name: 'template' }),
        MongoModule,
      ],
      providers,
    }
  }
}
