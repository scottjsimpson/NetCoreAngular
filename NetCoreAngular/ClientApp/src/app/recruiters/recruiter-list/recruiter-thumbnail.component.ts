import { Component, Input } from '@angular/core';
import { Recruiter } from '../../models/recruiter';

@Component ({
    selector: 'app-recruiter-thumbnail',
    templateUrl: 'recruiter-thumbnail.component.html',
    styles: [`
        .well div { color: #bbb; }
        .thumbnail { min-height: 210px }
    `]
})

export class RecruiterThumbnailComponent {
    @Input() recruiter: Recruiter;
}
