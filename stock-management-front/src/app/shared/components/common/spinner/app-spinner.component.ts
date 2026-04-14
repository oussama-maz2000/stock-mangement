import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, input } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div class="w-12 h-12 border-[5px] border-brand-500 border-b-transparent rounded-full animate-spin"></div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSpinnerComponent {

}