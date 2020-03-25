import { environment } from 'src/environments/environment';

export class ApiEndpoints {
    public static login() {
        return `${environment.apiUrl}auth/login/`;
    }

    public static profile() {
        return `${environment.apiUrl}user/profile/`;
    }

    public static registerMachine() {
        return `${environment.apiUrl}machine/register/`;
    }

    public static changePassword() {
        return `${environment.apiUrl}api/user/password`;
    }

    public static role() {
        return `${environment.apiUrl}api/user/role`;
    }
    // ________________KLUBY___________________

    public static getEmails() {
        return `${environment.apiUrl}emails/`;
    }

    public static checkIfActivated(emailId: number) {
        return `${environment.apiUrl}email/${emailId}/activated/`;
    }
}
