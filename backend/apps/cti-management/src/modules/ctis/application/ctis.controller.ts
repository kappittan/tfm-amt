import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CtisService } from './ctis.service';
import { CreateCTIDto } from '../dto/create-cti.dto';
import { Exception } from '@app/common-lib/core/exceptions/Exception';
import * as CTIModuleException from '../exceptions';
import { Response, Request } from 'express';
import { CTIMapper } from '../mapper/cti.mapper';
import { GetUserId } from '@app/common-lib/auth/decorator/get-user-id.decorator';
import { FilterCtiDto } from '../dto/filter-cti.dto';

@Controller('ctis')
export class CtisController {
  constructor(private readonly ctisService: CtisService) {}

  private static processException(exception: Exception, res: Response): void {
    switch (exception.constructor) {
      case CTIModuleException.CTINotFound:
        res.status(HttpStatus.NOT_FOUND);
        res.json({ errors: { message: exception.errorValue().message } });
        res.end();
        return;
      case CTIModuleException.InvalidSTIXFormat:
        res.status(HttpStatus.UNPROCESSABLE_ENTITY);
        res.json({ errors: { message: exception.errorValue().message } });
        res.end();
        return;
      case CTIModuleException.CTIAssessmentModuleError:
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.json({ errors: { message: exception.errorValue().message } });
        res.end();
        return;
      case CTIModuleException.OrganizationNotFound:
        res.status(HttpStatus.NOT_FOUND);
        res.json({ errors: { message: exception.errorValue().message } });
        res.end();
        return;
      default:
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.json({ errors: { message: 'Internal server error' } });
        res.end();
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
      CtisController.processException(result.value, res);
    } else {
      res.status(HttpStatus.OK);
      res.json(CTIMapper.toDTO(result.value.getValue()));
      res.end();
    }
  }

  @Get('/content/:id')
  async getCTI(@Param('id') id: string, @Res() res: Response) {
    console.log('Entra en getCTI');
    const result = await this.ctisService.getCTIById(id);

    if (result.isLeft()) {
      CtisController.processException(result.value, res);
    } else {
      res.status(HttpStatus.OK);
      res.json(CTIMapper.toDTOContent(result.value));
      res.end();
    }
  }

  @Get()
  async getAllCTIs(
    @Res() res: Response,
    @GetUserId() userId: string,
    @Query() filterDto: FilterCtiDto,
  ) {
    const ctis = await this.ctisService.getAllCTIs(userId, filterDto);

    res.status(HttpStatus.OK);
    res.json({ data: ctis.map((cti) => CTIMapper.toDTO(cti)) });
    res.end();
  }
}
