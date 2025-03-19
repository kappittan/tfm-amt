import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { CtisService } from './ctis.service';
import { CreateCTIDto } from '../dto/create-cti.dto';
import { Exception } from '@app/common-lib/core/exceptions/Exception';
import * as CTIModuleException from '../exceptions';
import { Response, Request } from 'express';

@Controller('ctis')
export class CtisController {
  constructor(private readonly ctisService: CtisService) {}

  private static processException(exception: Exception, res: Response): void {
    switch (exception.constructor) {
      case CTIModuleException.CTINotFound:
        res.status(HttpStatus.NOT_FOUND);
        res.json({ errors: { message: exception.errorValue().message } });
        res.send();
        return;
      case CTIModuleException.InvalidSTIXFormat:
        res.status(HttpStatus.BAD_REQUEST);
        res.json({ errors: { message: exception.errorValue().message } });
        res.send();
        return;
      default:
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.json({ errors: { message: 'Internal server error' } });
        res.send();
    }
  }

  @Post()
  async uploadCTI(@Body() createCTIDto: CreateCTIDto) {
    return this.ctisService.uploadCTI(
      createCTIDto.name,
      createCTIDto.description,
      createCTIDto.content,
      'test',
    );
  }

  @Get()
  async getAllCTIs() {
    return this.ctisService.getAllCTIs();
  }

  @Get(':id')
  async getCTI(@Param('id') id: string) {
    return this.ctisService.getCTIById(id);
  }
}
