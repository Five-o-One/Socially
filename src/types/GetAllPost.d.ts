export interface GetAllPostsResponse {
    message: string;
    success: boolean;
    data:    Datum[];
}

export interface Datum {
    id:        string;
    authorId:  string;
    content:   string;
    createdAt: Date;
    updatedAt: Date;
    author:    Author;
    likes:     Like[];
    comments:  Comment[];
    _count:    Count;
}

export interface Count {
    likes:    number;
    comments: number;
}

export interface Author {
    name:  string;
    email: string;
    image: null;
}

export interface Comment {
    id:        string;
    content:   string;
    createdAt: Date;
    author:    Author;
}

export interface Like {
    userId: string;
}
