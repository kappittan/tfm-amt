/* eslint-disable no-unused-vars */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as Domain from '../domain';
import { CreateOrganizationDto } from '../dto/create-organization.dto';

@Controller('users')
// eslint-disable-next-line import/prefer-default-export
export class UsersController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly usersService: UsersService,
    // eslint-disable-next-line no-empty-function
  ) {}

  @Post()
  createOrganization(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.usersService.createOrganization(createOrganizationDto);
  }

  @Get()
  async getAllOrganizations() {
    const result = await this.usersService.getAllOrganizations();

    return result;
  }
}
