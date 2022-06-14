import { graphql } from 'graphql';
import { request, gql } from 'graphql-request';

const graphqlAPI: any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.postsConnection.edges;
};

export const getPostDetails = async (slug:string) => {
	const query = gql`
		query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                excerpt
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }
            }
		}
	`;

	const result = await request(graphqlAPI, query, { slug });

	return result.post;
};
// content{raw} gives us access to the post's content

export const getRecentPosts = async () => {
    const query = gql `
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);

	return result.posts;
}

// When using parameters, make sure to include it in the request() function at the bottom as well
export const getSimilarPosts = async (categories: String[], slug: string) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query, { categories, slug });

	return result.posts;
}
// _not: get posts, but not including the current post we're at, by checking slug_not
// _some: But include other articles that include some of the categories that we want to get 
// _in: included in slug
// and we want to specify that we just want the last 3 articles  


export const getCategories = async() => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);

	return result.categories;
}

export const getCategoryPost = async (slug:string) => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {categories_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.postsConnection.edges;
  };

// write a request to our Next.js API
// The reason we need our own bakcend is b/c graphCMS allows our own backend to interact with our service to actually
    // submit a comment to graphCMS
export const submitComment = async (obj:any) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    return result.json()
}

export const getComments = async(slug: string) => {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: { post: { slug: $slug } } ) {
                name
                createdAt
                comment
            }
        }
    `
    // get all comments where in an object post has this slug

    const result = await request(graphqlAPI, query, {slug});

	return result.comments;
}
