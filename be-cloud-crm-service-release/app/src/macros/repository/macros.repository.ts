import { Injectable } from '@nestjs/common';
import { Macro, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MacroRepository {
  constructor(private prisma: PrismaService) {}

  createMacro(data: Prisma.MacroCreateInput) {
    return this.prisma.macro.create({ data });
  }

  createManyMacro(data: Prisma.MacroCreateInput[]) {
    return this.prisma.macro.createMany({ data });
  }

  listMacros(where?: Prisma.MacroWhereInput): Promise<Macro[]> {
    return this.prisma.macro.findMany({ where });
  }

  updateMacro(
    updateCriteria: Prisma.MacroWhereUniqueInput,
    data: Prisma.MacroUpdateInput,
  ): Promise<Macro> {
    return this.prisma.macro.update({
      where: updateCriteria,
      data,
    });
  }
}
