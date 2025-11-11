import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Patch,
  Delete,
} from "@nestjs/common";
import { AuthorService } from "./author.service";
import { CreateAuthorDto, GetAuthorsDto, UpdateAuthorDto } from "./author.dto";
import { GetAuthorModel } from "./author.model";

@Controller("authors")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAuthors(@Query() input: GetAuthorsDto): Promise<GetAuthorModel> {
    const [property, direction] = input.sort
      ? input.sort.split(",")
      : ["lastName", "ASC"];

    const [authors, totalCount] = await this.authorService.getAllAuthors({
      ...input,
      sort: {
        [property]: direction,
      },
    });

    return {
      data: authors,
      totalCount,
    };
  }

  @Get(":id")
  public async getAuthor(@Param("id") id: string) {
    return this.authorService.getAuthorById(id);
  }

  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Patch(":id")
  updateAuthor(
    @Param("id") id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }

  @Delete(":id")
  deleteAuthor(@Param("id") id: string) {
    return this.authorService.deleteAuthor(id);
  }
}
