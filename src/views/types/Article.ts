import { Comment } from "./Comment";

export class Article {
  constructor(
    private _id: number,
    private _name: string,
    private _content: string,
    private __commentList: Array<Comment>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get content(): string {
    return this._content;
  }

  public set content(content: string) {
    this._content = content;
  }

  public get _commentList(): Array<Comment> {
    return this.__commentList;
  }

  public set _commentList(_commentList: Array<Comment>) {
    this.__commentList = _commentList;
  }
}
