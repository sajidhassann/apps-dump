import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateMacroRequestDto } from './dto/macro.update.request.dto';
import { MacroService } from './macros.service';

@Controller('macros')
export class MacroController {
  constructor(private readonly macroService: MacroService) {}

  @Post()
  async create(@Body() macro: Prisma.MacroCreateInput) {
    return this.macroService.create(macro);
  }

  @Post('many')
  async createMany(@Body() macros: Prisma.MacroCreateInput[]) {
    return this.macroService.createMany(macros);
  }

  @Get()
  async findAll() {
    return this.macroService.findAllActive();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.macroService.deleteMacro(id);
  }

  @Patch()
  updateMacro(@Body() body: UpdateMacroRequestDto) {
    return this.macroService.updateMacro(body);
  }
}
