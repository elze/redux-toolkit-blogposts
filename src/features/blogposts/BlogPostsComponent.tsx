import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks';
import { getBlogPosts, selectBlogPosts, BlogPost } from './blogPostsSlice';
import BlogPostComponent from './BlogPostComponent';
import styles from './BlogPosts.module.css';

export default function BlogPostsComponent() {
  const dispatch = useAppDispatch();
  // const { entities, loading } = useSelector((state: UserStoriesState) => state.userstories)
  const { entities, loading } = useSelector(selectBlogPosts)

  useEffect(() => {
	console.log(`BlogPostsComponent: useEffect`);
    dispatch(getBlogPosts())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
    
  return (
    <div>	
      <h2>Blog Posts</h2>
		<div className={styles.blogPostsContainer}>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>ID</b></div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>Title</b></div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>Status</b></div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>Move to</b></div>			
		</div>		  
	  {
		  entities ?
			entities.map((blogPost: BlogPost, ind: number) => (
				<BlogPostComponent key={blogPost.id} num={ind}/>
			))
			: <h3>No posts found</h3>
	  }
    </div>
  )
}