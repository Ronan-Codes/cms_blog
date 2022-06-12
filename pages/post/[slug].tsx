// @ts-nocheck
import { getPosts, getPostDetails } from '../../services'
import {PostDetail, Categories, PostWidget, Author, Comments, CommentsForm} from '../../components'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'

interface Params {
    params: {
		slug: string
	}
}

const PostDetails: NextPage = ({post}) => {
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
                    <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)}/>
                    <Categories /> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails

// pramams = slug (unique url to a specific resource )
export const getStaticProps = async ({ params }: Params) => {
    const data = await getPostDetails(params.slug)
  
    return {
      props: {post: data}
    }
}

export const getStaticPaths = async () => {
    const posts = await getPosts();

    return {
        // destructures individual post, then destructures node to get the slug
        paths : posts.map(({node: {slug}}) => ({
            params: {slug}
        })),
        fallback: false,
    }
}