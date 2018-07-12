import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ForumPost } from 'src/app/forum-post';
import { ForumpostService } from 'src/app/forumpost.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forumpost',
  templateUrl: './forumpost.component.html',
  styleUrls: ['./forumpost.component.css']
})
export class ForumpostComponent implements OnInit {
  public forumPost: ForumPost;

  constructor(
    private forumPostService: ForumpostService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private forums: ForumPost[]
  ) { }

  ngOnInit() {
    console.log('Fourmpost init');
    this.forumPostService.getForumPosts().subscribe(f => {this.forums = f;
      console.log(f);
      console.log(this.forums);
    });
  }


  submitQuestion(): void {
      this.forumPostService.updateForumPost(this.forumPost).subscribe(
        fp => {
          this.forumPost = fp;
          this.router.navigate(['/profile']);
        }
      );
      console.log(this.forumPost);
    }
}
