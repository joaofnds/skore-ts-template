import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongoModule } from '@skore-io/mongo'
import { GraphQLError } from 'graphql'
import { TemplateDocument } from 'src/document'
import { TemplateResolver } from 'src/resolver'
import { TemplateService } from 'src/service'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      formatError: ({ message }: GraphQLError) => ({ message }),
    }),
    ConfigModule.forRoot({ envFilePath: `config/.${process.env.NODE_ENV}.env` }),
    MongoModule,
  ],
  providers: [TemplateResolver, TemplateDocument, TemplateService],
})
export class AppModule {}
