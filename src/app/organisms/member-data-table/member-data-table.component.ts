import { Component, Input } from "@angular/core";
import { SubscriptionAgeMode } from 'src/app/models/SubscriptionAgeMode.enum';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'member-data-table',
  templateUrl: './member-data-table.component.html',
  styleUrls: ['./member-data-table.component.scss']
})
export class MemberDataTable {
  @Input() membersData;
  @Input() subscriptionAgeMode: SubscriptionAgeMode;

  public readonly ADULT_EXCEL_URL = `${environment.apiUrl}/subscription/adult/excel`;

  public onOpenMemberManager(member, index): void{
    console.log('open edit modal')
  }
}
