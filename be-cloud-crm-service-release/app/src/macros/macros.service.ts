import { Injectable } from '@nestjs/common';
import { Availability, Macro, Prisma } from '@prisma/client';
import { UpdateMacroRequestDto } from './dto/macro.update.request.dto';
import { MacroRepository } from './repository/macros.repository';

@Injectable()
export class MacroService {
  constructor(private readonly macroRepository: MacroRepository) {}

  create(macro: Prisma.MacroCreateInput) {
    return this.macroRepository.createMacro(macro);
  }

  createMany(macros: Prisma.MacroCreateInput[]) {
    return this.macroRepository.createManyMacro(macros);
  }

  findAll(): Promise<Macro[]> {
    return this.macroRepository.listMacros();
  }

  findAllActive(): Promise<Macro[]> {
    return this.macroRepository.listMacros({
      availability: Availability.RELEASED,
    });
  }

  deleteMacro(id: string) {
    return this.macroRepository.updateMacro(
      { id },
      { availability: Availability.DELETED },
    );
  }

  updateMacro(macro: UpdateMacroRequestDto) {
    return this.macroRepository.updateMacro({ id: macro.id }, macro);
  }
}
