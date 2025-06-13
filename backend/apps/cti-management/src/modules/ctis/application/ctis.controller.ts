import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CtisService } from './ctis.service';
import { CreateCTIDto } from '../dto/create-cti.dto';
import { Exception } from '@app/common-lib/core/exceptions/Exception';
import * as CTIModuleException from '../exceptions';
import { Response, Request } from 'express';
import { CTIMapper } from '../mapper/cti.mapper';
import { GetUserId } from '@app/common-lib/auth/decorator/get-user-id.decorator';

@Controller('ctis')
export class CtisController {
  constructor(private readonly ctisService: CtisService) {}

  private processException(exception: Exception, res: Response): void {
    switch (exception.constructor) {
      case CTIModuleException.CTINotFound:
        res.status(HttpStatus.NOT_FOUND);
        res.json({ errors: { message: exception.errorValue().message } });
        res.send();
        return;
      case CTIModuleException.InvalidSTIXFormat:
        res.status(HttpStatus.UNPROCESSABLE_ENTITY);
        res.json({ errors: { message: exception.errorValue().message } });
        res.send();
        return;
      case CTIModuleException.CTIAssessmentModuleError:
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.json({ errors: { message: exception.errorValue().message } });
        res.send();
        return;
      case CTIModuleException.OrganizationNotFound:
        res.status(HttpStatus.NOT_FOUND);
        res.json({ errors: { message: exception.errorValue().message } });
        res.send();
        return;
      default:
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.json({ errors: { message: 'Internal server error' } });
        res.send();
        return;
    }
  }

  @Post()
  async uploadCTI(
    @Body() createCTIDto: CreateCTIDto,
    @GetUserId() userId: string,
    @Res() res: Response,
  ) {
    const result = await this.ctisService.uploadCTI(
      createCTIDto.name,
      createCTIDto.description,
      createCTIDto.content,
      userId,
    );

    if (result.isLeft()) {
      this.processException(result.value, res);
    } else {
      res.status(HttpStatus.OK);
      res.json(CTIMapper.toDTO(result.value.getValue()));
      res.send();
    }
  }

  @Get()
  async getAllCTIs(@Res() res: Response) {
    const ctis = await this.ctisService.getAllCTIs();

    res.status(HttpStatus.OK);
    res.json({ data: ctis.map((cti) => CTIMapper.toDTO(cti)) });
    res.end();
  }

  @Get(':id')
  async getCTI(@Param('id') id: string, @Res() res: Response) {
    const result = await this.ctisService.getCTIById(id);

    if (result.isLeft()) {
      this.processException(result.value, res);
    } else {
      res.status(HttpStatus.OK);
      res.json(CTIMapper.toDTO(result.value));
      res.send();
    }
  }
}
