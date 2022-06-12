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
