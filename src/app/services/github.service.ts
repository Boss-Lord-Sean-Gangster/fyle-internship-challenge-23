import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrl: string = 'https://api.github.com/users';
  private token: string = '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';  // Replace with your actual token

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `token ${this.token}`
    });
  }

  getRepos(username: string, perPage: number = 20, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/${username}/repos?per_page=${perPage}&page=${page}`;
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(url, { headers });
  }

  getUserDetails(username: string): Observable<any> {
    const url = `${this.baseUrl}/${username}`;
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(url, { headers });
  }
}
