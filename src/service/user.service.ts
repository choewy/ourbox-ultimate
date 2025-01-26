import { UserSearchKeywordField, UserStatus, UserType } from '@/persistence/enums';
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
        return '통합관리자';

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

  public getSearchTypeOptions(user?: User) {
    const options = [
      {
        label: '통합관리자',
        value: UserType.Admin,
        targets: [UserType.Admin],
      },
      {
        label: '고객사 관리자',
        value: UserType.PartnerAdmin,
        targets: [UserType.Admin, UserType.PartnerAdmin],
      },
      {
        label: '고객사 사용자',
        value: UserType.PartnerUser,
        targets: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser],
      },
      {
        label: '풀필먼트 관리자',
        value: UserType.FulfillmentAdmin,
        targets: [UserType.Admin, UserType.FulfillmentAdmin],
      },
      {
        label: '풀필먼트 사용자',
        value: UserType.FulfillmentUser,
        targets: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
      },
    ];

    return user ? options.filter((option) => option.targets.includes(user?.type)) : options;
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

  public getSearchKeywordFieldOptions(user?: User) {
    const options = [
      {
        label: '선택',
        value: UserSearchKeywordField.None,
        targets: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
      },
      {
        label: '번호',
        value: UserSearchKeywordField.UserId,
        targets: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
      },
      {
        label: '이름',
        value: UserSearchKeywordField.UserName,
        targets: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
      },
      {
        label: '이메일',
        value: UserSearchKeywordField.UserEmail,
        targets: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
      },
      {
        label: '고객사번호',
        value: UserSearchKeywordField.PartnerId,
        targets: [UserType.Admin],
      },
      {
        label: '고객사명',
        value: UserSearchKeywordField.PartnerName,
        targets: [UserType.Admin],
      },
      {
        label: '판매채널번호',
        value: UserSearchKeywordField.PartnerChannelId,
        targets: [UserType.Admin, UserType.PartnerAdmin],
      },
      {
        label: '판매채널명',
        value: UserSearchKeywordField.PartnerChannelName,
        targets: [UserType.Admin, UserType.PartnerAdmin],
      },
      {
        label: '풀필먼트번호',
        value: UserSearchKeywordField.FulfillmentId,
        targets: [UserType.Admin],
      },
      {
        label: '풀필먼트명',
        value: UserSearchKeywordField.FulfillmentName,
        targets: [UserType.Admin],
      },
      {
        label: '센터번호',
        value: UserSearchKeywordField.FulfillmentCenterId,
        targets: [UserType.Admin, UserType.FulfillmentAdmin],
      },
      {
        label: '센터명',
        value: UserSearchKeywordField.FulfillmentCenterName,
        targets: [UserType.Admin, UserType.FulfillmentAdmin],
      },
    ];

    return user ? options.filter((option) => option.targets.includes(user?.type)) : options;
  }
}

export const userService = new UserService();
