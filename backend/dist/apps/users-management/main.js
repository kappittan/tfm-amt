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
exports.UsersManagementModule = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(4);
const users_module_1 = __webpack_require__(5);
const core_1 = __webpack_require__(1);
const auth_guard_1 = __webpack_require__(38);
const auth_module_1 = __webpack_require__(41);
const roles_guard_1 = __webpack_require__(48);
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
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], UsersManagementModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

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
exports.UsersModule = void 0;
const common_1 = __webpack_require__(3);
const users_controller_1 = __webpack_require__(6);
const users_service_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(4);
const Persistence = __webpack_require__(33);
const users_repository_1 = __webpack_require__(19);
const users_repository_typeorm_1 = __webpack_require__(36);
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
var UsersController_1;
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(3);
const express_1 = __webpack_require__(7);
const users_service_1 = __webpack_require__(8);
const create_organization_dto_1 = __webpack_require__(29);
const UserModuleException = __webpack_require__(22);
const public_decorator_1 = __webpack_require__(31);
const organization_mapper_1 = __webpack_require__(32);
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
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllOrganizations", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOrganizationById", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOrganizationByName", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)('organizations'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 8 */
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
const Domain = __webpack_require__(9);
const Result_1 = __webpack_require__(15);
const users_repository_1 = __webpack_require__(19);
const Either_1 = __webpack_require__(21);
const Exceptions = __webpack_require__(22);
const role_enum_1 = __webpack_require__(28);
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
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Password = exports.Organization = void 0;
const Organization_1 = __webpack_require__(10);
Object.defineProperty(exports, "Organization", ({ enumerable: true, get: function () { return Organization_1.Organization; } }));
const Password_1 = __webpack_require__(16);
Object.defineProperty(exports, "Password", ({ enumerable: true, get: function () { return Password_1.Password; } }));


/***/ }),
/* 10 */
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
exports.Password = void 0;
const ValueObject_1 = __webpack_require__(17);
const Result_1 = __webpack_require__(15);
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
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
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
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueObject = void 0;
const shallow_equal_object_1 = __webpack_require__(18);
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
/* 18 */
/***/ ((module) => {

module.exports = require("shallow-equal-object");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const repository_1 = __webpack_require__(20);
class UserRepository extends repository_1.Repository {
}
exports.UserRepository = UserRepository;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Repository = void 0;
class Repository {
}
exports.Repository = Repository;


/***/ }),
/* 21 */
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
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationNotCreated = exports.OrganizationNotFound = exports.OrganizationNameIsTaken = exports.PasswordIsNotValid = void 0;
const PasswordIsNotValid_1 = __webpack_require__(23);
Object.defineProperty(exports, "PasswordIsNotValid", ({ enumerable: true, get: function () { return PasswordIsNotValid_1.PasswordIsNotValid; } }));
const OrganizationNameIsTaken_1 = __webpack_require__(25);
Object.defineProperty(exports, "OrganizationNameIsTaken", ({ enumerable: true, get: function () { return OrganizationNameIsTaken_1.OrganizationNameIsTaken; } }));
const OrganizationNotFound_1 = __webpack_require__(26);
Object.defineProperty(exports, "OrganizationNotFound", ({ enumerable: true, get: function () { return OrganizationNotFound_1.OrganizationNotFound; } }));
const OrganizationNotCreated_1 = __webpack_require__(27);
Object.defineProperty(exports, "OrganizationNotCreated", ({ enumerable: true, get: function () { return OrganizationNotCreated_1.OrganizationNotCreated; } }));


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordIsNotValid = void 0;
const Exception_1 = __webpack_require__(24);
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
/* 24 */
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
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationNameIsTaken = void 0;
const Exception_1 = __webpack_require__(24);
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
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationNotFound = void 0;
const Exception_1 = __webpack_require__(24);
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
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationNotCreated = void 0;
const Exception_1 = __webpack_require__(24);
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
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role || (exports.Role = Role = {}));


/***/ }),
/* 29 */
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
const class_validator_1 = __webpack_require__(30);
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
/* 30 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrganizationMapper = void 0;
const UniqueEntityID_1 = __webpack_require__(12);
const Domain = __webpack_require__(9);
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
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Organization = void 0;
const Organization_1 = __webpack_require__(34);
Object.defineProperty(exports, "Organization", ({ enumerable: true, get: function () { return Organization_1.Organization; } }));


/***/ }),
/* 34 */
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
const role_enum_1 = __webpack_require__(28);
const typeorm_1 = __webpack_require__(35);
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
/* 35 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 36 */
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
const users_repository_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(4);
const Persistence = __webpack_require__(33);
const Repository_1 = __webpack_require__(37);
const organization_mapper_1 = __webpack_require__(32);
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
/* 37 */
/***/ ((module) => {

module.exports = require("typeorm/repository/Repository");

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(39);
const constants_1 = __webpack_require__(40);
const core_1 = __webpack_require__(1);
const public_decorator_1 = __webpack_require__(31);
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


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};


/***/ }),
/* 41 */
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
const auth_controller_1 = __webpack_require__(42);
const auth_service_1 = __webpack_require__(43);
const users_module_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(39);
const constants_1 = __webpack_require__(40);
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
                signOptions: { expiresIn: '60s' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 42 */
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
const auth_service_1 = __webpack_require__(43);
const sign_in_dto_1 = __webpack_require__(47);
const public_decorator_1 = __webpack_require__(31);
const express_1 = __webpack_require__(7);
const AuthModuleException = __webpack_require__(44);
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
/* 43 */
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
const users_service_1 = __webpack_require__(8);
const domain_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(39);
const Either_1 = __webpack_require__(21);
const AuthModuleException = __webpack_require__(44);
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
        const hashedPassword = await domain_1.Password.hashPassword(pass);
        if (organization.password.value !== hashedPassword) {
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
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserNotFound = exports.UnauthorizedUser = void 0;
const UnathorizedUser_1 = __webpack_require__(45);
Object.defineProperty(exports, "UnauthorizedUser", ({ enumerable: true, get: function () { return UnathorizedUser_1.UnauthorizedUser; } }));
const UserNotFound_1 = __webpack_require__(46);
Object.defineProperty(exports, "UserNotFound", ({ enumerable: true, get: function () { return UserNotFound_1.UserNotFound; } }));


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnauthorizedUser = void 0;
const Exception_1 = __webpack_require__(24);
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
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserNotFound = void 0;
const Exception_1 = __webpack_require__(24);
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
/* 47 */
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
const class_validator_1 = __webpack_require__(30);
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
/* 48 */
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
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const role_decorator_1 = __webpack_require__(49);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        console.log('Ha entrado :)');
        const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (requiredRoles.some((role) => user.roles?.includes(role))) {
            return true;
        }
        throw new common_1.ForbiddenException('You do not have permission required to access this resource');
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


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
const users_management_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(users_management_module_1.UsersManagementModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: false,
    }));
    app.enableCors();
    await app.listen(process.env.port ?? 3000);
}
bootstrap();

})();

/******/ })()
;