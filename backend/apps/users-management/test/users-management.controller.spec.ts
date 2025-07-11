import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/modules/organizations/application/users.controller';
import { UsersService } from '../src/modules/organizations/application/users.service';
import { v4 as uuidv4 } from 'uuid';
import { left, right } from '@app/common-lib/core/logic/Either';
import * as Exceptions from '../src/modules/organizations/exceptions';
import { Result } from '@app/common-lib/core/logic/Result';
import { Password } from '../src/modules/organizations/domain';

const orgMock1 = {
  id: uuidv4(),
  name: 'Organization 1',
  description: 'This is a description of the organization 1',
  reputation: 0.5,
};

const orgMock2 = {
  id: uuidv4(),
  name: 'Organization 2',
  description: 'This is a description of the organization 2',
  reputation: 0.5,
};

describe('UsersController', () => {
  let usersManagementController: UsersController;
  let usersManagementService: UsersService;

  const mockUsersService = {
    getAllOrganizations: jest.fn(),
    getOrganizationById: jest.fn(),
    getOrganizationByName: jest.fn(),
    createOrganization: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    usersManagementController = app.get<UsersController>(UsersController);
    usersManagementService = app.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllOrganizations', () => {
    it('should return the organization', async () => {
      mockUsersService.getAllOrganizations.mockReturnValue([
        orgMock1,
        orgMock2,
      ]);

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      await usersManagementController.getAllOrganizations(mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [orgMock1, orgMock2],
      });
    });
  });

  describe('getOrganizationByName', () => {
    it('should return the organization', async () => {
      mockUsersService.getOrganizationByName.mockReturnValue(
        right(Result.ok(orgMock1)),
      );

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      await usersManagementController.getOrganizationByName(
        mockResponse,
        orgMock1.name,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockUsersService.getOrganizationByName).toHaveBeenCalledWith(
        orgMock1.name,
      );
      expect(mockResponse.json).toHaveBeenCalledWith(orgMock1);
    });

    it('should return a OrganizationNotFound exception', async () => {
      mockUsersService.getOrganizationByName.mockReturnValue(
        left(Exceptions.OrganizationNotFound.create(orgMock1.name)),
      );

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      await usersManagementController.getOrganizationByName(
        mockResponse,
        orgMock1.name,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockUsersService.getOrganizationByName).toHaveBeenCalledWith(
        orgMock1.name,
      );
    });
  });

  describe('getOrganizationById', () => {
    it('should return the organization', async () => {
      mockUsersService.getOrganizationById.mockReturnValue(
        right(Result.ok(orgMock1)),
      );

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      await usersManagementController.getOrganizationById(
        mockResponse,
        orgMock1.id,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockUsersService.getOrganizationById).toHaveBeenCalledWith(
        orgMock1.id,
      );
      expect(mockResponse.json).toHaveBeenCalledWith(orgMock1);
    });

    it('should return a OrganizationNotFound exception', async () => {
      mockUsersService.getOrganizationById.mockReturnValue(
        left(Exceptions.OrganizationNotFound.create(orgMock1.id)),
      );

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      await usersManagementController.getOrganizationById(
        mockResponse,
        orgMock1.id,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockUsersService.getOrganizationById).toHaveBeenCalledWith(
        orgMock1.id,
      );
    });
  });

  describe('createOrganization', () => {
    it('should create the organization', async () => {
      mockUsersService.createOrganization.mockReturnValue(
        right(Result.ok(orgMock1)),
      );

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        location: jest.fn(),
        end: jest.fn(),
      } as any;

      const createOrganizationDto = {
        name: orgMock1.name,
        description: orgMock1.description,
        password: 'poiA@2341R',
      };

      await usersManagementController.createOrganization(
        createOrganizationDto,
        mockResponse,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should return a PasswordIsNotValid exception', async () => {
      mockUsersService.createOrganization.mockReturnValue(
        left(Exceptions.PasswordIsNotValid.create('hola1234')),
      );

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      const createOrganizationDto = {
        name: orgMock1.name,
        description: orgMock1.description,
        password: 'hola1234',
      };

      await usersManagementController.createOrganization(
        createOrganizationDto,
        mockResponse,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(422);
    });
  });
});
