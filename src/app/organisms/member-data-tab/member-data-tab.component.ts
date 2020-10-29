import { Component, Input } from "@angular/core";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'member-data-tab',
  templateUrl: './member-data-tab.component.html',
  styleUrls: ['./member-data-tab.component.scss']
})
export class MemberDataTab {
  @Input() membersData;

  public readonly ADULT_EXCEL_URL = `${environment.apiUrl}/subscription/adult/excel`;

  public onOpenMemberManager(member, index): void{
    console.log('open edit modal')
  }
}
