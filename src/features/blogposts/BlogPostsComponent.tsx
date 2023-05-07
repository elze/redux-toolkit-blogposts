import { useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { useAppDispatch } from '../../app/hooks';
import { getBlogPosts, selectBlogPostsIds, BlogPost } from './blogPostsSlice';
import BlogPostComponent from './BlogPostComponent';
import styles from './BlogPosts.module.css';

export default function BlogPostsComponent() {
  const dispatch = useAppDispatch();
  const { ids, loading, error } = useSelector(selectBlogPostsIds, shallowEqual)

  useEffect(() => {
	console.log(`BlogPostsComponent: useEffect`);
    dispatch(getBlogPosts())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
    
  return (
    <div>	
      <h2 data-testid="blog-posts-header">Blog Posts</h2>
		  <div style={{ marginBottom: '30px' }}>This application was created for Women Who Code Austin, TX frontend meetup to demonstrate React.js with Redux-Toolkit. Here is the Github repository: <a href="https://github.com/elze/redux-toolkit-blogposts">https://github.com/elze/redux-toolkit-blogposts</a>. <br/>
Some presentations I gave that use this application to illustrate the concepts:	<br/>
<a href="http://geekitude.com/Presentations/20221013-ReactReduxToolkit/slides.html">How to build React.js applications with the redux-toolkit library</a><br/>
<a href="http://geekitude.com/Presentations/20221106-ReactUseSelectorRerendering/slides.html#/">Preventing re-rendering of multiple child components when using useSelector hook in React.js</a><br/>
<a href="http://geekitude.com/Presentations/20230413_ReactReduxToolkit_UnitTesting">Unit-testing a React.js / redux-toolkit application, part 1</a><br/>
<a href="http://geekitude.com/Presentations/20230511_ReactReduxToolkit_UnitTesting_Part2/slides2.html#/">Unit-testing a React.js / redux-toolkit application, part 2</a><br/>
		  Here is the <a href="http://geekitude.com">author's website</a>.</div>  
		<div className={styles.blogPostsContainer}>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>ID</b></div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>Title</b></div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>Status</b></div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>Move to</b></div>			
		</div>		  
	  {
		  // entities ?
		  ids && ids.length > 0 ? 
			// entities.map((blogPost: BlogPost, ind: number) => (
			ids.map((id: number, ind: number) => (			
				<BlogPostComponent key={id} num={ind}/>
			))
			: <h3>No posts found: an error occurred: { error } </h3>
	  }
    </div>
  )
}