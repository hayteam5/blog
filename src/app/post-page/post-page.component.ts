import {Component, OnInit} from '@angular/core';
import {Post} from "../shared/interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../shared/posts.service";
import {Observable, switchMap} from "rxjs";
import {AuthService} from "../admin/shared/services/auth.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$?: Observable<Post>
  isAuth: boolean = false

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    this.isAuth = this.auth.isAuthenticated()

    this.post$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params['id'])
        })
      )
  }

}
