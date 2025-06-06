/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CtiManagementModule = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(4);
const ctis_module_1 = __webpack_require__(5);
let CtiManagementModule = class CtiManagementModule {
};
exports.CtiManagementModule = CtiManagementModule;
exports.CtiManagementModule = CtiManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://root:example@localhost:27017/cti-management?authSource=admin&directConnection=true'),
            ctis_module_1.CtisModule,
        ],
    })
], CtiManagementModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CtisModule = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(4);
const ctis_service_1 = __webpack_require__(6);
const ctis_controller_1 = __webpack_require__(25);
const CTI_1 = __webpack_require__(31);
const _ctis_repository_1 = __webpack_require__(7);
const ctis_mongo_repository_1 = __webpack_require__(32);
const microservices_1 = __webpack_require__(23);
const users_management_module_1 = __webpack_require__(35);
let CtisModule = class CtisModule {
};
exports.CtisModule = CtisModule;
exports.CtisModule = CtisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'USER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        port: 3003,
                        host: 'localhost',
                    },
                },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: 'CTI', schema: CTI_1.CTISchema }]),
            users_management_module_1.UsersManagementModule,
        ],
        controllers: [ctis_controller_1.CtisController],
        providers: [
            {
                provide: _ctis_repository_1.CTIRepository,
                useClass: ctis_mongo_repository_1.CTIMongoRepository,
            },
            ctis_service_1.CtisService,
        ],
    })
], CtisModule);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CtisService = void 0;
const common_1 = __webpack_require__(3);
const _ctis_repository_1 = __webpack_require__(7);
const Domain = __webpack_require__(9);
const Exception = __webpack_require__(16);
const axios_1 = __webpack_require__(21);
const Either_1 = __webpack_require__(22);
const Result_1 = __webpack_require__(15);
const microservices_1 = __webpack_require__(23);
const rxjs_1 = __webpack_require__(24);
let CtisService = class CtisService {
    constructor(ctiRepository, client) {
        this.ctiRepository = ctiRepository;
        this.client = client;
    }
    async getAllCTIs() {
        return this.ctiRepository.findAll();
    }
    async getCTIById(id) {
        return this.ctiRepository.findById(id);
    }
    async uploadCTI(name, description, content, owner) {
        try {
            const response = await axios_1.default.get('http://localhost:8000/yup');
            const data = response.data;
            const qualityValue = 0.1 * data.interoperability +
                0.2 * data.completeness +
                0.3 * data.verifiability +
                0.4 * data.consistency;
            const previousReputation = await this.getOrganizationReputation(owner);
            if (previousReputation < 0) {
            }
            const newReputation = this.getReputationFromQualityValue(previousReputation, qualityValue);
            const update = await this.updateOrganizationReputation(owner, newReputation);
            if (update === 'ERROR') {
            }
            const cti = Domain.CTI.create({
                name,
                description,
                content,
                owner,
                qualityValue,
                sharedAt: new Date(),
            });
            const newCti = await this.ctiRepository.save(cti.getValue());
            return (0, Either_1.right)(Result_1.Result.ok(newCti));
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        return (0, Either_1.left)(Exception.InvalidSTIXFormat.create());
                    default:
                        return (0, Either_1.left)(Exception.CTIAssessmentModuleError.create());
                }
            }
        }
    }
    async getOrganizationReputation(orgId) {
        const pattern = { cmd: 'get_reputation' };
        const payload = orgId;
        return await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
    }
    async updateOrganizationReputation(orgId, newReputation) {
        const pattern = { cmd: 'update_reputation' };
        const payload = { orgId, newReputation };
        return await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
    }
    getReputationFromQualityValue(previousReputation, qualityValue) {
        const lambda = 0.1;
        const beta = 2;
        const alpha = Math.tanh((qualityValue >= 0.5 ? 2 : 5) * (qualityValue - 0.5));
        if (alpha >= 0) {
            return previousReputation + lambda * alpha * (1 - previousReputation);
        }
        else {
            return previousReputation + lambda * beta * alpha * previousReputation;
        }
    }
};
exports.CtisService = CtisService;
exports.CtisService = CtisService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof _ctis_repository_1.CTIRepository !== "undefined" && _ctis_repository_1.CTIRepository) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], CtisService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTIRepository = void 0;
const repository_1 = __webpack_require__(8);
class CTIRepository extends repository_1.Repository {
}
exports.CTIRepository = CTIRepository;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Repository = void 0;
class Repository {
}
exports.Repository = Repository;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTI = void 0;
const CTI_1 = __webpack_require__(10);
Object.defineProperty(exports, "CTI", ({ enumerable: true, get: function () { return CTI_1.CTI; } }));


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTI = void 0;
const Entity_1 = __webpack_require__(11);
const Result_1 = __webpack_require__(15);
class CTI extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get id() {
        return this._id.toString();
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value;
    }
    get content() {
        return this.props.content;
    }
    set content(value) {
        this.props.content = value;
    }
    get owner() {
        return this.props.owner;
    }
    set owner(value) {
        this.props.owner = value;
    }
    get qualityValue() {
        return this.props.qualityValue;
    }
    set qualityValue(value) {
        this.props.qualityValue = value;
    }
    get sharedAt() {
        return this.props.sharedAt;
    }
    set sharedAt(value) {
        this.props.sharedAt = value;
    }
    static create(props, id) {
        const cti = new CTI(props, id);
        return Result_1.Result.ok(cti);
    }
}
exports.CTI = CTI;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UniqueEntityID = exports.Entity = void 0;
const UniqueEntityID_1 = __webpack_require__(12);
Object.defineProperty(exports, "UniqueEntityID", ({ enumerable: true, get: function () { return UniqueEntityID_1.UniqueEntityID; } }));
class Entity {
    constructor(props, id) {
        this._id = id || new UniqueEntityID_1.UniqueEntityID();
        this.props = props;
    }
    equals(object) {
        if (object === null || object === undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!Entity.isEntity(object)) {
            return false;
        }
        return this._id.equals(object._id);
    }
    static isEntity(v) {
        return v instanceof Entity;
    }
}
exports.Entity = Entity;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UniqueEntityID = void 0;
const uuid_1 = __webpack_require__(13);
const Identifier_1 = __webpack_require__(14);
class UniqueEntityID extends Identifier_1.Identifier {
    constructor(id) {
        super(id || (0, uuid_1.v4)());
    }
}
exports.UniqueEntityID = UniqueEntityID;


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Identifier = void 0;
class Identifier {
    constructor(value) {
        this.value = value;
        this.value = value;
    }
    equals(id) {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.toValue() === this.value;
    }
    toString() {
        return String(this.value);
    }
    toValue() {
        return this.value;
    }
}
exports.Identifier = Identifier;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Result = void 0;
class Result {
    constructor(isSuccess, error, value) {
        if (isSuccess && error) {
            throw new Error('InvalidOperation: A result cannot be successful and contain an error');
        }
        if (!isSuccess && !error) {
            throw new Error('InvalidOperation: A failing result needs to contain an error message');
        }
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;
        Object.freeze(this);
    }
    getValue() {
        if (!this.isSuccess) {
            throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
        }
        return this._value;
    }
    errorValue() {
        return this.error;
    }
    static ok(value) {
        return new Result(true, null, value);
    }
    static fail(error) {
        return new Result(false, error);
    }
    static combine(results) {
        for (const result of results) {
            if (result.isFailure)
                return result;
        }
        return Result.ok();
    }
}
exports.Result = Result;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTIAssessmentModuleError = exports.InvalidSTIXFormat = exports.CTINotFound = void 0;
const CTINotFound_1 = __webpack_require__(17);
Object.defineProperty(exports, "CTINotFound", ({ enumerable: true, get: function () { return CTINotFound_1.CTINotFound; } }));
const InvalidSTIXFormat_1 = __webpack_require__(19);
Object.defineProperty(exports, "InvalidSTIXFormat", ({ enumerable: true, get: function () { return InvalidSTIXFormat_1.InvalidSTIXFormat; } }));
const CTIAssessmentModuleError_1 = __webpack_require__(20);
Object.defineProperty(exports, "CTIAssessmentModuleError", ({ enumerable: true, get: function () { return CTIAssessmentModuleError_1.CTIAssessmentModuleError; } }));


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTINotFound = void 0;
const Exception_1 = __webpack_require__(18);
class CTINotFound extends Exception_1.Exception {
    constructor(id) {
        super(`The CTI with id "${id}" does not exist`);
    }
    static create(id) {
        return new CTINotFound(id);
    }
}
exports.CTINotFound = CTINotFound;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Exception = void 0;
const Result_1 = __webpack_require__(15);
class Exception extends Result_1.Result {
    constructor(message) {
        super(false, {
            message,
        });
    }
}
exports.Exception = Exception;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidSTIXFormat = void 0;
const Exception_1 = __webpack_require__(18);
class InvalidSTIXFormat extends Exception_1.Exception {
    constructor() {
        super('The STIX format is invalid');
    }
    static create() {
        return new InvalidSTIXFormat();
    }
}
exports.InvalidSTIXFormat = InvalidSTIXFormat;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTIAssessmentModuleError = void 0;
const Exception_1 = __webpack_require__(18);
class CTIAssessmentModuleError extends Exception_1.Exception {
    constructor() {
        super('An error occurred in the CTI assessment module');
    }
    static create() {
        return new CTIAssessmentModuleError();
    }
}
exports.CTIAssessmentModuleError = CTIAssessmentModuleError;


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.right = exports.left = exports.Right = exports.Left = void 0;
class Left {
    constructor(value) {
        this.value = value;
    }
    isLeft() {
        return true;
    }
    isRight() {
        return false;
    }
}
exports.Left = Left;
class Right {
    constructor(value) {
        this.value = value;
    }
    isLeft() {
        return false;
    }
    isRight() {
        return true;
    }
}
exports.Right = Right;
const left = (l) => {
    return new Left(l);
};
exports.left = left;
const right = (a) => {
    return new Right(a);
};
exports.right = right;


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CtisController = void 0;
const common_1 = __webpack_require__(3);
const ctis_service_1 = __webpack_require__(6);
const create_cti_dto_1 = __webpack_require__(26);
const CTIModuleException = __webpack_require__(16);
const express_1 = __webpack_require__(28);
const cti_mapper_1 = __webpack_require__(29);
const get_user_id_decorator_1 = __webpack_require__(30);
let CtisController = class CtisController {
    constructor(ctisService) {
        this.ctisService = ctisService;
    }
    processException(exception, res) {
        switch (exception.constructor) {
            case CTIModuleException.CTINotFound:
                res.status(common_1.HttpStatus.NOT_FOUND);
                res.json({ errors: { message: exception.errorValue().message } });
                res.send();
                return;
            case CTIModuleException.InvalidSTIXFormat:
                res.status(common_1.HttpStatus.BAD_REQUEST);
                res.json({ errors: { message: exception.errorValue().message } });
                res.send();
                return;
            case CTIModuleException.CTIAssessmentModuleError:
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                res.json({ errors: { message: exception.errorValue().message } });
                res.send();
                return;
            default:
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                res.json({ errors: { message: 'Internal server error' } });
                res.send();
        }
    }
    async uploadCTI(createCTIDto, userId, res) {
        const result = await this.ctisService.uploadCTI(createCTIDto.name, createCTIDto.description, createCTIDto.content, userId);
        if (result.isLeft()) {
            this.processException(result.value, res);
        }
        else {
            res.status(common_1.HttpStatus.OK);
            res.json(cti_mapper_1.CTIMapper.toDTO(result.value.getValue()));
            res.send();
        }
    }
    async getAllCTIs(res) {
        const ctis = await this.ctisService.getAllCTIs();
        res.status(common_1.HttpStatus.OK);
        res.json({ data: ctis.map((cti) => cti_mapper_1.CTIMapper.toDTO(cti)) });
        res.end();
    }
    async getCTI(id) {
        return this.ctisService.getCTIById(id);
    }
};
exports.CtisController = CtisController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_id_decorator_1.GetUserId)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_cti_dto_1.CreateCTIDto !== "undefined" && create_cti_dto_1.CreateCTIDto) === "function" ? _b : Object, String, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], CtisController.prototype, "uploadCTI", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], CtisController.prototype, "getAllCTIs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CtisController.prototype, "getCTI", null);
exports.CtisController = CtisController = __decorate([
    (0, common_1.Controller)('ctis'),
    __metadata("design:paramtypes", [typeof (_a = typeof ctis_service_1.CtisService !== "undefined" && ctis_service_1.CtisService) === "function" ? _a : Object])
], CtisController);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCTIDto = void 0;
const class_validator_1 = __webpack_require__(27);
class CreateCTIDto {
}
exports.CreateCTIDto = CreateCTIDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCTIDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCTIDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsJSON)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCTIDto.prototype, "content", void 0);


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTIMapper = void 0;
const Domain = __webpack_require__(9);
const UniqueEntityID_1 = __webpack_require__(12);
class CTIMapper {
    static toDomain(raw) {
        const cti = Domain.CTI.create({
            name: raw.name,
            description: raw.description,
            owner: raw.owner,
            content: raw.content,
            qualityValue: raw.qualityValue,
            sharedAt: raw.sharedAt,
        }, new UniqueEntityID_1.UniqueEntityID(raw.id));
        return cti.getValue();
    }
    static toPersistence(cti) {
        return {
            id: cti.id,
            name: cti.name,
            description: cti.description,
            owner: cti.owner,
            content: cti.content,
            qualityValue: cti.qualityValue,
            sharedAt: cti.sharedAt,
        };
    }
    static toDTO(cti) {
        return {
            id: cti.id,
            name: cti.name,
            description: cti.description,
            owner: cti.owner,
            qualityValue: cti.qualityValue,
            sharedAt: cti.sharedAt,
        };
    }
}
exports.CTIMapper = CTIMapper;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserId = void 0;
const common_1 = __webpack_require__(3);
exports.GetUserId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('GetUserId');
    console.log(request.user.sub);
    return request.user?.sub || null;
});


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTISchema = exports.CTI = void 0;
const mongoose_1 = __webpack_require__(4);
let CTI = class CTI {
};
exports.CTI = CTI;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CTI.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CTI.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CTI.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CTI.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CTI.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CTI.prototype, "qualityValue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CTI.prototype, "sharedAt", void 0);
exports.CTI = CTI = __decorate([
    (0, mongoose_1.Schema)()
], CTI);
exports.CTISchema = mongoose_1.SchemaFactory.createForClass(CTI);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTIMongoRepository = void 0;
const _ctis_repository_1 = __webpack_require__(7);
const Persistence = __webpack_require__(33);
const mongoose_1 = __webpack_require__(4);
const common_1 = __webpack_require__(3);
const mongoose_2 = __webpack_require__(34);
const cti_mapper_1 = __webpack_require__(29);
let CTIMongoRepository = class CTIMongoRepository extends _ctis_repository_1.CTIRepository {
    constructor(ctiModel) {
        super();
        this.ctiModel = ctiModel;
    }
    async findAll() {
        return this.ctiModel
            .find()
            .exec()
            .then((docs) => docs.map(cti_mapper_1.CTIMapper.toDomain));
    }
    async save(cti) {
        return this.ctiModel
            .insertOne(cti_mapper_1.CTIMapper.toPersistence(cti))
            .then(cti_mapper_1.CTIMapper.toDomain);
    }
    async findById(id) {
        return this.ctiModel.findOne({ id }).exec().then(cti_mapper_1.CTIMapper.toDomain);
    }
};
exports.CTIMongoRepository = CTIMongoRepository;
exports.CTIMongoRepository = CTIMongoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Persistence.CTI.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CTIMongoRepository);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTI = void 0;
const CTI_1 = __webpack_require__(31);
Object.defineProperty(exports, "CTI", ({ enumerable: true, get: function () { return CTI_1.CTI; } }));


