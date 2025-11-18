/**
 * @description This decorator would mark a request as Public.
 */
import { SetMetadata } from '@nestjs/common';
export const Public = () => SetMetadata('isPublic', true);
