/* eslint-disable no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import * as UserModuleException from '../exceptions';
import { Public } from '@app/common-lib/auth/decorator/public.decorator';
import { Exception } from '@app/common-lib/core/exceptions/Exception';
import { OrganizationMapper } from '../mapper/organization.mapper';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('organizations')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private static processException(exception: Exception, res: Response): void {
    switch (exception.constructor) {
      case UserModuleException.PasswordIsNotValid:
        res.status(HttpStatus.UNPROCESSABLE_ENTITY);
        res.json({ errors: { message: exception.errorValue().message } });
        res.end();
        return;
      case UserModuleException.OrganizationNameIsTaken:
        res.status(HttpStatus.CONFLICT);
        res.json({ errors: { message: exception.errorValue().message } });
        res.send();
        return;
      case UserModuleException.OrganizationNotFound:
        res.status(HttpStatus.NOT_FOUND);
        res.json({ errors: { message: exception.errorValue().message } });
        res.end();
        return;
      case UserModuleException.OrganizationNotCreated:
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.json({ errors: { message: exception.errorValue().message } });
        res.end();
        return;
      default:
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.json({ errors: { message: 'Internal server error' } });
        res.end();
    }
  }

  @Public()
  @Post()
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @Res() res: Response,
  ) {
    const result = await this.usersService.createOrganization(
      createOrganizationDto,
    );

    if (result.isLeft()) {
      UsersController.processException(result.value, res);
    } else {
      const organization = result.value;

      const location = `/organizations/${organization.getValue().id}`;
      res.status(HttpStatus.OK);
      res.location(location);
      res.end();
    }
  }

  @MessagePattern({ cmd: 'get_reputation' })
  async getOrganizationReputation(data: string): Promise<number> {
    const result = await this.usersService.getReputationFromOrg(data);

    if (result.isLeft()) {
      return -1;
    }

    return result.value.getValue();
  }

  @MessagePattern({ cmd: 'get_role' })
  async getOrganizationRole(data: string): Promise<string> {
    const result = await this.usersService.getRoleFromOrg(data);

    if (result.isLeft()) {
      return 'ERROR';
    }

    return result.value.getValue();
  }

  @MessagePattern({ cmd: 'update_reputation' })
  async updateOrganizationReputation(data: {
    orgId: string;
    newReputation: number;
  }): Promise<string> {
    const result = await this.usersService.updateOrganizationReputation(
      data.orgId,
      data.newReputation,
    );

    if (result.isLeft()) {
      return 'ERROR';
    }

    return 'OK';
  }

  @Public()
  @Get()
  async getAllOrganizations(@Res() res: Response) {
    const result = await this.usersService.getAllOrganizations();

    res.status(HttpStatus.OK);
    res.json({ data: result.map((org) => OrganizationMapper.toDto(org)) });
    res.end();
  }

  @Public()
  @Get('createOrganization90')
  async createOrganization90(@Res() res: Response) {
    const result = await this.usersService.createOrganization90();
    res.status(HttpStatus.OK);
    res.end();
  }

  @Public()
  @Get('hello')
  async getHello() {
    return 'Hello';
  }

  @Get(':id')
  async getOrganizationById(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const result = await this.usersService.getOrganizationById(id);

    if (result.isLeft()) {
      UsersController.processException(result.value, res);
    } else {
      res.status(HttpStatus.OK);
      res.json(result.value.getValue());
      res.end();
    }
  }

  @Get(':name')
  async getOrganizationByName(
    @Res() res: Response,
    @Param('name') name: string,
  ) {
    const result = await this.usersService.getOrganizationByName(name);

    if (result.isLeft()) {
      UsersController.processException(result.value, res);
    } else {
      res.status(HttpStatus.OK);
      res.json(result.value.getValue());
      res.end();
    }
  }
}
