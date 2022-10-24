import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks';
import { changeStatus, selectBlogPost, blogPostStatusOptions, BlogPost, PostAndStatus, StatusNames } from './blogPostsSlice'
import styles from './BlogPosts.module.css';

export default function BlogPostComponent({num}: {num: number}) {	
  const dispatch = useAppDispatch();
  const blogPost = useSelector(selectBlogPost(num));
  
  const handleChange = (blogPost: BlogPost, event: any) => {
	const found = blogPostStatusOptions.find((elem) => {
		return elem.value === event.target.value
	});
	if (found) {
		console.log(`event.target.value = ${event.target.value}`);
		const newStatus: PostAndStatus = { id: blogPost.id, blogPostStatus: event.target.value};
		dispatch(changeStatus(newStatus));
	}
  }
  
  const statusName = StatusNames[blogPost.blogPostStatus as keyof typeof StatusNames];
  
  return (
		<div className={styles.blogPostsContainer} key={blogPost.id}>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>{blogPost.id}</div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>{blogPost.title}</div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`} style={{color: 'blue'}}>{statusName}</div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>
			<select className={styles.dropDownList} value={blogPost.blogPostStatus} onChange={(e) => handleChange(blogPost, e)}>
			  {blogPostStatusOptions.map((option) => (
				<option key={option.value} value={option.value}>{option.label}</option>
			  ))}
			</select>				
			</div>			
		</div>	
  )
}		