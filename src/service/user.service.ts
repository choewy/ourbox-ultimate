import { UserStatus, UserType } from '@/persistence/enums';
import { User } from '@/persistence/types';

export class UserService {
  public getProfileText(user: User) {
    if (user == null) {
      return '';
    }

    switch (user.type) {
      case UserType.Admin:
        return `${user.name}(통합관리자)`;

      case UserType.PartnerAdmin:
        return `${user.name}(${user.partner?.name} 관리자)`;

      case UserType.PartnerUser:
        return `${user.name}(${user.partner?.name} ${user.partnerChannel?.name} 판매채널 사용자)`;

      case UserType.FulfillmentAdmin:
        return `${user.name}(${user.fulfillment?.name} 관리자)`;

      case UserType.FulfillmentUser:
        return `${user.name}(${user.fulfillment?.name} ${user.fulfillmentCenter?.name} 센터 사용자)`;

      default:
        return `${user.name}(${user.status})`;
    }
  }

  public getUserTypeTett(type: UserType) {
    switch (type) {
      case UserType.Admin:
        return '관리자';

      case UserType.FulfillmentAdmin:
        return '풀필먼트 관리자';

      case UserType.FulfillmentUser:
        return '풀필먼트 사용자';

      case UserType.PartnerAdmin:
        return '고객사 관리자';

      case UserType.PartnerUser:
        return '고객사 사용자';

      default:
        return type;
    }
  }

  public getUserStatusText(status: UserStatus) {
    switch (status) {
      case UserStatus.Activated:
        return '사용';

      case UserStatus.Disabled:
        return '차단';

      default:
        return status;
    }
  }

  public getUserTypeMaps() {
    return [
      {
        label: '관리자',
        value: UserType.Admin,
      },
      {
        label: '고객사 관리자',
        value: UserType.PartnerAdmin,
      },
      {
        label: '고객사 사용자',
        value: UserType.PartnerUser,
      },
      {
        label: '풀필먼트 관리자',
        value: UserType.FulfillmentAdmin,
      },
      {
        label: '풀필먼트 사용자',
        value: UserType.FulfillmentUser,
      },
    ];
  }

  public getUserStatusMaps() {
    return [
      {
        label: '사용',
        value: UserStatus.Activated,
      },
      {
        label: '차단',
        value: UserStatus.Disabled,
      },
    ];
  }

  public getUserKeywordMaps() {
    return [
      {
        label: '번호',
        value: 'id',
      },
      {
        label: '이름',
        value: 'name',
      },
      {
        label: '이메일',
        value: 'email',
      },
      {
        label: '고객사명',
        value: 'partner',
      },
      {
        label: '판매채널명',
        value: 'partnerChannel',
      },
      {
        label: '풀필먼트명',
        value: 'fulfillment',
      },
      {
        label: '센터명',
        value: 'fulfillmentCetner',
      },
    ];
  }
}

export const userService = new UserService();
