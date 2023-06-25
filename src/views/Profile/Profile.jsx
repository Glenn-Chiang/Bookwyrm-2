import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Profile.module.css'
import { faBookBookmark, faCalendarPlus, faCheckCircle, faLineChart, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import getBooks from '../../crudFunctions/getBooks';
import { auth } from '../../firebase';

export default function Profile() {
  if (!auth.currentUser) {
    return (
      <p>Sign in to view your profile</p>
    )
  }
  
  return (
    <>
      <h2 className={styles.header}>
        <FontAwesomeIcon icon={faUser} />
        Profile
      </h2>
      <Stats />
    </>
  )
}

const calcAverageRating = books => {
  if (books.length === 0) {
    return '-';
  } 

  const ratingSum = books.reduce((currentSum, book) => {
    return currentSum + Number(book.rating);
  }, 0);

  const averageRating = (ratingSum / books.length).toFixed(1);
  return averageRating;
}

function Stats() {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userBooks = await getBooks();
        setMyBooks(userBooks)
        console.log('Retrieved books')
      } catch (error) {
        console.log('Error fetching books', error);
      }
    })();
  }, [])

  const booksRead = myBooks.filter(book => book.status === 'read');
  const booksReading = myBooks.filter(book => book.status === 'reading');
  const booksToRead = myBooks.filter(book => book.status === 'to-read');

  return (
    <div className={styles.stats}>
      <h3 className={styles.header}>
        <FontAwesomeIcon icon={faLineChart} />
        Stats
      </h3>
      <table className={styles.statsTable}>
        <tbody>
          <tr>
            <th>
              Total books
            </th>
            <td>{myBooks.length}</td>
          </tr>
          <tr>
            <th>
              Books read
              <FontAwesomeIcon icon={faCheckCircle} />
            </th>
            <td>{booksRead.length}</td>
          </tr>
          <tr>
            <th>
              Books reading
              <FontAwesomeIcon icon={faBookBookmark} />
            </th>
            <td>{booksReading.length}</td>
          </tr>
          <tr>
            <th>
              Books to read
              <FontAwesomeIcon icon={faCalendarPlus} />
            </th>
            <td>{booksToRead.length}</td>
          </tr>
          <tr>
            <th>
              Average Rating
              <FontAwesomeIcon icon={faStar} />
            </th>
            <td>{calcAverageRating(booksRead)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}