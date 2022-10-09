import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks';
import { getUserStories, selectUserStories, UserStory } from './userStoriesSlice'
import styles from './UserStories.module.css';

export default function UserStoriesComponent() {
  const dispatch = useAppDispatch();
  // const { entities, loading } = useSelector((state: UserStoriesState) => state.userstories)
  const { entities, loading } = useSelector(selectUserStories)

  useEffect(() => {
	  console.log(`UserStoriesComponent: useEffect`);
    dispatch(getUserStories())
  }, [dispatch])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>User stories</h2>
	  
      {entities.map((userStory: UserStory) => (
		<div className={styles.storiesContainer} key={userStory.id}>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>{userStory.id}</div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>{userStory.title}</div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>{userStory.phase} <img src={userStory.imageUrl} alt={userStory.phase}/></div>
		</div>		
      ))}
    </div>
  )
}