import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Output() updated = new EventEmitter<number>();
  @Output() deleted = new EventEmitter<number>();
  @Input() id: number;
  @Input() title: string;
  @Input() content: string;
  @Input() loveIts: number;
  @Input() created_at: Date;

  constructor() { }

  ngOnInit() {
  }

  onLoveIt() {
    this.loveIts++;
    this.updated.emit(this.loveIts);
  }

  onDontLoveIt(){
      this.loveIts--;
    this.updated.emit(this.loveIts);
  }

  onDelete() {
    this.deleted.emit();
  }
}
