import {ERP_AVATAR_CATALOG_GENERATED} from './avatar-catalog.generated';

export type ErpAvatarGender = 'male' | 'female';
export type ErpAvatarPickerSize = 'default' | 'compact';

export interface ErpAvatarCatalogItem {
  readonly id: string;
  readonly gender: ErpAvatarGender;
  readonly imageUrl: string;
  readonly label?: string;
  readonly disabled?: boolean;
}

export const ERP_AVATAR_CATALOG: readonly ErpAvatarCatalogItem[] =
  ERP_AVATAR_CATALOG_GENERATED;
