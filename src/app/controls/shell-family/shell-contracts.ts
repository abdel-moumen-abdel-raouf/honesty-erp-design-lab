import {ErpIconName} from '../../primitives/icon/icon-contracts';
import {ErpAvatarPresence} from '../avatar/avatar';
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
  readonly email?: string;
  readonly roleLabel?: string;
  readonly branchLabel?: string;
  readonly avatarSrc?: string;
  readonly fallbackIcon?: ErpIconName;
  readonly avatarPresence?: Extract<
    ErpAvatarPresence,
    'online' | 'away' | 'busy' | 'offline'
  >;
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
  readonly timestamp?: string;
  readonly read?: boolean;
  readonly disabled?: boolean;
}

export interface ErpApplicationMenuItem {
  readonly id: string;
  readonly label: string;
  readonly icon: ErpIconName;
  readonly description?: string;
  readonly badge?: ErpNavigationBadge;
  readonly disabled?: boolean;
}

export interface ErpApplicationMenuGroup {
  readonly id: string;
  readonly label?: string;
  readonly items: readonly ErpApplicationMenuItem[];
}

export interface ErpMessageSummary {
  readonly id: string;
  readonly senderName: string;
  readonly preview: string;
  readonly timestamp: string;
  readonly avatarSrc?: string;
  readonly fallbackIcon?: ErpIconName;
  readonly read?: boolean;
  readonly disabled?: boolean;
}

export interface ErpUserMenuItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: ErpIconName;
  readonly disabled?: boolean;
  readonly tone?: 'neutral' | 'danger';
  readonly dividerBefore?: boolean;
}
