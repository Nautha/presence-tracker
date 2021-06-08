import {ServiceLocator} from "./ServiceLocator";
// import {DatabaseConnector} from "../dataprovider/DatabaseConnector";
// import {HttpCaller} from "../dataprovider/HttpCaller";
// import {RoleRepository} from "../authentication/database/RoleRepository";
// import {PermissionRepository} from "../authentication/database/PermissionRepository";

function registerServices(sl: ServiceLocator) {
    //DataProviders
    // sl.register('DatabaseConnector', new DatabaseConnector());
    // sl.register('HttpCaller', new HttpCaller());
    //
    //RoleManagement
    // sl.register('RoleRepository', new RoleRepository(sl.get('DatabaseConnector')));
    //
    //PermissionManagement
    // sl.register('PermissionRepository', new PermissionRepository(sl.get('DatabaseConnector')));
}

export {registerServices};