// src/articles/dto/create-article.dto.ts
// rules will be picked up by the validationpipe and applied automatically to toute handlers
// single source of truth
// no separate validation class needed

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
