import { Component, Input } from '@angular/core';
import { Job } from '../../models/job';

@Component ({
    selector: 'app-job-thumbnail',
    templateUrl: 'job-thumbnail.component.html',
    styles: [`
        .well div { color: #bbb; }
        .thumbnail { min-height: 210px }
    `]
})

export class JobThumbnailComponent {
    @Input() job: Job;
}
