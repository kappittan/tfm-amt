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
const ctis_controller_1 = __webpack_require__(16);
const CTI_1 = __webpack_require__(19);
const _ctis_repository_1 = __webpack_require__(7);
const ctis_mongo_repository_1 = __webpack_require__(20);
let CtisModule = class CtisModule {
};
exports.CtisModule = CtisModule;
exports.CtisModule = CtisModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'CTI', schema: CTI_1.CTISchema }])],
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CtisService = void 0;
const common_1 = __webpack_require__(3);
const _ctis_repository_1 = __webpack_require__(7);
const Domain = __webpack_require__(9);
let CtisService = class CtisService {
    constructor(ctiRepository) {
        this.ctiRepository = ctiRepository;
    }
    async getAllCTIs() {
        return this.ctiRepository.findAll();
    }
    async getCTIById(id) {
        return this.ctiRepository.findById(id);
    }
    async uploadCTI(name, description, content) {
        const cti = Domain.CTI.create({
            name,
            description,
            content,
            owner: 'test',
            qualityValue: 0,
            sharedAt: new Date(),
        });
        return this.ctiRepository.save(cti.getValue());
    }
};
exports.CtisService = CtisService;
exports.CtisService = CtisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof _ctis_repository_1.CTIRepository !== "undefined" && _ctis_repository_1.CTIRepository) === "function" ? _a : Object])
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
exports.CtisController = void 0;
const common_1 = __webpack_require__(3);
const ctis_service_1 = __webpack_require__(6);
const create_cti_dto_1 = __webpack_require__(17);
let CtisController = class CtisController {
    constructor(ctisService) {
        this.ctisService = ctisService;
    }
    async uploadCTI(createCTIDto) {
        return this.ctisService.uploadCTI(createCTIDto.name, createCTIDto.description, createCTIDto.content);
    }
    async getAllCTIs() {
        return this.ctisService.getAllCTIs();
    }
};
exports.CtisController = CtisController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_cti_dto_1.CreateCTIDto !== "undefined" && create_cti_dto_1.CreateCTIDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], CtisController.prototype, "uploadCTI", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CtisController.prototype, "getAllCTIs", null);
exports.CtisController = CtisController = __decorate([
    (0, common_1.Controller)('ctis'),
    __metadata("design:paramtypes", [typeof (_a = typeof ctis_service_1.CtisService !== "undefined" && ctis_service_1.CtisService) === "function" ? _a : Object])
], CtisController);


/***/ }),
/* 17 */
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
const class_validator_1 = __webpack_require__(18);
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
/* 18 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 19 */
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
/* 20 */
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
const Persistence = __webpack_require__(21);
const mongoose_1 = __webpack_require__(4);
const common_1 = __webpack_require__(3);
const mongoose_2 = __webpack_require__(22);
const cti_mapper_1 = __webpack_require__(23);
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
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CTI = void 0;
const CTI_1 = __webpack_require__(19);
Object.defineProperty(exports, "CTI", ({ enumerable: true, get: function () { return CTI_1.CTI; } }));


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 23 */
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
}
exports.CTIMapper = CTIMapper;


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
    await app.listen(process.env.port ?? 3000);
}
bootstrap();

})();

/******/ })()
;