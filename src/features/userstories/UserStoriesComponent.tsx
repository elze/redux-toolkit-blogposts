import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks';
import { changeStage, getUserStories, selectUserStories, stageOptions, UserStory, UserStoryStage } from './userStoriesSlice';
import UserStoryComponent from './UserStoryComponent';
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
  
  const handleChange = (userStory: UserStory, event: any) => {
	const found = stageOptions.find((elem) => {
		return elem.value === event.target.value
	});
	if (found) {
		const imgUrl = found?.imageUrl;
		console.log(`event.target.value = ${event.target.value}`);
		const newStage: UserStoryStage = { id: userStory.id, stage: event.target.value};
		dispatch(changeStage(newStage))		
	}
  }
  
  return (
    <div>
      <h2>User stories</h2>
	  {entities.map((userStory: UserStory, ind: number) => (
	  <UserStoryComponent key={userStory.id} num={ind}/>
      ))}
    </div>
  )
}