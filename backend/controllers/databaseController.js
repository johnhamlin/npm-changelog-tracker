"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models = require('../models/packagesModels.js');
const databaseController = {
    deletePackage: Function(),
};
databaseController.read = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Reading from the database...');
        const list = yield models.Package.find();
        console.log('data read!');
        console.log(list);
        res.locals.list = list;
        return next();
    }
    catch (error) {
        next({
            log: `Express caught error in databaseControllers.read. Err: ${error.message}`,
            status: 500,
            message: { err: 'An error occurred in databaseControllers.read' },
        });
    }
});
databaseController.addPackage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, version, repoOwner, repoName, github } = res.locals.package;
        if (!repoOwner || repoOwner === '' || !repoName || repoName === '') {
            return new Error(`Unable to find github associated with that package!`);
        }
        res.locals.newPackage = yield models.Package.create({
            name,
            version,
            github,
            repoOwner,
            repoName,
        });
        console.log('New package created in database!');
        return next();
    }
    catch (error) {
        next({
            log: `Express caught error in databaseControllers.addPackage. Err: ${error.message}`,
            status: 500,
            message: { err: 'An error occurred in databaseControllers.addPackage' },
        });
    }
});
databaseController.deletePackage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('got request to delete!');
        console.log(req.body);
        if (!req.body)
            return next();
        const { name, version } = req.body;
        console.log('Finding and deleting ', name, version);
        yield models.Package.findOneAndDelete({ name, version });
        return next();
    }
    catch (error) {
        next({
            log: `Express caught error in databaseControllers.deletePackage. Err: ${error.message}`,
            status: 500,
            message: {
                err: 'An error occurred in databaseControllers.deletePackage',
            },
        });
    }
});
databaseController.updatePackage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('got request to update!');
        console.log(req.body);
        if (!req.body)
            return next();
        const { name, oldVersion, newVersion } = req.body;
        console.log('Finding and updating ', name, oldVersion, newVersion);
        yield models.Package.findOneAndUpdate({ name, version: oldVersion }, { version: newVersion });
        return next();
    }
    catch (error) {
        next({
            log: `Express caught error in databaseControllers.updatePackage. Err: ${error.message}`,
            status: 500,
            message: {
                err: 'An error occurred in databaseControllers.updatePackage',
            },
        });
    }
});
module.exports = databaseController;
