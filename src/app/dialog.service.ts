import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogRef!: ComponentRef<DialogComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }

    openDialog(): Promise<boolean> {
      return new Promise((resolve) => {
        // Create the dialog component
        const factory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
        this.dialogRef = factory.create(this.injector);
        this.appRef.attachView(this.dialogRef.hostView);
  
        // Add the dialog component to the DOM
        document.body.appendChild(this.dialogRef.location.nativeElement);
  
        // Subscribe to dialog component events
        this.dialogRef.instance.confirmed.subscribe((result: boolean) => {
          this.closeDialog();
          resolve(result);
        });
      });
    }

    private closeDialog() {
      // Remove the dialog component from the DOM
      this.appRef.detachView(this.dialogRef.hostView);
      this.dialogRef.destroy();
    }
  
}
