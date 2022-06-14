
import React from 'react'

import { getPosts, getPostDetails } from '../../services'
import {PostDetail, Categories, PostWidget, Author, Comments, CommentsForm} from '../../components'
import { GetStaticPaths, NextPage } from 'next'
import { GetStaticProps } from 'next'
import {Category, Post} from '../../types'
import {useRouter} from 'next/router'

interface Params {
    params: {
		slug: string
	}
}

interface Slug {
    node: {
        slug: string
    }
}

// interface Props extends Post {

// }

const PostDetails: NextPage = ({post}) => {
    // const router = useRouter();
    // console.log(router.query)


    // console.log(JSON.stringify(post))
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post={post}/>
                <Author author={post.author}/>
                <CommentsForm slug={post.slug}/>
                <Comments slug={post.slug}/>
            </div>
            <div className='col-span-1 lg:col-span-4'>
                <div className='relative lg:sticky top-8'>
                    <PostWidget slug={post.slug} categories={post.categories.map((category:Category) => category.slug)}/>
                    <Categories /> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails

// pramams = slug (unique url to a specific resource )

export const getStaticProps: GetStaticProps = async ({ params: {slug} }) => {
    const data = await getPostDetails(slug)
  
    return {
      props: {post: data}
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getPosts();

    return {
        paths : posts.map(({node: {slug}} : Slug ) => ({
            params: {slug}
        })),
        fallback: false,
    }
}

// export const getServerSideProps = async ({params}: {params: {slug:string}}) => {
// 	const data = await getPostDetails(params.slug)
//     console.log(params)
    
// 	return {
// 		props: {
// 			post: data,
// 		},
// 	};
// };

