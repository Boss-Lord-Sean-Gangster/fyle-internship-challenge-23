import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private token = environment.githubToken;

  constructor(private http: HttpClient) { }

  getUserRepos(username: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.apiUrl}/users/${username}/repos`, { headers });
  }

  getRepoDetails(username: string, repo: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.apiUrl}/repos/${username}/${repo}`, { headers });
  }

  // New methods based on the errors
  getRepos(username: string, perPage: number, page: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.apiUrl}/users/${username}/repos?per_page=${perPage}&page=${page}`, { headers });
  }

  getUserDetails(username: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.apiUrl}/users/${username}`, { headers });
  }
}