/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersManagementModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(36);
const users_module_1 = __webpack_require__(37);
const auth_module_1 = __webpack_require__(61);
let UsersManagementModule = class UsersManagementModule {
};
exports.UsersManagementModule = UsersManagementModule;
exports.UsersManagementModule = UsersManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: '127.0.0.1',
                port: 5432,
                username: 'root',
                password: 'root',
                database: 'test',
                autoLoadEntities: true,
                synchronize: true,
                logging: false,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
        ],
        exports: [users_module_1.UsersModule, auth_module_1.AuthModule],
    })
], UsersManagementModule);


/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(3);
const users_controller_1 = __webpack_require__(38);
const users_service_1 = __webpack_require__(39);
const typeorm_1 = __webpack_require__(36);
const Persistence = __webpack_require__(56);
const users_repository_1 = __webpack_require__(46);
const users_repository_typeorm_1 = __webpack_require__(59);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Persistence.Organization])],
        controllers: [users_controller_1.UsersController],
        providers: [
            {
                provide: users_repository_1.UserRepository,
                useClass: users_repository_typeorm_1.OrganizationRepositoryTypeOrm,
            },
            users_service_1.UsersService,
        ],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersController_1;
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(3);
const express_1 = __webpack_require__(28);
const users_service_1 = __webpack_require__(39);
const create_organization_dto_1 = __webpack_require__(53);
const UserModuleException = __webpack_require__(47);
const public_decorator_1 = __webpack_require__(54);
const organization_mapper_1 = __webpack_require__(55);
const microservices_1 = __webpack_require__(23);
let UsersController = UsersController_1 = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    static processException(exception, res) {
        switch (exception.constructor) {
            case UserModuleException.PasswordIsNotValid:
                res.status(common_1.HttpStatus.CONFLICT);
                res.json({ errors: { message: exception.errorValue().message } });
                res.send();
                return;
            case UserModuleException.OrganizationNameIsTaken:
                res.status(common_1.HttpStatus.CONFLICT);
                res.json({ errors: { message: exception.errorValue().message } });
                res.send();
                return;
            case UserModuleException.OrganizationNotFound:
                res.status(common_1.HttpStatus.NOT_FOUND);
                res.json({ errors: { message: exception.errorValue().message } });
                res.send();
                return;
            case UserModuleException.OrganizationNotCreated:
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                res.json({ errors: { message: exception.errorValue().message } });
                res.send();
                return;
            default:
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                res.json({ errors: { message: 'Internal server error' } });
                res.send();
        }
    }
    async createOrganization(createOrganizationDto, res) {
        const result = await this.usersService.createOrganization(createOrganizationDto);
        if (result.isLeft()) {
            UsersController_1.processException(result.value, res);
        }
        else {
            const organization = result.value;
            const location = `/organizations/${organization.getValue().id}`;
            res.status(common_1.HttpStatus.OK);
            res.location(location);
            res.send();
        }
    }
    async getOrganizationReputation(data) {
        const result = await this.usersService.getReputationFromOrg(data);
        if (result.isLeft()) {
            return -1;
        }
        return result.value.getValue();
    }
    async updateOrganizationReputation(data) {
        const result = await this.usersService.updateOrganizationReputation(data.orgId, data.newReputation);
        if (result.isLeft()) {
            return 'ERROR';
        }
        return 'OK';
    }
    async getAllOrganizations(res) {
        const result = await this.usersService.getAllOrganizations();
        res.status(common_1.HttpStatus.OK);
        res.json({ data: result.map((org) => organization_mapper_1.OrganizationMapper.toDto(org)) });
        res.end();
    }
    async getOrganizationById(res, id) {
        const result = await this.usersService.getOrganizationById(id);
        if (result.isLeft()) {
            UsersController_1.processException(result.value, res);
        }
        else {
            res.status(common_1.HttpStatus.OK);
            res.json(result.value.getValue());
            res.send();
        }
    }
    async getOrganizationByName(res, name) {
        const result = await this.usersService.getOrganizationByName(name);
        if (result.isLeft()) {
            UsersController_1.processException(result.value, res);
        }
        else {
            res.status(common_1.HttpStatus.OK);
            res.json(result.value.getValue());
            res.send();
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_organization_dto_1.CreateOrganizationDto !== "undefined" && create_organization_dto_1.CreateOrganizationDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createOrganization", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_reputation' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersController.prototype, "getOrganizationReputation", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_reputation' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UsersController.prototype, "updateOrganizationReputation", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllOrganizations", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOrganizationById", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOrganizationByName", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)('organizations'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(3);
const Domain = __webpack_require__(40);
const Result_1 = __webpack_require__(15);
const users_repository_1 = __webpack_require__(46);
const Either_1 = __webpack_require__(22);
const Exceptions = __webpack_require__(47);
const role_enum_1 = __webpack_require__(52);
let UsersService = class UsersService {
    constructor(organizationRepository) {
        this.organizationRepository = organizationRepository;
    }
    async createOrganization(organizationValues) {
        const passwordOrError = await Domain.Password.create({
            value: organizationValues.password,
            hashed: false,
        });
        if (passwordOrError.isFailure) {
            return (0, Either_1.left)(Exceptions.PasswordIsNotValid.create(passwordOrError.error.toString()));
        }
        const organizationExists = await this.organizationRepository.findByName(organizationValues.name);
        if (organizationExists) {
            return (0, Either_1.left)(Exceptions.OrganizationNameIsTaken.create(organizationValues.name));
        }
        const result = Domain.Organization.create({
            roles: [role_enum_1.Role.User],
            name: organizationValues.name,
            password: passwordOrError.getValue(),
            description: organizationValues.description,
            reputation: 0,
            createdAt: new Date(),
        });
        if (result.isFailure) {
            return (0, Either_1.left)(Exceptions.OrganizationNotCreated.create(result.error.toString()));
        }
        const newOrganization = result.getValue();
        this.organizationRepository.save(newOrganization);
        return (0, Either_1.right)(Result_1.Result.ok(newOrganization));
    }
    async getAllOrganizations() {
        const orgs = await this.organizationRepository.findAll();
        const resolvedOrgs = await Promise.all(orgs);
        return resolvedOrgs;
    }
    async getReputationFromOrg(orgId) {
        const org = await this.organizationRepository.findById(orgId);
        if (org === null) {
            return (0, Either_1.left)(Exceptions.OrganizationNotFound.create(orgId));
        }
        return (0, Either_1.right)(Result_1.Result.ok(org.reputation));
    }
    async updateOrganizationReputation(orgId, newReputation) {
        const org = await this.organizationRepository.findById(orgId);
        if (org === null) {
            return (0, Either_1.left)(Exceptions.OrganizationNotFound.create(orgId));
        }
        org.reputation = newReputation;
        await this.organizationRepository.save(org);
        return (0, Either_1.right)(Result_1.Result.ok());
    }
    async getOrganizationById(id) {
        const org = await this.organizationRepository.findById(id);
        if (org === null) {
            return (0, Either_1.left)(Exceptions.OrganizationNotFound.create(id));
        }
        return (0, Either_1.right)(Result_1.Result.ok(org));
    }
    async getOrganizationByName(name) {
        const org = await this.organizationRepository.findByName(name);
        if (org === null) {
            return (0, Either_1.left)(Exceptions.OrganizationNotFound.create(name));
        }
        return (0, Either_1.right)(Result_1.Result.ok(org));
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UserRepository !== "undefined" && users_repository_1.UserRepository) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Password = exports.Organization = void 0;
const Organization_1 = __webpack_require__(41);
Object.defineProperty(exports, "Organization", ({ enumerable: true, get: function () { return Organization_1.Organization; } }));
const Password_1 = __webpack_require__(42);
Object.defineProperty(exports, "Password", ({ enumerable: true, get: function () { return Password_1.Password; } }));


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Organization = void 0;
const Entity_1 = __webpack_require__(11);
const Result_1 = __webpack_require__(15);
class Organization extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    get id() {
        return this._id.toString();
    }
    get roles() {
        return this.props.roles;
    }
    set roles(value) {
        this.props.roles = value;
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value;
    }
    get password() {
        return this.props.password;
    }
    set password(value) {
        this.props.password = value;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value;
    }
    get reputation() {
        return this.props.reputation;
    }
    set reputation(value) {
        this.props.reputation = value;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    set createdAt(value) {
        this.props.createdAt = value;
    }
    static create(props, id) {
        const organization = new Organization(props, id);
        return Result_1.Result.ok(organization);
    }
}
exports.Organization = Organization;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Password = void 0;
const ValueObject_1 = __webpack_require__(43);
const Result_1 = __webpack_require__(15);
const bcrypt = __webpack_require__(45);
class Password extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    get hashed() {
        return this.props.hashed;
    }
    isHashed() {
        return this.props.hashed;
    }
    static async hashPassword(password) {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    static isSecure(value) {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(value);
    }
    static async create(props) {
        if (props.value === undefined ||
            props.hashed === undefined ||
            props.value === null ||
            props.hashed === null) {
            return Result_1.Result.fail('Password cannot be null or undefined');
        }
        if (!props.hashed) {
            if (!this.isSecure(props.value)) {
                return Result_1.Result.fail('The password is not secure. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).');
            }
            const hashedPassword = await this.hashPassword(props.value);
            return Result_1.Result.ok(new Password({ value: hashedPassword, hashed: true }));
        }
        return Result_1.Result.ok(new Password({ value: props.value, hashed: true }));
    }
}
exports.Password = Password;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueObject = void 0;
const shallow_equal_object_1 = __webpack_require__(44);
class ValueObject {
    constructor(props) {
        this.props = Object.freeze(props);
    }
    equals(vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return (0, shallow_equal_object_1.shallowEqual)(this.props, vo.props);
    }
}
exports.ValueObject = ValueObject;


/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("shallow-equal-object");

/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const repository_1 = __webpack_require__(8);
class UserRepository extends repository_1.Repository {
}
exports.UserRepository = UserRepository;


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationNotCreated = exports.OrganizationNotFound = exports.OrganizationNameIsTaken = exports.PasswordIsNotValid = void 0;
const PasswordIsNotValid_1 = __webpack_require__(48);
Object.defineProperty(exports, "PasswordIsNotValid", ({ enumerable: true, get: function () { return PasswordIsNotValid_1.PasswordIsNotValid; } }));
const OrganizationNameIsTaken_1 = __webpack_require__(49);
Object.defineProperty(exports, "OrganizationNameIsTaken", ({ enumerable: true, get: function () { return OrganizationNameIsTaken_1.OrganizationNameIsTaken; } }));
const OrganizationNotFound_1 = __webpack_require__(50);
Object.defineProperty(exports, "OrganizationNotFound", ({ enumerable: true, get: function () { return OrganizationNotFound_1.OrganizationNotFound; } }));
const OrganizationNotCreated_1 = __webpack_require__(51);
Object.defineProperty(exports, "OrganizationNotCreated", ({ enumerable: true, get: function () { return OrganizationNotCreated_1.OrganizationNotCreated; } }));


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordIsNotValid = void 0;
const Exception_1 = __webpack_require__(18);
class PasswordIsNotValid extends Exception_1.Exception {
    constructor(message) {
        super(message);
    }
    static create(message) {
        return new PasswordIsNotValid(message);
    }
}
exports.PasswordIsNotValid = PasswordIsNotValid;


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationNameIsTaken = void 0;
const Exception_1 = __webpack_require__(18);
class OrganizationNameIsTaken extends Exception_1.Exception {
    constructor(name) {
        super(`The name "${name}" for the new organization is already taken`);
    }
    static create(name) {
        return new OrganizationNameIsTaken(name);
    }
}
exports.OrganizationNameIsTaken = OrganizationNameIsTaken;


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationNotFound = void 0;
const Exception_1 = __webpack_require__(18);
class OrganizationNotFound extends Exception_1.Exception {
    constructor(id) {
        super(`The organization with id "${id}" does not exist`);
    }
    static create(id) {
        return new OrganizationNotFound(id);
    }
}
exports.OrganizationNotFound = OrganizationNotFound;


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationNotCreated = void 0;
const Exception_1 = __webpack_require__(18);
class OrganizationNotCreated extends Exception_1.Exception {
    constructor(message) {
        super(message);
    }
    static create(message) {
        return new OrganizationNotCreated(message);
    }
}
exports.OrganizationNotCreated = OrganizationNotCreated;


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role || (exports.Role = Role = {}));


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOrganizationDto = void 0;
const class_validator_1 = __webpack_require__(27);
class CreateOrganizationDto {
}
exports.CreateOrganizationDto = CreateOrganizationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "description", void 0);


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationMapper = void 0;
const UniqueEntityID_1 = __webpack_require__(12);
const Domain = __webpack_require__(40);
class OrganizationMapper {
    static async toDomain(raw) {
        const password = await Domain.Password.create({
            value: raw.password,
            hashed: true,
        });
        const organization = Domain.Organization.create({
            roles: raw.roles,
            name: raw.name,
            password: password.getValue(),
            description: raw.description,
            reputation: raw.reputation,
            createdAt: raw.createdAt,
        }, new UniqueEntityID_1.UniqueEntityID(raw.id));
        return organization.getValue();
    }
    static toPersistence(org) {
        return {
            id: org.id,
            roles: org.roles,
            name: org.name,
            password: org.password.value,
            description: org.description,
            reputation: org.reputation,
            createdAt: org.createdAt,
        };
    }
    static toDto(org) {
        return {
            id: org.id,
            name: org.name,
            description: org.description,
            reputation: org.reputation,
        };
    }
}
exports.OrganizationMapper = OrganizationMapper;


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Organization = void 0;
const Organization_1 = __webpack_require__(57);
Object.defineProperty(exports, "Organization", ({ enumerable: true, get: function () { return Organization_1.Organization; } }));


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Organization = void 0;
const role_enum_1 = __webpack_require__(52);
const typeorm_1 = __webpack_require__(58);
let Organization = class Organization {
};
exports.Organization = Organization;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], Organization.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
        default: [role_enum_1.Role.User],
    }),
    __metadata("design:type", Array)
], Organization.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Organization.prototype, "reputation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Organization.prototype, "createdAt", void 0);
exports.Organization = Organization = __decorate([
    (0, typeorm_1.Entity)()
], Organization);


