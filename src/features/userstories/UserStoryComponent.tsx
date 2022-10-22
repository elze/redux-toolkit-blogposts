import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks';
import { changeStage, getUserStories, selectUserStories, selectUserStory, stageOptions, UserStory, UserStoryStage } from './userStoriesSlice'
import styles from './UserStories.module.css';

export default function UserStoryComponent({num}: {num: number}) {	
  const dispatch = useAppDispatch();
  const userStory = useSelector(selectUserStory(num));
  
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
		<div className={styles.storiesContainer} key={userStory.id}>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>{userStory.id}</div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>{userStory.title}</div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>{userStory.stage} <img src={userStory.imageUrl} alt={userStory.stage}/></div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>Move to &nbsp;
			<select className={styles.dropDownList} value={userStory.stage} onChange={(e) => handleChange(userStory, e)}>
			  {stageOptions.map((option) => (
				<option key={option.value} value={option.value}>{option.label}</option>
			  ))}
			</select>				
			</div>			
		</div>	
  )
}		