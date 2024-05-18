import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';
import { environment } from '../../environments/environment';

describe('GithubService', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });

    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch repositories', () => {
    const mockRepos = [
      { name: 'Repo1', html_url: 'http://github.com/repo1', description: 'Repo1 description' },
      { name: 'Repo2', html_url: 'http://github.com/repo2', description: 'Repo2 description' }
    ];

    service.getRepos('testuser', 10, 1).subscribe(repos => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(mockRepos);
    });

    const req = httpTestingController.expectOne(
      `${environment.githubToken}/users/testuser/repos?per_page=10&page=1`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });

  it('should handle error when fetching repositories', () => {
    const errorMessage = '404 error';

    service.getRepos('testuser', 10, 1).subscribe(
      () => fail('should have failed with the 404 error'),
      (error: string) => {
        expect(error).toEqual('Something went wrong; please try again later.');
      }
    );

    const req = httpTestingController.expectOne(
      `${environment.githubToken}/users/testuser/repos?per_page=10&page=1`
    );

    expect(req.request.method).toBe('GET');

    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should fetch user details', () => {
    const mockUserDetails = {
      avatar_url: 'http://github.com/avatar.jpg',
      name: 'John Doe',
      bio: 'Bio of John Doe'
    };

    service.getUserDetails('testuser').subscribe(userDetails => {
      expect(userDetails).toEqual(mockUserDetails);
    });

    const req = httpTestingController.expectOne(`${environment.githubToken}/users/testuser`);

    expect(req.request.method).toBe('GET');
    req.flush(mockUserDetails);
  });

  it('should handle error when fetching user details', () => {
    const errorMessage = '404 error';

    service.getUserDetails('testuser').subscribe(
      () => fail('should have failed with the 404 error'),
      (error: string) => {
        expect(error).toEqual('Something went wrong; please try again later.');
      }
    );

    const req = httpTestingController.expectOne(`${environment.githubToken}/users/testuser`);

    expect(req.request.method).toBe('GET');

    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
