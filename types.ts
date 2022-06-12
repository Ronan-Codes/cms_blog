export interface GetPostsData {
    data: Data;
}

export interface Data {
    postsConnection: PostsConnection;
}

export interface PostsConnection {
    edges: Edge[];
}

export interface Edge {
    node: Node;
}

export interface Node {
    author:        Author;
    createdAt:     Date;
    slug:          string;
    title:         string;
    excerpt:       string;
    featuredImage: FeaturedImage;
    categories:    Category[];
}

// export interface Author {
//     bio:   string;
//     name:  string;
//     id:    string;
//     photo: FeaturedImage;
// }

// export interface FeaturedImage {
//     url: string;
// }

// export interface Category {
//     name: string;
//     slug: string;
// }


// Post 
export interface Post {
    author:        Author;
    createdAt:     Date;
    slug:          string;
    title:         string;
    excerpt:       string;
    featuredImage: FeaturedImage;
    categories:    Category[];
    content:       Content;
}

export interface Author {
    bio:   string;
    name:  string;
    id:    string;
    photo: FeaturedImage;
}

export interface FeaturedImage {
    url: string;
}

export interface Category {
    name: string;
    slug: string;
}

export interface Content {
    raw: Raw;
}

export interface Raw {
    children: RawChild[];
}

export interface RawChild {
    type:     string;
    children: ChildChild[];
}

export interface ChildChild {
    text:       string;
    italic?:    boolean;
    bold?:      boolean;
    underline?: boolean;
}

