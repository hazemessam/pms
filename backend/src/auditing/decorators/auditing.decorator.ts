import { SetMetadata } from '@nestjs/common';

export const IS_AUDITABLE = 'isAuditable';
export const Auditable = () => SetMetadata(IS_AUDITABLE, true);
