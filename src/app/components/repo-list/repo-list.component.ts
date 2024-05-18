import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit {
  repos: any[] = [];
  username: string = '';  // Use a GitHub user with more repositories
  perPage: number = 10;  // Default number of repos per page
  currentPage: number = 1;  // Current page
  userDetails: any = {};  // To store user details including avatar

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.fetchUserDetails();
    this.fetchRepos();
  }

  fetchRepos(): void {
    this.githubService.getRepos(this.username, this.perPage, this.currentPage).subscribe(
      (data) => this.repos = data,
      (error) => console.error(error)
    );
  }

  fetchUserDetails(): void {
    this.githubService.getUserDetails(this.username).subscribe(
      (data) => {
        this.userDetails = data;
        console.log(this.userDetails);  // Log userDetails to check its structure
      },
      (error) => console.error(error)
    );
  }

  onPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.perPage = parseInt(selectElement.value, 10);
    this.currentPage = 1;  // Reset to first page
    this.fetchRepos();
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchRepos();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepos();
    }
  }
  updateUsername(newUsername: string): void {
    this.username = newUsername;
    this.currentPage = 1;  // Reset to first page
    this.fetchUserDetails();
    this.fetchRepos();
  }
}
