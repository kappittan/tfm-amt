import { Test, TestingModule } from '@nestjs/testing';
import { CtisController } from '../src/modules/ctis/application/ctis.controller';
import { CtisService } from '../src/modules/ctis/application/ctis.service';
import { v4 as uuidv4 } from 'uuid';
import { left, right } from '@app/common-lib/core/logic/Either';
import * as Exceptions from '../src/modules/ctis/exceptions';
import { Result } from '@app/common-lib/core/logic/Result';

const ctiMock1 = {
  id: uuidv4(),
  name: 'APT29 Campaign',
  description: 'Analysis of APT29 phishing campaign observed in 2024.',
  content: JSON.stringify({
    type: 'bundle',
    id: 'bundle--' + uuidv4(),
    objects: [
      {
        type: 'threat-actor',
        id: 'threat-actor--' + uuidv4(),
        name: 'APT29',
        description: 'Suspected Russian state-sponsored group.',
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
      },
    ],
  }),
  owner: uuidv4(),
  qualityValue: 85,
  sharedAt: new Date(),
};

const ctiMock2 = {
  id: uuidv4(),
  name: 'Malware Sample - TrickBot',
  description: 'STIX report for TrickBot activity.',
  content: JSON.stringify({
    type: 'bundle',
    id: 'bundle--' + uuidv4(),
    objects: [
      {
        type: 'malware',
        id: 'malware--' + uuidv4(),
        name: 'TrickBot',
        is_family: true,
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        description: 'Modular banking trojan observed in ransomware campaigns.',
      },
    ],
  }),
  owner: uuidv4(),
  qualityValue: 72,
  sharedAt: new Date(),
};

const ctiMockNoContent1 = {
  id: uuidv4(),
  name: 'APT29 Campaign',
  description: 'Analysis of APT29 phishing campaign observed in 2024.',
  owner: uuidv4(),
  qualityValue: 85,
  sharedAt: new Date(),
};

const ctiMockNoContent2 = {
  id: uuidv4(),
  name: 'Malware Sample - TrickBot',
  description: 'STIX report for TrickBot activity.',
  owner: uuidv4(),
  qualityValue: 72,
  sharedAt: new Date(),
};

describe('CtisController', () => {
  let controller: CtisController;
  let service: CtisService;

  const mockCtisService = {
    getAllCTIs: jest.fn(),
    getCTIById: jest.fn(),
    uploadCTI: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CtisController],
      providers: [CtisService],
    })
      .overrideProvider(CtisService)
      .useValue(mockCtisService)
      .compile();

    controller = module.get<CtisController>(CtisController);
    service = module.get<CtisService>(CtisService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCTIs', () => {
    it('should return the CTIs', async () => {
      mockCtisService.getAllCTIs.mockReturnValue([
        ctiMockNoContent1,
        ctiMockNoContent2,
      ]);

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      const mockUserId = uuidv4();
      const mockFilterDto = { fromQuality: 0.5 };

      await controller.getAllCTIs(mockResponse, mockUserId, mockFilterDto);

      expect(mockCtisService.getAllCTIs).toHaveBeenCalledWith(
        mockUserId,
        mockFilterDto,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [ctiMockNoContent1, ctiMockNoContent2],
      });
    });
  });

  describe('getCTIById', () => {
    it('should return the CTI by ID', async () => {
      mockCtisService.getCTIById.mockReturnValue(right(ctiMock1));

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      await controller.getCTI(ctiMock1.id, mockResponse);

      expect(mockCtisService.getCTIById).toHaveBeenCalledWith(ctiMock1.id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(ctiMock1);
    });

    it('should return a CTINotFound exception', async () => {
      const mockId = uuidv4();
      mockCtisService.getCTIById.mockReturnValue(
        left(Exceptions.CTINotFound.create(mockId)),
      );

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      await controller.getCTI(mockId, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('uploadCTI', () => {
    it('should return the CTI', async () => {
      mockCtisService.uploadCTI.mockReturnValue(
        right(Result.ok(ctiMockNoContent1)),
      );

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      const createCTIDto = {
        name: ctiMock1.name,
        description: ctiMock1.description,
        content: ctiMock1.content,
      };
      await controller.uploadCTI(createCTIDto, ctiMock1.owner, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(ctiMockNoContent1);
    });

    it('should a CTIAssessmentModuleError exception', async () => {
      mockCtisService.uploadCTI.mockReturnValue(
        left(Exceptions.CTIAssessmentModuleError.create()),
      );

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      const createCTIDto = {
        name: ctiMock1.name,
        description: ctiMock1.description,
        content: ctiMock1.content,
      };
      await controller.uploadCTI(createCTIDto, ctiMock1.owner, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it('should a OrganizationNotFound exception', async () => {
      mockCtisService.uploadCTI.mockReturnValue(
        left(Exceptions.OrganizationNotFound.create(uuidv4())),
      );

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
        end: jest.fn(),
      } as any;

      const createCTIDto = {
        name: ctiMock1.name,
        description: ctiMock1.description,
        content: ctiMock1.content,
      };
      await controller.uploadCTI(createCTIDto, ctiMock1.owner, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });
});
