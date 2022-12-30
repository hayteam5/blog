import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../shared/interfaces";
import {Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {FbAuthResponse} from "../../../../environments/interface";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return ''
  }

  login(user: User): Observable<FbAuthResponse> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap<any>(this.setToken)
      )
  }

  logout() {

  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: FbAuthResponse) {
    console.log(response.idToken)
  }
}
