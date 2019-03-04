import { Component, Input } from '@angular/core';
import { Company } from '../../models/company';

@Component ({
    selector: 'app-company-thumbnail',
    templateUrl: 'company-thumbnail.component.html',
    styles: [`
        .well div { color: #bbb; }
        .thumbnail { min-height: 210px }
    `]
})

export class CompanyThumbnailComponent {
    @Input() company: Company;
}
