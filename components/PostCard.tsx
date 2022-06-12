import React from 'react';
import {NextPage} from 'next'
import { Node } from '../types';
import Link from 'next/link';

interface Props {
	post: { title: string; excerpt: string };
}

const PostCard: NextPage<{post: Node}> = ({ post }) => {

	console.log(post)
	return (
		<div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
			<div className='relative overflow-hidden shadow-md pb-80 mb-6'>
				<img
					src={post.featuredImage.url}
					alt={post.title}
					className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
				/>
			</div>
			<h1 className='transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-700 text-3xl font-semibold'>
				{/* transitions hover: color */}
				<Link href={`/post/${post.slug}`}>
					{post.title}
				</Link>
			</h1>
		</div>
	);
};

export default PostCard;
