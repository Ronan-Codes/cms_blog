import React from 'react';
import {NextPage} from 'next'

interface Props {
	post: { title: string; excerpt: string };
}

const PostCard: NextPage<Props> = ({ post }) => {
	return (
		<div>
			{post.title}
			{post.excerpt}
		</div>
	);
};

export default PostCard;
