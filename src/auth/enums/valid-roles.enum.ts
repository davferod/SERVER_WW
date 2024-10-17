/* eslint-disable prettier/prettier */

import { registerEnumType } from "@nestjs/graphql";


export enum ValidRoles {
    admin = 'admin',
    user = 'user',
    guest = 'guest',
    superadmin = 'superadmin',
}

registerEnumType(ValidRoles, {  name: 'ValidRoles' });