/***/ }),
/* 58 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationRepositoryTypeOrm = void 0;
const common_1 = __webpack_require__(3);
const users_repository_1 = __webpack_require__(46);
const typeorm_1 = __webpack_require__(36);
const Persistence = __webpack_require__(56);
const Repository_1 = __webpack_require__(60);
const organization_mapper_1 = __webpack_require__(55);
let OrganizationRepositoryTypeOrm = class OrganizationRepositoryTypeOrm extends users_repository_1.UserRepository {
    constructor(organizationRepository) {
        super();
        this.organizationRepository = organizationRepository;
    }
    save(entity) {
        return this.organizationRepository
            .save(organization_mapper_1.OrganizationMapper.toPersistence(entity))
            .then((org) => organization_mapper_1.OrganizationMapper.toDomain(org));
    }
    async findById(id) {
        const existsOrganization = await this.organizationRepository.findOneBy({
            id,
        });
        if (!!existsOrganization === true) {
            return organization_mapper_1.OrganizationMapper.toDomain(existsOrganization);
        }
        return null;
    }
    async findByName(name) {
        const existsOrganization = await this.organizationRepository.findOneBy({
            name,
        });
        if (!!existsOrganization === true) {
            return organization_mapper_1.OrganizationMapper.toDomain(existsOrganization);
        }
        return null;
    }
    async findAll() {
        const organizations = await this.organizationRepository.find();
        return organizations.map(async (org) => {
            const obj = await organization_mapper_1.OrganizationMapper.toDomain(org);
            return obj;
        });
    }
};
exports.OrganizationRepositoryTypeOrm = OrganizationRepositoryTypeOrm;
exports.OrganizationRepositoryTypeOrm = OrganizationRepositoryTypeOrm = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Persistence.Organization)),
    __metadata("design:paramtypes", [typeof (_a = typeof Repository_1.Repository !== "undefined" && Repository_1.Repository) === "function" ? _a : Object])
], OrganizationRepositoryTypeOrm);


/***/ }),
/* 60 */
/***/ ((module) => {

module.exports = require("typeorm/repository/Repository");

/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(3);
const auth_controller_1 = __webpack_require__(62);
const auth_service_1 = __webpack_require__(63);
const users_module_1 = __webpack_require__(37);
const jwt_1 = __webpack_require__(64);
const constants_1 = __webpack_require__(69);
const core_1 = __webpack_require__(1);
const auth_guard_1 = __webpack_require__(70);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '3600s' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(63);
const sign_in_dto_1 = __webpack_require__(68);
const public_decorator_1 = __webpack_require__(54);
const express_1 = __webpack_require__(28);
const AuthModuleException = __webpack_require__(65);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(signInDto, res) {
        const result = await this.authService.signIn(signInDto.username, signInDto.password);
        if (result.isLeft()) {
            switch (result.value.constructor) {
                case AuthModuleException.UserNotFound:
                    res.status(common_1.HttpStatus.NOT_FOUND);
                    res.json({ errors: { message: result.value.errorValue().message } });
                    res.send();
                    return;
                case AuthModuleException.UnauthorizedUser:
                    res.status(common_1.HttpStatus.UNAUTHORIZED);
                    res.json({ errors: { message: result.value.errorValue().message } });
                    res.send();
                    return;
                default:
                    res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    res.json({ errors: { message: 'Internal server error' } });
                    res.send();
                    return;
            }
        }
        res.status(common_1.HttpStatus.OK);
        res.json(result.value);
        res.end();
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof sign_in_dto_1.SignInDto !== "undefined" && sign_in_dto_1.SignInDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(39);
const jwt_1 = __webpack_require__(64);
const Either_1 = __webpack_require__(22);
const AuthModuleException = __webpack_require__(65);
const bcrypt = __webpack_require__(45);
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn(username, pass) {
        const result = await this.usersService.getOrganizationByName(username);
        if (result.isLeft()) {
            return (0, Either_1.left)(AuthModuleException.UserNotFound.create(username));
        }
        const organization = result.value.getValue();
        if (!bcrypt.compareSync(pass, organization.password.value)) {
            return (0, Either_1.left)(AuthModuleException.UnauthorizedUser.create());
        }
        const payload = {
            sub: organization.id,
            username: organization.name,
            roles: organization.roles,
        };
        return (0, Either_1.right)({
            access_token: await this.jwtService.signAsync(payload),
            user_id: organization.id,
            username: organization.name,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 64 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserNotFound = exports.UnauthorizedUser = void 0;
const UnathorizedUser_1 = __webpack_require__(66);
Object.defineProperty(exports, "UnauthorizedUser", ({ enumerable: true, get: function () { return UnathorizedUser_1.UnauthorizedUser; } }));
const UserNotFound_1 = __webpack_require__(67);
Object.defineProperty(exports, "UserNotFound", ({ enumerable: true, get: function () { return UserNotFound_1.UserNotFound; } }));


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnauthorizedUser = void 0;
const Exception_1 = __webpack_require__(18);
class UnauthorizedUser extends Exception_1.Exception {
    constructor() {
        super('Authentication is required');
    }
    static create() {
        return new UnauthorizedUser();
    }
}
exports.UnauthorizedUser = UnauthorizedUser;


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserNotFound = void 0;
const Exception_1 = __webpack_require__(18);
class UserNotFound extends Exception_1.Exception {
    constructor(userName) {
        super(`User with username "${userName}" not found`);
    }
    static create(userName) {
        return new UserNotFound(userName);
    }
}
exports.UserNotFound = UserNotFound;


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInDto = void 0;
const class_validator_1 = __webpack_require__(27);
class SignInDto {
}
exports.SignInDto = SignInDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignInDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(64);
const constants_1 = __webpack_require__(69);
const core_1 = __webpack_require__(1);
const public_decorator_1 = __webpack_require__(54);
let AuthGuard = class AuthGuard {
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: constants_1.jwtConstants.secret,
            });
            request['user'] = payload;
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object])
], AuthGuard);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const cti_management_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(cti_management_module_1.CtiManagementModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: false,
    }));
    app.enableCors();
    await app.listen(process.env.port ?? 3002);
}
bootstrap();

})();

/******/ })()
;