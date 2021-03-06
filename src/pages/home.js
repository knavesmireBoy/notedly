import React from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import ReactMarkdown from 'react-markdown';
// import the required libraries
  import { useQuery, gql } from '@apollo/client';
  // our GraphQL query, stored as a variable

  import NoteFeed from '../components/NoteFeed';
  const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
          noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
              id
              createdAt
              content
              favoriteCount
              author {
                username
                id
                avatar
  } }
  } }
  `;

  const DoButton = (o) => {

    fetchMore({
      variables: {
      cursor: o.cursor
    }, 
    updateQuery: (previousResult, { fetchMoreResult }) => {
      return {
        noteFeed: {
          cursor: fetchMoreResult.o.cursor,
          hasNextPage: fetchMoreResult.o.hasNextPage, 
          // combine the new results and the old
          notes: [
            ...previousResult.o.notes,
            ...fetchMoreResult.o.notes
          ],
          __typename: 'noteFeed'
        }
      };
    }
  
  });

  }


  const Home=()=> { // query hook
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
         // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;
         // if the data is successful, display the data in our UI
    return (<React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
{/* Only display the Load More button if hasNextPage is true */}
{data.noteFeed.hasNextPage && ( <Button onClick={ (e) => 
{
  fetchMore({
    variables: {
    cursor: data.noteFeed.cursor
  }, 
  updateQuery: (previousResult, { fetchMoreResult }) => {
    return {
      noteFeed: {
        cursor: fetchMoreResult.noteFeed.cursor,
        hasNextPage: fetchMoreResult.noteFeed.hasNextPage, 
        // combine the new results and the old
        notes: [
          ...previousResult.noteFeed.notes,
          ...fetchMoreResult.noteFeed.notes
        ],
        __typename: 'noteFeed'
      }
    };
  }

});
  }
  }>Load more</Button> )}
      </React.Fragment>
      )
  };
    export default Home;


