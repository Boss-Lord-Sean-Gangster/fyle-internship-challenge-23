import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RepoListComponent } from './repo-list.component';
import { GithubService } from '../../services/github.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let githubService: GithubService;
  let httpTestingController: HttpTestingController;

  const mockRepos = [
    { name: 'Repo1', html_url: 'http://github.com/repo1', description: 'Repo1 description' },
    { name: 'Repo2', html_url: 'http://github.com/repo2', description: 'Repo2 description' }
  ];

  const mockUserDetails = {
    avatar_url: 'http://github.com/avatar.jpg',
    name: 'John Doe',
    bio: 'Bio of John Doe'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoListComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ GithubService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch repositories on search', () => {
    spyOn(githubService, 'getRepos').and.returnValue(of(mockRepos));
    spyOn(githubService, 'getUserDetails').and.returnValue(of(mockUserDetails));

    component.username = 'testuser';
    component.fetchRepos();

    expect(githubService.getRepos).toHaveBeenCalledWith('testuser', 10, 1);
    expect(githubService.getUserDetails).toHaveBeenCalledWith('testuser');

    expect(component.repos).toEqual(mockRepos);
    expect(component.userDetails).toEqual(mockUserDetails);
  });

  it('should handle error when fetching repositories', () => {
    spyOn(githubService, 'getRepos').and.returnValue(throwError('error'));
    spyOn(console, 'error');

    component.username = 'testuser';
    component.fetchRepos();

    expect(githubService.getRepos).toHaveBeenCalledWith('testuser', 10, 1);
    expect(console.error).toHaveBeenCalledWith('error');
  });

  it('should fetch next page of repositories', () => {
    spyOn(githubService, 'getRepos').and.returnValue(of(mockRepos));

    component.username = 'testuser';
    component.currentPage = 1;
    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(githubService.getRepos).toHaveBeenCalledWith('testuser', 10, 2);
  });

  it('should fetch previous page of repositories', () => {
    spyOn(githubService, 'getRepos').and.returnValue(of(mockRepos));

    component.username = 'testuser';
    component.currentPage = 2;
    component.previousPage();

    expect(component.currentPage).toBe(1);
    expect(githubService.getRepos).toHaveBeenCalledWith('testuser', 10, 1);
  });

  it('should update number of repositories per page', () => {
    spyOn(githubService, 'getRepos').and.returnValue(of(mockRepos));

    component.username = 'testuser';
    component.onPerPageChange({ target: { value: '20' } } as any);

    expect(component.perPage).toBe(20);
    expect(githubService.getRepos).toHaveBeenCalledWith('testuser', 20, 1);
  });
});
