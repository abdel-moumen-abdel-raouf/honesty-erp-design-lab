export type ErpAvatarGender = 'male' | 'female';

export interface ErpAvatarCatalogItem {
  readonly id: string;
  readonly gender: ErpAvatarGender;
  readonly imageUrl: string;
}

function avatarItems(
  gender: ErpAvatarGender,
  start: number,
  end: number,
): readonly ErpAvatarCatalogItem[] {
  return Object.freeze(
    Array.from({length: end - start + 1}, (_, index) => {
      const number = String(start + index).padStart(2, '0');
      return Object.freeze({
        id: `avatar-${number}`,
        gender,
        imageUrl: `/assets/honesty-erp-avatars/users/${gender}/avatar-${number}.png`,
      });
    }),
  );
}

export const ERP_AVATAR_CATALOG: readonly ErpAvatarCatalogItem[] = Object.freeze([
  ...avatarItems('male', 1, 20),
  ...avatarItems('female', 21, 40),
]);
