import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpStatusBadgeTone} from '../status-badge/status-badge';

export interface ErpNavigationBadge {
  readonly label: string;
  readonly tone?: ErpStatusBadgeTone;
}

export interface ErpNavigationItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: ErpIconName;
  readonly href?: string;
  readonly disabled?: boolean;
  readonly children?: readonly ErpNavigationItem[];
  readonly badge?: ErpNavigationBadge;
}

export interface ErpBreadcrumbItem {
  readonly id: string;
  readonly label: string;
  readonly href?: string;
  readonly icon?: ErpIconName;
}

export interface ErpShellUserSummary {
  readonly displayName: string;
  readonly secondaryText?: string;
  readonly avatarSrc?: string;
  readonly fallbackIcon?: ErpIconName;
}

export interface ErpBranchOption {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly disabled?: boolean;
}

export interface ErpGlobalSearchResult {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly category?: string;
  readonly icon?: ErpIconName;
  readonly disabled?: boolean;
}

export interface ErpNotificationSummary {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon?: ErpIconName;
  readonly read?: boolean;
  readonly disabled?: boolean;
}

export interface ErpUserMenuItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: ErpIconName;
  readonly disabled?: boolean;
  readonly tone?: 'neutral' | 'danger';
}
