import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {ClientChatComponent} from '../theme/components/addmition/choose/client-data/client-chat/client-chat.component';
import {DropdownDirective} from './dropdown.directive';
import {LanguageSwitcherComponent} from '../theme/layouts/language-switcher/language-switcher.component';
import { FilterPipe } from './filter.pipe';
import {ClientDataComponent} from '../theme/components/addmition/choose/client-data/client-data.component';
import {ClientWaitComponent} from '../theme/components/addmition/choose/client-data/client-wait/client-wait.component';
import {CardComponent} from '../theme/components/addmition/video-call-chat/card/card.component';
import {FooterComponent} from '../footer/footer.component';
import {CallTestingComponent} from '../theme/components/addmition/call-testing/call-testing.component';
import {DatepickerMaskDirective} from './datepicker-mask.directive';
import { InternationalPhoneModule } from 'ng4-country-phone-select';
import { ScrollDirective } from './scroll/scroll.directive';

import { PhonePrefixComponent } from './phone-prefix/component/phone-prefix.component';
import { PhoneCountryPipe } from './phone-prefix/phone-country.pipe';
import { PhoneOnlyNumberDirective } from './phone-prefix/phone-only-number.directive';

@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    FormsModule
  ],
  exports: [
    TextMaskModule,
    LanguageSwitcherComponent,
    ClientChatComponent,
    ClientWaitComponent,
    ClientDataComponent,
    CardComponent,
    FilterPipe,
    FooterComponent,
    CallTestingComponent,
    ScrollDirective,
    PhonePrefixComponent,
    DatepickerMaskDirective
  ],
  declarations: [
    LanguageSwitcherComponent,
    ClientChatComponent,
    ClientWaitComponent,
    ClientDataComponent,
    CardComponent,
    DropdownDirective,
    FilterPipe,
    FooterComponent,
    CallTestingComponent,
    DatepickerMaskDirective,
    PhonePrefixComponent,
    ScrollDirective,

    PhoneCountryPipe,
    PhoneOnlyNumberDirective,
    PhonePrefixComponent
  ]
})
export class SharedModule {
}
