import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CustomSnackbarComponent } from "../../shared/dialogs/snackbar/custom-snackbar.component";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private _snackBarService: MatSnackBar = inject(MatSnackBar);
  private _router: Router = inject(Router);

  handleError(message: string = "Operation Unsuccessful") {
    this._openSnackBar(message, "error");
  }
  handleSuccessWithRouting(
    message: string = "Operation successful",
    navigateTo: string = ""
  ) {
    this._openSnackBar(message, "success");
    this._router.navigate([navigateTo]);
  }

  handleSuccess(message: string = "Operation successful") {
    this._openSnackBar(message, "success");
  }

  public _openSnackBar(message: string, type: "success" | "error") {
    console.log("Opening snackbar:", message, type); // Add this
    this._snackBarService.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: message,
        action: "close",
        snackBar: this._snackBarService,
        type: type,
      },
      duration: 5000,
      horizontalPosition: "end",
      //verticalPosition: 'top',
      panelClass:
        type === "success"
          ? ["bg-green-400", "custom-snackbar", "snackbar-top-zindex"]
          : ["bg-rose-500", "custom-snackbar", "snackbar-top-zindex"],
    });
  }

  public extractErrorMessage(error: HttpErrorResponse): string {
    if (error.error && error.error.errors) {
      const messages = Object.values(error.error.errors);
      return messages.join(" | "); // Join multiple errors into a single string
    }

    if (error.error && typeof error.error.message === "string") {
      return error.error.message;
    }

    try {
      const parsed = JSON.parse(error.error);
      return parsed?.message || "An unknown error occurred";
    } catch {
      return "An unknown error occurred";
    }
  }
}
